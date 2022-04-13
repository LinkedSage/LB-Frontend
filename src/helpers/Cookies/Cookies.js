// import React from 'react'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
// import jwt_encode from "jwt-encode";
const cookies = new Cookies();

export const setCookies = (name, value, path, cb) => {
    try{
        return !!(cookies.set(name, value, path))
    } catch(err){
        console.error(` setCookies :: ${name} : ${value}`)
        cb()
    }
}

export const getCookies = (name, cb) => {
    try{
        return cookies.get(name)
    }catch (err){
        cb()
    }
}

export const removeCookies = (name, path, cb) => {
    console.log(name,path)
    try{
        return !!(cookies.remove(name, path))
    }catch (err){
        console.log(` removeCookies:: ${name}`)
        cb()
    }
}


export const getCurrentUser = () => {
    try {
    const get_cookies = getCookies('data')
      
      const currentUser = jwt_decode(get_cookies);
      console.log('user',currentUser)
      return currentUser;
    } catch (ex) {
      return null;
    }
  }
  
export const getCurrentUserData = (e) => {
    try {
    const get_cookies = e
      
      const currentUser = jwt_decode(get_cookies);
      console.log('user',currentUser)
      return currentUser;
    } catch (ex) {
      return null;
    }
  }
//   export function updateCurrentUser(nid,salary) {
//     try {
//       const jwt = localStorage.getItem(tokenKey);
//       let currentUser = jwt_decode(jwt);
//       currentUser.nid = nid
//       currentUser.salary = salary
//       const secret = process.env.REACT_APP_JWT_SECRET;
//       const _jwt = jwt_encode(currentUser, secret);
//       localStorage.setItem(tokenKey, _jwt);
//     } catch (ex) {
     
//     }
//   }