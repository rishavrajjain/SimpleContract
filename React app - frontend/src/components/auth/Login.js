
  
import React,{useContext,useState,useEffect} from 'react'



import { Link } from 'react-router-dom';

import axios from 'axios';
import Cookies from 'universal-cookie';
import LoadingOverlay from 'react-loading-overlay';
import './auth.css'
import Footer from '../layout/Footer'






import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../layout/Navbar';

const Login = (props) => {

    const cookies = new Cookies();


   
    const token = cookies.get('app-token')

    useEffect(()=>{
        if(token){
            props.history.push('/dashboard');
        }
    },[props.history])

    const [loading,setLoading]=useState(false);

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const onEmailChange=(e)=>{
        setEmail(e.target.value);
    }

    const onPasswordChange=(e)=>{
        setPassword(e.target.value);
    }

    const submit=async(e)=>{
        e.preventDefault();

        if(password === '' || email === ''){
            
            toast.error('❌ Email or Password cannot be empty', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        setLoading(true);
        try{
            const res= await axios.post('https://simple-contract-backend.azurewebsites.net/login',{
                email:email,
                password:password
            })

            cookies.set('app-token',res.data.data.token);
            cookies.set('name',res.data.data.name);
            cookies.set('email',res.data.data.email)

            props.history.push('/dashboard');

            toast.success('🦄 Login Successfull !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setLoading(false);
        }catch(err){
            

            if(err.response.status === 401){
                toast.error('❌ Unauthorized.Invalid credentials', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }

            if(err.response.status === 500){
                toast.error('❌ Something went wrong.Please try again.', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }
            setLoading(false);
        }
        setLoading(false);
        
    }

    


    

    


    

    

    
    return (
        <div>
        <Navbar/>
        
            
            
        <body class="bg-default">
            
  <div class="main-content">
  <LoadingOverlay
      active={loading}
      spinner
      text='Loading ...'
      >
    
    <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
      <div class="container">
        <div class="header-body text-center mb-7">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-lg-6 col-md-8 px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">Login to Simple Contract to get started</p>
            </div>
          </div>
        </div>
      </div>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <polygon class="fill-default" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </div>
   
    <div class="container mt--8 pb-5">
      <div class="row justify-content-center">
      
        <div class="col-lg-5 col-md-7">
          <div class="card bg-secondary border-0 mb-0">
            
            <div class="card-body px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <small>Sign In</small>
              </div>
              <form role="form" onSubmit={submit}>
                <div class="form-group mb-3">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-envelope"></i></span>
                    </div>
                    <input class="form-control" placeholder="Email" type="email" onChange={onEmailChange}/>
                  </div>
                </div>
                <div class="form-group">
                  <div class="input-group input-group-merge input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text"><i class="fa fa-lock"></i></span>
                    </div>
                    <input class="form-control" placeholder="Password" type="password" onChange={onPasswordChange}/>
                  </div>
                </div>
                
                <div class="text-center">
                  <button type="button" class="btn btn-primary my-4 btn-block" type="submit">Sign in</button>
                </div>
              </form>
            </div>
          </div>
          
          <div class="row mt-3">
          <div class="col-6 text">
          <Link to="/" class="text-light"><small>Home</small></Link>
        </div>
            <div class="col-6 text-right">
              <Link to="signup" class="text-light"><small>Create new account</small></Link>
            </div>
          </div>
          
        </div>
        
      </div>
    </div>
    </LoadingOverlay>
  </div>
  </body>
  <Footer/>
            
            
        </div>
    )
}

export default Login;


