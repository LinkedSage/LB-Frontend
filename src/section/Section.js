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
import CreditCardDetails from '../pages/CreditCardDetails'
// import PersonalLoandDetails from '../pages/PersonalLoandDetails'
// import HomeLoandDetails from '../pages/HomeLoandDetails'
// import AutoLoandDetails from '../pages/AutoLoandDetails'
import PersonalLoan from '../pages/PersonalLoan'
import HomeLoan from '../pages/HomeLoan'
import AutoLoan from '../pages/AutoLoan'
import ComingSoon from '../pages/ComingSoon'
import ResetPassword from "../pages/ResetPassword";
import UserDashboard from "../pages/UserDashboard";
import UpdateUserProfile from "../pages/UpdateUserProfile";

export default function Section() {
  return (
    <>     
      <Route exact path = "/" component={Home} />
      <Route exact path = "/signin" component={SignInUp} />
      <Route exact path = "/credit-card" component={CreditCard} />
      <Route exact path = '/credit-card-details/:id' component={CreditCardDetails}/>

      <Route exact path = "/personal-loan" component={PersonalLoan} />
      {/* <Route exact path = '/personal-loan-details/:id' component={PersonalLoandDetails}/> */}

      <Route exact path = "/home-loan" component={HomeLoan} />
      {/* <Route exact path = '/home-loan-details/:id' component={HomeLoandDetails}/> */}

      <Route exact path = "/auto-loan" component={AutoLoan} />
      {/* <Route exact path = '/auto-loan-details/:id' component={AutoLoandDetails}/> */}
      
      <Route exact path = '/card-application/:id' component={CardApplication}/>
      <Route exact path = '/personal-loan-application/:id' component={PersonalLoanApplication}/>
      <Route exact path = '/home-loan-application/:id' component={HomeLoanApplication}/>
      <Route exact path = '/auto-loan-application/:id' component={AutoLoanApplication}/>


      <Route exact path = '/coming-soon' component={ComingSoon} />

      <Route exact path = '/reset-password' component={ResetPassword} />      
      <ProtectedRoute exact path = "/user-dashboard" component={UserDashboard} />
      <ProtectedRoute exact path = "/user-profile" component={UpdateUserProfile} />
      {/* <ProtectedRoute exact path = "/reset-password" component={ResetPassword} /> */}
    </>
  );
}