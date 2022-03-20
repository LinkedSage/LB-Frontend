import React, { useState } from "react";
import { Link } from "react-router-dom";
import phoneLogo from '../assets/images/icons/phone-solid.png'
import userLogo from '../assets/images/icons/phone-solid.png'
import menu from '../assets/images/icons/menu.webp'
import logo from '../assets/images/logo.png'



export default function Navbar() {
  // let history = useHistory()
  // const [showNav, setshowNav] = useState(false);
  // function tooglenav() {
  //   setshowNav(!showNav);
  // }
  // function Logout(){
  //   localStorage.removeItem('token')
  //   history.push('/login')
  // }

  return (
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
              <li><Link className="hover-effect nav-item" to=''><img src={userLogo} alt="user"/>Account
                <ul className="dropdown d-flex flex-column">
                  <li><Link className="hover-effect" to= '/dashboard'>Dashboard</Link></li>
                  <li><Link className="hover-effect" to= '/profile'>Profile</Link></li>
                  <li><Link className="hover-effect" to= '/'>Singout</Link></li>
                </ul>
              </Link></li>
              <li><Link className="hover-effect nav-item" to='/'><img src={menu} alt="menu" />Menu</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
