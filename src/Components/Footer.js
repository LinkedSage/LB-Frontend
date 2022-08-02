import React, { useState } from "react";
import "./CSS/Footer.css";
import logo from "../assets/images/Loaner-Bazar-white.png";
import supportImg from "../assets/images/support.png";

import { Link } from "react-router-dom";

export default function Footer() {
  const [supportPopup, setSupportPopup] = useState(false);
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <section id="footer">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <Link to="/">
                <img src={logo} className="logo" alt="logo" />
              </Link>
              <ul className="location">
                <li>
                  <Link to="/">
                    <div className="icon">
                      <svg viewBox="0 0 384 512">
                        <path d="M168.3 499.2C116.1 435 0 279.4 0 192C0 85.96 85.96 0 192 0C298 0 384 85.96 384 192C384 279.4 267 435 215.7 499.2C203.4 514.5 180.6 514.5 168.3 499.2H168.3zM192 256C227.3 256 256 227.3 256 192C256 156.7 227.3 128 192 128C156.7 128 128 156.7 128 192C128 227.3 156.7 256 192 256z" />
                      </svg>
                      <span>House-5A Rd 137, Gulshan-1, Dhaka 1212</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <a href="tel:88+880 1729058150">
                    <div className="icon">
                      <svg viewBox="0 0 512 512">
                        <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                      </svg>
                      +880 1729058150
                    </div>
                  </a>
                </li>
                <li>
                  <a href="mailto:webmaster@example.com">
                    <div className="icon">
                      <svg viewBox="0 0 512 512">
                        <path d="M464 64C490.5 64 512 85.49 512 112C512 127.1 504.9 141.3 492.8 150.4L275.2 313.6C263.8 322.1 248.2 322.1 236.8 313.6L19.2 150.4C7.113 141.3 0 127.1 0 112C0 85.49 21.49 64 48 64H464zM217.6 339.2C240.4 356.3 271.6 356.3 294.4 339.2L512 176V384C512 419.3 483.3 448 448 448H64C28.65 448 0 419.3 0 384V176L217.6 339.2z" />
                      </svg>
                      info@linkedsage.com
                    </div>
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <p className="h3">Quick Links</p>
              <div class="_sub-title">
                <hr />
              </div>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: "/credit-card",
                      state: { bank: "The City Bank" },
                    }}
                  >
                    TCB Credit Card
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/credit-card",
                      state: { bank: "Standard Chartered Bank" },
                    }}
                  >
                    SCB Credit Card
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/personal-loan",
                      state: { bank: "The City Bank" },
                    }}
                  >
                    TCB Personal Loan
                  </Link>
                </li>
                {showMore ? (
                  <>
                    <li>
                      <Link
                        to={{
                          pathname: "/personal-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                      >
                        SCB Personal Loan
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={{
                          pathname: "/home-loan",
                          state: { bank: "The City Bank" },
                        }}
                      >
                        TCB Home Loan
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to={{
                          pathname: "/home-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                      >
                        SCB Home Loan
                      </Link>
                    </li> */}
                    <li>
                      <Link
                        to={{
                          pathname: "/auto-loan",
                          state: { bank: "The City Bank" },
                        }}
                      >
                        TCB Auto Loan
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        to={{
                          pathname: "/auto-loan",
                          state: { bank: "Standard Chartered Bank" },
                        }}
                      >
                        SCB Auto Loan
                      </Link>
                    </li> */}
                  </>
                ) : (
                  <li>
                    <Link
                      style={{ color: "white" }}
                      to="#"
                      onClick={() => {
                        console.log("agsjdhgahgs");
                        setShowMore(true);
                      }}
                    >
                      See More &rarr;
                    </Link>
                  </li>
                )}
              </ul>
            </div>
            <div className="col-md-4">
              <p className="h3">Follow Us On</p>
              <div class="_sub-title">
                <hr />
              </div>
              <ul className="d-flex justify-content-start">
                <li>
                  <a
                    href="https://www.facebook.com/LoanerBazar/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="social-icon">
                      <svg viewBox="0 0 320 512">
                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/loanerbazar/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="social-icon">
                      <svg viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                      </svg>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/company/loaner-bazar/?viewAsMember=true"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div className="social-icon">
                      <svg viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
                      </svg>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section id="copy-right">
        <div className="container">
          <div className="row">
            <p className="d-flex justify-content-center w-100 align-items-center p-3 m-0">
              Copyright 2022 &nbsp;
              <svg viewBox="0 0 512 512">
                <path d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464zM255.1 176C255.1 176 255.1 176 255.1 176c21.06 0 40.92 8.312 55.83 23.38c9.375 9.344 24.53 9.5 33.97 .1562c9.406-9.344 9.469-24.53 .1562-33.97c-24-24.22-55.95-37.56-89.95-37.56c0 0 .0313 0 0 0c-33.97 0-65.95 13.34-89.95 37.56c-49.44 49.88-49.44 131 0 180.9c24 24.22 55.98 37.56 89.95 37.56c.0313 0 0 0 0 0c34 0 65.95-13.34 89.95-37.56c9.312-9.438 9.25-24.62-.1562-33.97c-9.438-9.312-24.59-9.219-33.97 .1562c-14.91 15.06-34.77 23.38-55.83 23.38c0 0 .0313 0 0 0c-21.09 0-40.95-8.312-55.89-23.38c-30.94-31.22-30.94-82.03 0-113.3C214.2 184.3 234 176 255.1 176z" />
              </svg>
              &nbsp;
              <a href="https://loanerbazar.com/">Loaner Bazar</a>
            </p>
          </div>
        </div>
      </section>

      <section id="footer-nav" className="phone-show">
        <div className="content h-100 d-flex justify-content-around align-items-center">
          <Link to="/">
            <div className="d-flex align-items-center flex-column">
              <span className="hero-icon">
                <svg viewBox="0 0 576 512">
                  <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
                </svg>
              </span>
              <p>Home</p>
            </div>{" "}
          </Link>

          <div className="separator"></div>
          <Link to="/signin">
            <div className="d-flex align-items-center flex-column">
              <span className="hero-icon">
                <svg viewBox="0 0 448 512">
                  <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z" />
                </svg>
              </span>
              <p>Profile</p>
            </div>{" "}
          </Link>

          <div className="separator"></div>
          <a onClick={() => setSupportPopup(true)}>
            <div className="d-flex align-items-center flex-column">
              <span className="hero-icon">
                <svg viewBox="0 0 576 512">
                  <svg viewBox="0 0 512 512">
                    <path d="M191.1 224c0-17.72-14.34-32.04-32-32.04L144 192c-35.34 0-64 28.66-64 64.08v47.79C80 339.3 108.7 368 144 368H160c17.66 0 32-14.36 32-32.06L191.1 224zM256 0C112.9 0 4.583 119.1 .0208 256L0 296C0 309.3 10.75 320 23.1 320S48 309.3 48 296V256c0-114.7 93.34-207.8 208-207.8C370.7 48.2 464 141.3 464 256v144c0 22.09-17.91 40-40 40h-110.7C305 425.7 289.7 416 272 416H241.8c-23.21 0-44.5 15.69-48.87 38.49C187 485.2 210.4 512 239.1 512H272c17.72 0 33.03-9.711 41.34-24H424c48.6 0 88-39.4 88-88V256C507.4 119.1 399.1 0 256 0zM368 368c35.34 0 64-28.7 64-64.13V256.1C432 220.7 403.3 192 368 192l-16 0c-17.66 0-32 14.34-32 32.04L320 335.9C320 353.7 334.3 368 352 368H368z" />
                  </svg>
                </svg>
              </span>
              <p>Support</p>
            </div>
          </a>
        </div>
      </section>
      {supportPopup ? (
        <div className="support-container">
          <button
            className="close-btn"
            onClick={() => setSupportPopup(false)}
          ></button>
          <div className="support-content">
            <button
              className="btn-close"
              onClick={() => setSupportPopup(false)}
            >
              X
            </button>
            <div className="content">
              <img src={supportImg} className="mb-5" alt="support" />
              <div className="bottom text-center">
                <h4>Need Help ?</h4>
                <p>Contact us for any Queries</p>
                <h2 className="mb-4 mt-4">+880 1729058150</h2>
                <a href="tel:88+880 1729058150" className="glowing-btn">
                  <svg viewBox="0 0 512 512">
                    <path d="M511.2 387l-23.25 100.8c-3.266 14.25-15.79 24.22-30.46 24.22C205.2 512 0 306.8 0 54.5c0-14.66 9.969-27.2 24.22-30.45l100.8-23.25C139.7-2.602 154.7 5.018 160.8 18.92l46.52 108.5c5.438 12.78 1.77 27.67-8.98 36.45L144.5 207.1c33.98 69.22 90.26 125.5 159.5 159.5l44.08-53.8c8.688-10.78 23.69-14.51 36.47-8.975l108.5 46.51C506.1 357.2 514.6 372.4 511.2 387z" />
                  </svg>
                  Let's talk
                </a>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
