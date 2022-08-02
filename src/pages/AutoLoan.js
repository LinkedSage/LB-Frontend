import { CarLoanDetails } from "../Components/CarLoanDetails";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import "../Components/CSS/CreditCard.css";
import { CarLoanPhone } from "../Components/CarLoanPhone";
import { useLocation } from "react-router-dom";
import PreloaderPage from "../Components/PreloaderPage";

export default function CreditCard(data) {
  let location = useLocation();
  const [currencyValue, setCurrencyValue] = useState();
  const [cardNetworkValue, setCardNetworkValue] = useState();
  const [cardTypeValue, setCardTypeValue] = useState();
  const [cardList, setCardList] = useState();
  const [cardShow, setCardShow] = useState();
  const [salary, setSalary] = useState();
  const [profession, setProfession] = useState("salaried");
  const [professionSalary, setProfessionSalary] = useState(false);
  const [preloader, setPreloader] = useState(false);

  useEffect(async () => {
    window.scroll(0, 0);
    if (location.state && location.state.profession && location.state.salary) {
      setPreloader(true);
      let result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/carloans?profession=${location.state.profession}&salary=${location.state.salary}`
      );

      console.log(location.state, result.data.data);
      setCardList(result.data);
      setCardShow(result.data.data);
      setPreloader(false);
    } else {
      setProfessionSalary(true);
    }
  }, []);

  const currency = [
    { value: "Dual", label: "Dual" },
    { value: "Local", label: "Local" },
  ];
  const cardNetwork = [
    { value: "Visa", label: "Visa" },
    { value: "Master", label: "Master" },
    { value: "AMEX", label: "AMEX" },
  ];
  const cardType = [
    { value: "Silver", label: "Silver" },
    { value: "Classic", label: "Classic" },
    { value: "Standard", label: "Standard" },
    { value: "Gold", label: "Gold" },
    { value: "Platinum", label: "Platinum" },
    { value: "Signature", label: "Signature" },
    { value: "Titanium", label: "Titanium" },
    { value: "Word Card", label: "Word Card" },
  ];

  function handleChangeCurrency(e) {
    setCurrencyValue(e);
    console.log(e, cardNetworkValue, cardTypeValue);

    let temp = cardList.data;
    let filteredTemp = temp.filter((item) => item.currency === e.value);
    console.log("1st", filteredData);
    if (cardNetworkValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.network === cardNetworkValue.value
      );
    console.log("1st", filteredData);
    if (cardTypeValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.card_type === cardTypeValue.value
      );
    console.log("1st", filteredData);
    setCardShow(filteredTemp);
  }
  function handleChangeCardNetwork(e) {
    setCardNetworkValue(e);
    console.log(currencyValue, e, cardTypeValue);
    let temp = cardList.data;
    let filteredTemp = temp.filter((item) => item.network === e.value);
    console.log("2nd", filteredTemp);
    if (currencyValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.currency === currencyValue.value
      );
    console.log("2nd", filteredTemp);
    if (cardTypeValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.card_type === cardTypeValue.value
      );
    console.log("2nd", filteredTemp);

    setCardShow(filteredTemp);
  }
  function handleChangeCCardType(e) {
    setCardTypeValue(e);
    console.log(currencyValue, cardNetworkValue, e);
    let temp = cardList.data;
    let filteredTemp = temp.filter((item) => item.card_type === e.value);
    console.log("3rd", filteredTemp);
    if (cardNetworkValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.network === cardNetworkValue.value
      );
    console.log("3rd", filteredTemp);
    if (currencyValue)
      filteredTemp = filteredTemp.filter(
        (item) => item.currency === currencyValue.value
      );
    console.log("3rd", filteredTemp);
    setCardShow(filteredTemp);
  }
  function setSearchFun(value) {
    let l = value.length;
    let temp = cardList.data;
    let tempFilter = [];
    temp.map((item) => {
      let name = item.name;
      for (let i = 0; i < name.length - l + 1; i++) {
        if (name.substr(i, l).toLowerCase() === value.toLowerCase()) {
          tempFilter.push(item);
          break;
        }
      }
    });
    setTimeout(function () {
      setCardShow(tempFilter);
    }, 1000);
  }

  var filteredData = [];
  function clearALlFun() {
    console.log("aaaaaaaaaaaaa", currencyValue);
    setCardShow(cardList.data);
    document.getElementById("currency").value = null;
    setCurrencyValue(null);
    setCardNetworkValue(null);
    setCardTypeValue(null);
    window.location.href = "/personal-loan";
  }

  async function findCardFun(e) {
    e.preventDefault();
    console.log(salary, profession);

    let salaryId = document.getElementById("salary");
    if ((!salary || (salary && salary < 0)) && profession) {
      salaryId.classList.add("empty");
      salaryId.value = "";
    } else {
      salaryId.classList.remove("empty");
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/carloans?profession=${profession}&salary=${salary}`
      );
      setCardList(result.data);
      setCardShow(result.data.data);

      setProfessionSalary(false);
    }
  }

  return (
    <section id="credit-card-page">
      {preloader ? <PreloaderPage /> : null}
      <ToastContainer></ToastContainer>
      {professionSalary ? (
        <div className="profession-salary">
          <div className="container">
            <div className="row">
              <form className="p-3">
                <h3 className="w-100 text-center">
                  Find your best &nbsp;<span className="h2">Car Loan</span>
                </h3>
                <div className="d-flex mt-3 content flex-column justify-content-center align-items-center">
                  <div class="select mb-4">
                    <select
                      placeholder="Profession"
                      onChange={(e) => {
                        setProfession(e.target.value);
                      }}
                    >
                      <option selected value="salaried">
                        Salaried
                      </option>
                      <option value="business">Business</option>
                      <option value="doctor">Doctor</option>
                      <option value="landLord">Land Lord</option>
                    </select>
                  </div>
                  <div class="input-container">
                    <input
                      id="salary"
                      type="number"
                      min="0"
                      required
                      onChange={(e) => {
                        setSalary(e.target.value);
                      }}
                    ></input>
                    <label class="label" for="salary">
                      Salary*
                    </label>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <button
                    className="h4 p-3 pl-5 pr-5 glow-on-hover"
                    onClick={(e) => {
                      findCardFun(e);
                    }}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          {cardShow && cardShow.length > 0 ? (
            <div className="card-section">
              <div className="container-fluid card-section-pc pt-50">
                {/* <div className="row pc-card-filter card-shadow mt-3">
                      <div className="w-100 group-dropdown d-flex align-items-center justify-content-between pt-2 pb-2">
                        <div className="d-flex align-items-center justify-content-center filter-section ">
                          <div className="filter">
                            <svg viewBox="0 0 512 512">
                              <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
                            </svg>
                          </div>
                          <div className="single-dropdown">
                            <Select
                              id="currency"
                              onChange={(e) => {
                                handleChangeCurrency(e);
                              }}
                              options={currency}
                              placeholder="Currency"
                            />
                          </div>
                          <div className="single-dropdown">
                            <Select
                              onChange={(e) => {
                                handleChangeCardNetwork(e);
                              }}
                              options={cardNetwork}
                              placeholder="Network"
                            />
                          </div>

                          <button className="clear-filter card-search-phone" onClick={clearALlFun}>
                            Reset
                          </button>

                          <div className="single-dropdown">
                            <Select
                              onChange={(e) => {
                                handleChangeCCardType(e);
                              }}
                              options={cardType}
                              placeholder="Card Type"
                            />
                          </div>
                          <div className="card-search card-search-phone">
                            <input
                              type="search"
                              name="search-form"
                              id="search-form"
                              className="search-input"
                              placeholder="Search for..."
                              onChange={(e) => setSearchFun(e.target.value)}
                            />
                          </div>
                          <button className="clear-filter card-search-pc mr-" onClick={clearALlFun}>
                            Reset
                          </button>
                        </div>
                        <div className="card-search ml-4 card-search-pc">
                          <input
                            type="search"
                            name="search-form"
                            id="search-form"
                            className="search-input"
                            placeholder="Search for..."
                            onChange={(e) => setSearchFun(e.target.value)}
                          />
                        </div>
                      </div>
                    </div> */}
                <div className="row card-section-pc group-card pb-50 pt-3">
                  {cardShow
                    ? cardShow.map((item, key) => {
                        return (
                          <div
                            key={key}
                            className="single-card card-shadow w-100 d-flex flex-column justify-content-center mb-4"
                          >
                            <p className="h4 text-center mb-3 text-uppercase">
                              {item.name}
                            </p>

                            <div className="description d-flex">
                              <CarLoanDetails cardDetails={item} />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>

              <div className="card-section-phone">
                <div className="phone-card-group">
                  {cardShow
                    ? cardShow.map((item, key) => {
                        return <CarLoanPhone cardDetails={item} key={key} />;
                      })
                    : null}
                  {/* <CardDetailsPhone data = 'hi' /> */}
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-card-msg ptb-50 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M143.9 398.6C131.4 394.1 124.9 380.3 129.4 367.9C146.9 319.4 198.9 288 256 288C313.1 288 365.1 319.4 382.6 367.9C387.1 380.3 380.6 394.1 368.1 398.6C355.7 403.1 341.9 396.6 337.4 384.1C328.2 358.5 297.2 336 256 336C214.8 336 183.8 358.5 174.6 384.1C170.1 396.6 156.3 403.1 143.9 398.6V398.6zM208.4 208C208.4 225.7 194 240 176.4 240C158.7 240 144.4 225.7 144.4 208C144.4 190.3 158.7 176 176.4 176C194 176 208.4 190.3 208.4 208zM304.4 208C304.4 190.3 318.7 176 336.4 176C354 176 368.4 190.3 368.4 208C368.4 225.7 354 240 336.4 240C318.7 240 304.4 225.7 304.4 208zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z" />
              </svg>
              <p className="h4">No Auto Loan is available right now.</p>
              <p className="h4 text-primary pl-5 pr-5 mt-5">
                Thank you for your interest. Your current profile and credit
                score is not eligible for any Auto Loan we have. However, we
                are continuously searching for an Auto Loan for you and will
                immediately let you know once getting somethings special. Please
                keep your profile up to date for better service.
              </p>
            </div>
          )}
        </>
      )}
    </section>
  );
}
