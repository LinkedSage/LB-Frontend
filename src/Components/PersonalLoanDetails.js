import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

export const PersonalLoanDetails = ({data }) => {
  console.log("ssss",data)
  const [popupStatus, setPopupStatus] = useState(false);
  const [moreDetails, setMoreDetails] = useState();

  useEffect(() => {
    if (popupStatus) {
      let element = document.getElementById("_close_details_btn");
      let element1 = document.getElementById("__close_details_btn");
      element.addEventListener("click", hideMoreDetails, false);
      element1.addEventListener("click", hideMoreDetails, true);
    }
  }, []);

  async function MoreDetails(e) {
    setPopupStatus(true);
    const result = await Axios.get(
      `${process.env.REACT_APP_API_URL}/personalloans/${e}/required-documents`
    );
    if (result && result.data && result.data.data)
      setMoreDetails(result.data.data);
  }
  function hideMoreDetails() {
    setPopupStatus(false);
  }

  return (
    <>
      <img
        className="fst-child w-220 pl-2 pr-2"
        src={data.image_url}
        alt="card image"
      />
      <div className="vl-line"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">Max Loan Amount</p>
        <p>{data.max_loan_amount}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">Max Tenor</p>
        <p>{data.max_tenor}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">Max Duration</p>
        <p>{data.max_duration}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center eligible-for w-220 pl-2 pr-2">
        <p className="h5">Eligible For</p>
        {
          data.eligibility && data.eligibility.salaried.is_available?
          <p>Salaried</p>:null
        }{
          data.eligibility && data.eligibility.business.is_available?
          <p>Businessman</p>:null
        }{
          data.eligibility && data.eligibility.doctor.is_available?
          <p>Doctor</p>:null
        }{
          data.eligibility && data.eligibility.landlord.is_available?
          <p>Landlord</p>:null
        }
      </div>
      <div className="vl-line"></div>
      <div className="text-center d-flex flex-column lst-child  w-150 pl-2 pr-2">
        <Link
          className="mb-2 glow-on-hover"
          to={{
            pathname: `/personal-loan-application/${data._id}`,
            state: { data },
          }}
        >
          Apply Now
        </Link>
        <Link
          className="glow-on-hover"
          onClick={() => {
            MoreDetails(data._id);
          }}
        >
          Details
        </Link>
      </div>

      {popupStatus && moreDetails ? (
        <div className="more-details-sec d-flex justify-content-center align-items-center">
          <button
            className="closs-details"
            onClick={() => setPopupStatus(false)}
          ></button>
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
    </>
  );
};
