import React from "react";
import "./CSS/Navbar.css";
import { Link } from "react-router-dom";
import phoneLogo from "../assets/images/icons/phone-solid.png";
import userLogo from "../assets/images/icons/phone-solid.png";
import menu from "../assets/images/icons/menu.webp";
import logo from "../assets/images/logo.png";
import dashbord from "../assets/images/icons/dashbord.png";
import profile from "../assets/images/icons/profile.png";
import city_bank_icon from "../assets/images/icons/city-bank-icon.png";
import scb_bank_icon from "../assets/images/icons/scb-bank-icon.png";
import { removeCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import { _trendingProduct } from "../helpers/Data/Products";
import { useHistory } from "react-router-dom";
import "../assets/js/external.js";

export default function Navbar() {
  const currentUser = getCurrentUser();
  let history = useHistory();
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
    // setTimeout(function () {
    removeCookies("data", "/");
    history.push("/");
    // }, 1500);
  }

  window.addEventListener("scroll", (event) => {
    if (window.pageYOffset >= 20) {
      document
        .getElementById("navbar-main")
        .classList.add("sticky-navbar-main");
      document.getElementsByClassName("card-section-container")[0] &&
        document
          .getElementsByClassName("card-section-container")[0]
          .classList.add("sticky-card-section-container");
    } else {
      document
        .getElementById("navbar-main")
        .classList.remove("sticky-navbar-main");
      document.getElementsByClassName("card-section-container")[0] &&
        document
          .getElementsByClassName("card-section-container")[0]
          .classList.remove("sticky-card-section-container");
    }
  });

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
                  href="tel:88+880 1729058150"
                >
                  <img className="phn-logo" src={phoneLogo} alt="phn-logo" />
                  <div className="phn-no pl-2">
                    <p className="hover-effect">Helpline</p>
                    <p className="hover-effect">+880 1729058150</p>
                  </div>
                </a>
              </div>
            </div>
            <div className="phone-show ">
              <a
                className="d-flex align-items-center ml-5 call hover-effect"
                href="tel:88+880 1729058150"
              >
                <img className="phn-logo" src={phoneLogo} alt="phn-logo" />
                <div className="phn-no pl-2">
                  <p className="hover-effect">Helpline</p>
                  <p className="hover-effect">+880 1729058150</p>
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

                      {/* <ul className="dropdown d-flex flex-column">
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
                          <a className="hover-effect" href="" onClick={signOutFun}>
                            Logout
                          </a>
                        </li>
                      </ul> */}
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
                    {/* Menus */}
                  </a>
                </li>
              </ul>
              <div id="open-nav" className="nav-menu-sec">
                <div className="close-nav-sec" onClick={hideNavMenu}></div>

                <div id="open-nav-item" className="nav-menu d-flex flex-column">
                <ul>
                    <p className="h4 _title">Account</p>

                    {currentUser &&
                    currentUser.data &&
                    currentUser.data.is_verified ? (
                      <>
                        <li>
                          <Link
                            className="hover-effect-black"
                            to="/"
                            onClick={hideNavMenu}
                          >
                            {currentUser.data.name ? (
                              <>
                                <span className="hero-icon mr-2">
                                  <img src={city_bank_icon}></img>
                                </span>
                                {currentUser.data.name}
                              </>
                            ) : (
                              <>
                                <span className="hero-icon mr-2">
                                  <svg viewBox="0 0 576 512">
                                    <path d="M168 336C181.3 336 192 346.7 192 360C192 373.3 181.3 384 168 384H120C106.7 384 96 373.3 96 360C96 346.7 106.7 336 120 336H168zM360 336C373.3 336 384 346.7 384 360C384 373.3 373.3 384 360 384H248C234.7 384 224 373.3 224 360C224 346.7 234.7 336 248 336H360zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM512 80H64C55.16 80 48 87.16 48 96V128H528V96C528 87.16 520.8 80 512 80zM528 224H48V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V224z" />
                                  </svg>
                                </span>
                                Account
                              </>
                            )}
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="hover-effect-black"
                            onClick={hideNavMenu}
                            to="/user-dashboard"
                          >
                            <span className="hero-icon mr-2">
                              <img src={dashbord}></img>
                            </span>
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="hover-effect-black"
                            onClick={hideNavMenu}
                            to="/user-profile"
                          >
                            <span className="hero-icon mr-2">
                              <img src={profile}></img>
                            </span>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="hover-effect-black"
                            onClick={hideNavMenu}
                            to="/reset-password"
                          >
                            <span className="hero-icon mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512"
                              >
                                <path d="M144 192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80V144C80 64.47 144.5 0 224 0C281.5 0 331 33.69 354.1 82.27C361.7 98.23 354.9 117.3 338.1 124.9C322.1 132.5 303.9 125.7 296.3 109.7C283.4 82.63 255.9 64 224 64C179.8 64 144 99.82 144 144L144 192z" />
                              </svg>
                            </span>
                            Reset Password
                          </Link>
                        </li>
                        <li>
                          <a
                            className="hover-effect-black"
                            href=""
                            onClick={signOutFun}
                          >
                            <span className="hero-icon mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                              >
                                <path d="M96 480h64C177.7 480 192 465.7 192 448S177.7 416 160 416H96c-17.67 0-32-14.33-32-32V128c0-17.67 14.33-32 32-32h64C177.7 96 192 81.67 192 64S177.7 32 160 32H96C42.98 32 0 74.98 0 128v256C0 437 42.98 480 96 480zM504.8 238.5l-144.1-136c-6.975-6.578-17.2-8.375-26-4.594c-8.803 3.797-14.51 12.47-14.51 22.05l-.0918 72l-128-.001c-17.69 0-32.02 14.33-32.02 32v64c0 17.67 14.34 32 32.02 32l128 .001l.0918 71.1c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C514.4 264.4 514.4 247.6 504.8 238.5z" />
                              </svg>
                            </span>
                            Logout
                          </a>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          className="hover-effect-black"
                          to="/signin"
                          onClick={hideNavMenu}
                        >
                          <span className="hero-icon mr-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path d="M344.7 238.5l-144.1-136C193.7 95.97 183.4 94.17 174.6 97.95C165.8 101.8 160.1 110.4 160.1 120V192H32.02C14.33 192 0 206.3 0 224v64c0 17.68 14.33 32 32.02 32h128.1v72c0 9.578 5.707 18.25 14.51 22.05c8.803 3.781 19.03 1.984 26-4.594l144.1-136C354.3 264.4 354.3 247.6 344.7 238.5zM416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32z" />
                            </svg>
                          </span>
                          Signup/Login
                        </Link>
                      </li>
                    )}
                  </ul>
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
                        to={{
                          pathname: "/credit-card",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={scb_bank_icon}></img>
                        </span>
                        SCB Bank
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/credit-card",
                          state: { bank: "The City Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={city_bank_icon}></img>
                        </span>
                        City Bank
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <p className="h4 _title">PERSONAL LOANS</p>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/personal-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={scb_bank_icon}></img>
                        </span>
                        SCB Bank
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/personal-loan",
                          state: { bank: "The City Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={city_bank_icon}></img>
                        </span>
                        City Bank
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <p className="h4 _title">HOME LOANS</p>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/home-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={scb_bank_icon}></img>
                        </span>
                        SCB Bank
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/home-loan",
                          state: { bank: "The City Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={city_bank_icon}></img>
                        </span>
                        City Bank
                      </Link>
                    </li>
                  </ul>
                  <ul>
                    <p className="h4 _title">AUTO LOANS</p>
                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/auto-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={scb_bank_icon}></img>
                        </span>
                        SCB Bank
                      </Link>
                    </li>

                    <li>
                      <Link
                        className="hover-effect-black"
                        to={{
                          pathname: "/auto-loan",
                          state: { bank: "The City Bank" },
                        }}
                        onClick={hideNavMenu}
                      >
                        <span className="hero-icon mr-2">
                          <img src={city_bank_icon}></img>
                        </span>
                        City Bank
                      </Link>
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
