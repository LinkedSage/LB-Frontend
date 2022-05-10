import React, { useEffect, useState } from "react";
import { getApplicationBYId } from "../helpers/API/Application";
import { getCurrentUser } from "../helpers/Cookies/Cookies";
import { ToastContainer } from "react-toastify";
import { notification } from "../helpers/Confirm/ConfirmAction";
import '../Components/CSS/UserDashboard.css'
import { Link } from "react-router-dom";


export default function UserDashboard() {

    const currentUser = getCurrentUser().data
    const [application, setApplication] = useState([])

    useEffect(() => {
        console.log("current", application)
        getApplicationFun(currentUser._id)
    }, [])

    function getApplicationFun(values) {
        console.log("user     Data", values)
        getApplicationBYId(values)
            .then((res) => {
                if (res.status === 200) {
                    setApplication([res.data[15],res.data[16]])
                    console.log(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function setScheduleFun(applicationId,cardId){
        console.log("Ids",applicationId,cardId)
    }

    return (
        <section className="user-dashboard-page ptb-50">
            <ToastContainer></ToastContainer>
            <div className="container">
                {
                    application && application.length === 1 ?
                        <div className="row">
                            <div className="application-sec">
                                <h2>You haven't applied for anything yet</h2>
                            </div>

                        </div>
                        :
                        <div className="row">
                            <div className="application-sec">
                                <h1>My Applications</h1>
                                <table className="application-table mt-4">
                                    <tr>
                                        <th>SL#</th>
                                        <th>Applied For</th>
                                        <th>Product Name</th>
                                        <th>Status</th>
                                        <th>Schedule Appointment</th>
                                        <th>Remarks</th>
                                    </tr>
                                    {
                                        application.map((item,key) => {
                                            return (
                                                <tr>
                                                    <td>{key+1}.</td>
                                                    <td>Credit Card</td>
                                                    {
                                                        item.card && item.card.name?
                                                        <td>{item.card.name}</td>
                                                        :<td>VISA SIGNATURE CREDIT CARD</td>
                                                    }
                                                    {
                                                        item.status?
                                                        <td>{item.status}</td>
                                                        :null
                                                    }
                                                    
                                                    <td>
                                                        <button className="btn" onClick={()=> setScheduleFun(item._id,item.card._id)}>Set Now</button>
                                                    </td>
                                                    <td>
                                                        <Link to='/user-profile'>Update profile for quicker services</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }

                                </table>
                            </div>
                        </div>
                }
            </div>

        </section>
    )
}