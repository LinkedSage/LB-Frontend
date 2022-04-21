import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import CardApplication from "../pages/CardApplication";
import PersonalLoanApplication from "../pages/PersonalLoanApplication";
import HomeLoanApplication from "../pages/HomeLoanApplication";
import AutoLoanApplication from "../pages/AutoLoanApplication";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import SignInUp from "../pages/SignInUp";
import CreditCard from '../pages/CreditCard'
import ProductDetails from '../pages/ProductDetails'
import PersonalLoan from '../pages/PersonalLoan'
import HomeLoan from '../pages/HomeLoan'
import AutoLoan from '../pages/AutoLoan'
import ComingSoon from '../pages/ComingSoon'

export default function Section() {
  return (
    <>     
      <Route exact path = "/" component={Home} />
      <Route exact path = "/signin" component={SignInUp} />
      <Route exact path = "/credit-card" component={CreditCard} />
      <Route exact path = "/personal-loan" component={PersonalLoan} />
      <Route exact path = "/home-loan" component={HomeLoan} />
      <Route exact path = "/auto-loan" component={AutoLoan} />
      <Route exact path = '/product-details/:id' component={ProductDetails}/>
      <Route exact path = '/card-application/:id' component={CardApplication}/>
      <Route exact path = '/personal-loan-application/:id' component={PersonalLoanApplication}/>
      <Route exact path = '/home-loan-application/:id' component={HomeLoanApplication}/>
      <Route exact path = '/auto-loan-application/:id' component={AutoLoanApplication}/>


      <Route exact path = '/coming-soon' component={ComingSoon} />

      
      {/* <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} /> */}
    </>
  );
}