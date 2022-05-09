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

    const [personalInfo, setPersonalInfo] = useState({ })
    const [financialInfo, setFinansialInfo] = useState({})

    const[sendNIDFront,setSendNIDFront] = useState()
    const[NIDFront,setNIDFront] = useState()

    useEffect(() => {
        
    },[])

    const uploadNIDFront = (e) => {
        const fileFront = document.getElementById("nidFront").files[0];
        setSendNIDFront(fileFront);
        let temp = URL.createObjectURL(fileFront);
        setNIDFront(temp);
    };

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

    function personalInfoFun() {
        setHideShow([!hideShow[0], false, false, false])
    }

    function financialInfoFun() {
        setHideShow([false, !hideShow[1], false, false])
    }

    function nidFrontBackFun() {
        setHideShow([false, false, !hideShow[2],false])
    }

    function financialDocumentFun() {
        setHideShow([false, false, false, !hideShow[3]])
    }

    function submitPersonal() {

        Object.keys(financialInfo).forEach(key => {
            if (financialInfo[key] === '') {
                delete financialInfo[key];
            }
        });
        updateUserProfile(financialInfo)
        console.log("xxxxxxxxx", financialInfo)
    }

    function submitFinancial() {

        Object.keys(financialInfo).forEach(key => {
            if (financialInfo[key] === '') {
                delete financialInfo[key];
            }
        });
        updateUserProfile(financialInfo)
        console.log("xxxxxxxxx", financialInfo)
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
                                    <button className="edit-btn" type="button" onClick={personalInfoFun}>
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
                                                            defaultValue={personalInfo.name}
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
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
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    currentAddress: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" onClick={submitPersonal} type="button">Submit</button>
                                                </div>
                                            </div>

                                        </div>
                                        : null
                                }
                            </div>
                            <div className="group-info mt-3">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>Financial Information</h4>
                                    <button className="edit-btn" type="button" onClick={financialInfoFun}>
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
                                                                setFinansialInfo(prevState => ({
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
                                                                setFinansialInfo(prevState => ({
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
                                                                setFinansialInfo(prevState => ({
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
                                                                setFinansialInfo(prevState => ({
                                                                    ...prevState,
                                                                    los: e.target.value
                                                                }));
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitFinancial}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="group-info mt-3">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>NID Front / Back</h4>
                                    <button className="edit-btn" type="button" onClick={nidFrontBackFun}>
                                        <svg viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" /></svg>
                                    </button>
                                </div>
                                {
                                    hideShow[2] ?
                                        <div>
                                            <div className="row form-group-nid mt-3">
                                                <div className="col-md-6">
                                                    <label>Bank Statement</label>
                                                    <label for='img' className="input-preview">
                                                        <input
                                                            className="input-preview__src"
                                                            id="nidFront"
                                                            accept=".jpeg, .jpg, .png"
                                                            onChange={uploadNIDFront}
                                                            type="file"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Pay Slip</label>
                                                    <div className="input-field">
                                                        <input
                                                            className="input-preview__src"
                                                            id="nidBack"
                                                            accept=".jpeg, .jpg, .png"
                                                            onChange={uploadPaySlip}
                                                            type="file"
                                                        />
                                                    </div>
                                                </div>    
                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitFinancial}>Submit</button>
                                                </div>                                            
                                            </div>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="group-info mt-3">
                                <div className="pl-3 pr-3 d-flex justify-content-between align-items-center form-grp">
                                    <h4>Financial Document</h4>
                                    <button className="edit-btn" type="button" onClick={financialDocumentFun}>
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
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitFinancial}>Submit</button>
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
