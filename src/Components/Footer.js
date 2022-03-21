import React from "react";
import "./CSS/Footer.css";
import logo from '../assets/images/logo.png'
import fb from '../assets/images/icons/facebook-f-brands.svg'
import insta from '../assets/images/icons/instagram-brands.svg'
import linledin from '../assets/images/icons/linkedin-in-brands.svg'
import email from '../assets/images/icons/envelope-solid.svg'
import twitter from '../assets/images/icons/twitter-brands.svg'
import location from '../assets/images/icons/location-dot-solid.svg'
import phone from '../assets/images/icons/phone-solid-1.png'
import copyright from '../assets/images/icons/copyright-regular.svg'

import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <>
    <section id="footer">
      <div className="container">
        <div className="row">
        <div className="col-md-4">
        <Link to='/'><img src={logo} className="logo" alt="logo" /></Link>
            <ul>
              
              <li><Link to = "/"><img src={location} className="icon" alt="location" /> House-5A Rd 137, Dhaka 1212</Link></li>
              <li><Link to = "/"><img src={phone} className="icon" alt="phone" /> +880 199 776 1111</Link></li>
              <li><Link to = "/"><img src={email} className="icon" alt="email" /> info@linkedsage.com</Link></li>
            </ul>
          </div>
          
          <div className="col-md-4">
          <p className="h4">Quick Links</p>
            <ul>
              
              <li><Link to = "/">Link 1</Link></li>
              <li><Link to = "/">Link 2</Link></li>
              <li><Link to = "/">Link 3</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
          <p className="h4">Follow Us On</p>
            <ul className="d-flex justify-content-between">
              
              <li><Link to = "/"><img src={fb} alt="fb" className="social-icon"/></Link></li>
              <li><Link to = "/"><img src={insta} alt="insta" className="social-icon"/></Link></li>
              <li><Link to = "/"><img src={twitter} alt="twitter" className="social-icon"/></Link></li>
              <li><Link to = "/"><img src={linledin} alt="linledin" className="social-icon"/></Link></li>
            </ul>
          </div>
          
        </div>
      </div>
    </section>
    <section id="copy-right">
      <div className="container">
        <div className="row">
          <p className="d-flex justify-content-center w-100 align-items-center pt-3">
            <img src={copyright} alt="copyright" />&nbsp; 2022 LoanerBazar. All rights reserved by &nbsp; <a href="https://loanerbazar.com/">LoanerBazar.</a> 
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
