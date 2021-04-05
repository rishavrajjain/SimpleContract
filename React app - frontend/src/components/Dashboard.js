import React,{useEffect,useState} from 'react'
import Cookies from 'universal-cookie';

import Navbar from './layout/Navbar';
import axios from 'axios';
import { PieChart } from 'react-minimal-pie-chart';
import BarChart from 'react-bar-chart';
import './dashboard.css'

import LoadingOverlay from 'react-loading-overlay';


function Dashboard(props) {

    const cookies= new Cookies();

    const [text,setText]=useState('');
    const [showChart,setShowChart]=useState(false);
    const [showKeyPhrases,setShowKeyPhrases]=useState(false);
    const [summary,setSummary]=useState(false);
    const [showSummary,setShowSummary]=useState(false);
    const [keyPhrases,setKeyPhrases]=useState([]);
    const [entity,setEntity]=useState([])
    const [showEntity,setShowEntity]=useState(false);

    const [pieChartData,setPieChartData]=useState([]);

    const [language,setLanguage]=useState('en');
    const [showLanguage,setShowLanguage]=useState(false);

    const [headings,setHeadings]=useState(['Entities','Key Phrases','Summary']);
    const [loading,setLoading]=useState(false);


    useEffect(()=>{
        const token = cookies.get('app-token');
        if(!token){
            props.history.push('/');
        }
    },[])
    

    const ocr = async(url)=>{
        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_OCR}`,
                'Ocp-Apim-Subscription-Region':'westus2',
                'Content-Type':'application/json'
            }
           
        }

        

        try{
            const res= await axios.post('https://ocr-test-azure-hackathon.cognitiveservices.azure.com/vision/v3.0/ocr',{
                url:url
            },config);
            console.log(res);
            return res.data.regions;
        }catch(err){
            console.log(err);
        }
    }

    const  getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            //console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    const getUrlfrombase64 = async(base64)=>{
        const data=new FormData();
        data.append('image',base64)
        try{
            const res=await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMGBB_CLIENT_API_KEY}`,
                data
            )
            console.log(res);
            return res.data.data.url;
        }catch(err){
            console.log(err);
        }
        
        
    }

    const onChange=(e)=>{
        setText(e.target.value);
    }
    const [files,setFiles]=useState([]);
    const onFileChange=(e)=>{
        var files=e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);

        console.log(filesArr.length)
        setFiles(filesArr);

        

       

    }

    const getSummary=async()=>{

        const text_data=JSON.stringify({
            text:para
        })
        console.log(text_data)
        const summarized_text=await axios.post('https://simple-contract-summarizer.azurewebsites.net/summarize',text_data,{
                headers:{
                    "content-Type":"application/json"
                }
            })

            console.log(summarized_text)
    }

    
    const [para,setPara]=useState("");
    const submit=async()=>{
        //convert img to base64
        //from base64 to url
        //send url to azure
        setLoading(true);

        try{

        
        

        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TEXT_ANALYSIS}`,
                'Ocp-Apim-Subscription-Region':'westus2',
                'Content-Type':'application/json'
            }
           
        }
        let text='';
        for(var t=0;t<files.length;t++){
            
            var base64 = await getBase64(files[t]);
            base64=base64.toString();
            console.log(base64)
            const index=base64.search("base64,")
            const image=base64.slice(index+7);

            console.log(image)
            console.log(typeof(image))
            const url=await getUrlfrombase64(image);

            
            const regions=await ocr(url);
            

            for(var k=0;k<regions.length;k++){
                for(var i=0;i<regions[k].lines.length;i++){
                    var wordsArray=regions[k].lines[i]
                    //console.log(wordsArray.words);
                    for(var j=0;j<wordsArray.words.length;j++){
                        text=text+wordsArray.words[j].text+" ";
                    }
                    text=text+".";
                }
                
                
            }
        }
            text=text.replace(/['"]+/g, '')
            
            setPara(text);
            console.log(para)
            console.log(text);
            const keyPhrases = await axios.post('https://text-analysis-hackathon.cognitiveservices.azure.com/text/analytics/v3.1-preview.4/keyPhrases',{ "documents": [{ "id": "1", "text":text}]},config)

            console.log(keyPhrases);
            setKeyPhrases(keyPhrases.data.documents[0].keyPhrases);

            const sentiment = await axios.post('https://text-analysis-hackathon.cognitiveservices.azure.com/text/analytics/v3.1-preview.4/sentiment',{ "documents": [{ "id": "1", "text":text}]},config)
            console.log('tyes');
            console.log(sentiment.data)
            console.log(sentiment.data.documents[0])
            const titles=Object.keys(sentiment.data.documents[0].confidenceScores);
            const values=Object.values(sentiment.data.documents[0].confidenceScores);
            var chartData=[];
            var colors=['#5cb85c','#0275d8','#d9534f']
            const datavalues=[...data];
            for(var i=0;i<titles.length;i++){
                chartData.push({
                    title:titles[i],
                    value:values[i],
                    color:colors[i]
                })
            }

            datavalues[0].value=values[0]*100;
            datavalues[1].value=values[1]*100;
            datavalues[2].value=values[2]*100;

            const entities = await axios.post('https://text-analysis-hackathon.cognitiveservices.azure.com/text/analytics/v3.0/entities/recognition/general',{ "documents": [{ "id": "1", "text":text}]},config)
            var enyData=entities.data.documents[0].entities
            var entitiesArray=[];
            for(var i=0;i<enyData.length;i++){
                if(enyData[i].category !== 'Quantity'){
                    entitiesArray.push(enyData[i].text.toLowerCase())
                }
            }

            const enData=[...new Set(entitiesArray)];

            setEntity(enData);
            setShowEntity(true);

            

            setPieChartData(chartData);
            setData(datavalues)
            setShowChart(true);
            setShowKeyPhrases(true);
            //showSummary(true);

            
           
            const summarized_text=await axios.post('https://simple-contract-summarizer.azurewebsites.net/summarize',{
                text:text
            },{
                    headers:{
                        "content-Type":"application/json"
                    }
                })
    
            console.log(summarized_text)
            setSummary(summarized_text.data);
            setShowSummary(true);
            setShowLanguage(true);

            setLoading(false);

            
        }
        catch(err){
            console.log(err)
            setLoading(false);
        }
    }
    const [data,setData] =useState ([
        {text: 'Positivity', value: 25}, 
        {text: 'Neutral', value: 60},
        {text: 'Negativity', value: 15},
        
      ]);

      const translate=(lang)=>{
          setLoading(true);
        const url=`https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`;

        

        

        var keyPhrasesString='';
        keyPhrases.map(k=>{
            keyPhrasesString=keyPhrasesString+k+"|"
        })

        var entitiesString='';
        entity.map(ent=>{
            entitiesString=entitiesString+ent+"|"
        })

        var headingsString='';
        headings.map(head=>{
            headingsString=headingsString+head+"|"
        })

        console.log(process.env.REACT_APP_AZURE_KEY_TRANSLATION)
        console.log(entitiesString)
        

        const config={
            headers:{
                'Ocp-Apim-Subscription-Key':`${process.env.REACT_APP_AZURE_KEY_TRANSLATION}`,
                'Ocp-Apim-Subscription-Region':'eastus2',
                'Content-Type':'application/json'
            }
           
        }
        axios.post(url,[
            {
                "text":entitiesString
            },
            {
                "text":keyPhrasesString
            },
            {
                "text":summary
            },
            {
                "text":headingsString
            }
        ],config).then((res)=>{
            

            const translatedEntities=res.data[0].translations[0].text.split("|");
            const translatedKeyPhrases=res.data[1].translations[0].text.split("|");
            const translatedSummary=res.data[2].translations[0].text
            const translatedHeadings=res.data[3].translations[0].text.split("|");

            
            setHeadings(translatedHeadings)

            const transdatatentity=[];
            translatedEntities.map((ent)=>{

                if(ent !== ''){
                    transdatatentity.push(ent);  
                }
                
            })
            setEntity(transdatatentity);
            
            const transdatakeyPhrases=[]

            translatedKeyPhrases.map((tra)=>{
                if(tra !== ''){
                    transdatakeyPhrases.push(tra);
                }
                
            })
            setKeyPhrases(translatedKeyPhrases);
            setSummary(translatedSummary)

            
            setLoading(false);


        }).catch(err=>{
            console.log(err);
            setLoading(false);
        })
    }

      const selectLanguage=(e)=>{
        switch(e.target.value){
            case 'English':{
                translate('en');
                break;
            }
            case 'हिन्दी':{
                translate('hi');
                break;
            }
            case 'ગુજરાતી':{
                translate('gu');
                break;
            }
            case 'தமிழ்':{
                translate('ta');
                break;
            }
            case 'ಕನ್ನಡ':{
                translate('kn');
                break;
            }
            case 'മലയാളം':{
                translate('ml');
                break;
            }
            case 'मराठी':{
                translate('mr');
                break;
            }
            case 'ਪੰਜਾਬੀ':{
                translate('pa');
                break;
            }
            case 'ਪੰଘୃଣା କରେ':{
                translate('pa');
                break;
            }
            
            
            

            default :{
                break;
            }

        }
        return;
    }
       
      const margin = {top: 20, right: 20, bottom: 30, left: 40};
    return (
        <div>
        <LoadingOverlay
            active={loading}
            spinner
            text='Loading ...'
            >
            <Navbar/>
            <div className="container" style={{marginTop :'5rem'}}>

            <label>Upload Photo or Take Photo</label>
            <br></br>
            <div style={{alignItems:'center',justifyContent:'center',textAlign:'center',border:'3px dotted #8fd9ea',height:'200px',backgroundColor:'#d3e7ff'}}>
                <i class="fa fa-cloud-upload fa-4x" aria-hidden="true" style={{marginTop:'60px'}}></i>
                <br></br>
                <input style={{marginTop:'30px'}} type="file"  multiple onChange={onFileChange} ></input>
            </div>
            
            <button className="btn btn-block btn-success" style={{marginTop:'2rem'}} onClick={submit}> Submit </button>
            {
                showLanguage ?(
                    <div style={{marginTop:'2rem'}}>
                    <div style={{marginTop:'2rem'}}class="form-group">
                    <label for="exampleFormControlSelect1">Choose Language</label>
                    <select class="form-control" id="exampleFormControlSelect1" onChange={selectLanguage}>
                    <option  >English</option>
                      <option>हिन्दी</option>
                      <option>ગુજરાતી</option>
                      <option>தமிழ்</option>
                      <option>ಕನ್ನಡ</option>
                      <option>മലയാളം</option>
                      <option>मराठी</option>
                      <option>ਪੰਜਾਬੀ</option>
                      <option>ଘୃଣା କରେ</option>
                      
                      
                    </select>
                  </div>
                    </div>
                ):(
                    <div></div>
                )
            }
            {
                showEntity ? (
                    <div className="sidebar" style={{marginTop:'2rem'}}>
                    <h6>{headings[0]}</h6>
                    <div class="sidebar-item tags">
                        <ul>
                        {
                            entity.map((ent)=>{
                                if(ent !=='' && ent !==' '){
                                    return(
                                    
                                        <li><a href="#">{ent}</a></li>
                                    )      
                                }
                                  
                            })
                        }
                        
                        
                        </ul>

              </div>
              </div>
                ):(
                    <div></div>
                )
            }
            {
                showKeyPhrases ? (
                    <div className="sidebar " style={{marginTop:'2rem'}}>
                    <h6>{headings[1]}</h6>
                    <div class="sidebar-item tags">
                        <ul>
                        {
                            keyPhrases.map((phrase)=>{
                                if(phrase !=='' && phrase !==' '){
                                    return(
                                        <li><a href="#">{phrase}</a></li>
                                    )
                                }
                                
                            })
                            
                        }
                        
                        
                        </ul>

              </div>
              </div>
                ):(
                    <div></div>
                )
            }
            {
                showChart ? (
                    <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 " style={{justifyContent:'center',marginTop:'2rem',alignItems:'center',width:'25rem'}}>
                    <PieChart
                    data={pieChartData}
                    label={({ dataEntry }) => dataEntry.key}
                  />
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-7 col-sm-12 " style={{marginLeft:'20px',marginTop:'2rem'}}>
                    <div style={{width: '100%'}}> 
                <BarChart ylabel='Scale'
                 width={500}
                  height={400}
                  margin={margin}
                  data={data}
                  
                  />
            </div>
                    
                    </div>
                    </div>
                ):(
                    <div></div>
                )
            }
            {
                showSummary ? (
                    <div className="row" style={{marginTop:'2rem'}}>
                        <div className="card col-xl-12">
                            <div className="card-body">
                                <h6 className="card-title">{headings[2]}</h6>
                                <div className="card-text">
                                    {summary}
                                </div>
                            </div>
                        
                        </div>
                    </div>
                ):(
                    <div></div>
                )
            }

           
            
            
            </div>
            </LoadingOverlay>
        </div>
    )
}

export default Dashboard;
