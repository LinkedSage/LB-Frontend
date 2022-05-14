import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getCookies } from "../helpers/Cookies/Cookies";

function ProtectedRoute({ component: Component, ...restOfProps }) {

  let currentUser = getCookies('data')
  console.log("cccccccccc",currentUser)
  let isAuthenticated = false
  if(currentUser) isAuthenticated = true

  return (

    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
      }
    />
  );
}

export default ProtectedRoute;