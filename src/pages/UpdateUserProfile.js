import React, { useEffect, useState } from "react";
import Select from "react-select";
import "../Components/CSS/Application.css";
import "../Components/CSS/UserProfile.css";
import { getCookies, getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import { companyName } from "../helpers/Data/CompanyName";
import { userUpdate } from '../helpers/API/Auth'

export default function Home() {
    var currentUser = getCurrentUser().data
    var token = getCookies('data')

    const [hideShow, setHideShow] = useState([true, false, false, false])
    const [sendFile, setSendFile] = useState()
    const [documents, setDocuments] = useState()
    const [sendFilePaySlip, setSendFilePaySlip] = useState()
    const [paySlip, setPaySlip] = useState()
    const [personalInfo, setPersonalInfo] = useState({})
    const [financialInfo, setFinansialInfo] = useState({})
    const [sendNIDFront, setSendNIDFront] = useState()
    const [NIDFront, setNIDFront] = useState()
    const [sendNIDBack, setSendNIDBack] = useState()
    const [NIDBack, setNIDBack] = useState()
    const [organization,setOrganization] = useState({})

    useEffect(() => {
        setDefaultValues();
    }, [])

    function setDefaultValues(){
        let tempUser = {};
        Object.keys(currentUser).forEach(key => {
            if (key === 'nid_front_image_url'|| key === 'nid_back_image_url' || key === 'account_statement_pdf_url' || key === 'payslip_pdf_url' || key === 'image_url' ) { }
            else  tempUser[key] = currentUser[key];
        });
        setPersonalInfo(tempUser);
        setFinansialInfo(tempUser)
        if(tempUser && tempUser.employeement_information && tempUser.employeement_information.company_name)
        setOrganization({label:tempUser.employeement_information.company_name,value:tempUser.employeement_information.company_name})
        if(currentUser && currentUser.nid_back_image_url) {
            setNIDBack(currentUser.nid_back_image_url)
        }
        if(currentUser && currentUser.nid_front_image_url) {
            setNIDFront(currentUser.nid_front_image_url)
        }
        if(currentUser && currentUser.account_statement_pdf_url) {
            setDocuments(currentUser.account_statement_pdf_url)
        }
        if(currentUser && currentUser.payslip_pdf_url) {
            setPaySlip(currentUser.payslip_pdf_url)
        }
    }

    const uploadNIDFront = (e) => {
        document.querySelector('.input-preview-front').classList.add("has-image");
        const fileFront = document.getElementById("nidFront").files[0];
        setSendNIDFront(fileFront);
        if (fileFront) {
            let temp = URL.createObjectURL(fileFront);
            setNIDFront(temp);
        }
    };
    const uploadNIDBack = (e) => {
        document.querySelector('.input-preview-back').classList.add("has-image");
        const fileBack = document.getElementById("nidBack").files[0];
        setSendNIDBack(fileBack);
        if (fileBack) {
            let temp = URL.createObjectURL(fileBack);
            setNIDBack(temp);
        }
    };

    const uploadDocuments = (e) => {
        const file = document.getElementById("bankStatemment").files[0];
        setSendFile(file);
        if (file) {
            let temp = URL.createObjectURL(file);
            setDocuments(temp);
        }
    };

    const uploadPaySlip = (e) => {
        const file = document.getElementById("paySlip").files[0];
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
        setHideShow([false, false, !hideShow[2], false])
    }

    function financialDocumentFun() {
        setHideShow([false, false, false, !hideShow[3]])
    }

    function submitPersonal() {

        Object.keys(personalInfo).forEach(key => {
            if (personalInfo[key] === '') {
                delete personalInfo[key];
            }
        });
        updateUserProfile(personalInfo)
        console.log("xxxxxxxxx", personalInfo)
    }

    function submitFinancialInfo() {

        Object.keys(financialInfo).forEach(key => {
            if (financialInfo[key] === '') {
                delete financialInfo[key];
            }
        });
        let employeement_information = financialInfo
        updateUserProfile({ employeement_information })
        console.log("xxxxxxxxx", financialInfo)
    }

    function submitNIDFrontBack() {
        var fd = new FormData();
        if (sendNIDFront)
            fd.append("nid_front_image_url", sendNIDFront);
        if (sendNIDBack)
            fd.append("nid_back_image_url", sendNIDBack);
        console.log('nnnnnnnnnnn', fd)
        updateUserProfile(fd)
    }

    function submitFinancial() {
        var fd = new FormData();
        if (sendFile)
            fd.append("account_statement_pdf_url", sendFile);
        if (sendFilePaySlip)
            fd.append("payslip_pdf_url", sendFilePaySlip);
        console.log('nnnnnnnnnnn', fd)
        updateUserProfile(fd)
    }

    function updateUserProfile(values) {
        currentUser.token = token
        console.log("user     Data", values)
        userUpdate(values, currentUser)
            .then((res) => {
                console.log("cccc", res);
                if (res.status === 200) {
                    notification("success", res.message);
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
                        <div className="col-md-8 right pt-5 pb-5">
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
                                                            defaultValue={personalInfo.fathers_name}
                                                            placeholder="Enter Your Father's Name"
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    fathers_name: e.target.value
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
                                                            defaultValue={personalInfo.mothers_name}
                                                            placeholder="Enter Your Mother's Name"
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    mothers_name: e.target.value
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
                                                            defaultValue={personalInfo.gender}
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
                                                            defaultValue={personalInfo.date_of_birth}
                                                            placeholder="Date of Birth"
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    date_of_birth: e.target.value
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
                                                            defaultValue={personalInfo.permanent_address}
                                                            placeholder="Permanent Address"
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    permanent_address: e.target.value
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
                                                            defaultValue={personalInfo.present_address}
                                                            placeholder="Current Address"
                                                            onChange={(e) => {
                                                                setPersonalInfo(prevState => ({
                                                                    ...prevState,
                                                                    present_address: e.target.value
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
                                                            defaultValue={organization}    
                                                            onChange={(e) => {
                                                                setFinansialInfo(prevState => ({
                                                                    ...prevState,
                                                                    company_name: e.value
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
                                                            defaultValue={financialInfo.employeement_information.salary_amount}
                                                            placeholder="Enter Your Salary"
                                                            onChange={(e) => {
                                                                setFinansialInfo(prevState => ({
                                                                    ...prevState,
                                                                    salary_amount: e.target.value
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
                                                            defaultValue={financialInfo.employeement_information.total_job_experience}
                                                            placeholder="Length of Service"
                                                            onChange={(e) => {
                                                                setFinansialInfo(prevState => ({
                                                                    ...prevState,
                                                                    total_job_experience: e.target.value
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
                                                    <label>NID Front</label>
                                                    <label for='img' className="input-preview-front">
                                                        {
                                                            NIDFront ?
                                                                <img src={NIDFront} alt="NID Front"/>
                                                                : null
                                                        }


                                                        <input
                                                            className="input-preview-front__src"
                                                            id="nidFront"
                                                            accept=".jpeg, .jpg, .png"
                                                            onChange={uploadNIDFront}
                                                            type="file"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>NID Back</label>
                                                    <label for='img' className="input-preview-back">
                                                        {
                                                            NIDFront ?
                                                                <img src={NIDBack} alt="NID Back"/>
                                                                : null
                                                        }


                                                        <input
                                                            className="input-preview-back__src"
                                                            id="nidBack"
                                                            accept=".jpeg, .jpg, .png"
                                                            onChange={uploadNIDBack}
                                                            type="file"
                                                        />
                                                    </label>
                                                </div>

                                                <div className="col-md-8"></div>
                                                <div className="col-md-4">
                                                    <button className="m-2 glowing-btn" type="button" onClick={submitNIDFrontBack}>Submit</button>
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
                                            <div className="row form-group-nid mt-3">
                                                <div className="col-md-6">
                                                    <label>Bank Statement</label>
                                                    <label for='iframe' className="input-preview-front">
                                                        {
                                                            documents ?
                                                                <iframe
                                                                    src={documents}
                                                                    frameBorder="0"
                                                                    scrolling="auto"
                                                                    height="100%"
                                                                    width="100%"                                                                    
                                                                ></iframe>
                                                                : null
                                                        }

                                                        <input
                                                            className="input-preview-front__src"
                                                            id="bankStatemment"
                                                            accept=".pdf"
                                                            onChange={uploadDocuments}
                                                            type="file"
                                                        />
                                                    </label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>Pay Slip</label>
                                                    <label for='iframe' className="input-preview-back">
                                                        {
                                                            paySlip ?
                                                                <iframe
                                                                    src={paySlip}                                                                    
                                                                    frameBorder="0"
                                                                    scrolling="auto"
                                                                    height="100%"
                                                                    width="100%"
                                                                ></iframe>
                                                                : null
                                                        }

                                                        <input
                                                            className="input-preview-back__src"
                                                            id="paySlip"
                                                            accept=".pdf"
                                                            onChange={uploadPaySlip}
                                                            type="file"
                                                        />
                                                    </label>
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
