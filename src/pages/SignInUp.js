import React, { useEffect, useState } from "react";
import '../Components/CSS/SignInUp.css'
import log from '../assets/images/log.svg'
import register from '../assets/images/register.svg'
import phone from '../assets/images/icons/phone-solid-1.png'
import lock from '../assets/images/icons/lock-solid.svg'
import { onSubmitLogin } from "../helpers/API/Auth";
import { ToastContainer } from 'react-toastify';
import { notification } from "../helpers/Confirm/ConfirmAction";



export default function SignInUp() {

    const [phoneNo, setPhoneNo]  = useState()
    const [password, setPassword]  = useState()
    const [confirmPassword, setConfirmPassword]  = useState()


    useEffect(() => {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector("._container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
        });

    }, [])

        const submitLoginForm =  () => {
            let values = {
                phone:phoneNo,
                password: password,
                name: 'Bappy',
                email:"hrbappy@linkedsage.com"
            }
            console.log("aaa", values)
            // login form submitting
            onSubmitLogin(values)
            .then((res)=>{
                if(res.status === 200){
                    notification('success', 'Login Successfully. Redirecting.. ')
                    setTimeout(()=>{
                        window.location.href = '/'    
                    }, 1000)
                }else{
                    console.log("xxxxxx")
                    notification('fail', res.msg)
                }
            })
            .catch((err)=>{
                console.log(err)
            })
        }
function submitSigupForm(){
    console.log("xxxxxxxxxxxxxx.com",phoneNo,password,confirmPassword)
}
    return (
        <>
        <ToastContainer></ToastContainer>
   
        <section id="sign-in-up">
            <div class="_container">
                <div class="forms-container">
                    <div class="signin-signup">
                        <form  class="sign-in-form">
                            <h2 class="title">Sign in</h2>
                            <div class="input-field">
                                <img src={lock} alt="phone" />
                                <input type="tel" id="phone" name="phone" placeholder="Phone No." pattern="[0-9]{11}"  onChange={(e) => {setPhoneNo(e.target.value)}} required />
                            </div>
                            <div class="input-field">
                                <img src={lock} alt="phone" />
                                <input type="password" placeholder="Password" minlength="6" onChange={(e) => {setPassword(e.target.value)}}  required />
                            </div>
                            <input type="button" value="Login" class="btn solid" onClick={submitLoginForm}/>
                            {/* <p class="social-text">Or Sign in with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div> */}
                        </form>

                        <form onSubmit={submitSigupForm} class="sign-up-form">
                            <h2 class="title">Sign up</h2>
                            <div class="input-field">
                                <img src={lock} alt="phone" />
                                <input type="tel" id="phone" name="phone" placeholder="Phone No." pattern="[0-9]{11}" onChange={(e) => {setPhoneNo(e.target.value)}}  required />
                            </div>
                            <div class="input-field">
                                <img src={lock} alt="phone" />
                                <input type="password" placeholder="Password" minlength="6" onChange={(e) => {setPassword(e.target.value)}}  required />
                            </div>
                            <div class="input-field">
                                <img src={lock} alt="phone" />
                                <input type="password" placeholder="Confirm Password" minlength="6" onChange={(e) => {setConfirmPassword(e.target.value)}}  required />
                            </div>
                            <input type="submit" class="btn solid" value="Sign up" />
                            {/* <p class="social-text">Or Sign up with social platforms</p>
                            <div class="social-media">
                                <a href="#" class="social-icon">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-twitter"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-google"></i>
                                </a>
                                <a href="#" class="social-icon">
                                    <i class="fab fa-linkedin-in"></i>
                                </a>
                            </div> */}
                        </form>
                    </div>
                </div>
                

                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>New here ?</h3>
                            <p>
                                If don't have any account, please sign up.
                            </p>
                            <button class="btn transparent" id="sign-up-btn">
                                Sign up
                            </button>
                        </div>
                        <img src={log} class="image" alt="log" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>One of us ?</h3>
                            <p>
                                Already have an account, Please singin.
                            </p>
                            <button class="btn transparent" id="sign-in-btn">
                                Sign in
                            </button>
                        </div>
                        <img src={register} class="image" alt="register" />
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}