import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../Axios";

export const CardDetails = ({ title, data, cardDetails, addToCompare }) => {
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
      `${process.env.REACT_APP_API_URL}/cards/${e}/required-documents`
    );
    console.log(result.data.data);
    if (result && result.data && result.data.data)
      setMoreDetails(result.data.data);
  }
  function hideMoreDetails() {
    setPopupStatus(false);
  }

  return (
    <>
      <div>
        <div>
          <img
            className="fst-child w-220 pl-2 pr-2"
            src={data[0]}
            alt="card image"
          />
        </div>
        <div className="text-center">
          <button className="btn" onClick={() => addToCompare(cardDetails)}>Add to Compare</button>
          {/* <Link
            className="btn mb-2 glow-on-hover"
            to={{
              pathname: `/card-application/${cardDetails._id}`,
              state: { cardDetails },
            }}
          >
            Apply Now
          </Link> */}
        </div>
      </div>
      <div className="vl-line"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">{title[1]}</p>
        <p>{data[1]}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">{title[2]}</p>
        <p>{data[2]}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">{title[3]}</p>
        <p>{data[3]}</p>
      </div>
      <div className="vl-line-1"></div>
      <div className="text-center w-220 pl-2 pr-2">
        <p className="h5">{title[4]}</p>
        {title[4] === "Eligible For" ? (
          <>
            {data[4].salaried && data[4].salaried.is_available ? (
              <p>Salaried</p>
            ) : data[4].doctor && data[4].doctor.is_available ? (
              <p>Doctor</p>
            ) : data[4].doctor && data[4].business.is_available ? (
              <p>Businessman</p>
            ) : (
              <p>---</p>
            )}
          </>
        ) : (
          <p>{data[4]}</p>
        )}
      </div>
      <div className="vl-line"></div>
      <div className="text-center d-flex flex-column lst-child  w-150 pl-2 pr-2">
        <Link
          className="mb-2 glow-on-hover"
          to={{
            pathname: `/card-application/${cardDetails._id}`,
            state: { cardDetails },
          }}
        >
          Apply Now
        </Link>
        <Link
          className="glow-on-hover"
          onClick={() => {
            MoreDetails(cardDetails._id);
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
              {/* <div className="left-bottom">
                <h4 className="_title">Eligibility</h4>
                {moreDetails[0].eligibility &&
                moreDetails[0].eligibility.salaried &&
                moreDetails[0].eligibility.salaried.is_available ? (
                  <div>
                    <p>
                      <b>Salaried</b> Person with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.salaried.min_monthly_income}
                      </b> BDT.
                    </p>
                  </div>
                ) : null}
                {moreDetails[0].eligibility &&
                moreDetails[0].eligibility.business &&
                moreDetails[0].eligibility.business.is_available ? (
                  <div>
                    <p>
                      <b>Businessman</b> with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.business.min_monthly_income}
                      </b> BDT.
                    </p>
                  </div>
                ) : null}
                {moreDetails[0].eligibility &&
                moreDetails[0].eligibility.doctor &&
                moreDetails[0].eligibility.doctor.is_available ? (
                  <div>
                    <p>
                      <b>Doctor</b> with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.doctor.min_monthly_income}
                      </b> BDT.
                    </p>
                  </div>
                ) : null}
              </div> */}
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
                  <h5 className="mt-3">Reference Document Notes</h5>
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
              <div className="left-bottom">
                <h4 className="_title">Eligibility</h4>
                {moreDetails[0].eligibility &&
                  moreDetails[0].eligibility.salaried &&
                  moreDetails[0].eligibility.salaried.is_available ? (
                  <div>
                    <p>
                      <b>Salaried</b> Person with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.salaried.min_monthly_income}
                      </b>{" "}
                      BDT.
                    </p>
                  </div>
                ) : null}
                {moreDetails[0].eligibility &&
                  moreDetails[0].eligibility.business &&
                  moreDetails[0].eligibility.business.is_available ? (
                  <div>
                    <p>
                      <b>Businessman</b> with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.business.min_monthly_income}
                      </b>{" "}
                      BDT.
                    </p>
                  </div>
                ) : null}
                {moreDetails[0].eligibility &&
                  moreDetails[0].eligibility.doctor &&
                  moreDetails[0].eligibility.doctor.is_available ? (
                  <div>
                    <p>
                      <b>Doctor</b> with minimum monthly income:{" "}
                      <b>
                        {moreDetails[0].eligibility.doctor.min_monthly_income}
                      </b>{" "}
                      BDT.
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
