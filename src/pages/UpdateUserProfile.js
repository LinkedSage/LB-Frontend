import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import "../Components/CSS/Application.css";
import "../Components/CSS/UserProfile.css";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { companyName } from "../helpers/Data/CompanyName";
import {userUpdate} from '../helpers/API/Auth'

export default function Home() {
    let location = useLocation();
    const currentUser = getCurrentUser().data
    const token = getCookies('data')
    console.log("sssssssss",currentUser)
    // let cardInfo = []

    const [hideShow, setHideShow] = useState([true, false, false, false])
    const [name, setName] = useState()
    const [fatherName, setFatherName] = useState()
    const [motherName, setMotherName] = useState()
    const [gender, setGender] = useState()
    const [dob, setDOB] = useState()
    const [permanentAddress, setPermanentAddress] = useState()
    const [currentAddress, setCurrentAddress] = useState()
    const [sendFile, setSendFile] = useState()
    const [documents, setDocuments] = useState()
    const [sendFilePaySlip, setSendFilePaySlip] = useState()
    const [paySlip, setPaySlip] = useState()

    const [pi, setPI] = useState({ })
    const [fi, setFI] = useState({})

    const uploadDocuments = (e) => {
        const file = document.getElementById("accountS").files[0];
        setSendFile(file);
        let temp = URL.createObjectURL(file);
        setDocuments(temp);
    };

    const uploadPaySlip = (e) => {
        const file = document.getElementById("paySlipImgUrl").files[0];
        setSendFilePaySlip(file);
        let temp = URL.createObjectURL(file);
        setPaySlip(temp);
      };

    function personalInfo() {
        setHideShow([!hideShow[0], false, false, false])
    }

    function financialInfo() {
        setHideShow([false, !hideShow[1], false, false])
    }

    function financialDocument() {
        setHideShow([false, false, false, !hideShow[3]])
    }

    function submitPersonalInfo() {

        Object.keys(pi).forEach(key => {
            if (pi[key] === '') {
                delete pi[key];
            }
        });
        updateUserProfile(pi)
        console.log("xxxxxxxxx", pi)
    }

    function submitFinancialInfo() {

        Object.keys(fi).forEach(key => {
            if (fi[key] === '') {
                delete fi[key];
            }
        });
        updateUserProfile(fi)
        console.log("xxxxxxxxx", fi)
    }


    function updateUserProfile(values){
        currentUser.token = token
        console.log("user     Data",currentUser)
        userUpdate(values,currentUser)
      .then((res) => {
        console.log("cccc", res);
        if (res.status === 200) {
        //   notification("success", "Login Successfully. Redirecting.. ");
          setTimeout(() => {
            window.location.href = "/";
          }, 1500);
        } else {
          notification("fail", res.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    return (
        <section id="profile-page">
            <ToastContainer></ToastContainer>
            <div className="application-form profile-form">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8 right">
                            <h3>Profile Information</h3>
                            <div className="group-info mt-5">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>Personal Information</h4>
                                    <button className="edit-btn" type="button" onClick={personalInfo}>
                                        <svg viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                                    </button>
                                </div>
                                {
                                    hideShow[0] ?
                                        <div>
                                            <div className="row form-group  mt-3">
                                                <div className="col-md-4">
                                                    <label>Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="name"
                                                            type="text"
                                                            placeholder="Enter Your Name"
                                                            defaultValue={pi.name}
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    name: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Father Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="fatherName"
                                                            type="text"
                                                            placeholder="Enter Your Father's Name"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    fatherName: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Mother Name</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="motherName"
                                                            type="text"
                                                            placeholder="Enter Your Mother's Name"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    motherName: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Gender</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="gender"
                                                            type="text"
                                                            placeholder="Enter Your Gender"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    gender: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Date of Birth</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="dob"
                                                            type="date"
                                                            placeholder="Date of Birth"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    dob: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Permanent Address</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="permanentAddress"
                                                            type="text"
                                                            placeholder="Permanent Address"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    permanentAddress: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Current Address</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="currentAddress"
                                                            type="text"
                                                            placeholder="Current Address"
                                                            onChange={(e) => {
                                                                setPI(prevState => ({
                                                                    ...prevState,
                                                                    currentAddress: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" onClick={submitPersonalInfo} type="button">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                        : null
                                }
                            </div>
                            <div className="group-info mt-3">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>Financial Information</h4>
                                    <button className="edit-btn" type="button" onClick={financialInfo}>
                                        <svg viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                                    </button>
                                </div>
                                {
                                    hideShow[1] ?
                                        <div>
                                            <div className="row form-group  mt-3">
                                                <div className="col-md-4">
                                                    <label>Profession</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <select
                                                            placeholder="Profession"
                                                            onChange={(e) => {
                                                                setFI(prevState => ({
                                                                    ...prevState,
                                                                    profession: e.target.value
                                                                }));
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
                                                </div>
                                            </div>
                                            <div className="row form-group  mt-2">
                                                <div className="col-md-4">
                                                    <label>Organization</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <Select
                                                            id="Organization"
                                                            onChange={(e) => {
                                                                setFI(prevState => ({
                                                                    ...prevState,
                                                                    organization: e.value
                                                                }));
                                                            }}
                                                            options={companyName}
                                                            placeholder="Organization"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Salary</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="salary"
                                                            type="number"
                                                            placeholder="Enter Your Salary"
                                                            onChange={(e) => {
                                                                setFI(prevState => ({
                                                                    ...prevState,
                                                                    salary: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Length of Service</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            id="los"
                                                            type="number"
                                                            placeholder="Length of Service"
                                                            onChange={(e) => {
                                                                setFI(prevState => ({
                                                                    ...prevState,
                                                                    los: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitFinancialInfo}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>

                            <div className="group-info mt-3">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>Financial Document</h4>
                                    <button className="edit-btn" type="button" onClick={financialDocument}>
                                        <svg viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                                    </button>
                                </div>
                                {
                                    hideShow[3] ?
                                        <div>
                                            <div className="row form-group mt-3">
                                                <div className="col-md-4">
                                                    <label>Bank Statement</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            className="modifyFile"
                                                            id="accountS"
                                                            accept=".pdf, .doc, .docx"
                                                            onChange={uploadDocuments}
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-4">
                                                    <label>Pay Slip</label>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="input-field">
                                                        <input
                                                            className="modifyFile"
                                                            id="paySlipImgUrl"
                                                            accept=".pdf, .doc, .docx"
                                                            onChange={uploadPaySlip}
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitFinancialInfo}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// mobile responsive done
