import React,{useContext,useEffect} from 'react';

import Cookies from 'universal-cookie';

import './home.css'


import Navbar from './layout/Navbar';
import Footer from './layout/Footer'


const Home = (props) => {

 


  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get('app-token');
    if(token ){
      props.history.push('/dashboard');
    }
    
  }, [])

  

    

    const svg='<div class="container"><div class="row"><div class="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center"><div data-aos="zoom-out"><h1><span>Simple Contract</span> </h1><h2>Powered by Microsoft Azure</h2><div class="text-center text-lg-left"><a href="#about" class="btn-get-started scrollto">Get Started</a></div></div></div><div class="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out" data-aos-delay="300"></div></div></div><svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none"><defs><path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></defs><g class="wave1"><use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)"></g><g class="wave2"><use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)"> </g><g class="wave3"><use xlink:href="#wave-path" x="50" y="9" fill="#fff"></g></svg>'

    const home=(
        <div>
        
        <section id="hero" dangerouslySetInnerHTML={{__html: svg }}>

    

    

  </section>

  <sections id="features" class="features">
  <div class="container" style={{marginTop:'1rem'}}>

    <div class="section-title" data-aos="fade-up">
      <h2>What it Does ?</h2>
    </div>
    <p>
        
        <b>Problem</b>
        <br></br>
        In India, millions of people living in rural areas,farmers and people living in slum areas are cheated, and their land is grabbed.
        <br></br>
        <br></br>
        <b>How does this happen ?</b>
        <br></br>
        These people are tricked into signing complex legal documents, which are shown as if they would benefit them but they are cheated.
        <br></br>
        Eg : Farmers entering into contract farming with complex terms, end up with the corporate or private buyer cheating them and grabbing their lands.
        <br></br>
        <br></br>
        Generally legal documents and agreements are difficult to understand and often people face difficulties in moving forward with it.
        <br></br>
        <br></br>
        <b>So what does our solution do.</b>
        <br></br>
        We simplify and break down the legal document, we provide complete analysis of the document and also provide a feature to translate to multiple Indian languages.
        <br></br>
        <br></br>
        Along with the farmers,people living in rural and slum areas, our solution can help any induvidual or group who is trying to wrap their head around a complex legal contract or document.
    </p>
    <div class="row" data-aos="fade-left">
          <div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i class="fa fa-github" style={{color: 'black'}}></i>
              <h3><a href="">View Code,Working and Documentation</a></h3>
            </div>
          </div>
          
          </div>
    </div>
    </sections>

  
      <div>
      <section id="features" class="features">
      <div class="container">

        <div class="section-title" data-aos="fade-up">
          <h2>Features</h2>
          <p>Check The Features</p>
        </div>

        <div class="row" data-aos="fade-left">
          <div class="col-lg-3 col-md-4">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="50">
              <i class="fa fa-picture-o" style={{color: '#ffbb2c'}}></i>
              <h3><a href="">Upload Images of Legal documents or Contracts</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="100">
              <i class="fa fa-bar-chart" style={{color: '#5578ff'}}></i>
              <h3><a href="">Get analysis on the sentiment of the Contract</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-md-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="150">
              <i class="fa fa-file-text-o" style={{color: '#e80368;'}}></i>
              <h3><a href="">Get Summary,entities and key phrases of the Contract</a></h3>
            </div>
          </div>
          <div class="col-lg-3 col-md-4 mt-4 mt-lg-0">
            <div class="icon-box" data-aos="zoom-in" data-aos-delay="200">
              <i class="fa fa-language" style={{color: '#e361ff'}}></i>
              <h3><a href="">Get analysis of the document in Multiple Indian Languages</a></h3>
            </div>
          </div>
          
          
          
          
          
        </div>

      </div>
    </section>

    
        
      
        </div>

        
      
  
    
  
    
    
        
        <Footer/>
        
            
        </div>
    )

   
  
   

    return (
        <div>
            <Navbar style={{marginBottom:'2rem'}}/>
            {home}
        </div>
    )
}

export default Home;


