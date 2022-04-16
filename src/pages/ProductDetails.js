import React, { useState } from "react";
import "../Components/CSS/ProductDetails.css";
import Bullet_point from "../assets/images/icons/bullet-Point.svg";
import Card_image from "../assets/images/sadiq_credit_card.png";

function ProductDetails() {


  const [overview, setOverview] = useState(true)
  const [feature, setFeature] = useState(false)
  const [fees, setFees] = useState(false)
  const [eligibility, setEligibility] = useState(false)
  const [rDocument, setRDocument] = useState(false)
  var classList = []
  function onClickFun(e) {
    if (e === 0) {
      setOverview(true)
      setFeature(false)
      setEligibility(false)
      setFees(false)
      setRDocument(false)
    }
    if (e === 1) {
      setOverview(false)
      setFeature(true)
      setEligibility(false)
      setFees(false)
      setRDocument(false)
    }
    if (e === 2){
      setOverview(false)
      setFeature(false)
      setEligibility(false)
      setRDocument(false)
      setFees(true)
    }
    if (e === 3) {
      setOverview(false)
      setFeature(false)
      setEligibility(true)
      setRDocument(false)
      setFees(false)
    }
    if (e === 4) {
      setOverview(false)
      setFeature(false)
      setEligibility(false)
      setFees(false)
      setRDocument(true)
    }
    classList = [document.getElementById('button0'), document.getElementById('button1'), document.getElementById('button2'), document.getElementById('button3'), document.getElementById('button4')]

    for (let i = 0; i < 5; i++) {
      if (i === e) classList[i].classList.add("active");
      else classList[i].classList.remove("active");
    }

  }


  return (
    <section id='product-details-page' className="product-details">
      <div className="container ptb-50">
        <div className="row">
          <div className="col-md-8 ">
            <div className="product_text">
              <h1 className="product_titel">SCB-Visa Silver Credit Card </h1>
              <div className="product_description mb-3">
                Enter the world of benefits and rewards with Standard
                Chartered Silver Credit Card and delight yourself with
                unbeatable rewards and benefits.
              </div>
              <div className="bullet_point_section d-flex">
                <div className="d-flex">
                  <img
                    src={Bullet_point}
                    alt="bullet-point-logo"
                  />
                  <span>Podcast</span>
                </div>
                <div className="d-flex">
                  <img
                    src={Bullet_point}
                    alt="bullet-point-logo"
                  />
                  <span>Podcast</span>
                </div>
                <div className="d-flex">
                  <img
                    src={Bullet_point}
                    alt="bullet-point-logo"
                  />
                  <span>Podcast</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-center w-100">
              <img
                className="m-auto"
                src={Card_image}
                alt="Card_image"
              />
            </div>
          </div>
          <div className="fixed-btn">
            <button className="glowing-btn">Apply Now</button>
          </div>
        </div>

        <div className="row button-group pt-5">
          <button id='button0' className="active" onClick={() => { onClickFun(0) }}>Overview</button>
          <button id='button1' onClick={() => { onClickFun(1) }}>Features</button>
          <button id='button2' onClick={() => { onClickFun(2) }}>Fees&Charges</button>
          <button id='button3' onClick={() => { onClickFun(3) }}>Eligibility</button>
          <button id='button4' onClick={() => { onClickFun(4) }}>Required Doccuments</button>
        </div>

        {
          overview?
          <div className="row pt-3 pb-3">
          <div className="col-md-4">
            <h4>Overview 1</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">Overview 4</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
          <div className="col-md-4">
            <h4>Overview 2</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">Overview 5</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
          <div className="col-md-4">
            <h4>Overview 3</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">Overview 6</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
        </div>
        : feature?
        <div className="row pt-3 pb-3">
          <div className="col-md-4">
            <h4>feature 1</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">feature 4</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
          <div className="col-md-4">
            <h4>feature 2</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">feature 5</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
          <div className="col-md-4">
            <h4>feature 3</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
            <h4 className="mt-3">feature 6</h4>
            <p>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to the visual form of a document or a typeface . </p>
          </div>
        </div>
        : fees?        
        <div className="row pt-3 pb-3">
          <h1>Fees</h1>
        </div>
        :eligibility?                
        <div className="row pt-3 pb-3">
          <h1>eligibility</h1>
        </div>
        : rDocument?
        <div className="row pt-3 pb-3">
          <h1>Required Documents</h1>
        </div>
        : null
        }


        <div className="row mt-5">
          <div className="col-md-7">
            <h2 className="mb-3">Key Features & Benefits</h2>
            <div>
              <h4>Title 1</h4>
              <p> Enter the world of benefits and rewards with Standard Chartered
              Silver Credit Card and delight yourself with unbeatable rewards
              and benefits.</p>
            </div>
            <div>
              <h4>Title 2</h4>
              <p> Enter the world of benefits and rewards with Standard Chartered
              Silver Credit Card and delight yourself with unbeatable rewards
              and benefits.</p>
            </div>
            <div>
              <h4>Title 3</h4>
              <p> Enter the world of benefits and rewards with Standard Chartered
              Silver Credit Card and delight yourself with unbeatable rewards
              and benefits.</p>
            </div>
            <div>
              <h4>Title 4</h4>
              <p> Enter the world of benefits and rewards with Standard Chartered
              Silver Credit Card and delight yourself with unbeatable rewards
              and benefits.</p>
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
                  <button className="glowing-btn eligibility-btn">Check Eligibility</button>
                </div>
          </div>

        </div>
        <div className="fee_charges mt-5">
          <h2 className="fee_charges mb-3">Fees & Charges</h2>
          <div className="fee_charge_table ">
            <table className="table">
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
}

export default ProductDetails;
