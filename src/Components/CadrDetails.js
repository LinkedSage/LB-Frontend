import React, { useState } from "react";
import { Link } from "react-router-dom";

export const CadrDetails = ({ title, data, cardDetails }) => {
    console.log("state 1",cardDetails)

    const [popupStatus, setPopupStatus] = useState(false)

    function MoreDetails(e) {
        setPopupStatus(true)
    }

    return (
        <>
            <img className="fst-child w-160 pl-2 pr-2" src={data[0]} alt="card image" />
            <div className="vl-line"></div>
            <div className="text-center w-160 pl-2 pr-2" >
                <p className="h4">{title[1]}</p>
                <p>{data[1]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center w-160 pl-2 pr-2" >
                <p className="h4">{title[2]}</p>
                <p>{data[2]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center w-160 pl-2 pr-2" >
                <p className="h4">{title[3]}</p>
                <p>{data[3]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center w-160 pl-2 pr-2" >
                <p className="h4">{title[4]}</p>
                <p>{data[4]}</p>
            </div>
            <div className="vl-line"></div>
            <div className="text-center d-flex flex-column lst-child  w-120 pl-2 pr-2" >
                <Link 
                className="mb-2"
                to={{
                  pathname: `/application/${cardDetails._id}`,
                  state: {cardDetails},
                }}
              >
                Apply
              </Link>
                <button onClick={() => { MoreDetails(data[1]) }}>More<br /><span>Details</span></button>
            </div>

            {
                popupStatus ?
                    <div className="more-details-sec d-flex justify-content-center align-items-center">
                        <button className="closs-details" onClick={() => setPopupStatus(false)}></button>
                        <div className="more-details" onClick={() => setPopupStatus(true)}>
                            
                        </div>
                    </div>
                    : null
            }
        </>
    )

}
