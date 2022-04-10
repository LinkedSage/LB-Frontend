
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from '../Axios'

export const CadrDetails = ({ title, data, cardDetails }) => {
    console.log("state 1", cardDetails)


    const [popupStatus, setPopupStatus] = useState(false)
    const [moreDetails, setMoreDetails] = useState()

    useEffect( () => {        
        if(popupStatus){
            let element = document.getElementById('_close_details_btn');
            let element1 = document.getElementById('__close_details_btn');
            element.addEventListener('click',hideMoreDetails,false)
            element1.addEventListener('click',hideMoreDetails,true)
        }
    }, [])

    async function MoreDetails(e) {
        setPopupStatus(true)
        const result = await Axios.get(`${process.env.REACT_APP_API_URL}/cards/${e}/required-documents`);
        if (result && result.data && result.data.data) setMoreDetails(result.data.data)
        console.log("xxxaxaxa",result)
    }
    function hideMoreDetails(){
        setPopupStatus(false)
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
                <button onClick={() => { MoreDetails(cardDetails._id) }}>More<br /><span>Details</span></button>
            </div>

            {
                popupStatus && moreDetails ?
                    <div className="more-details-sec d-flex justify-content-center align-items-center">
                        <button className="closs-details" onClick={() => setPopupStatus(false)}></button>
                        <div id="_close_details_btn" className="more-details" onClick={() => setPopupStatus(true)}>

                            <div className="left-details">
                                <div className="left-top">
                                    <h4>Feature</h4>
                                    {
                                        moreDetails[0].features && moreDetails[0].features.map((item,key) => {
                                            return (
                                                <div key = {key}>
                                                    <p className="h5">{item.title}</p>
                                                    <p>{item.short_description}</p>
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
                            <button id="__close_details_btn" className="closs-details-btn btn" >X</button>
                            {/* <button className="closs-details-btn btn" onClick={() => setPopupStatus(false)}>X</button> */}
                            <div className="right-details">
                                <h4>Required Documents</h4>
                                {
                                    moreDetails[0].required_documents && moreDetails[0].required_documents.essential_documents ?
                                        <div>
                                            <p className="h5">Essential Documents</p>
                                            {
                                                moreDetails[0].required_documents.essential_documents.map((item,key) => {
                                                    return (
                                                        <p key = {key}>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                                {
                                    moreDetails[0].required_documents && moreDetails[0].required_documents.reference_documents ?
                                        <div>
                                            <p className="h5 mt-4">Reference Documents</p>
                                            {
                                                moreDetails[0].required_documents.reference_documents.map((item,key) => {
                                                    return (
                                                        <p key = {key}>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                                
                                {
                                    moreDetails[0].required_documents && moreDetails[0].required_documents.notes ?
                                        <div>
                                            <p className="h5 mt-4">Notes</p>
                                            {
                                                moreDetails[0].required_documents.notes.map((item,key) => {
                                                    return (
                                                        <p key = {key}>{item}</p>
                                                    )
                                                })
                                            }

                                        </div>
                                        : null

                                }
                            </div>

                        </div>
                        
                    </div>
                    : null
            }
        </>
    )

}
