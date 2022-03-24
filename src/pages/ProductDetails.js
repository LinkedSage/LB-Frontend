import React from "react";
import "../Components/CSS/ProductDetails.css";
import Bullet_point from "../assets/images/icons/bullet-Point.svg";
import Card_image from "../assets/images/card-Image/visa_silver_credit_card.png";

function ProductDetails() {
  return (
    // <div>ProductDetails</div>
    <section class="product-details">
      <div class="container">
        <div className="card p-4">
          <div className="row">
            <div className="col-md-8 p-3 ">
              <div class="product_text">
                <h1 class="product_titel">
                  <a href="#">SCB-Visa Silver Credit Card</a>
                </h1>

                <div class="product_description">
                  Enter the world of benefits and rewards with Standard
                  Chartered Silver Credit Card and delight yourself with
                  unbeatable rewards and benefits.
                </div>

                <div className="bullet_point_section d-flex justify-content-between ">
                  <li className="bullet_point card d-flex flex-row mr-2">
                    <img
                      className="bullet_point_logo mr-1"
                      src={Bullet_point}
                      alt="bullet-point-logo"
                    />
                    <span>Podcast</span>
                  </li>
                  <li className="bullet_point card d-flex flex-row mr-2">
                    <img
                      className="bullet_point_logo mr-1"
                      src={Bullet_point}
                      alt="bullet-point-logo"
                    />
                    <span>Podcast</span>
                  </li>
                  <li className="bullet_point card d-flex flex-row">
                    <img
                      className="bullet_point_logo mr-1"
                      src={Bullet_point}
                      alt="bullet-point-logo"
                    />
                    <span>Podcast</span>
                  </li>
                </div>
              </div>
            </div>
            <div className="img">
              <img
                className="Card_image justify-content-center"
                src={Card_image}
                alt="Card_image"
              />
            </div>
          </div>
          <div className="row">
            <h2 className="key_feature w-100 col-md-7">
              Key Features & Benefits
            </h2>

            <h2 className="key_feature w-100 col-md-5">How to Apply?</h2>

            <div className="key_feature col-md-6">
              <li className="text">
                Enter the world of benefits and rewards with Standard Chartered
                Silver Credit Card and delight yourself with unbeatable rewards
                and benefits.
              </li>
              <li className="text">
                Enter the world of benefits and rewards with Standard Chartered
                Silver Credit Card and delight yourself with unbeatable rewards
                and benefits.
              </li>
              <li className="text">
                Enter the world of benefits and rewards with Standard Chartered
                Silver Credit Card and delight yourself with unbeatable rewards
                and benefits.
              </li>
              <li className="text">
                Enter the world of benefits and rewards with Standard Chartered
                Silver Credit Card and delight yourself with unbeatable rewards
                and benefits.
              </li>
            </div>
            <div className="col-md-1">
              <div className="vl-line"></div>
            </div>

            <div className="howtoapply col-md-5">
              <li className="text">hello</li>
              <div className="vl-line2 "></div>
              <li className="text">hello</li>
              <div className="vl-line2 "></div>
              <li className="text">hello</li>
              <div className="vl-line2 "></div>
              <li className="text">hello</li>
              <div className="vl-line2 "></div>
              <li className="text">hello</li>
            </div>
          </div>
          <div className="fee_charges">
            <h2 className="fee_charges">Fees & Charges</h2>
            <div className="fee_charge_table ">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Fee Type</th>
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
      </div>
    </section>
  );
}

export default ProductDetails;
