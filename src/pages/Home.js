import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../Components/CSS/Home.css'
import { _trendingProduct } from "../helpers/Data/Products";

export default function Home() {


  return (
    <section id="homePage">
      {/* Hero area start */}
      <div className="hero-area">
        <div className="container ptb-50">
          <div className="row">
            <div className="col-md-6">
              <p className="h4">Find Your Best Deal</p>
              <div className="d-flex justify-content-between mt-5">
                <div class="select">
                  <select placeholder="Profession">
                    <option value="" disabled selected>Profession</option>
                    <option value="1">Salaried</option>
                    <option value="2">Self Employee</option>
                  </select>
                </div>
                <div class="input-container">
                  <input id="name" type="number" required />
                  <label class="label" for="name">Salary</label>
                </div>
              </div>
              <div className="btn-grp d-flex justify-content-between mt-4">
                <button className="h4">
                  Credit<br />
                  <span className="h5">Card</span>
                </button>
                <button className="h4">
                  Personal<br />
                  <span className="h5">Loan</span>
                </button>
                <button className="h4">
                  Home<br />
                  <span className="h5">Loan</span>
                </button>
                <button className="h4">
                  Auto<br />
                  <span className="h5">Loan</span>
                </button>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5 right">
              <p className="text-justify">In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.</p>
              <div className="w-100 text-center">
                <button className="glowing-btn">Get Free Credit Score</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Hero area end */}

      {/* Trending Product area start  */}
      <div className="trending-product-area">
        <div className="container ptb-50">
          <div className="row">
            <p className="h2 w-100 text-center">Trending Products</p>
            <div className="col-md-12 product-group mt-3">
              {
                _trendingProduct.map((item) => {
                  return (
                    <Link>
                      <div className="single-product text-left">
                        <div className="">
                          <svg viewBox="0 0 576 512">
                            <path d={item.svgPath} />
                          </svg>
                        </div>
                        <p className="mt-2 h4">{item.name}</p>
                        <p>{item.description}</p>
                      </div>

                    </Link>
                  )
                })
              }

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
                  <svg viewBox="0 0 576 512"><path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z" /></svg>
                </div>
                <p className="m-auto">
                  <span className="h3">2+</span> <br />
                  Banks
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="_image">
                  <svg viewBox="0 0 576 512"><path d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z" /></svg>
                </div>
                <p className="m-auto">
                  <span className="h3">15+</span> <br />
                  Projects
                </p>
              </div>
              <div className="d-flex align-items-center">
                <div className="_image">
                <svg viewBox="0 0 576 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" /></svg>
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
    </section>
  );
}
