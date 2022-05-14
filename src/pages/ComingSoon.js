import React, { useEffect } from "react";

export default function CommingSoon() {


    useEffect(() => {
        let comingDate = new Date('june 1, 2022 00:00:00')

        let d = document.getElementById('days')
        let h = document.getElementById('hours')
        let m = document.getElementById('minutes')
        let s = document.getElementById('seconds')
        
        let x = setInterval(function() {
          let now = new Date()
          let selisih = comingDate.getTime() - now.getTime()
        
          let days    = Math.floor(selisih / (1000 * 60 * 60 * 24))
          let hours   = Math.floor(selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60))
          let minutes = Math.floor(selisih % (1000 * 60 * 60) / (1000 * 60))
          let seconds = Math.floor(selisih % (1000 * 60) / 1000)
        
          d.innerHTML = getTrueNumber(days)
          h.innerHTML = getTrueNumber(hours)
          m.innerHTML = getTrueNumber(minutes)
          s.innerHTML = getTrueNumber(seconds)
        
          if (selisih < 0) {
            clearInterval(x)
            d.innerHTML = '00'
            h.innerHTML = '00'
            m.innerHTML = '00'
            s.innerHTML = '00'
          }
        }, 1000)
        
        function getTrueNumber(x) {
          if (x < 10) return '0' + x
          else return x
        }
    }, [])


    return (
        <div className="coming-soon">
            <div class="page">
                <div class="countdown-col col d-flex justify-content-center align-items-center">
                    <div class=" middle">
                        <h2>Coming Soon....</h2>
                        <div className="time">
                            <span><div id="days">12</div> Days</span>
                            <span><div id="hours">06</div> Hours</span>
                            <span><div id="minutes">35</div> Minutes</span>
                            <span><div id="seconds">54</div> Seconds</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}