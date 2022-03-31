import React from "react";

export const CadrDetails = ({title,data}) => {
    return (
        <>
            <img className="fst-child" src={data[0]} alt="card image" />
            <div className="vl-line"></div>
            <div className="text-center">
                <p className="h4">{title[1]}</p>
                <p>{data[1]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center">
                <p className="h4">{title[2]}</p>
                <p>{data[2]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center">
                <p className="h4">{title[3]}</p>
                <p>{data[3]}</p>
            </div>
            <div className="vl-line-1"></div>
            <div className="text-center">
                <p className="h4">{title[4]}</p>
                <p>{data[4]}</p>
            </div>
            <div className="vl-line"></div>
            <div className="text-center d-flex flex-column lst-child">
                <button className="mb-3">Apply</button>
                <button>More<br /><span>Details</span></button>
            </div>
            </>
    )

}
