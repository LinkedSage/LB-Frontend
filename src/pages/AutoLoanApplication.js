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
  bdJobsDataFetch,
} from "../helpers/API/Auth";
import { CarLoanApplicationAdd } from "../helpers/API/Application";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { getAutoLoanById, getCardById } from "../helpers/API/Product";
import { bake_cookie, read_cookie } from "sfcookies";
import PreloaderPage from "../Components/PreloaderPage";

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
  const [bdjobsphone, setBdjobsPhone] = useState();
  const [bdjobsemail, setBdjobsEmail] = useState();
  const [bdJobsUserInfo, setBdJobsUserInfo] = useState();
  const [checkBdjobsInfo, setcheckBdjobsInfo] = useState(false);

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
    console.log("hello");
    if (new URLSearchParams(location.search).get("ref_name")) {
      bake_cookie(
        "ref_name",
        new URLSearchParams(location.search).get("ref_name")
      );
    }
    if (new URLSearchParams(location.search).get("ref_id")) {
      bake_cookie("ref_id", new URLSearchParams(location.search).get("ref_id"));
    }
    if (new URLSearchParams(location.search).get("ref_name") == "bdjobs") {
      setcheckBdjobsInfo(true);
    }
  }, []);
  

  useEffect(() => {
    setInitialValue();
    console.log("read_cookie('ref_id')", read_cookie("ref_id"));
  }, []);
  useEffect(() => {
    console.log("cardInfo,cardInfo", cardInfo);
    if (cardInfo && cardInfo.state && cardInfo.state.profession)
      setProfession(cardInfo.state.profession);
    if (cardInfo && cardInfo.state && cardInfo.state.salary)
      setSalary(cardInfo.state.salary);
  }, [cardInfo]);

  
  function setInitialValue(bdJobsUser) {
    if (getCookies("data")) {
      let temp = getCurrentUser().data;
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
    } else {
      if (bdJobsUser) {
        let tempname;
        console.log("bd2", bdJobsUser);
        if (bdjobsphone) setPhone(bdjobsphone);
        if (bdjobsphone) setEmail(bdjobsemail);
        if (bdJobsUser.CustomerFirstName)
          tempname = bdJobsUser.CustomerFirstName;
        if (bdJobsUser.CustomerLastName)
          tempname = tempname + " " + bdJobsUser.CustomerLastName;
        setName(tempname);
        if (bdJobsUser.CurrentSalaryAmount)
          setSalary(bdJobsUser.CurrentSalaryAmount);
        if (bdJobsUser.CompanyName) setOrganization(bdJobsUser.CompanyName);
        if (bdJobsUser.PresentAddressDistrictName)
          setCity(bdJobsUser.PresentAddressDistrictName);
      }
    }

    if (location.state && location.state.cardDetails)
      setCardInfo(location.state.cardDetails);
    else {
      let value = location.pathname.split("/");
      getAutoLoanById(value[2])
        .then((res) => {
          setCardInfo(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }


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
    if (cardInfo &&
      cardInfo.eligibility[profession] && !cardInfo.eligibility[profession].is_available) {
      notification("warning", "Profession requirement doesn't match");
      return;
    } else if ( cardInfo &&
      cardInfo.eligibility[profession] &&cardInfo.eligibility[profession].min_monthly_income > salary) {
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
      applicationSubmitFun(value, values);
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
            applicationSubmitFun(userData, value);
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
    console.log("cccaaaaaaaa", tempValue);

    setPreloader(true);
    userUpdate(tempValue, value)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));

    CarLoanApplicationAdd(value)
      .then((res1) => {
        if (res1.status === 200) {
          setOTPPopup(false);
          notification("success", "Application submited successfully...");
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

    // setPreloader(false)
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
              applicationSubmitFun(userData, value);
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

  
  function _checkBdjobsInfo() {
    let tempValue = {
      email: bdjobsemail,
      phone: bdjobsphone,
    };
    setPreloader(true);
    bdJobsDataFetch(tempValue)
      .then((res) => {
        console.log("ressssss", res);
        if (res.data.status === 200) {
          console.log("bd1", res.data.data);
          setBdJobsUserInfo(res.data.data);
          setInitialValue(res.data.data);
          setPreloader(false);
        } else {
          notification("warning", res.data.message);
          setPreloader(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setPreloader(false);
      });

    setcheckBdjobsInfo(false);
  }

  return (
    <section id="application-page">
      <ToastContainer></ToastContainer>
      {preloader ? <PreloaderPage /> : null}
      {checkBdjobsInfo ? (
        <div>
          <div className="application-form">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-8 right ">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      _checkBdjobsInfo();
                    }}
                  >
                    <div className="row form-group">
                      <div className="col-md-4">
                        <label>Email*</label>
                      </div>
                      <div className="col-md-8">
                        <div className="input-field">
                          <input
                            type="email"
                            placeholder="Email"
                            required
                            onChange={(e) => {
                              setBdjobsEmail(e.target.value);
                            }}
                          />
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
                            placeholder="Phone no."
                            // pattern="[0-9]{11}"
                            pattern="^(\+?880|0)1[13456789][0-9]{8}"
                            required
                            onChange={(e) => {
                              setBdjobsPhone(e.target.value);
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
        </div>
      ) :(
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
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}

      {otpPopup ? (
        <div className="popup-container">
          <div class="container height-100 d-flex justify-content-center align-items-center">
            <div class="position-relative">
              <div class="card p-2 text-center">
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
                    class="inputs d-flex flex-row justify-content-center mt-2"
                  >
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="first"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="second"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="third"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="fourth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="fifth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                    <input
                      required
                      class="m-2 text-center form-control rounded"
                      type="text"
                      id="sixth"
                      maxlength="1"
                      onChange={OTPInput}
                    />
                  </div>
                  <div class="mt-4">
                    <button type="submit" class="btn btn-danger px-4 validate">
                      Validate
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
          <div class="container height-100 d-flex justify-content-center align-items-center">
            <div class="position-relative">
              <div class="card p-2 text-center">
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
                    class="inputs align-items-center d-flex flex-row justify-content-center mt-2"
                  >
                    <label class="text-center w-25">Username</label>
                    <input
                      type="text"
                      class="m-2 text-center form-control rounded w-75"
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
                    class="inputs align-items-center d-flex flex-row justify-content-center mt-2"
                  >
                    <label class="text-center w-25">Password</label>
                    <input
                      type="password"
                      class="m-2 text-center form-control rounded w-75"
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
                    <button type="submit" class="btn btn-danger px-4 validate">
                      Login
                    </button>
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
