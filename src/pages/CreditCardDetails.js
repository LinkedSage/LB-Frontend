import React, { useEffect, useState } from "react";
import "../Components/CSS/CreditCardDetails.css";
import Bullet_point from "../assets/images/icons/bullet-Point.svg";
import Card_image from "../assets/images/sadiq_credit_card.png";
import { getCardById } from "../helpers/API/Product";
import { useLocation } from "react-router-dom";
import Preloader from "../Components/PreloaderPage";
import PreloaderSec from "../Components/PreloaderSection";
import { useParams } from "react-router-dom";

function CreditCardDetails() {
  let location = useLocation();

  const [cardInfo, setCardInfo] = useState();
  //   const [overview, setOverview] = useState(true);
  const [feature, setFeature] = useState(true);
  const [cardImg, setCardImg] = useState();
  const [fees, setFees] = useState(false);
  const [eligibility, setEligibility] = useState(false);
  const [rDocument, setRDocument] = useState(false);
  var classList = [];
  let { id } = useParams();
  useEffect(() => {
    getCardById(id)
      .then((res) => {
        setCardInfo(res.data[0]);
        setCardImg(res.data[0].bank[0].image_url);
        console.log("res.data[0]", res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function onClickFun(e) {
    if (e === 0) {
      //   setOverview(true);
      setFeature(true);
      setEligibility(false);
      setFees(false);
      setRDocument(false);
    }
    if (e === 1) {
      //   setOverview(false);
      setFeature(false);
      setEligibility(false);
      setFees(true);
      setRDocument(false);
    }
    if (e === 2) {
      //   setOverview(false);
      setFeature(false);
      setEligibility(true);
      setRDocument(false);
      setFees(false);
    }
    if (e === 3) {
      //   setOverview(false);
      setFeature(false);
      setEligibility(false);
      setRDocument(true);
      setFees(false);
    }

    classList = [
      document.getElementById("button0"),
      document.getElementById("button1"),
      document.getElementById("button2"),
      document.getElementById("button3"),
    ];

    for (let i = 0; i < 4; i++) {
      if (i === e) classList[i].classList.add("active");
      else classList[i].classList.remove("active");
    }
  }

  if (cardImg)
    return (
      <section id="product-details-page" className="product-details">
        <div className="container ptb-50">
          <div className="row">
            <div className="col-md-8 ">
              <div className="product_text">
                <h1 className="product_titel">{cardInfo.name}</h1>
                <div className="product_description mb-3">
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </div>
                <div className="bullet_point_section d-flex">
                  <div className="d-flex">
                    <img src={Bullet_point} alt="bullet-point-logo" />
                    <span>Fast Processing</span>
                  </div>
                  <div className="d-flex">
                    <img src={Bullet_point} alt="bullet-point-logo" />
                    <span>Lowest Interest Rate</span>
                  </div>
                  <div className="d-flex">
                    <img src={Bullet_point} alt="bullet-point-logo" />
                    <span>24*7 Support</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center w-100">
                {cardImg ? (
                  <img
                    className="m-auto w-100"
                    src={cardInfo.image_url}
                    alt="Card image"
                  />
                ) : (
                  <PreloaderSec />
                )}
              </div>
            </div>
            <div className="fixed-btn">
              <button className="glowing-btn">Apply Now</button>
            </div>
          </div>

          <div className="row button-group pt-5">
            <button
              id="button0"
              className="active"
              onClick={() => {
                onClickFun(0);
              }}
            >
              Features
            </button>
            <button
              id="button1"
              onClick={() => {
                onClickFun(1);
              }}
            >
              Fees&Charges
            </button>
            <button
              id="button2"
              onClick={() => {
                onClickFun(2);
              }}
            >
              Eligibility
            </button>
            <button
              id="button3"
              onClick={() => {
                onClickFun(3);
              }}
            >
              Required Doccuments
            </button>
          </div>

          {feature ? (
            <div className="row pt-5 pb-3">
              {cardInfo.features.map((f) => (
                <div className="col-md-4">
                  <h4>
                    {f.title
                      .split(/(?=[A-Z])/)
                      .map((s) => s.toUpperCase())
                      .join(" ")}
                  </h4>
                  <p>{f.short_description}</p>
                </div>
              ))}
            </div>
          ) : fees ? (
            <div className="row pt-5 pb-3">
              <div className="col-md-4">
                <h4>Free Annual Fee</h4>
                <p>{cardInfo.free_anual_fee}</p>
              </div>
              <div className="col-md-4">
                <h4>Interest Per Day</h4>
                <p>{cardInfo.interest_per_day}</p>
              </div>
              <div className="col-md-4">
                <h4>Interest Free Period</h4>
                <p>{cardInfo.interest_free_period}</p>
              </div>
              <div className="col-md-4">
                <h4>Annual Fee</h4>
                <p>{cardInfo.regular_anual_fee}</p>
              </div>
              <div className="col-md-4">
                <h4>Reward Points Fee</h4>
                <p>{cardInfo.anual_fee_waived_rewards}</p>
              </div>
            </div>
          ) : eligibility ? (
            <div className="row pt-5 pb-3">
              {cardInfo.eligibility &&
              cardInfo.eligibility.salaried &&
              cardInfo.eligibility.salaried.is_available ? (
                <div>
                  <p>
                    Salaried Person with minimum monthly income:{" "}
                    {cardInfo.eligibility.salaried.min_monthly_income}
                  </p>
                </div>
              ) : null}
              {cardInfo.eligibility &&
              cardInfo.eligibility.business &&
              cardInfo.eligibility.business.is_available ? (
                <div>
                  <p>
                    Businessman with minimum monthly income:{" "}
                    {cardInfo.eligibility.business.min_monthly_income}
                  </p>
                </div>
              ) : null}
              {cardInfo.eligibility &&
              cardInfo.eligibility.doctor &&
              cardInfo.eligibility.doctor.is_available ? (
                <div>
                  <p>
                    Doctor with minimum monthly income:{" "}
                    {cardInfo.eligibility.doctor.min_monthly_income}
                  </p>
                </div>
              ) : null}
            </div>
          ) : rDocument ? (
            <div className="row pt-5 pb-3">
              {cardInfo.required_documents.map((docs) => (
                <div className="col-md-4">
                  <h4>Free Annual Fee</h4>
                  <p>{cardInfo.free_anual_fee}</p>
                </div>
              ))}
            </div>
          ) : null}

          <div className="row mt-5">
            <div className="col-md-7">
              <h2 className="mb-3">Key Features & Benefits</h2>
              <div>
                <h4>Title 1</h4>
                <p>
                  {" "}
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </p>
              </div>
              <div>
                <h4>Title 2</h4>
                <p>
                  {" "}
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </p>
              </div>
              <div>
                <h4>Title 3</h4>
                <p>
                  {" "}
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </p>
              </div>
              <div>
                <h4>Title 4</h4>
                <p>
                  {" "}
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </p>
              </div>
            </div>
            <div className="col-md-1">
              <div className="vl"></div>
            </div>
            <div className="col-md-4">
              <h2>How to Apply?</h2>
              <ul className="mt-2">
                <li>- Step 1</li>
                <li>- Step 2</li>
                <li>- Step 3</li>
              </ul>
              <div className="w-100 text-center pt-5">
                <button className="glowing-btn eligibility-btn">
                  Check Eligibility
                </button>
              </div>
            </div>
          </div>
          <div className="fee_charges mt-5">
            <h2 className="fee_charges mb-3">Fees & Charges</h2>
            <div className="fee_charge_table ">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col">Fee Type</th>
                    {/* <div className="col-md-1">
                      <div className="vl-line2"></div>
                    </div> */}
                    <th scope="col">Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  <tr>
                    <td>Larry</td>
                    <td>the Bird</td>
                  </tr>
                  <tr>
                    <td>Larry</td>
                    <td>the Bird</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    );
  else return <Preloader />;
}

export default CreditCardDetails;
