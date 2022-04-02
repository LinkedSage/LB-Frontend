import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import Axios from "../Axios";
import Select from 'react-select';
import '../Components/CSS/CreditCard.css'
import card from '../assets/images/sadiq_credit_card.png'
import { CadrDetails } from "../Components/CadrDetails";


export default function CreditCard(data) {



  const [currencyValue, setCurrencyValue] = useState()
  const [cardNetworkValue, setCardNetworkValue] = useState()
  const [cardTypeValue, setCardTypeValue] = useState()
  const [cardList, setCardList] = useState()
  const [cardShow, setCardShow] = useState()

  useEffect(async () => {
    const result = await Axios.get(`${process.env.REACT_APP_API_URL}/cards`);
    setCardList(result.data)
    setCardShow(result.data.data)
  }, []);



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

  const initialKeys = ['img', 'Interest/Day', 'Anual Fee', 'Max Supplimentary', 'Int. ATM Fee']
  const feesKey = ['img', 'int_lounge_access', 'late_payment', 'regular_anual', 'lounge_access']
  const anualFeesKey = ['img', 'waived', 'free_anual_fee', 'regular', 'waived_transaction']
  const withdrawalKey = ['img', 'currency', 'network', 'card_type', 'free_guest_allowed']
  const benifitsKey = ['img', 'Feature1', 'Feature2', 'Feature3', 'Feature4']

  function handleChangeCurrency(e) {
    setCurrencyValue(e);
    console.log(e,cardNetworkValue,cardTypeValue)

    let temp = cardList.data;
    let filteredTemp = temp.filter(item => item.currency === e.value)
    console.log("1st",filteredData)
    if(cardNetworkValue) filteredTemp = filteredTemp.filter(item => item.network === cardNetworkValue.value)
    console.log("1st",filteredData)
    if(cardTypeValue) filteredTemp = filteredTemp.filter(item => item.card_type === cardTypeValue.value)
    console.log("1st",filteredData)
    setCardShow(filteredTemp)
  }
  function handleChangeCardNetwork(e) {
    setCardNetworkValue(e)
    console.log(currencyValue,e,cardTypeValue)
    let temp = cardList.data;
    let filteredTemp = temp.filter(item => item.network === e.value)
    console.log("2nd",filteredTemp)
    if(currencyValue) filteredTemp = filteredTemp.filter(item => item.currency === currencyValue.value)
    console.log("2nd",filteredTemp)
    if(cardTypeValue) filteredTemp = filteredTemp.filter(item => item.card_type === cardTypeValue.value)
    console.log("2nd",filteredTemp)

    setCardShow(filteredTemp)
  }
  function handleChangeCCardType(e) {
    setCardTypeValue(e)
    console.log(currencyValue,cardNetworkValue,e)
    let temp = cardList.data;
    let filteredTemp = temp.filter(item => item.card_type === e.value)
    console.log("3rd",filteredTemp)
    if(cardNetworkValue) filteredTemp = filteredTemp.filter(item => item.network === cardNetworkValue.value)
    console.log("3rd",filteredTemp)
    if(currencyValue) filteredTemp = filteredTemp.filter(item => item.currency === currencyValue.value)
    console.log("3rd",filteredTemp)
    setCardShow(filteredTemp)
  }
  function setSearchFun(value) {
    console.log("hi baby", value)
  }

  var classList = new Array([])
  var classListDescription = new Array([])
  var filteredData = []
  function filterFun(value, key, index) {
    console.log(value, key)
    filteredData[key] = value
    classList[key] = ([document.getElementById('fees' + key), document.getElementById('anualFees' + key), document.getElementById('Withdrawal' + key), document.getElementById('Benifits' + key)])
    classListDescription[key] = ([ document.getElementById('feesID' + key), document.getElementById('anualFeesID' + key), document.getElementById('withdrawalID' + key), document.getElementById('benefitsID' + key),document.getElementById('initialID' + key)])

    // feeCls.classList.add("active");
    console.log(classList)
    for (let i = 0; i < 4; i++) {
      if (i == index) classList[key][i].classList.add("active");
      else classList[key][i].classList.remove("active");
    }
    console.log(key,index,classListDescription)
    for (let i = 0; i < 5; i++) {
      if (i == index) {
        classListDescription[key][i].classList.add("d-flex");
        classListDescription[key][i].classList.remove("d-none");
      }
      else {
        classListDescription[key][i].classList.remove("d-flex");
        classListDescription[key][i].classList.add("d-none");
      }
    }


    console.log("hi baby", filteredData)
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
            {
              cardShow?
                cardShow.map((item, key) => {
                  let initialData = [card, item.interest_per_day, item.regular_anual_fee, item.max_supplementary_card, item.international_bank_atm_fee];
                  let feesData = [card, item.int_lounge_access_fee, item.late_payment_fee, item.regular_anual_fee, item.lounge_access_fee];
                  let anualFeesData = [card, item.anual_fee_waived_rewards, item.free_anual_fee, item.regular_anual_fee, item.anual_fee_waived_transaction];
                  let withdrawalData = [card, item.currency, item.network, item.card_type, item.free_guest_allowed];
                  let benefitsData = [card, 'Feature1', 'Feature2', 'Feature3', 'Feature4'];
                  return (
                    <div className="single-card w-100 d-flex flex-column justify-content-center mb-4">
                      <p className="h4 text-center">{item.name}</p>
                      < div className="btn__group text-center">
                        <button id={'fees' + key} onClick={(e) => { filterFun('fees', key, 0) }}>Fees</button>
                        <button id={"anualFees" + key} onClick={(e) => { filterFun('Anual Fees', key, 1) }}>Anual Fees</button>
                        <button id={"Withdrawal" + key} onClick={(e) => { filterFun('Withdrawal', key, 2) }}>Withdrawal</button>
                        <button id={"Benifits" + key} onClick={(e) => { filterFun('Benifits', key, 3) }}>Benifits</button>
                      </div>

                      <div id= {"initialID"+key}className="description d-flex">
                        <CadrDetails title={initialKeys} data={initialData} />
                      </div>
                      <div id={"feesID"+key} className="description d-none">
                        <CadrDetails title={feesKey} data={feesData} />
                      </div>
                      <div id={"anualFeesID"+key} className="description d-none">
                        <CadrDetails title={anualFeesKey} data={anualFeesData} />
                      </div>
                      <div id={"withdrawalID"+key} className="description d-none">
                        <CadrDetails title={withdrawalKey} data={withdrawalData} />
                      </div>
                      <div id={"benefitsID"+key} className="description d-none">
                        <CadrDetails title={benifitsKey} data={benefitsData} />
                      </div>
                    </div>
                  )
                })
                : null
            }
          </div>
        </div>
      </div>
    </section>
  );
}
