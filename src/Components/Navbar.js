import React, { useEffect, useState } from "react";
import './CSS/Navbar.css'
import { Link } from "react-router-dom";
import phoneLogo from '../assets/images/icons/phone-solid.png'
import userLogo from '../assets/images/icons/phone-solid.png'
import menu from '../assets/images/icons/menu.webp'
import logo from '../assets/images/logo.png'
import { getCookies, removeCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";



export default function Navbar() {

  const get_cookies = getCookies('data')
  const currentUser = getCurrentUser();
  console.log("currentUser", currentUser)
  function showNavMenu() {
    var element = document.getElementById("open-nav");
    var element1 = document.getElementById("open-nav-item");

    var delayInMilliseconds = 500; //1 second
    setTimeout(function () {
      element.classList.remove("d-none");
      element.classList.add("show-nav-menu-sec");
      element1.classList.remove("nav-link-hide")
      element1.classList.add("nav-link-show")
    }, delayInMilliseconds);
  }
  function hideNavMenu() {
    var element = document.getElementById("open-nav");
    var element1 = document.getElementById("open-nav-item");


    var delayInMilliseconds = 500; //1 second
    setTimeout(function () {
      element.classList.remove("show-nav-menu-sec");
      // element.classList.add("d-none");
      element1.classList.remove("nav-link-show")
      element1.classList.add("nav-link-hide")
    }, delayInMilliseconds);
  }
  function signOutFun() {
    notification('success', 'Logout Successfully. Redirecting...')
    removeCookies('data', '/')
    setTimeout(() => {
      window.location.href = '/'
    }, 1000)
  }

  return (
    <>
      <ToastContainer />

      <section id="navbar-main">
        <div className="container-fluid">
          <div className="row navbar d-flex align-items-center">
            <div className="left-nav col ">
              <div className="d-flex align-items-center">
                <Link to='/' className="logo">
                  <img src={logo} alt="logo" />
                </Link>
                <a className="d-flex align-items-center ml-5 call" href="tel:8801997766489">
                  <img className="phn-logo" src={phoneLogo} alt="phn-logo" />
                  <div className="phn-no pl-2">
                    <p className="hover-effect">Helpline</p>
                    <p className="hover-effect">+880 199 111 2222</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="right-nav col">
              <ul className="d-flex justify-content-end">
                {
                  currentUser && currentUser.data && currentUser.data.is_verified ?
                    <li><a className="hover-effect nav-item"><img src={userLogo} alt="user" />
                    {
                      currentUser.data.name?
                      <>{currentUser.data.name}</>
                      :
                      <>Account</>
                    }
                      
                      <ul className="dropdown d-flex flex-column">
                        <li><Link className="hover-effect" to='/dashboard'>Dashboard</Link></li>
                        <li><Link className="hover-effect" to='/profile'>Profile</Link></li>
                        <li><Link className="hover-effect" to='' onClick={signOutFun}>Logout</Link></li>
                      </ul>
                    </a></li>
                    :
                    <li><Link className="hover-effect" to='/signin'>Signin</Link></li>
                }

                <li><a className="hover-effect nav-item" href='#' onClick={showNavMenu}><img src={menu} alt="menu" />Menu</a></li>
              </ul>
              <div id="open-nav" className="nav-menu-sec" >
                <div className="close-nav-sec" onClick={hideNavMenu}>
                </div>

                <div id="open-nav-item" className="nav-menu d-flex flex-column">
                  <ul>
                    <p className="h4">LOAN</p>
                    <li><Link className="hover-effect-black" to="/" onClick={hideNavMenu}>Personal Loan</Link></li>
                    <li><Link className="hover-effect-black" to="/" onClick={hideNavMenu}>Home Loan</Link></li>
                    <li><Link className="hover-effect-black" to="/" onClick={hideNavMenu}>Car Loan</Link></li>
                  </ul>
                  <ul>
                    <p className="h4">CREDIT CARD</p>
                    <li><Link className="hover-effect-black" to="/credit-card" onClick={hideNavMenu}>SCB Credit Card</Link></li>
                    <li><Link className="hover-effect-black" to="/credit-card" onClick={hideNavMenu}>MTBL Credit Card</Link></li>
                    <li><Link className="hover-effect-black" to="/credit-card" onClick={hideNavMenu}>City Credit Card</Link></li>
                    <li><Link className="hover-effect-black" to="/credit-card" onClick={hideNavMenu}>BRACK Credit Card</Link></li>
                    <li><Link className="hover-effect-black" to="/credit-card" onClick={hideNavMenu}>DBBL Credit Card</Link></li>
                  </ul>
                  <div className="close-btn">
                    <button onClick={hideNavMenu}>X</button>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
