import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import Axios from "../Axios";
import Select from 'react-select';
import '../Components/CSS/CreditCard.css'
import card from '../assets/images/sadiq_credit_card.png'
import { CadrDetails } from "../Components/CadrDetails";
import { useLocation } from "react-router-dom";


export default function CreditCard(data) {

  let location = useLocation()
  console.log("state",location.state)

  const [currencyValue, setCurrencyValue] = useState()
  const [cardNetworkValue, setCardNetworkValue] = useState()
  const [cardTypeValue, setCardTypeValue] = useState()
  const [cardList, setCardList] = useState()
  const [cardShow, setCardShow] = useState()

  useEffect(async () => {
    let value = {
      profession:location.state.profession,
      salary:location.state.salary,
    }
    const result = await Axios.get(`${process.env.REACT_APP_API_URL}/cards?profession=${location.state.profession}&salary=${location.state.salary}`);
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
  const feesKey = ['img', 'int lounge access', 'late payment', 'regular anual', 'lounge access']
  const anualFeesKey = ['img', 'waived', 'free anual fee', 'regular', 'waived transaction']
  const withdrawalKey = ['img', 'currency', 'network', 'card type', 'free guest allowed']
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
    let l = value.length
    let temp = cardList.data
    let tempFilter = []
    temp.map((item) => {
      let name = item.name
      for(let i = 0; i < name.length-l+1;i++){
        if(name.substr(i,l).toLowerCase() === value.toLowerCase()){
          tempFilter.push(item)
          break;
        }
      }
    })
    setTimeout(function(){
      setCardShow(tempFilter)
    },1000)
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
  }

  function clearALlFun(){
    console.log("aaaaaaaaaaaaa",currencyValue)
    setCardShow(cardList.data)
    document.getElementById("currency").value = null
    setCurrencyValue(null)
    setCardNetworkValue(null)
    setCardTypeValue(null)
    window.location.href = '/credit-card'
  }

  return (
    <section id="credit-card-page">
      <ToastContainer></ToastContainer>
      <div className="pc-card-filter">
        <div className="group-dropdown d-flex align-items-center justify-content-around pt-3">
          <div className="d-flex align-items-center justify-content-center">
            <div className="filter">
            <svg viewBox="0 0 512 512"><path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z"/></svg>
            </div>
          <div className="single-dropdown">
            <Select
              id = 'currency'
              onChange={(e) => { handleChangeCurrency(e) }}
              options={currency}
              placeholder="Currency"
            />
          </div>
          <div className="single-dropdown">
            <Select
              onChange={(e) => { handleChangeCardNetwork(e) }}
              options={cardNetwork}
              placeholder="Network"
            />
          </div>
          <div className="single-dropdown">
            <Select
              onChange={(e) => { handleChangeCCardType(e) }}
              options={cardType}
              placeholder="Card Type"
            />
          </div>
          <button className="clear-filter" onClick={clearALlFun}>Reset</button>
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
        <div className="container-fluid
        ">
          <div className="row group-card pb-50 pt-3">
            {
              cardShow?
                cardShow.map((item, key) => {
                  if(location.state) item.state = location.state
                  let initialData = [card, item.interest_per_day, item.regular_anual_fee, item.max_supplementary_card, item.international_bank_atm_fee];
                  let feesData = [card, item.int_lounge_access_fee, item.late_payment_fee, item.regular_anual_fee, item.lounge_access_fee];
                  let anualFeesData = [card, item.anual_fee_waived_rewards, item.free_anual_fee, item.regular_anual_fee, item.anual_fee_waived_transaction];
                  let withdrawalData = [card, item.currency, item.network, item.card_type, item.free_guest_allowed];
                  let benefitsData = [card, 'Feature1', 'Feature2', 'Feature3', 'Feature4'];
                  return (
                    <div  key = {key} className="single-card w-100 d-flex flex-column justify-content-center mb-4">
                      <p className="h4 text-center">{item.name}</p>
                      < div className="btn__group text-center">
                        <button id={'fees' + key} onClick={(e) => { filterFun('fees', key, 0) }}>Fees</button>
                        <button id={"anualFees" + key} onClick={(e) => { filterFun('Anual Fees', key, 1) }}>Anual Fees</button>
                        <button id={"Withdrawal" + key} onClick={(e) => { filterFun('Withdrawal', key, 2) }}>Withdrawal</button>
                        <button id={"Benifits" + key} onClick={(e) => { filterFun('Benifits', key, 3) }}>Benifits</button>
                      </div>

                      <div id= {"initialID"+key}className="description d-flex">
                        <CadrDetails title={initialKeys} data={initialData} cardDetails = {item} />
                      </div>
                      <div id={"feesID"+key} className="description d-none">
                        <CadrDetails title={feesKey} data={feesData} cardDetails = {item} />
                      </div>
                      <div id={"anualFeesID"+key} className="description d-none">
                        <CadrDetails title={anualFeesKey} data={anualFeesData} cardDetails = {item} />
                      </div>
                      <div id={"withdrawalID"+key} className="description d-none">
                        <CadrDetails title={withdrawalKey} data={withdrawalData} cardDetails = {item} />
                      </div>
                      <div id={"benefitsID"+key} className="description d-none">
                        <CadrDetails title={benifitsKey} data={benefitsData} cardDetails = {item} />
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
