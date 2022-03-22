import React, { useEffect } from "react";
import '../Components/CSS/Notification.css'

export const Notification = (message, types) => {

    var xxx = "gkjfsfkjghfgl";

    createNotification()

    function createNotification() {
        const toasts = document.getElementById("toasts")
        const notif = document.createElement("div")
        notif.classList.add("toast")
        notif.classList.add(types ? types : "info")
        notif.innerText = message ? message : "notification"
        console.log("xxx", notif, toasts)
        xxx = notif
        // toasts.appendChild(notif)

        // setTimeout(() => {
        //     notif.remove()
        // }, 3000)
    }

    return (
        <>
            <div id="toasts">
                {xxx}
            </div>
        </>
    )

}


export default function abcd(){
    
}
