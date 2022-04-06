import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Application from "../pages/Application";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import SignInUp from "../pages/SignInUp";
import CreditCard from '../pages/CreditCard'
import ProductDetails from '../pages/ProductDetails'


export default function Section() {
  return (
    <>     
      <Route exact path = "/" component={Home} />
      <Route exact path = "/signin" component={SignInUp} />
      <Route exact path = "/credit-card" component={CreditCard} />
      <Route exact path='/product-details' component={ProductDetails}/>
      <Route exact path='/application/:id' component={Application}/>

      
      {/* <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} /> */}
    </>
  );
}