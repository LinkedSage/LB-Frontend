
import React,{useEffect, useState} from "react";
import "../assets/css/login.css";
import { useHistory } from "react-router-dom";
export default function Login(data) {

  let history = useHistory()
  
  const submitForm = async (e) => {
    // e.preventDefault()
    // let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    // let data = {
    //   email:email,
    //   password:password
    // }

    // const user = await axios
    // .post("https://reqres.in/api/login",data)
    // .then((response) => {
    //   let status = "status" in response;
    //   if (!status) {
    //     response.status = 401;
    //     return response;
    //   }
    //   return response.data;
    // })
    // .catch((err) => {
    //   document.getElementById('warning').innerText = "Wrong email or password!!"
    //   console.log(err);
    //   return [];
    // });
    // if(user && user.token){
    //   document.getElementById('warning').innerText =''
    //   localStorage.setItem('token',user.token)
    //   history.push('/')
    // }
    // console.log(user)
    



    // console.log(email,password,data)
  }

  return (
    <div className="login-page">
  <div className="form" onSubmit={submitForm}>    
    <form className="login-form">
      <input required type="email" id="email" placeholder="Email"/>
      <input required type="password" id = "password" placeholder="Password"/>
      <label id = "warning"></label>
      <button type="submit">login</button>      
    </form>
  </div>
</div>
  );
}
