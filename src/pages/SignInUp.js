import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import '../Components/CSS/SignInUp.css'
import log from '../assets/images/log.svg'
import register from '../assets/images/register.svg'
import phone from '../assets/images/icons/phone-solid-1.png'
import lock from '../assets/images/icons/lock-solid.svg'
import { onSubmitLogin, onSubmitSignup, verifyOTP } from "../helpers/API/Auth";
import { ToastContainer } from 'react-toastify';
import { notification } from "../helpers/Confirm/ConfirmAction";



export default function SignInUp() {
    const history = useHistory();
    const [phoneNo, setPhoneNo] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [emailSI, setEmailSI] = useState(true)
    const [emailSU, setEmailSU] = useState(true)
    const [otpCode, setOTPCode] = useState()
    const [signinOTP, setSigninOTP] = useState(true)
    const [signupOTP, setSignupOTP] = useState(true)
    const [userData, setUserData] = useState()


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

    const submitLoginForm = () => {
        let values
        if (emailSI)
            values = {
                phone: phoneNo,
                password: password,
            }
        else values = {
            email: email,
            password: password,
        }

        console.log("aaa", values)
        // login form submitting
        onSubmitLogin(values)
            .then((res) => {
                console.log("cccc", res)
                if (res.status === 200) {
                    setUserData(res.data)
                    if (!res.data.is_verified) {
                        setSigninOTP(false)
                        notification('', 'Please verify OTP..')
                    }
                    else {
                        notification('success', 'Login Successfully. Redirecting.. ')
                        setTimeout(() => {
                            // window.location.href = '/'
                        }, 1500)
                    }
                } else {
                    notification('fail', res.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    function submitSigupForm() {
        if (password == confirmPassword) {
            let values
            if (emailSU)
                values = {
                    phone: phoneNo,
                    password: password,
                }
            else values = {
                email: email,
                password: password,
            }

            console.log("aaa", values)
            // login form submitting
            onSubmitSignup(values)
                .then((res) => {
                    console.log("cccc", res)
                    if (res.status === 200) {
                        setUserData(res.data)
                        setSignupOTP(false)
                        notification('', 'Please verify OTP..')
                    } else {
                        notification('fail', res.message)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            notification('fail', "Password cannot match")
        }
    }
    function otpVerificationFun() {
        let values = {
            otp : otpCode
        }
        if(userData && userData.phoneNo)
        values.phone = userData.phoneNo
        else if(userData && userData.email)
        values.email = userData.email
        console.log("aaa", values)
        // login form submitting
        verifyOTP(values)
            .then((res) => {
                console.log("cccc", res)
                if (res.status === 200) {
                    notification('success', 'Login Successfully. Redirecting.. ')
                    setTimeout(() => {
                        // window.location.href = '/'
                    }, 1500)
                } else {
                    notification('fail', res.message)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function phoneSIFun() {
        setEmail('')
        setEmailSI(true)
    }
    function emailSIFun() {
        setPhoneNo('')
        setEmailSI(false)
    }
    function phoneSUFun() {
        setEmail('')
        setEmailSU(true)
    }
    function emailSUFun() {
        setPhoneNo('')
        setEmailSU(false)
    }

    return (
        <>
            <ToastContainer></ToastContainer>

            <section id="sign-in-up">
                <div class="_container">
                    <div class="forms-container">
                        <div class="signin-signup">
                            {
                                signinOTP ?
                                    <form class="sign-in-form" >
                                        <h2 class="title">Sign in</h2>
                                        <div className="btn-group mt-3 mb-2">
                                            <button type="button" onClick={phoneSIFun} className={emailSI ? 'active' : ''}>Phone</button>
                                            <button type="button" onClick={emailSIFun} className={emailSI ? '' : 'active'}>Email</button>
                                        </div>
                                        {
                                            emailSI ?
                                                <div class="input-field">
                                                    <svg viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></svg>
                                                    <input type="tel" id="phoneSI" name="phone" placeholder="Phone No." pattern="[0-9]{11}" onChange={(e) => { setPhoneNo(e.target.value) }} required />
                                                </div>
                                                :
                                                <div class="input-field">
                                                    <svg viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" /></svg>
                                                    <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} required />
                                                </div>
                                        }
                                        <div class="input-field">
                                            <img src={lock} alt="phone" />
                                            <input type="password" placeholder="Password" minlength="6" onChange={(e) => { setPassword(e.target.value) }} required />
                                        </div>
                                        <input type="button" value="Login" class="btn solid" onClick={submitLoginForm} />
                                    </form>
                                    :
                                    <form class="sign-in-form" >
                                        <h2 class="title">OTP Verify</h2>
                                        <div class="input-field">
                                            <img src={lock} alt="phone" />
                                            <input type="text" placeholder="Please enter the OTP " minlength="6" onChange={(e) => { setOTPCode(e.target.value) }} required />
                                        </div>
                                        <input type="button" value="Verify" class="btn solid" onClick={otpVerificationFun} />
                                    </form>
                            }

                            {
                                signupOTP ?
                                    <form class="sign-up-form">
                                        <h2 class="title">Sign up</h2>
                                        <div className="btn-group mt-3 mb-2">
                                            <button type="button" onClick={phoneSUFun} className={emailSU ? 'active' : ''}>Phone</button>
                                            <button type="button" onClick={emailSUFun} className={emailSU ? '' : 'active'}>Email</button>
                                        </div>
                                        {
                                            emailSU ?
                                                <div class="input-field">
                                                    <svg viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></svg>
                                                    <input type="tel" id="phoneSU" name="phone" placeholder="Phone No." pattern="[0-9]{11}" onChange={(e) => { setPhoneNo(e.target.value) }} required />
                                                </div>
                                                :
                                                <div class="input-field">
                                                    <svg viewBox="0 0 512 512"><path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" /></svg>
                                                    <input type="email" id="email" name="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} required />
                                                </div>
                                        }
                                        <div class="input-field">
                                            <img src={lock} alt="phone" />
                                            <input type="password" placeholder="Password" minlength="6" onChange={(e) => { setPassword(e.target.value) }} required />
                                        </div>
                                        <div class="input-field">
                                            <img src={lock} alt="phone" />
                                            <input type="password" placeholder="Confirm Password" minlength="6" onChange={(e) => { setConfirmPassword(e.target.value) }} required />
                                        </div>
                                        <input type="button" class="btn solid" value="Sign up" onClick={submitSigupForm} />
                                    </form>
                                    :
                                    <form class="sign-up-form" >
                                        <h2 class="title">OTP Verify</h2>
                                        <div class="input-field">
                                            <img src={lock} alt="phone" />
                                            <input type="text" placeholder="Please enter the OTP " minlength="6" onChange={(e) => { setOTPCode(e.target.value) }} required />
                                        </div>
                                        <input type="button" value="Verify" class="btn solid" onClick={otpVerificationFun} />
                                    </form>
                            }
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