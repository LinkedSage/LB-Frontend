import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Axios from "../Axios";
import Select from "react-select";
import "../Components/CSS/CreditCard.css";
import { CadrDetails } from "../Components/CadrDetails";
import { CardDetailsPhone } from "../Components/CardDetailsPhone";
import { useLocation } from "react-router-dom";
import PreloaderPage from '../Components/PreloaderPage'

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
  const [preloader,setPreloader] = useState(false)

  useEffect(async () => {
    let result;
    setPreloader(true)
    if (location.state && location.state.profession && location.state.salary) {
      result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cards?profession=${location.state.profession}&salary=${location.state.salary}`
      );
      setCardList(result.data);
      setCardShow(result.data.data);
    } else {
      setProfessionSalary(true);
    }
    setPreloader(false)
  }, []);

  const currency = [
    { value: "Dual", label: "Dual" },
    { value: "Local", label: "Local" },
  ];
  const cardNetwork = [
    { value: "Visa", label: "Visa" },
    { value: "Master", label: "Master" },
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

  const feesKey = [
    "img",
    "Interest Free Period",
    "Regular Anual",
    "Free anual",
    "Rewards Point",
  ];
  const anualFeesKey = [
    "img",
    "Lounge Access Fee",
    "Int. Lounge Access Fee",
    "Free Guest Allowed",
    "Int. Free Guest Allowed",
  ];
  const withdrawalKey = [
    "img",
    "Max Card Limit",
    "Free Supply Card",
    "Max Supply Card",
    "Eligible For",
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

  var classList = new Array([]);
  var classListDescription = new Array([]);
  var filteredData = [];
  function filterFun(value, key, index) {
    console.log(value, key);
    filteredData[key] = value;
    classList[key] = [
      document.getElementById("fees" + key),
      document.getElementById("anualFees" + key),
      document.getElementById("Withdrawal" + key),
    ];
    classListDescription[key] = [
      document.getElementById("feesID" + key),
      document.getElementById("anualFeesID" + key),
      document.getElementById("withdrawalID" + key),
    ];

    // feeCls.classList.add("active");
    console.log(classList);
    for (let i = 0; i < 3; i++) {
      if (i == index) classList[key][i].classList.add("active");
      else classList[key][i].classList.remove("active");
    }
    console.log(key, index, classListDescription);
    for (let i = 0; i < 3; i++) {
      if (i == index) {
        classListDescription[key][i].classList.add("d-flex");
        classListDescription[key][i].classList.remove("d-none");
      } else {
        classListDescription[key][i].classList.remove("d-flex");
        classListDescription[key][i].classList.add("d-none");
      }
    }
  }

  function clearALlFun() {
    console.log("aaaaaaaaaaaaa", currencyValue);
    setCardShow(cardList.data);
    document.getElementById("currency").value = null;
    setCurrencyValue(null);
    setCardNetworkValue(null);
    setCardTypeValue(null);
    // window.location.href = "/credit-card";
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
      // location.state.profession = profession ;
      // location.state.salary = salary;
      setPreloader(true)
      const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cards?profession=${profession}&salary=${salary}`
      );
      setCardList(result.data);
      setCardShow(result.data.data);

      setProfessionSalary(false);
      setPreloader(false)
    }
  }

  return (
    <section id="credit-card-page">
      {
        preloader?
        <PreloaderPage />
        :null
      }
      <ToastContainer></ToastContainer>
      {professionSalary ? (
        <div className="profession-salary">
          <div className="container">
            <div className="row">
              <form className="p-3">
                <h3 className="w-100 text-center">
                  Find your best <span className="h2">Credit Card</span>
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
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="card-section">
            <div class="container">
              <div class="row">
                <div class="mobile-view d-flex justify-content-around w-100 align-items-center pt-3">
                  <div className="filter">
                    <svg viewBox="0 0 512 512">
                      <path d="M3.853 54.87C10.47 40.9 24.54 32 40 32H472C487.5 32 501.5 40.9 508.1 54.87C514.8 68.84 512.7 85.37 502.1 97.33L320 320.9V448C320 460.1 313.2 471.2 302.3 476.6C291.5 482 278.5 480.9 268.8 473.6L204.8 425.6C196.7 419.6 192 410.1 192 400V320.9L9.042 97.33C-.745 85.37-2.765 68.84 3.854 54.87L3.853 54.87z" />
                    </svg>
                    Filter
                  </div>
                  <div className="card-search">
                    <input
                      type="search"
                      name="search-form"
                      id="search-form"
                      className="search-input"
                      placeholder="Search Credit Card ..."
                      onChange={(e) => setSearchFun(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div className="flex d-flex align-items-center justify-content-around filter-section ">
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

                  <div className="single-dropdown">
                    <Select
                      onChange={(e) => {
                        handleChangeCCardType(e);
                      }}
                      options={cardType}
                      placeholder="Type"
                    />
                  </div>

                  <p className="clear-filter mb-0" onClick={clearALlFun}>
                    &#x27F3;
                  </p>
                </div>
              </div>
            </div>
            <div className="container-fluid card-section-p">
              <div className="row pc-card-filter card-shadow mt-3">
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

                    <button
                      className="clear-filter card-search-phone"
                      onClick={clearALlFun}
                    >
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
                    <button
                      className="clear-filter card-search-pc mr-"
                      onClick={clearALlFun}
                    >
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
              </div>

              {cardShow && cardShow.length > 0 ? (
                <div className="row card-section-pc group-card pb-50 pt-3">
                  {cardShow
                    ? cardShow.map((item, key) => {
                        if (location.state) item.state = location.state;
                        let feesData = [
                          item.image_url,
                          item.interest_free_period,
                          item.regular_anual_fee,
                          item.free_anual_fee,
                          item.anual_fee_waived_rewards,
                        ];
                        let anualFeesData = [
                          item.image_url,
                          item.lounge_access_fee,
                          item.free_guest_allowed,
                          item.int_free_guest_allowed,
                          item.int_lounge_access_fee,
                        ];
                        let withdrawalData = [
                          item.image_url,
                          item.max_card_limit,
                          item.free_supplementary_card,
                          item.max_supplementary_card,
                          item.eligibility,
                        ];
                        return (
                          <div
                            key={key}
                            className="single-card card-shadow w-100 d-flex flex-column justify-content-center mb-4"
                          >
                            <img
                              className="bank-image w-160 pl-2 pr-2"
                              src={item.bank[0].image_url}
                              alt="card image"
                            />
                            <p className="h4 text-center mb-3 text-uppercase">
                              {item.name}
                            </p>
                            <div className="btn__group text-center mb-3">
                              <button
                                className="active"
                                id={"fees" + key}
                                onClick={(e) => {
                                  filterFun("fees", key, 0);
                                }}
                              >
                                Fees & Charges
                              </button>
                              <button
                                id={"anualFees" + key}
                                onClick={(e) => {
                                  filterFun("Anual Fees", key, 1);
                                }}
                              >
                                Lounge Facility
                              </button>
                              <button
                                id={"Withdrawal" + key}
                                onClick={(e) => {
                                  filterFun("Withdrawal", key, 2);
                                }}
                              >
                                Other Details
                              </button>
                            </div>

                            <div
                              id={"feesID" + key}
                              className="description d-flex"
                            >
                              <CadrDetails
                                title={feesKey}
                                data={feesData}
                                cardDetails={item}
                              />
                            </div>
                            <div
                              id={"anualFeesID" + key}
                              className="description d-none"
                            >
                              <CadrDetails
                                title={anualFeesKey}
                                data={anualFeesData}
                                cardDetails={item}
                              />
                            </div>
                            <div
                              id={"withdrawalID" + key}
                              className="description d-none"
                            >
                              <CadrDetails
                                title={withdrawalKey}
                                data={withdrawalData}
                                cardDetails={item}
                              />
                            </div>
                          </div>
                        );
                      })
                    : null}
                </div>
              ) : (
                <div className="empty-card-msg ptb-50 text-center">
                  <p className="h4">No Credit Card is available right now.</p>
                </div>
              )}
            </div>

            <div className="card-section-phone">
              <div className="phone-card-group">
                {cardShow
                  ? cardShow.map((item, key) => {
                      return <CardDetailsPhone cardDetails={item} key={key} />;
                    })
                  : null}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
