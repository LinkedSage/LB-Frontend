import React from "react";
import { Routes, Route, Redirect } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProtectedRoute from "../Components/ProtectedRoute";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductDetails from "../pages/ProductDetails";

export default function Section() {
  return (
    <>
      <Route path="/login" component={Login} />

      <Route exact path="/" component={Home} />
      <Route exact path="/product_derails" component={ProductDetails} />

      {/* <ProtectedRoute exact path = "/top-user-by-country" component={topUserByCountry} /> */}
    </>
  );
}
