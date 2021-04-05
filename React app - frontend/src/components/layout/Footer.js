import React from 'react';
import './footer.css';
import {Link} from 'react-router-dom';

const Footer = () => {
    return (
        
        <body class="bg-default">
        <footer class="py-5" id="footer-main">
    <div class="container">
      <div class="row align-items-center justify-content-xl-between">
        
        <div class="col-xl-6">
          <ul class="nav nav-footer justify-content-center justify-content-xl-end">
            <li class="nav-item">
              <Link href="https://www.creative-tim.com" class="nav-link" to="/">Simple Contract</Link>
            </li>
            <li class="nav-item">
              <Link to="" class="nav-link" target="_blank">Github</Link>
            </li>
            
          </ul>
        </div>
      </div>
    </div>
  </footer>
  </body>
            
        
    )
}


export default Footer;

