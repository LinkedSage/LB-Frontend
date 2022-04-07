import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from '../Axios'

export const CadrDetails = ({ title, data, cardDetails }) => {
    console.log("state 1", cardDetails)


    const [popupStatus, setPopupStatus] = useState(false)
    const [moreDetails, setMoreDetails] = useState()

    useEffect(async () => {
        const result = await Axios.get(`${process.env.REACT_APP_API_URL}/cards/${cardDetails._id}/required-documents`);
        if (result && result.data && result.data.data) setMoreDetails(result.data.data)
    }, [])

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
                        state: { cardDetails },
                    }}
                >
                    Apply
                </Link>
                <button onClick={() => { MoreDetails(data[1]) }}>More<br /><span>Details</span></button>
            </div>

            {
                popupStatus && moreDetails ?
                    <div className="more-details-sec d-flex justify-content-center align-items-center">
                        <button className="closs-details" onClick={() => setPopupStatus(false)}></button>
                        <div className="more-details" onClick={() => setPopupStatus(true)}>

                            <div className="left-details">
                                <div className="left-top">
                                    <h4>Feature</h4>
                                    {
                                        moreDetails.features && moreDetails.features.map((item) => {
                                            return (
                                                <div>
                                                    <p className="h5">{item.title}</p>
                                                    <p>{item.description}</p>
                                                </div>
                                            )
                                        })

                                    }

                                </div>
                                <div className="hr"></div>
                                <div className="left-bottom">
                                    <h4>Eligibility</h4>
                                    <p>
                                        In publishing and graphic design
                                    </p>
                                </div>
                            </div>
                            <div className="vl"></div>
                            <div className="right-details">
                                <h4>Required Documents</h4>
                                {
                                    moreDetails.required_documents && moreDetails.required_documents.essential_documents ?
                                        <div>
                                            <p className="h5">Essential Documents</p>
                                            {
                                                moreDetails.required_documents.essential_documents.map((item) => {
                                                    return (
                                                        <p>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                                {
                                    moreDetails.required_documents && moreDetails.required_documents.reference_documents ?
                                        <div>
                                            <p className="h5 mt-4">Essential Documents</p>
                                            {
                                                moreDetails.required_documents.reference_documents.map((item) => {
                                                    return (
                                                        <p>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                                
                                {
                                    moreDetails.required_documents && moreDetails.required_documents.notes ?
                                        <div>
                                            <p className="h5 mt-4">Notes</p>
                                            {
                                                moreDetails.required_documents.notes.map((item) => {
                                                    return (
                                                        <p>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                            </div>

                        </div>
                        <button className="closs-details-btn btn" onClick={() => setPopupStatus(false)}>X</button>
                    </div>
                    : null
            }
        </>
    )

}
