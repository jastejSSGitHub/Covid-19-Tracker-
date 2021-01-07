import React from "react";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./Home.css";
import banner from "./covidBanner.png";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
  } from "react-router-dom";

function Content() {
  return (
    <div className="Content">
      <div className="Content__text">
        <h1>THE PANDEMIC</h1>
        <p>
        Coronavirus disease (COVID-19) is an illness caused by a coronavirus. 
        COVID-19 has spread worldwide, including to British Columbia, and has been declared a global pandemic.
        </p>
        <p>Explore the total number of cases in the world and see the impact of this virus on our modern day population</p>
        <div className="Content__more">
          <button>
          <Link to="/tracker">  <ArrowForwardIcon /></Link>            
          </button>
            <Link className="paddingleft" to="/tracker">GO TO TRACKER</Link>      
        </div>
      </div>
      <div className="Content__Img">
        <img src={banner} alt="" />
      </div>
    </div>
  );
}

export default Content;