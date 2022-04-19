import React, { useEffect, useState } from "react";
import "./CSS/Navbar.css";
import { Link } from "react-router-dom";
import phoneLogo from "../assets/images/icons/phone-solid.png";
import userLogo from "../assets/images/icons/phone-solid.png";
import menu from "../assets/images/icons/menu.webp";
import logo from "../assets/images/logo.png";
import city_bank_icon from "../assets/images/icons/city-bank-icon.png";
import scb_bank_icon from "../assets/images/icons/scb-bank-icon.png";
import {
  getCookies,
  removeCookies,
  getCurrentUser,
} from "../helpers/Cookies/Cookies";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import { _trendingProduct } from "../helpers/Data/Products";

export default function Navbar() {
  const get_cookies = getCookies("data");
  const currentUser = getCurrentUser();
  console.log("currentUser", currentUser);
  function showNavMenu() {
    var element = document.getElementById("open-nav");
    var element1 = document.getElementById("open-nav-item");

    var delayInMilliseconds = 500; //1 second
    setTimeout(function () {
      element.classList.remove("d-none");
      element.classList.add("show-nav-menu-sec");
      element1.classList.remove("nav-link-hide");
      element1.classList.add("nav-link-show");
    }, delayInMilliseconds);
  }
  function hideNavMenu() {
    var element = document.getElementById("open-nav");
    var element1 = document.getElementById("open-nav-item");

    var delayInMilliseconds = 500; //1 second
    setTimeout(function () {
      element.classList.remove("show-nav-menu-sec");
      // element.classList.add("d-none");
      element1.classList.remove("nav-link-show");
      element1.classList.add("nav-link-hide");
    }, delayInMilliseconds);
  }
  function signOutFun() {
    notification("success", "Logout Successfully. Redirecting...");
    removeCookies("data", "/");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  }

  return (
    <>
      <ToastContainer />

      <section id="navbar-main">
        <div className="container-fluid">
          <div className="row navbar d-flex align-items-center">
            <div className="left-nav ">
              <div className="d-flex align-items-center">
                <Link to="/" className="logo">
                  <img src={logo} alt="logo" />
                </Link>
                <a
                  className="d-flex align-items-center ml-5 call phone-none"
                  href="tel:8801997766489"
                >
                  <img className="phn-logo" src={phoneLogo} alt="phn-logo" />
                  <div className="phn-no pl-2">
                    <p className="hover-effect">Helpline</p>
                    <p className="hover-effect">+880 199 111 2222</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="phone-show ">
            <a
                  className="d-flex align-items-center ml-5 call hover-effect"
                  href="tel:8801997766489"
                >
                  <img className="phn-logo" src={phoneLogo} alt="phn-logo" />
                  <div className="phn-no pl-2">
                    <p className="hover-effect">Helpline</p>
                    <p className="hover-effect">+880 199 111 2222</p>
                  </div>
                </a>
            </div>

            <div className="right-nav ">
              <ul className="d-flex justify-content-end">
                {currentUser &&
                currentUser.data &&
                currentUser.data.is_verified ? (
                  <li className="phone-none">
                    <a className="hover-effect nav-item">
                      <img src={userLogo} alt="user" />
                      {currentUser.data.name ? (
                        <>{currentUser.data.name}</>
                      ) : (
                        <>Account</>
                      )}

                      <ul className="dropdown d-flex flex-column">
                        <li>
                          <Link className="hover-effect" to="/dashboard">
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link className="hover-effect" to="/profile">
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="hover-effect"
                            onClick={signOutFun}
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </a>
                  </li>
                ) : (
                  <li className="phone-none">
                    <Link className="hover-effect" to="/signin">
                      Signin
                    </Link>
                  </li>
                )}

                <li>
                  <a
                    className="hover-effect nav-item"
                    href="#"
                    onClick={showNavMenu}
                  >
                    <img src={menu} alt="menu" />
                    Menu
                  </a>
                </li>
              </ul>
              <div id="open-nav" className="nav-menu-sec">
                <div className="close-nav-sec" onClick={hideNavMenu}></div>

                <div id="open-nav-item" className="nav-menu d-flex flex-column">
                  <ul>
                    <p className="h4 _title">LOANS</p>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to="/personal-loan"
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <svg viewBox="0 0 576 512">
                            <path d="M168 336C181.3 336 192 346.7 192 360C192 373.3 181.3 384 168 384H120C106.7 384 96 373.3 96 360C96 346.7 106.7 336 120 336H168zM360 336C373.3 336 384 346.7 384 360C384 373.3 373.3 384 360 384H248C234.7 384 224 373.3 224 360C224 346.7 234.7 336 248 336H360zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM512 80H64C55.16 80 48 87.16 48 96V128H528V96C528 87.16 520.8 80 512 80zM528 224H48V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V224z" />
                          </svg>
                        </span>
                        Personal Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to="/home-loan"
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <svg viewBox="0 0 576 512">
                            <path d={_trendingProduct[2].svgPath} />
                          </svg>
                        </span>
                        Home Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to="/auto-loan"
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <svg viewBox="0 0 576 512">
                            <path d={_trendingProduct[3].svgPath} />
                          </svg>
                        </span>
                        Car Loan
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <p className="h4 _title">CREDIT CARDS</p>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to="/credit-card"
                        onClick={hideNavMenu}
                      >
                        <img src={scb_bank_icon}></img> SCB Credit Card
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="hover-effect-black"
                        to="/credit-card"
                        onClick={hideNavMenu}
                      >
                        <img src={city_bank_icon}></img> City Credit Card
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <p className="h4 _title">Account</p>
                    <li>
                      {
                        currentUser &&
                        currentUser.data &&
                        currentUser.data.is_verified ?
                        <Link
                        className="hover-effect-black"
                        to="/credit-card"
                        onClick={hideNavMenu}
                      >
                        <img src={scb_bank_icon}></img> SCB Credit Card
                      </Link>
                      :
                      <Link
                        className="hover-effect-black"
                        to="/credit-card"
                        onClick={hideNavMenu}
                      >
                        <img src={scb_bank_icon}></img> SCB Credit Card
                      </Link>
                      }
                      
                    </li>
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
