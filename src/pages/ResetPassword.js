import React, { useEffect, useState } from "react";
import "../Components/CSS/Application.css";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { resetPassword } from "../helpers/API/Auth";
import Axios from '../Axios'

export default function ResetPassword() {
    
    const currentUser = getCurrentUser();

    const [otp, setOtp] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [getOtp,setGetOtp] = useState();

    useEffect( async () => {
        let values = {}
        if(currentUser && currentUser.phone) values.phone = currentUser.phone
        if(currentUser && currentUser.email) values.email = currentUser.email
        
        const result = await Axios.post(
                `${process.env.REACT_APP_API_URL}/user/force-register`,values);
               
    }, []);

    function formSubmit(){
        if(password === confirmPassword){
            console.log("aaaaaaaaaa",otp,password,confirmPassword)
        }
        else{
            notification('warning',"Password did not match")
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
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    formSubmit();
                                }}
                            >
                                <div className="row form-group  mt-5">
                                    <div className="col-md-4">
                                        <label>OTP*</label>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="input-field">
                                            <input
                                                id="otp"
                                                type="text"
                                                placeholder="Please Enter the OTP"
                                                onChange={(e) => {
                                                    setOtp(e.target.value);
                                                }}
                                                required
                                            />
                                        </div>
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
