import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignInUp from "../pages/SignInUp";



export default function Section() {
  return (
    <>
      <Route path="/login" component={Login} />
     
      <Route exact path = "/" component={Home} />
      <Route exact path = "/signin" component={SignInUp} />

      
      {/* <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} /> */}
    </>
  );
}