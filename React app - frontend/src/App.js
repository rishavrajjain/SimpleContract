import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import Profile from './components/Profile'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/layout/Footer';



function App() {
  return (
    <Router>
      
      <ToastContainer/>
        <Switch>
          <Route exact path ="/" component={Home}></Route>
          <Route exact path ="/dashboard" component={Dashboard}></Route>
          <Route exact path ="/login" component={Login}></Route>
          <Route exact path ="/signup" component={Signup}></Route>
          <Route exact path ="/profile" component={Profile}></Route>
        
        
        </Switch>
        

      
    
    </Router>
  );
}

export default App;
