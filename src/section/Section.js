import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import SignInUp from "../pages/SignInUp";
import OTPVerify from '../pages/OTPVerify'



export default function Section() {
  return (
    <>     
      <Route exact path = "/" component={Home} />
      <Route exact path = "/signin" component={SignInUp} />
      <Route exact path = "/otp-verify" component={OTPVerify} />

      
      {/* <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} /> */}
    </>
  );
}