import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { ToastContainer } from "react-toastify";
import { verifyOTP } from "../helpers/API/Auth";

export default function OTPVerify(data) {
  let history = useHistory();
  const location = useLocation();
  console.log("location", location.state);
  const [otp, setOTP] = useState();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const submitOTPForm = () => {
    let values;
    if (location.state.data.phoneNo)
      values = {
        otp: otp,
        phoneNo: location.state.data.phoneNo,
      };
    else
      values = {
        otp: otp,
        email: location.state.data.email,
      };
    console.log("aaa", values);
    // login form submitting
    verifyOTP(values)
      .then((res) => {
        console.log("cccc", res);
        if (res.status === 200) {
          notification("success", "Login Successfully. Redirecting.. ");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          notification("fail", res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section id="otp-verify">
      <ToastContainer></ToastContainer>
      <div className="container ptb-50">
        <div className="row d-flex align-items-center justify-content-center flex-column">
          <h3 className="">OTP verify</h3>
          <form className="sign-in-form">
            <div className="input-field">
              {/* <svg viewBox="0 0 512 512"><path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" /></svg> */}
              <input
                type="number"
                id="otp"
                name="otp"
                placeholder="Enter the response"
                pattern="[0-9]{11}"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                required
              />
            </div>

            <input
              type="button"
              value="Verify"
              className="btn solid"
              onClick={submitOTPForm}
            />
          </form>
        </div>
      </div>
    </section>
  );
}
