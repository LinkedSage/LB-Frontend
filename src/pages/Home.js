import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Components/CSS/Home.css";
import PartnerSlider from "../Components/PartnerSlider";
import { _trendingProduct } from "../helpers/Data/Products";
import wc from "../assets/images/icons/wide choice.png";
import secure from "../assets/images/icons/secure.png";
import support from "../assets/images/icons/support.png";
import PreloaderPage from "../Components/PreloaderSection";
import Axios from "../Axios";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";

export default function Home() {
  let history = useHistory();

  const [profession, setProfession] = useState("");
  const [salary, setSalary] = useState();
  const [profession1, setProfession1] = useState("salaried");
  const [salary1, setSalary1] = useState();
  const [phoneNo, setPhoneNo] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  function creditCardFun(e) {
    let salaryId = document.getElementById("salary");
    if (profession == "") {
      document.getElementById("profession").style.border = "2px solid red";
      document.getElementById("profession").style.color = "red";
      return;
    }
    if (!salary || (salary && salary < 0)) {
      salaryId.classList.add("empty");
      salaryId.value = "";
    } else {
      salaryId.classList.remove("empty");
      if (e === "credit-card") {
        history.push({
          pathname: "/credit-card",
          state: { salary: salary, profession: profession },
        });
      } else if (e === "personal-loan") {
        history.push({
          pathname: "/personal-loan",
          state: { salary: salary, profession: profession },
        });
      } else if (e === "home-loan") {
        history.push({
          pathname: "/home-loan",
          state: { salary: salary, profession: profession },
        });
      } else if (e === "auto-loan") {
        history.push({
          pathname: "/auto-loan",
          state: { salary: salary, profession: profession },
        });
      }
    }
  }
  function setSalaryFun(e) {
    setSalary(e);
    document.getElementById("salary").classList.remove("empty");
  }

  async function sendMsgFun() {
    if (phoneNo && name && salary1) {
      let values = {
        phone: phoneNo,
        name: name,
        salary: salary1,
        profession: profession1,
      };
      console.log("value", values);
      const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/querys`,
        values
      );
      if (result.data && result.data.status)
        notification("success", "Query submited successfully");
      else notification("fail", "Query submited Failed");
    }
  }
  return (
    <section id="homePage">
      {/* Hero area start */}
      {/* <div className="hero-area-bg-color"> */}
      <div className="hero-area phone-none">
        <div className="container-fluid ptb-50 h-100">
          <div className="row pt-100">
            <div className="col-md-12 pl-5 pt-100">
              <h1 className="h1">Search for</h1>
              <div className="d-flex mt-3">
                <div class="select mr-4">
                  <select
                    id="profession"
                    required
                    placeholder="Profession"
                    onChange={(e) => {
                      document.getElementById("profession").style.border =
                        "0px solid black";
                      document.getElementById("profession").style.color =
                        "black";
                      setProfession(e.target.value);
                    }}
                  >
                    <option selected value="">
                      *Select Your Profession
                    </option>
                    <option value="salaried">Salaried</option>
                    <option value="business">Business</option>
                    <option value="doctor">Doctor</option>
                    <option value="landLord">Land Lord</option>
                  </select>
                </div>
                <div class="input-container">
                  <input
                    id="salary"
                    type="number"
                    min="0"
                    required
                    onChange={(e) => {
                      setSalaryFun(e.target.value);
                    }}
                  ></input>
                  <label class="label" for="salary">
                    Salary*
                  </label>
                </div>
              </div>
              <div className="btn-grp d-flex mt-4">
                <button
                  className="h4 glow-on-hover"
                  onClick={() => {
                    creditCardFun("credit-card");
                  }}
                >
                  <div className="d-flex align-items-center justify-content-start pl-3 text-left">
                    <span className="hero-icon">
                      <svg viewBox="0 0 576 512">
                        <path d="M168 336C181.3 336 192 346.7 192 360C192 373.3 181.3 384 168 384H120C106.7 384 96 373.3 96 360C96 346.7 106.7 336 120 336H168zM360 336C373.3 336 384 346.7 384 360C384 373.3 373.3 384 360 384H248C234.7 384 224 373.3 224 360C224 346.7 234.7 336 248 336H360zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM512 80H64C55.16 80 48 87.16 48 96V128H528V96C528 87.16 520.8 80 512 80zM528 224H48V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V224z" />
                      </svg>
                    </span>
                    <p>
                      Credit
                      <br />
                      <span className="h5">Card</span>
                    </p>
                  </div>
                </button>
                <button
                  className="h4 glow-on-hover"
                  onClick={() => {
                    creditCardFun("personal-loan");
                  }}
                >
                  <div className="d-flex align-items-center justify-content-start pl-3 text-left">
                    <span className="hero-icon">
                      <svg viewBox="0 0 576 512">
                        <path d={_trendingProduct[1].svgPath} />
                      </svg>
                    </span>
                    <p>
                      Personal
                      <br />
                      <span className="h5">Loan</span>
                    </p>
                  </div>
                </button>
                <button
                  className="h4 glow-on-hover"
                  onClick={() => {
                    creditCardFun("home-loan");
                  }}
                >
                  <div className="d-flex align-items-center justify-content-start pl-3 text-left">
                    <span className="hero-icon">
                      <svg viewBox="0 0 576 512">
                        <path d={_trendingProduct[2].svgPath} />
                      </svg>
                    </span>
                    <p>
                      Home
                      <br />
                      <span className="h5">Loan</span>
                    </p>
                  </div>
                </button>
                <button
                  className="h4 glow-on-hover"
                  onClick={() => {
                    creditCardFun("auto-loan");
                  }}
                >
                  <div className="d-flex align-items-center justify-content-start pl-3 text-left">
                    <span className="hero-icon">
                      <svg viewBox="0 0 576 512">
                        <path d={_trendingProduct[3].svgPath} />
                      </svg>
                    </span>
                    <p>
                      Auto
                      <br />
                      <span className="h5">Loan</span>
                    </p>
                  </div>
                </button>
              </div>
              {/* <div className="w-100 text-center pt-5">
                  <button className="glowing-btn">Get Free Credit Score</button>
                </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Phone hero area  */}
      <div className="phone-hero-area phone-show pl-3 pr-3 ptb-50 ptb-sm-10">
        <div className="content">
          <div className="hero-group-btn d-flex justify-content-around flex-wrap">
            {_trendingProduct.map((item, key) => {
              return (
                <Link key={key} to={item.path} className="">
                  <div className="single-product d-flex flex-column justify-content-center text-center">
                    <svg viewBox="0 0 576 512">
                      <path d={item.svgPath} />
                    </svg>
                    <p className="mt-2 h4">{item.name}</p>
                    {/* <p className="text-muted">{item.description}</p>
                        <p className="mt-2 h4">Read More &rarr;</p> */}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Hero area end */}

      {/* Trending Product area start  */}
      <div className="trending-product-area phone-none">
        <div className="container ptb-50">
          <div className="row">
            <p className="h2 w-100 text-center _title">Trending Products</p>
            <div className="col-md-12 product-group mt-3">
              {_trendingProduct.map((item, key) => {
                return (
                  <Link key={key} to={item.path}>
                    <div className="single-product text-left">
                      <div className="">
                        <svg viewBox="0 0 576 512">
                          <path d={item.svgPath} />
                        </svg>
                      </div>
                      <p className="mt-2 h4">{item.name}</p>
                      <p className="text-muted">{item.description}</p>
                      <p className="mt-2 h4">Read More &rarr;</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Trending Product area end  */}

      {/* Statistics area start  */}
      <div className="statistics-area pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 d-flex justify-content-around">
              <div className="d-flex align-items-center">
                <div className="_image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M243.4 2.587C251.4-.8625 260.6-.8625 268.6 2.587L492.6 98.59C506.6 104.6 514.4 119.6 511.3 134.4C508.3 149.3 495.2 159.1 479.1 160V168C479.1 181.3 469.3 192 455.1 192H55.1C42.74 192 31.1 181.3 31.1 168V160C16.81 159.1 3.708 149.3 .6528 134.4C-2.402 119.6 5.429 104.6 19.39 98.59L243.4 2.587zM256 128C273.7 128 288 113.7 288 96C288 78.33 273.7 64 256 64C238.3 64 224 78.33 224 96C224 113.7 238.3 128 256 128zM127.1 416H167.1V224H231.1V416H280V224H344V416H384V224H448V420.3C448.6 420.6 449.2 420.1 449.8 421.4L497.8 453.4C509.5 461.2 514.7 475.8 510.6 489.3C506.5 502.8 494.1 512 480 512H31.1C17.9 512 5.458 502.8 1.372 489.3C-2.715 475.8 2.515 461.2 14.25 453.4L62.25 421.4C62.82 420.1 63.41 420.6 63.1 420.3V224H127.1V416z" />
                  </svg>
                </div>
                <p className="m-auto">
                  <span className="h3">2+</span> <br />
                  Banks
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="_image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M328.7 52.28L431.7 119.8C449.5 132.9 453.3 157.9 440.2 175.7C427.1 193.5 402.1 197.3 384.3 184.2L296.6 127.1H191.1C183.2 127.1 175.1 135.2 175.1 143.1C175.1 152.7 183.2 159.1 191.1 159.1H254.2C270.2 159.1 284.1 170.9 287.6 186.6C290.8 206.6 275.5 223.1 255.1 223.1H143.1C116.1 223.1 90.87 214.7 69.87 197.7L23.37 159.1L15.1 160C7.25 160 0 152.7 0 143.1V47.99C0 39.25 7.25 32 15.1 32H266.1C289 32 310.9 39.19 328.7 52.28L328.7 52.28zM151.3 459.7L16.27 360.2C-1.509 347.1-5.305 322.1 7.803 304.3C20.93 286.5 45.94 282.7 63.74 295.8L183.4 384H304C312.8 384 320 376.8 320 368C320 359.3 312.8 352 304 352H225.8C209.8 352 195 341.1 192.4 325.4C189.2 305.4 204.5 288 224 288H352C379 288 405.1 297.3 426.1 314.3L472.6 352L496 352C504.7 352 512 359.3 512 368V464C512 472.8 504.7 480 496 480H213C190.1 480 169.1 472.8 151.3 459.7V459.7z" />
                  </svg>
                </div>
                <p className="m-auto">
                  <span className="h3">15+</span> <br />
                  Projects
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="_image">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                  </svg>
                </div>
                <p className="m-auto">
                  <span className="h3">1K+</span> <br />
                  Customers
                </p>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        </div>
      </div>
      {/* Statistics area end  */}

      {/* Financial Strength area start  client_slider*/}
      <div className="financial-area pt-5  pb-5">
        <div className="container">
          <div className="row">
            <div className="col-md-7 left pr-5">
              <h3>Why Choose Loaner Bazar ?</h3>
              <div className="_sub-title">
                <hr />
              </div>
              {/* <div className="d-flex align-items-center pt-4">
                <div>
                  <svg viewBox="0 0 512 512">
                    <path d="M512 80C512 98.01 497.7 114.6 473.6 128C444.5 144.1 401.2 155.5 351.3 158.9C347.7 157.2 343.9 155.5 340.1 153.9C300.6 137.4 248.2 128 192 128C183.7 128 175.6 128.2 167.5 128.6L166.4 128C142.3 114.6 128 98.01 128 80C128 35.82 213.1 0 320 0C426 0 512 35.82 512 80V80zM160.7 161.1C170.9 160.4 181.3 160 192 160C254.2 160 309.4 172.3 344.5 191.4C369.3 204.9 384 221.7 384 240C384 243.1 383.3 247.9 381.9 251.7C377.3 264.9 364.1 277 346.9 287.3C346.9 287.3 346.9 287.3 346.9 287.3C346.8 287.3 346.6 287.4 346.5 287.5L346.5 287.5C346.2 287.7 345.9 287.8 345.6 288C310.6 307.4 254.8 320 192 320C132.4 320 79.06 308.7 43.84 290.9C41.97 289.9 40.15 288.1 38.39 288C14.28 274.6 0 258 0 240C0 205.2 53.43 175.5 128 164.6C138.5 163 149.4 161.8 160.7 161.1L160.7 161.1zM391.9 186.6C420.2 182.2 446.1 175.2 468.1 166.1C484.4 159.3 499.5 150.9 512 140.6V176C512 195.3 495.5 213.1 468.2 226.9C453.5 234.3 435.8 240.5 415.8 245.3C415.9 243.6 416 241.8 416 240C416 218.1 405.4 200.1 391.9 186.6V186.6zM384 336C384 354 369.7 370.6 345.6 384C343.8 384.1 342 385.9 340.2 386.9C304.9 404.7 251.6 416 192 416C129.2 416 73.42 403.4 38.39 384C14.28 370.6 .0003 354 .0003 336V300.6C12.45 310.9 27.62 319.3 43.93 326.1C83.44 342.6 135.8 352 192 352C248.2 352 300.6 342.6 340.1 326.1C347.9 322.9 355.4 319.2 362.5 315.2C368.6 311.8 374.3 308 379.7 304C381.2 302.9 382.6 301.7 384 300.6L384 336zM416 278.1C434.1 273.1 452.5 268.6 468.1 262.1C484.4 255.3 499.5 246.9 512 236.6V272C512 282.5 507 293 497.1 302.9C480.8 319.2 452.1 332.6 415.8 341.3C415.9 339.6 416 337.8 416 336V278.1zM192 448C248.2 448 300.6 438.6 340.1 422.1C356.4 415.3 371.5 406.9 384 396.6V432C384 476.2 298 512 192 512C85.96 512 .0003 476.2 .0003 432V396.6C12.45 406.9 27.62 415.3 43.93 422.1C83.44 438.6 135.8 448 192 448z" />
                  </svg>
                </div>
                <p className="pl-3">
                  <span className="sub-title">Lifetime Finance Solution</span>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                </p>
              </div> */}
              <div className="align-items-center pt-3">
                <p className=" d-flex align-items-center">
                  <img src={wc}></img>
                  <span className="sub-title">Wide Choice</span>
                </p>
                <p>
                  There's variety of cards and loans available from different
                  national and international banks.You can choose one by your
                  own.
                </p>
              </div>
              <div className="align-items-center pt-3">
                <p className=" d-flex align-items-center">
                  <img src={secure}></img>
                  <span className="sub-title">Safe & Secure</span>
                </p>
                <p>
                  Your Shared information is 100% encrypted by our System and we
                  are always bound to keep these secret.
                </p>
              </div>
              <div className="align-items-center pt-3">
                <p className=" d-flex align-items-center">
                  <img src={support}></img>
                  <span className="sub-title">24*7 Supporrt</span>
                </p>
                <p>24X7 hours support by our genious Telesells agent. </p>
              </div>
              <div className="vl"></div>
            </div>
            <div className="col-md-5 right pl-5">
              <h3>Help Us to Find You</h3>
              <div className="_sub-title">
                <hr />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  sendMsgFun();
                }}
              >
                <div className="help-us-form d-flex flex-wrap justify-content-between mt-5">
                  <div class="input-container w-100">
                    <input
                      id="name"
                      type="text"
                      required
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                    <label class="label" for="name">
                      Your Name*
                    </label>
                  </div>
                  <div class="select w-200 mt-4">
                    <select
                      placeholder="Profession"
                      onChange={(e) => {
                        setProfession1(e.target.value);
                      }}
                    >
                      <option selected value="salaried">
                        Salaried
                      </option>
                      <option value="business">Business</option>
                      <option value="doctor">Doctor</option>
                      <option value="landLord">Land Lord</option>
                    </select>
                  </div>
                  <div class="input-container w-200 mt-4">
                    <input
                      id="salary1"
                      type="number"
                      required
                      onChange={(e) => {
                        setSalary1(e.target.value);
                      }}
                    />
                    <label class="label" for="salary1">
                      Salary*
                    </label>
                  </div>
                  <div class="input-container mt-4 w-100">
                    <input
                      id="phoneNo"
                      type="tel"
                      pattern="[0-9]{11}"
                      required
                      onChange={(e) => {
                        setPhoneNo(e.target.value);
                      }}
                    />
                    <label class="label" for="phoneNo">
                      Phone No.*
                    </label>
                  </div>
                  <div className="mt-4 text-center w-100">
                    <button className="glow-on-hover" type="submit">
                      Send Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Financial Strength area end  */}

      {/* Our partners area start  */}
      <div className="partners-area pt-5 pb-5">
        <div className="container">
          <div className="row">
            <h2 className="w-100 text-center mb-3 _title">
              Our Clients & Partners
            </h2>
          </div>
        </div>
        <div className="container-fluid">
          <PartnerSlider />
        </div>
      </div>
      {/* Our partners area end  */}
    </section>
  );
}
