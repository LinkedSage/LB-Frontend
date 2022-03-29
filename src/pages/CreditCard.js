
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { ToastContainer } from 'react-toastify';
import { verifyOTP } from "../helpers/API/Auth";
import Select from 'react-select';
import '../Components/CSS/CreditCard.css'
import card from '../assets/images/sadiq_credit_card.png'


export default function CreditCard(data) {

  const [currencyValue, setCurrencyValue] = useState()
  const [cardNetworkValue, setCardNetworkValue] = useState()
  const [cardTypeValue, setCardTypeValue] = useState()

  const currency = [
    { value: 'Dual', label: 'Dual' },
    { value: 'Local', label: 'Local' }
  ];
  const cardNetwork = [
    { value: 'Visa', label: 'Visa' },
    { value: 'Master', label: 'Master' }
  ];
  const cardType = [
    { value: 'Silver', label: 'Silver' },
    { value: 'Classic', label: 'Classic' },
    { value: 'Standard', label: 'Standard' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Platinum', label: 'Platinum' },
    { value: 'Signature', label: 'Signature' },
    { value: 'Titanium', label: 'Titanium' },
    { value: 'Word Card', label: 'Word Card' },
  ];

  function handleChangeCurrency(e) {
    setCurrencyValue(e);
    console.log(e, cardNetworkValue, cardTypeValue)
  }
  function handleChangeCardNetwork(e) {
    setCardNetworkValue(e)
    console.log(currencyValue, e, cardTypeValue)
  }
  function handleChangeCCardType(e) {
    setCardTypeValue(e)
    console.log(currencyValue, cardNetworkValue, e)
  }
  function setSearchFun(value) {
    console.log("hi baby", value)
  }
  function filterFun(value,key){
    var classList = []
    classList[0] = document.getElementById('fees')
    classList[1]= document.getElementById('anualFees')
    classList[2]= document.getElementById('Withdrawal')
    classList[3]= document.getElementById('Benifits')
    // feeCls.classList.add("active");
    for(let i = 0; i < 4; i++){
      if(i == key)classList[i].classList.add("active");
      else classList[i].classList.remove("active");
    }
    

    console.log("hi baby", value)
  }

  return (
    <section id="credit-card-page">
      <ToastContainer></ToastContainer>
      <div className="pc-card-filter">
        <div className="group-dropdown d-flex align-items-center justify-content-center">
          <div className="single-dropdown">
            <label>Currency</label>
            <Select
              onChange={(e) => { handleChangeCurrency(e) }}
              options={currency}
            />
          </div>
          <div className="single-dropdown">
            <label>Card Network</label>
            <Select
              onChange={(e) => { handleChangeCardNetwork(e) }}
              options={cardNetwork}
            />
          </div>
          <div className="single-dropdown">
            <label>Card Type</label>
            <Select
              onChange={(e) => { handleChangeCCardType(e) }}
              options={cardType}
            />
          </div>
          <div className="card-search ml-4">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              // value={q}
              onChange={(e) => setSearchFun(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="card-section">
        <div className="container">
          <div className="row group-card ptb-50">
            <div className="single-card w-100 d-flex flex-column justify-content-center mb-4">
              <p className="h4 text-center">Standard Charterd Bank Sadik</p>
              <div className="btn__group text-center">
                <button id="fees" onClick={(e) => { filterFun('fees',0) }}>Fees</button>
                <button id="anualFees" onClick={(e) => { filterFun('Anual Fees',1) }}>Anual Fees</button>
                <button id="Withdrawal" onClick={(e) => { filterFun('Withdrawal',2) }}>Withdrawal</button>
                <button id="Benifits" onClick={(e) => { filterFun('Benifits',3) }}>Benifits</button>
              </div>
              <div className="description d-flex align-items-center justify-content-around">
                <img className="fst-child" src={card} alt = "card image" />
                <div className="vl-line"></div>
                <div className="text-center">
                  <p className="h4">Interest / Day</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Anual Fee</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Max Supplimentary</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Int. ATM Fee</p>
                  <p>111</p>
                </div>
                <div className="vl-line"></div>
                <div className="text-center d-flex flex-column lst-child">
                  <button className="mb-3">Apply</button>
                  <button>More<br/>Details</button>
                </div>
              </div>
            </div>
            <div className="single-card w-100 d-flex flex-column justify-content-center">
              <p className="h4 text-center">Standard Charterd Bank Sadik</p>
              <div className="btn__group text-center">
                <button id="fees" onClick={(e) => { filterFun('fees',0) }}>Fees</button>
                <button id="anualFees" onClick={(e) => { filterFun('Anual Fees',1) }}>Anual Fees</button>
                <button id="Withdrawal" onClick={(e) => { filterFun('Withdrawal',2) }}>Withdrawal</button>
                <button id="Benifits" onClick={(e) => { filterFun('Benifits',3) }}>Benifits</button>
              </div>
              <div className="description d-flex align-items-center justify-content-around">
                <img className="fst-child" src={card} alt = "card image" />
                <div className="vl-line"></div>
                <div className="text-center">
                  <p className="h4">Interest / Day</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Anual Fee</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Max Supplimentary</p>
                  <p>111</p>
                </div>
                <div className="vl-line-1"></div>
                <div className="text-center">
                  <p className="h4">Int. ATM Fee</p>
                  <p>111</p>
                </div>
                <div className="vl-line"></div>
                <div className="text-center d-flex flex-column lst-child">
                  <button className="mb-3">Apply</button>
                  <button>More<br/>Details</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
