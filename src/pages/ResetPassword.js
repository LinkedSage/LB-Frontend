import React, { useEffect, useState } from "react";
import "../Components/CSS/Application.css";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { resetPassword } from "../helpers/API/Auth";
import Axios from '../Axios'

export default function ResetPassword() {

    let currentUser = getCurrentUser();

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [phoneEmail,setPhoneEmail] = useState()
    const [getOtp, setGetOtp] = useState();
    let values = {}
    useEffect(async () => {
        console.log("xxxxxxx",currentUser)
        if(currentUser&&currentUser.data){ currentUser = currentUser.data
        setPhoneEmail(currentUser.phone || currentUser.email)}
    }, []);


    function isNumber(str){
        if (typeof str !== 'string') {
          return false;
        }
      
        if (str.trim() === '') {
          return false;
        }
      
        return !Number.isNaN(Number(str));
      }

    async function sendOtpFun(){
        console.log("xxxxxxx",phoneEmail)
        let result
        if(isNumber(phoneEmail))
          result = await Axios.post(`${process.env.REACT_APP_API_URL}/user/request-reset-password`, {phone:phoneEmail});
        else
          result = await Axios.post(`${process.env.REACT_APP_API_URL}/user/request-reset-password`, {email:phoneEmail});
        
         if(result.data && result.data.status === 200) {
            notification('success',`Your OTP has been send to ${phoneEmail}`)
         }
         else{
            notification('warning', result.data.message)
         }
    }

    function formSubmit() {
        if (password === confirmPassword) {
            let values = {
                otp : otp,
                password:password
            }
            if(isNumber(phoneEmail)) values.phone = phoneEmail
            else values.email = phoneEmail
            resetPassword(values)
            .then((res) => {
                console.log("sssssssssss",res)
                if (res.data.status === 200) {
                    notification('success',res.data.message)
                    setTimeout(() => {
                        window.location.href = "/";
                      }, 1000);
                }
                else{
                    notification('warning', res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        }
        else {
            notification('warning', "Password did not match")
        }
    }

    return (
        <section id="application-page">
            <ToastContainer></ToastContainer>
            <div className="application-form">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 right ">
                            <h3 className="text-center">Change Your Password</h3>

                            <form onSubmit={(e) => {
                                e.preventDefault();
                                formSubmit()
                            }}>
                                <div className="row form-group  mt-5">
                                    <div className="col-md-4">
                                            <label>Email / Phone No.</label>
                                        
                                    </div>
                                    <div className="col-md-8">
                                        <div className="input-field">
                                            {
                                                currentUser && (currentUser.phone || currentUser.email)?
                                                <input
                                                id="phoneEmail"
                                                type="text"
                                                placeholder="Please Enter Your Response"
                                                defaultValue={currentUser.phone || currentUser.email || ''}
                                                onChange={(e) => {
                                                    setPhoneEmail(e.target.value);
                                                }}
                                                required
                                            />
                                            :
                                            <input
                                                id="phoneEmail"
                                                type="text"
                                                placeholder="Please Enter Your Response"
                                                onChange={(e) => {
                                                    setPhoneEmail(e.target.value);
                                                }}
                                                required
                                            />
                                            }
                                            
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label>OTP*</label>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="input-field">
                                            <input
                                                id="otp"
                                                type="text"
                                                placeholder="Enter the OTP"
                                                onChange={(e) => {
                                                    setOtp(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-4 pt-2">
                                        <button onClick={()=>sendOtpFun()}
                                            type="button"
                                            className="w-50 text-white  pb-2 pt-2 glow-on-hover">Get OTP</button>

                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label>New Password*</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="input-field">
                                            <input
                                                type="password"
                                                id="password"
                                                name="password"
                                                placeholder="Password"
                                                minlength='6'
                                                required
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                require
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group">
                                    <div className="col-md-4">
                                        <label>Confirm Password*</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="input-field">
                                            <input
                                                type="password"
                                                id="confirm"
                                                name="confirm"
                                                placeholder="Confirm Password"
                                                required
                                                onChange={(e) => {
                                                    setConfirmPassword(e.target.value);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row form-group pt-4 pb-5">
                                    <div className="col-md-4"></div>
                                    <div className="col-md-8 text-center application">
                                        <button
                                            type="submit"
                                            className="w-50 text-white h4 pb-3 pt-3 glow-on-hover"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                       
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

// mobile responsive done
