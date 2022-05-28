import React, { useEffect, useState } from "react";
import {
  getApplicationBYId,
  CarLoanApplications,
  HomeloansApplication,
  CreditCardApplications,
  PersonalLoanApplications,
} from "../helpers/API/Application";
import { getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import "../Components/CSS/UserDashboard.css";
import { Link } from "react-router-dom";
import PreloaderPage from "../Components/PreloaderPage";

export default function UserDashboard() {
  const currentUser = getCurrentUser().data;
  const [application, setApplication] = useState([]);
  const [preloader, setPreloader] = useState(false);
  const [showDateTime, setShowDateTime] = useState(true);
  const [dateTime, SetDateTime] = useState();
  const [schedule, setSchedule] = useState({});
  let slNo = 0;

  useEffect(() => {
    getApplicationFun(currentUser._id);
    console.log("currentUser",currentUser)
  }, []);

  function getApplicationFun(values) {
    setPreloader(true);
    getApplicationBYId(values)
      .then((res) => {
        if (res.status === 200) {
          setApplication(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPreloader(false);
  }

  function SetDateTimeFun(applicationId, type, key) {
    let temp = {
      id: applicationId,
      productType: type,
    };
    setSchedule(temp);
    setShowDateTime(true);
  }

  function setScheduleFun(id, type, key) {
    let tempDateTime = document.getElementById(type + key).value;

    if (tempDateTime) {
      console.log("datetime", typeof tempDateTime, type, id);
      if (type === "carLoan") {
        setPreloader(true);
        CarLoanApplications(id, tempDateTime)
          .then((res) => {
            if (res.status === 200) {
              notification("success", "Schedule set successfully");
              getApplicationFun(currentUser._id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setPreloader(false);
      }
      if (type === "homeLoan") {
        setPreloader(true);
        HomeloansApplication(id, tempDateTime)
          .then((res) => {
            if (res.status === 200) {
              notification("success", "Schedule set successfully");
              getApplicationFun(currentUser._id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setPreloader(false);
      }
      if (type === "personalLoan") {
        setPreloader(true);
        PersonalLoanApplications(id, tempDateTime)
          .then((res) => {
            if (res.status === 200) {
              notification("success", "Schedule set successfully");
              getApplicationFun(currentUser._id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setPreloader(false);
      }
      if (type === "creditCard") {
        setPreloader(true);
        CreditCardApplications(id, tempDateTime)
          .then((res) => {
            if (res.status === 200) {
              notification("success", "Schedule set successfully");
              getApplicationFun(currentUser._id);
            }
          })
          .catch((err) => {
            console.log(err);
          });
        setPreloader(false);
      }
    } else notification("warning", "Field cannot be empty");
  }

  return (
    <section className="user-dashboard-page ptb-50">
      <ToastContainer></ToastContainer>
      <div className="container">
        {application && application.length === 0 ? (
          <div className="row">
            <div className="application-sec">
              <h2>You haven't applied for anything yet</h2>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="application-sec">
              <h1>My Applications</h1>
              <table className="application-table mt-4">
                <tr>
                  <th>SL#</th>
                  <th>Applied For</th>
                  <th>Product Name</th>
                  <th>Status</th>
                  <th>Schedule Appointment</th>
                  <th>Remarks</th>
                </tr>
                {application["carLoanApplications"] &&
                  application["carLoanApplications"].map((item, key) => {
                    slNo++;
                    console.log("itemmmm", slNo, item);
                    return (
                      <tr>
                        <td>{slNo}.</td>
                        <td>Car Loan</td>
                        <td>{item.carLoan && item.carLoan.name}</td>
                        <td>{item.status}</td>
                        <td>
                          {item.doccument_collection_schedule ? (
                            <>{item.doccument_collection_schedule}</>
                          ) : (
                            <div>
                              <input
                                id={"carLoan" + key}
                                type="datetime-local"
                                step="any"
                                className="date-time"
                                required
                                // onChange={(e) => {
                                //     SetDateTimeFunction(e.target.value,item._id);
                                // }}
                              />
                              <button
                                className="btn"
                                onClick={() =>
                                  setScheduleFun(item._id, "carLoan", key)
                                }
                              >
                                Set Now
                              </button>
                            </div>
                          )}
                          {/* <button className="btn" onClick={() => setScheduleFun(item._id, 'carLoan')}>Set Now</button> */}
                        </td>
                        <td>
                          <Link to="/user-profile">
                            Update profile for quicker services
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                {application["creditCardApplications"] &&
                  application["creditCardApplications"].map((item, key) => {
                    slNo++;
                    return (
                      <tr>
                        <td>{slNo}.</td>
                        <td>Credit Card</td>
                        {item.card && item.card.name ? (
                          <td>{item.card.name}</td>
                        ) : (
                          <td>Undefined</td>
                        )}

                        <td>{item.status}</td>
                        <td>
                          {item.doccument_collection_schedule ? (
                            <>{item.doccument_collection_schedule}</>
                          ) : (
                            <div>
                              <input
                                id={"creditCard" + key}
                                type="datetime-local"
                                step="any"
                                className="date-time"
                                required
                                // onChange={(e) => {
                                //     SetDateTimeFunction(e.target.value,item._id);
                                // }}
                              />
                              <button
                                className="bt"
                                onClick={() =>
                                  setScheduleFun(item._id, "creditCard", key)
                                }
                              >
                                Set{" "}
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <Link to="/user-profile">
                            Update profile for quicker services
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                {application["homeLoanApplications"] &&
                  application["homeLoanApplications"].map((item, key) => {
                    slNo++;
                    return (
                      <tr>
                        <td>{slNo}.</td>
                        <td>Home Loan</td>
                        <td>{item.homeLoan && item.homeLoan.name}</td>
                        <td>{item.status}</td>
                        <td>
                          {item.doccument_collection_schedule ? (
                            <>{item.doccument_collection_schedule}</>
                          ) : (
                            <div>
                              <input
                                id={"homeLoan" + key}
                                type="datetime-local"
                                step="any"
                                className="date-time"
                                required
                                // onChange={(e) => {
                                //     SetDateTimeFunction(e.target.value,item._id);
                                // }}
                              />
                              <button
                                className="bt"
                                onClick={() =>
                                  setScheduleFun(item._id, "homeLoan", key)
                                }
                              >
                                Set{" "}
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <Link to="/user-profile">
                            Update profile for quicker services
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                {application["personalLoanApplications"] &&
                  application["personalLoanApplications"].map((item, key) => {
                    slNo++;
                    return (
                      <tr>
                        <td>{slNo}.</td>
                        <td>Personal Loan</td>
                        <td>{item.personalLoan && item.personalLoan.name}</td>
                        <td>{item.status}</td>
                        <td>
                          {item.doccument_collection_schedule ? (
                            <>{item.doccument_collection_schedule}</>
                          ) : (
                            <div>
                              <input
                                id={"personalLoan" + key}
                                type="datetime-local"
                                className="date-time"
                                step="any"
                                required
                                // onChange={(e) => {
                                //     SetDateTimeFunction(e.target.value,item._id);
                                // }}
                              />
                              <button
                                className="bt"
                                onClick={() =>
                                  setScheduleFun(item._id, "personalLoan", key)
                                }
                              >
                                Set{" "}
                              </button>
                            </div>
                          )}
                        </td>
                        <td>
                          <Link to="/user-profile">
                            Update profile for quicker services
                          </Link>
                        </td>
                      </tr>
                    );
                  })}

                {/* {
                                        showDateTime ?
                                            <div className="datetime-sec">
                                                <button className="cls-btn" onClick={() => setShowDateTime(false)}></button>
                                                <div className="datetime-content">
                                                    <input
                                                        id="datetime"
                                                        type='datetime-local' step="any" className='date-time'
                                                        onChange={(e) => {
                                                            SetDateTime(e.target.value);
                                                        }}
                                                    />
                                                    <button className="glowing-btn" onClick={SetDateTimeFun}>Set now</button>
                                                </div>
                                            </div>
                                            : null
                                    } */}
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
