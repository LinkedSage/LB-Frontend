import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { companyName } from "../helpers/Data/CompanyName";
import Select from "react-select";
import "../Components/CSS/Application.css";
import {
  isExistUser,
  forceRegister,
  verifyOTP,
  onSubmitLogin,
  userUpdate,
} from "../helpers/API/Auth";
import { HomeLoanApplicationAdd } from "../helpers/API/Application";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { getCardById, getHomeLoanById } from "../helpers/API/Product";
import PreloaderPage from "../Components/PreloaderPage";
import { Link } from "react-router-dom";

export default function Home() {
  let location = useLocation();
  // let cardInfo = []
  const [userData, setUserData] = useState({});
  const [cardInfo, setCardInfo] = useState();
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [city, setCity] = useState("Select Division");
  const [profession, setProfession] = useState("salaried");
  const [organization, setOrganization] = useState();
  const [salary, setSalary] = useState();
  const [cityList, setCityList] = useState(false);
  const [professionList, setProfessionList] = useState(false);
  const [otpPopup, setOTPPopup] = useState(false);
  const [OTPCode, setOTPCode] = useState();
  const [signinPopup, setSigninPopup] = useState(false);
  const [existUser, setExistUser] = useState();
  const [password, setPassword] = useState();
  const [preloader, setPreloader] = useState(false);

  function OTPInput() {
    const inputs = document.querySelectorAll("#otp > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }

  useEffect(() => {
    window.scroll(0, 0);
    if (getCookies("data")) {
      let temp = getCurrentUser().data;
      console.log(
        "aaaaaaaaaaa",
        temp,
        temp.employeement_information.job_location
      );
      if (temp && temp.phone) setPhone(temp.phone);
      if (temp && temp.email) setEmail(temp.email);
      if (temp && temp.name) setName(temp.name);
      if (temp && temp.employeement_information.profession)
        setProfessionFun(temp.employeement_information.profession);

      if (temp && temp.employeement_information.salary_amount)
        setSalary(temp.employeement_information.salary_amount);

      if (temp && temp.employeement_information.company_name)
        setOrganization(temp.employeement_information.company_name);

      if (temp && temp.city) setCityFun(temp.city);
    }

    if (location.state && location.state.cardDetails) {
      setCardInfo(location.state.cardDetails);
      if (
        location.state.cardDetails.state &&
        location.state.cardDetails.state.salary
      )
        setSalary(location.state.cardDetails.state.salary);
    } else {
      let value = location.pathname.split("/");
      getHomeLoanById(value[2])
        .then((res) => {
          setCardInfo(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  useEffect(() => {
    console.log("cardInfo,cardInfo", cardInfo);
    if (cardInfo && cardInfo.state && cardInfo.state.profession)
      setProfession(cardInfo.state.profession);
    if (cardInfo && cardInfo.state && cardInfo.state.salary)
      setSalary(cardInfo.state.salary);
  }, [cardInfo]);

  function validationFun(fieldValue, fieldId) {
    if (fieldValue) document.getElementById(fieldId).classList.remove("empty");
    else document.getElementById(fieldId).classList.add("empty");
  }

  function checkIsExist(value) {
    setPreloader(true);
    isExistUser(value)
      .then((res) => {
        if (res.status === 200) {
          setExistUser(res.data);
          notification("warning", "User Exist please login");
          setTimeout(() => {
            setSigninPopup(true);
          }, 1000);
        } else {
          forceRegister(value)
            .then((res1) => {
              if (res1.token.status === 200) {
                setOTPPopup(true);
              } else {
                notification("warning", res1.token.message);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setPreloader(false);
  }

  function applicationFormSubmit() {
    if (!cardInfo.eligibility[profession].is_available) {
      notification("warning", "Profession requirement doesn't match");
      return;
    } else if (cardInfo.eligibility[profession].min_monthly_income > salary) {
      notification("warning", "Salary requirement doesn't match");
      return;
    }
    let value = {
      name: name,
      phone: phone,
      employeement_information: {
        profession: profession,
        salary_amount: salary,
        job_location: city,
        company_name: organization || "",
      },
      email: email,
    };
    if (profession === "salaried") value["organization"] = organization;

    setUserData(value);

    validationFun(name, "name");
    validationFun(phone, "phone");
    validationFun(city, "city");
    validationFun(email, "email");
    validationFun(profession, "profession");
    validationFun(salary, "salary");

    if (profession === "salaried") {
      if (organization)
        document.getElementById("Organization").classList.remove("empty");
      else document.getElementById("Organization").classList.add("empty");
    }
    let token = getCookies("data");
    let userId = getCurrentUser();
    if (token && userId) {
      let values = {
        _id: userId.data._id,
        cardId: cardInfo._id,
        token: token,
      };
      console.log("value", values);
      applicationSubmitFun(values);
    } else {
      if (
        name &&
        phone &&
        city &&
        profession &&
        profession !== "salaried" &&
        salary
      ) {
        checkIsExist(value);
      } else if (
        name &&
        phone &&
        city &&
        profession &&
        profession === "salaried" &&
        salary
      ) {
        if (organization) {
          checkIsExist(value);
        }
      }
    }
  }
  function setCityFun(e) {
    setCity(e);
    setCityList(false);
    let leftArrow = document.getElementById("city-arrow");
    leftArrow.classList.remove("rotation");
    document.getElementById("city").classList.remove("empty");
  }

  function setProfessionFun(e) {
    setProfession(e);
    setProfessionList(false);
    let leftArrow = document.getElementById("profession-arrow");
    leftArrow.classList.remove("rotation");
    document.getElementById("profession").classList.remove("empty");
  }
  function openProfessionFun() {
    let leftArrow = document.getElementById("profession-arrow");
    if (!professionList) leftArrow.classList.add("rotation");
    else leftArrow.classList.remove("rotation");
    setProfessionList(!professionList);
  }
  function openCityListFun() {
    let leftArrow = document.getElementById("city-arrow");
    if (cityList) leftArrow.classList.remove("rotation");
    else leftArrow.classList.add("rotation");
    setCityList(!cityList);
  }
  function setNameFun(e) {
    if (e) document.getElementById("name").classList.remove("empty");
    else document.getElementById("name").classList.add("empty");
    setName(e);
  }
  function setPhoneFun(e) {
    if (e) document.getElementById("phone").classList.remove("empty");
    else document.getElementById("phone").classList.add("empty");
    setPhone(e);
  }
  function setEmailFun(e) {
    if (e) document.getElementById("email").classList.remove("empty");
    else document.getElementById("email").classList.add("empty");
    setEmail(e);
  }
  function setSalaryFun(e) {
    if (e) document.getElementById("salary").classList.remove("empty");
    else document.getElementById("salary").classList.add("empty");
    setSalary(e);
  }
  function setOrganizationFun(e) {
    console.log("aaa", e);
    if (e) document.getElementById("Organization").classList.remove("empty");
    else document.getElementById("Organization").classList.add("empty");
    setOrganization(e);
  }
  function otpVerificationFun() {
    let tempOtp =
      document.getElementById("first").value +
      document.getElementById("second").value +
      document.getElementById("third").value +
      document.getElementById("fourth").value +
      document.getElementById("fifth").value +
      document.getElementById("sixth").value;
    setOTPCode(tempOtp);

    if (tempOtp && tempOtp.length >= 6) {
      let values = {
        email: email,
        phone: phone,
        otp: tempOtp,
      };
      document.getElementById("otp").classList.remove("empty");

      setPreloader(true);
      verifyOTP(values)
        .then((res) => {
          console.log("xxx", res);
          if (res.status === 200) {
            let value = {
              _id: res.userData._id,
              cardId: cardInfo._id,
              token: res.data,
            };
            setOTPPopup(true);
            applicationSubmitFun(value);
          } else {
            notification("fail", res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setPreloader(false);
      //
    } else document.getElementById("otp").classList.add("empty");
  }

  function applicationSubmitFun(value) {
    let tempValue = userData;

    setPreloader(true);
    console.log("ppreloader", preloader, tempValue);
    userUpdate(tempValue, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    HomeLoanApplicationAdd(value)
      .then((res1) => {
        if (res1.status === 200) {
          setOTPPopup(false);
          notification("success", "Application submited successfully...");
          setTimeout(() => {
            window.location.href = "/user-dashboard";
          }, 1000);
        } else if (res1.status === 409) {
          notification("fail", res1.message);
          setTimeout(() => {
            window.location.href = "/user-dashboard";
          }, 1000);
        } else {
          notification("fail", res1.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    setPreloader(true);
  }

  function loginFun() {
    let values = {
      ...existUser,
      password: password,
    };
    if (password) {
      onSubmitLogin(values)
        .then((res) => {
          if (res.status === 200) {
            setSigninPopup(false);
            if (res.data.is_verified) {
              let token = getCookies("data");
              let value = {
                _id: res.data._id,
                cardId: cardInfo._id,
                token: token,
              };
              console.log("value", value);
              applicationSubmitFun(value);
            } else {
              setOTPPopup(true);
            }
          } else {
            notification("warning", res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <section id="application-page">
      <ToastContainer></ToastContainer>
      <div className="application-form">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 right ">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  applicationFormSubmit();
                }}
              >
                <div className="row form-group  mt-4">
                  <div className="col-md-4">
                    <label>Name*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <input
                        id="name"
                        type="text"
                        placeholder="Name"
                        defaultValue={name}
                        onChange={(e) => {
                          setNameFun(e.target.value);
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>City*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <button
                        id="city"
                        type="button"
                        className="select-btn d-flex align-items-center"
                        onClick={openCityListFun}
                      >
                        <span id="city-arrow">
                          <svg viewBox="0 0 256 512">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                          </svg>
                        </span>
                        <p className="h-100">{city}</p>
                      </button>
                      {cityList ? (
                        <div className="city-list">
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Dhaka");
                            }}
                          >
                            Dhaka
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Chitagong");
                            }}
                          >
                            Chitagong
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Sylhet");
                            }}
                          >
                            Sylhet
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Rajshahi");
                            }}
                          >
                            Rajshahi
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Khulna");
                            }}
                          >
                            Khulna
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Rangpur");
                            }}
                          >
                            Rangpur
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setCityFun("Barisal");
                            }}
                          >
                            Barisal
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Phone No.*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        defaultValue={phone}
                        placeholder="Phone no."
                        // pattern="[0-9]{11}"
                        pattern="^(\+?880|0)1[13456789][0-9]{8}"
                        required
                        onChange={(e) => {
                          setPhoneFun(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Email*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={email}
                        placeholder="Email"
                        required
                        onChange={(e) => {
                          setEmailFun(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Profession*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <button
                        id="profession"
                        type="button"
                        className="select-btn d-flex align-items-center"
                        onClick={openProfessionFun}
                      >
                        <span id="profession-arrow">
                          <svg viewBox="0 0 256 512">
                            <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                          </svg>
                        </span>
                        <p className="h-100">{profession}</p>
                      </button>
                      {professionList ? (
                        <div className="city-list">
                          <button
                            type="button"
                            onClick={() => {
                              setProfessionFun("salaried");
                            }}
                          >
                            Salaried
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProfessionFun("business");
                            }}
                          >
                            Businessman
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProfessionFun("doctor");
                            }}
                          >
                            Doctor
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setProfessionFun("landLord");
                            }}
                          >
                            Land Lord
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                {profession === "salaried" ? (
                  <div className="row form-group">
                    <div className="col-md-4">
                      <label>Organization*</label>
                    </div>
                    <div className="col-md-8">
                      <div className="input-field">
                        <Select
                          id="Organization"
                          value={[{ label: organization, value: organization }]}
                          onChange={(e) => {
                            setOrganizationFun(e.value);
                          }}
                          options={companyName}
                          placeholder="Organization"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="row form-group">
                  <div className="col-md-4">
                    <label>Salary*</label>
                  </div>
                  <div className="col-md-8">
                    <div className="input-field">
                      <input
                        id="salary"
                        type="number"
                        placeholder="Salary"
                        defaultValue={salary}
                        onChange={(e) => {
                          setSalaryFun(e.target.value);
                        }}
                        required
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
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {otpPopup ? (
        <div className="popup-container">
          <button
            className="closs-details"
            onClick={() => setOTPPopup(false)}
          ></button>
          <div className="container height-100 d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <div className="card p-2 text-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    otpVerificationFun();
                  }}
                >
                  <h6>
                    Please enter the one time password <br></br> to verify your
                    account
                  </h6>
                  <div>
                    <span>A code has been sent to</span>
                    {/* <small>
                      {
                        console.log()
                      }
                      {
                      existUser && existUser.phone
                        ? existUser.phone.substr(0, 3)
                        : existUser.email.substr(0, 3)
                      }
                      *******
                      {
                      existUser && existUser.phone
                        ? existUser.phone.substr(phone.length - 5)
                        : existUser.email.substr(email.length - 5)
                        }
                    </small> */}
                  </div>
                  <div
                    id="otp"
                    className="inputs d-flex flex-row justify-content-center mt-2"
                  >
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="first"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="second"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="third"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="fourth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="fifth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      className="m-2 text-center form-control rounded"
                      type="text"
                      id="sixth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                  </div>
                  <div class="mt-4">
                    <button type="submit" class="btn btn-danger px-4Confirm">
                      Confirm
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {signinPopup ? (
        <div className="popup-container">
          <button
            className="closs-details"
            onClick={() => setSigninPopup(false)}
          ></button>
          <div className="container height-100 d-flex justify-content-center align-items-center">
            <div className="position-relative">
              <div className="card p-2 text-center">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    loginFun();
                  }}
                >
                  <h6>
                    To Continue with existng Account<br></br> Please Login
                  </h6>
                  <div
                    id="otp1"
                    className="inputs align-items-center d-flex flex-row justify-content-center mt-2"
                  >
                    <label className="text-center w-25">Username</label>
                    <input
                      type="text"
                      className="m-2 text-center form-control rounded w-75"
                      id="phn-mail"
                      placeholder="Phone no. or Email"
                      disabled
                      value={
                        existUser.phone ? existUser.phone : existUser.email
                      }
                    />
                  </div>
                  <div
                    id="otp"
                    className="inputs align-items-center d-flex flex-row justify-content-center mt-2"
                  >
                    <label className="text-center w-25">Password</label>
                    <input
                      type="password"
                      className="m-2 text-center form-control rounded w-75"
                      id="password"
                      placeholder="Password"
                      minlength="6"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      required
                    />
                  </div>
                  <div class="mt-4">
                    <button type="submit" class="btn btn-danger px-4Confirm">
                      Login
                    </button>
                    <br />
                    <br />
                    <Link to="/reset-password">Forgot Password?</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

// mobile responsive done
