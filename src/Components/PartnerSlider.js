import React from "react";
import "../assets/css/homeSlider.css";
import client1 from "../assets/images/clients/city islamic.png";
import client2 from "../assets/images/clients/city.png";
import client3 from "../assets/images/clients/scb.png";
import client4 from "../assets/images/partners/ajkerdeal.png";
import client6 from "../assets/images/partners/bdjobs.png";
import client5 from "../assets/images/partners/delivery tiger.png";
import client7 from "../assets/images/partners/nfl.png";

function PartnerSlider() {
  return (
    <div className="__slider ">
      <div className="__slide-track">
        <div className="__slide">
          <img src={client1} alt="partner img" ></img>
        </div>
        <div className="__slide">
          <img src={client2} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client3} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client4} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client5} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client6} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client7} alt="partner img"></img>
        </div>

        <div className="__slide">
          <img src={client1} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client2} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client3} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client4} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client5} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client6} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client7} alt="partner img"></img>
        </div>

        <div className="__slide">
          <img src={client1} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client2} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client3} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client4} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client5} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client6} alt="partner img"></img>
        </div>
        <div className="__slide">
          <img src={client7} alt="partner img"></img>
        </div>
      </div>
    </div>
  );
}

export default PartnerSlider;
