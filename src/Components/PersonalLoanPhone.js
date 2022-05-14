import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

export const PersonalLoanPhone = ({ cardDetails }) => {
  console.log("sssssss", cardDetails)


  const [popupStatus, setPopupStatus] = useState(false);
  const [moreDetails, setMoreDetails] = useState();


  function cardNavButtonFun(e) {
    let btn1 = document.getElementById('apply-now-btn')
    let btn2 = document.getElementById('more-details-btn')
    if (e === 0) {
      btn1.classList.add('active-left')
      btn2.classList.remove('active-right')
    }
    if (e === 1) {
      btn1.classList.remove('active-left')
      btn2.classList.add('active-right')
      MoreDetails(cardDetails._id);
    }
  }

  async function MoreDetails(e) {
    setPopupStatus(true);
    const result = await Axios.get(
      `${process.env.REACT_APP_API_URL}/personalloans/${e}/required-documents`
    );
    if (result && result.data && result.data.data)
      setMoreDetails(result.data.data);
  }


  return (
    <div className="phone-single-card">
      <div className="phone-filter-icon">

      </div>
      <div className="top p-3 d-flex">
        <img src={cardDetails.image_url} alt="card image" />
        <div className="pl-3">
          <p className="h4">{cardDetails.name}</p>
          <p className="mb-0">{cardDetails.bank[0].name}</p>
        </div>
      </div>
      <div className="middle d-flex justify-content-center align-items-center flex-wrap">
        <div>
          <p className="h4">Interest Rate</p>
          <p className="mb-0">{cardDetails.interest_rate}</p>
        </div>
        <div>
          <p className="h4">Max Tenor</p>
          <p className="mb-0">{cardDetails.max_tenor}</p>
        </div>
        <div>
          <p className="h4">Min Tenor</p>
          <p className="mb-0">{cardDetails.min_tenor}</p>
        </div>
        <div>
          <p className="h4">Eligibility</p>
          <p className="mb-0">
            {
              cardDetails.eligibility.business.is_available ?
                <span className="pr-2">Businessman</span>
                : null
            }
            {
              cardDetails.eligibility.doctor.is_available ?
                <span className="pr-2">Doctor</span>
                : null
            }
            {
              cardDetails.eligibility.landlord.is_available ?
                <span className="pr-2">Landlord</span>
                : null
            }
            {
              cardDetails.eligibility.salaried.is_available ?
                <span className="pr-2">Salaried</span>
                : null
            }
          </p>
        </div>
      </div>
      <div className="bottom mb-3">
        <div className="card-nav">

          <Link
            id="apply-now-btn" onClick={() => cardNavButtonFun(0)}
            to={{
              pathname: `/personal-loan-application/${cardDetails._id}`,
              state: { cardDetails },
            }}
          >
            Apply Now
          </Link>
          <Link
            id="more-details-btn" onClick={() => cardNavButtonFun(1)}
          >
            More Details
          </Link>
        </div>
        <div></div>
      </div>
      {popupStatus && moreDetails ? (
        <div className="more-details-sec d-flex justify-content-center align-items-center">
          <button
            className="closs-details"
            onClick={() => setPopupStatus(false)}
          ></button>
          <button
            className="close-details-phn"
            onClick={() => setPopupStatus(false)}
          >X</button>
          <div
            id="_close_details_btn"
            className="more-details"
            onClick={() => setPopupStatus(true)}
          >
            <div className="left-details">
              <div className="left-top">
                <h4 className="_title">Features</h4>

                {moreDetails[0].features &&
                  moreDetails[0].features.map((item, key) => {
                    return (
                      <div key={key}>
                        <p className="h5">
                          <span className="primary-dot mr-2">•</span>
                          {item.title}
                        </p>
                        <p>{item.short_description}</p>
                      </div>
                    );
                  })}
              </div>
              {/* <div className="hr"></div> */}
              <div className="left-bottom">
                <h4 className="_title">Eligibility</h4>
                <p>In publishing and graphic design</p>
              </div>
            </div>
            <div className="vl"></div>
            {/* <input
              type="button"
              id="__close_details_btn"
              className="closs-details-btn btn"
              onClick={() => {
                  console.log("jello")
                setPopupStatus(false);
              }}
              value="X"
            /> */}
            {/* <button className="closs-details-btn btn" onClick={() => setPopupStatus(false)}>X</button> */}
            <div className="right-details">
              <h4 className="_title">Required Documents</h4>
              {moreDetails[0].required_documents &&
                moreDetails[0].required_documents.essential_documents ? (
                <>
                  <h5>Essential Documents</h5>
                  <div className="_sub-title">
                    <hr></hr>
                  </div>
                  <div>
                    {moreDetails[0].required_documents.essential_documents.map(
                      (item, key) => {
                        return (
                          <p key={key}>
                            <span className="primary-star mr-2">★★★</span>
                            {item}
                          </p>
                        );
                      }
                    )}
                  </div>
                </>
              ) : null}
              {moreDetails[0].required_documents &&
                moreDetails[0].required_documents.reference_documents ? (
                <>
                  <h5 className="mt-3">Reference Documents</h5>
                  <div className="_sub-title">
                    <hr></hr>
                  </div>
                  <div>
                    {moreDetails[0].required_documents.reference_documents.map(
                      (item, key) => {
                        return (
                          <p key={key}>
                            <span className="primary-star mr-2">★★★</span>
                            {item}
                          </p>
                        );
                      }
                    )}
                  </div>
                </>
              ) : null}

              {moreDetails[0].required_documents &&
                moreDetails[0].required_documents.notes ? (
                <>
                  <h5 className="mt-3">Reference DocumentNotess</h5>
                  <div className="_sub-title">
                    <hr></hr>
                  </div>
                  <div>
                    {moreDetails[0].required_documents.notes.map(
                      (item, key) => {
                        return (
                          <p key={key}>
                            <span className="primary-star mr-2">•</span>
                            {item}
                          </p>
                        );
                      }
                    )}
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
