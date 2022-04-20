import React, { useEffect, useState } from "react";
import image_url from '../assets/images/sadiq_credit_card.png'

export const CardDetailsPhone = ({data}) => {
  console.log("sssssss",data)

  function cardNavButtonFun(e){
    let btn1 = document.getElementById('apply-now-btn')
    let btn2 = document.getElementById('more-details-btn')
    if(e === 0){
      btn1.classList.add('active-left')
      btn2.classList.remove('active-right')
    }
    if(e === 1){
      btn1.classList.remove('active-left')
      btn2.classList.add('active-right')
    }
  }

  return (
    <div className="phone-single-card">
      <div className="top p-3 d-flex">
        <img src = {image_url} alt="card image" />
        <div className="pl-3">
          <p className="h4">Visa Silver (Classic) Credit Card 2</p>
          <p>SCB</p>
        </div>
      </div>
      <div className="middle d-flex justify-content-center align-items-center flex-wrap mb-3">
        <div>
          <p className="h4">Title 1</p>
          <p>Description 1</p>
        </div>
        <div>
          <p className="h4">Title 2</p>
          <p>Description 2</p>
        </div>
        <div>
          <p className="h4">Title 3</p>
          <p>Description 3</p>
        </div>
        <div>
          <p className="h4">Title 4</p>
          <p>Description 4</p>
        </div>
      </div>
      <div className="bottom mb-3">
        <div className="card-nav">
          <button id="apply-now-btn" onClick={() => cardNavButtonFun(0)} className="">Apply Now</button>
          <button id = "more-details-btn" onClick={() => cardNavButtonFun(1)} className="">More Details</button>
        </div>
        <div></div>
      </div>
    </div>
  );
};
