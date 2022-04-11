import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { companyName } from "../helpers/Data/CompanyName";
import Select from 'react-select';
import '../Components/CSS/Application.css'
import { isExistUser, forceRegister, verifyOTP } from "../helpers/API/Auth";

export default function Home() {
    let location = useLocation()
    const cardInfo = location.state.cardDetails
    const [name, setName] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [city, setCity] = useState('Select Division')
    const [profession, setProfession] = useState('salaried')
    const [organization, setOrganization] = useState()
    const [salary, setSalary] = useState()
    const [cityList, setCityList] = useState(false)
    const [professionList, setProfessionList] = useState(false)
    const [otpPopup, setOTPPopup] = useState(false)
    const [OTPCode, setOTPCode] = useState()

    useEffect(() => {
        if (cardInfo.state.profession) setProfession(cardInfo.state.profession)
        if (cardInfo.state.salary) setSalary(cardInfo.state.salary)

    }, [])

    function validationFun(fieldValue, fieldId) {
        if (fieldValue) document.getElementById(fieldId).classList.remove('empty')
        else document.getElementById(fieldId).classList.add('empty')
    }

    function checkIsExist(value) {
        isExistUser(value)
            .then((res) => {
                if (res.status === 200) {
                    console.log(200000000000000000)
                } else {
                    forceRegister(value)
                        .then((res1) => {
                            console.log("ressssss", res1)
                            if (res1.status === 200) {
                                setOTPPopup(true)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function applicationFormSubmit() {
        console.log("scsss", document.getElementById('name').classList)
        let value = {
            name: name,
            phone: phone,
            city: city,
            profession: profession,
            salary: salary,
            email: email
        }
        if (profession === 'salaried') value['organization'] = organization
        console.log("aaaaaaaa", value)


        validationFun(name, 'name')
        validationFun(phone, 'phone')
        validationFun(city, 'city')
        validationFun(email, 'email')
        validationFun(profession, 'profession')
        validationFun(salary, 'salary')

        if (profession === 'salaried') {
            if (organization) document.getElementById('Organization').classList.remove('empty')
            else document.getElementById('Organization').classList.add('empty')
        }

        if (name && phone && city && profession && profession !== 'salaried' && salary) {
            checkIsExist(value)
        }
        else {
            if (organization) {
                checkIsExist(value)
            }
        }
    }
    function setCityFun(e) {
        setCity(e)
        setCityList(false)
        let leftArrow = document.getElementById('city-arrow')
        leftArrow.classList.remove("rotation");
        document.getElementById('city').classList.remove('empty')
    }

    function setProfessionFun(e) {
        setProfession(e)
        cardInfo.state.profession = e;
        setProfessionList(false)
        let leftArrow = document.getElementById('profession-arrow')
        leftArrow.classList.remove("rotation");
        document.getElementById('profession').classList.remove('empty')
    }
    function openProfessionFun() {
        let leftArrow = document.getElementById('profession-arrow')
        if (!professionList) leftArrow.classList.add("rotation");
        else leftArrow.classList.remove("rotation");
        setProfessionList(!professionList)
    }
    function openCityListFun() {
        let leftArrow = document.getElementById('city-arrow')
        if (cityList) leftArrow.classList.remove("rotation");
        else leftArrow.classList.add("rotation");
        setCityList(!cityList)
    }
    function setNameFun(e) {
        if (e) document.getElementById('name').classList.remove('empty')
        else document.getElementById('name').classList.add('empty')
        setName(e)
    }
    function setPhoneFun(e) {
        if (e) document.getElementById('phone').classList.remove('empty')
        else document.getElementById('phone').classList.add('empty')
        setPhone(e)
    }
    function setEmailFun(e) {
        if (e) document.getElementById('email').classList.remove('empty')
        else document.getElementById('email').classList.add('empty')
        setEmail(e)
    }
    function setSalaryFun(e) {
        if (e) document.getElementById('salary').classList.remove('empty')
        else document.getElementById('salary').classList.add('empty')
        setSalary(e)
    }
    function setOrganizationFun(e) {
        if (e) document.getElementById('Organization').classList.remove('empty')
        else document.getElementById('Organization').classList.add('empty')
        setOrganization(e)
    }
    function otpVerificationFun() {
        if (OTPCode && OTPCode.length >= 6) {
            document.getElementById('otp').classList.remove('empty')
            // setOTPPopup(true)
        }
        else document.getElementById('otp').classList.add('empty')

    }

    return (
        <section id="application-page">
            <div className="application-form ptb-50">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 left">
                            <div>
                                {/* <svg viewBox="0 0 448 512"><path d="M246.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L178.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C47.63 444.9 55.81 448 64 448s16.38-3.125 22.62-9.375l160-160C259.1 266.1 259.1 245.9 246.6 233.4zM438.6 233.4l-160-160c-12.5-12.5-32.75-12.5-45.25 0s-12.5 32.75 0 45.25L370.8 256l-137.4 137.4c-12.5 12.5-12.5 32.75 0 45.25C239.6 444.9 247.8 448 256 448s16.38-3.125 22.62-9.375l160-160C451.1 266.1 451.1 245.9 438.6 233.4z"/></svg> */}
                                <p><span>Product Type</span></p>
                            </div>
                        </div>
                        <div className="col-md-8 right ">
                            <h3>
                                <svg viewBox="0 0 576 512"><path d="M168 336C181.3 336 192 346.7 192 360C192 373.3 181.3 384 168 384H120C106.7 384 96 373.3 96 360C96 346.7 106.7 336 120 336H168zM360 336C373.3 336 384 346.7 384 360C384 373.3 373.3 384 360 384H248C234.7 384 224 373.3 224 360C224 346.7 234.7 336 248 336H360zM512 32C547.3 32 576 60.65 576 96V416C576 451.3 547.3 480 512 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H512zM512 80H64C55.16 80 48 87.16 48 96V128H528V96C528 87.16 520.8 80 512 80zM528 224H48V416C48 424.8 55.16 432 64 432H512C520.8 432 528 424.8 528 416V224z" /></svg>
                                Application for {cardInfo.name}
                            </h3>

                            <div className="row form-group  mt-4">
                                <div className="col-md-4">
                                    <label>Name*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <input id="name" type="text" placeholder="Name" onChange={(e) => { setNameFun(e.target.value) }} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label>City*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <button id="city" className="select-btn d-flex align-items-center" onClick={openCityListFun}>
                                            <span id="city-arrow"><svg viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" /></svg></span>
                                            <p className="h-100">{city}</p>
                                        </button>
                                        {
                                            cityList ?
                                                <div className="city-list">
                                                    <button onClick={() => { setCityFun('Dhaka') }}>Dhaka</button>
                                                    <button onClick={() => { setCityFun('Chitagong') }}>Chitagong</button>
                                                    <button onClick={() => { setCityFun('Sylhet') }}>Sylhet</button>
                                                    <button onClick={() => { setCityFun('Rajshahi') }}>Rajshahi</button>
                                                    <button onClick={() => { setCityFun('Khulna') }}>Khulna</button>
                                                    <button onClick={() => { setCityFun('Rangpur') }}>Rangpur</button>
                                                    <button onClick={() => { setCityFun('Barisal') }}>Barisal</button>
                                                </div>
                                                : null
                                        }

                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label>Phone No.*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <input type="tel" id="phone" name="phone" placeholder="Phone no." pattern="[0-9]" required onChange={(e) => { setPhoneFun(e.target.value) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label>Email*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <input type="email" id="email" name="email" placeholder="Email" required onChange={(e) => { setEmailFun(e.target.value) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label>Profession*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <button id="profession" className="select-btn d-flex align-items-center" onClick={openProfessionFun}>
                                            <span id="profession-arrow"><svg viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" /></svg></span>
                                            <p className="h-100">{profession}</p>
                                        </button>
                                        {
                                            professionList ?
                                                <div className="city-list">
                                                    <button onClick={() => { setProfessionFun('salaried') }}>Salaried</button>
                                                    <button onClick={() => { setProfessionFun('business') }}>Businessman</button>
                                                    <button onClick={() => { setProfessionFun('doctor') }}>Doctor</button>
                                                    <button onClick={() => { setProfessionFun('landLord') }}>Land Lord</button>
                                                </div>
                                                : null
                                        }

                                    </div>
                                </div>
                            </div>
                            {
                                profession === 'salaried' ?
                                    <div className="row form-group">
                                        <div className="col-md-4">
                                            <label>Organization*</label>
                                        </div>
                                        <div className="col-md-8">
                                            <div class="input-field">
                                                {/* <span id="organization-arrow"><svg viewBox="0 0 256 512"><path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" /></svg></span> */}
                                                <Select
                                                    id='Organization'
                                                    onChange={(e) => { setOrganizationFun(e.value) }}
                                                    options={companyName}
                                                    placeholder="Organization"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    : null
                            }
                            <div className="row form-group">
                                <div className="col-md-4">
                                    <label>Salary*</label>
                                </div>
                                <div className="col-md-8">
                                    <div class="input-field">
                                        <input id="salary" type="number" placeholder="Salary" defaultValue={salary} onChange={(e) => { setSalaryFun(e.target.value) }} required />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group pt-4 pb-5">
                                <div className="col-md-12 text-center application">
                                    <button className="btn" onClick={applicationFormSubmit}>Submit</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {
                !otpPopup ?
                    <div className="poppu-container">
                        <div className="popup-sec d-flex flex-column justify-content-center align-items-center">
                            <h2 class="title mb-4">OTP Verify</h2>
                            <div class="input-field">
                                <input type="text" id="otp" placeholder="Please enter the OTP " minlength="6" onChange={(e) => { setOTPCode(e.target.value) }} required />
                            </div>
                            <input type="button" value="Verify" class="btn solid mt-3" onClick={otpVerificationFun} />
                        </div>
                    </div>
                    : null
            }

        </section>
    )
}
