import React, { useState, useEffect, useRef } from "react";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import "../styles/Landing.css";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import Search from "./Search.js";
import "react-country-state-city/dist/react-country-state-city.css";

function Landing({ onStateChange, onCityChange }) {
  const [showChild, setShowChild] = React.useState(true);
  // const options = [
  //   { value: "AL", label: "Alabama" },
  //   { value: "AK", label: "Alaska" },
  //   { value: "AZ", label: "Arizona" },
  //   { value: "AR", label: "Arkansas" },
  //   { value: "CA", label: "California" },
  //   { value: "CO", label: "Colorado" },
  //   { value: "CT", label: "Connecticut" },
  //   { value: "DE", label: "Delaware" },
  //   { value: "DC", label: "District Of Columbia" },
  //   { value: "FL", label: "Florida" },
  //   { value: "GA", label: "Georgia" },
  //   { value: "HI", label: "Hawaii" },
  //   { value: "ID", label: "Idaho" },
  //   { value: "IL", label: "Illinois" },
  //   { value: "IN", label: "Indiana" },
  //   { value: "IA", label: "Iowa" },
  //   { value: "KS", label: "Kansas" },
  //   { value: "KY", label: "Kentucky" },
  //   { value: "LA", label: "Louisiana" },
  //   { value: "ME", label: "Maine" },
  //   { value: "MD", label: "Maryland" },
  //   { value: "MA", label: "Massachusetts" },
  //   { value: "MI", label: "Michigan" },
  //   { value: "MN", label: "Minnesota" },
  //   { value: "MS", label: "Mississippi" },
  //   { value: "MO", label: "Missouri" },
  //   { value: "MT", label: "Montana" },
  //   { value: "NE", label: "Nebraska" },
  //   { value: "NV", label: "Nevada" },
  //   { value: "NH", label: "New Hampshire" },
  //   { value: "NJ", label: "New Jersey" },
  //   { value: "NM", label: "New Mexico" },
  //   { value: "NY", label: "New York" },
  //   { value: "NC", label: "North Carolina" },
  //   { value: "ND", label: "North Dakota" },
  //   { value: "OH", label: "Ohio" },
  //   { value: "OK", label: "Oklahoma" },
  //   { value: "OR", label: "Oregon" },
  //   { value: "PA", label: "Pennsylvania" },
  //   { value: "RI", label: "Rhode Island" },
  //   { value: "SC", label: "South Carolina" },
  //   { value: "SD", label: "South Dakota" },
  //   { value: "TN", label: "Tennessee" },
  //   { value: "TX", label: "Texas" },
  //   { value: "UT", label: "Utah" },
  //   { value: "VT", label: "Vermont" },
  //   { value: "VA", label: "Virginia" },
  //   { value: "WA", label: "Washington" },
  //   { value: "WV", label: "West Virginia" },
  //   { value: "WI", label: "Wisconsin" },
  //   { value: "WY", label: "Wyoming" },
  // ];

  const [countryid, setCountryid] = useState(233);
  const [load, setLoad] = useState(false);
  // const [stateid, setstateid] = useState(0);
  const [state, setState] = useState({ id: "", name: "" });
  const [city, setCity] = useState({ id: "", name: "" });

  // Directly update state with object
  const handleStateChange = (e) => {
    setState({ id: e.id, name: e.name }); 
};

  const handleCityChange = (e) => {
    setCity({ id: e.id, name: e.name });
};

  useEffect(() => {
    if (state.id) { 
      onStateChange(state);
    }
  }, [state.id, onStateChange]);

  useEffect(() => {
    if (city.name){
      onCityChange(city)
    }
  }, [city.name, onCityChange]);

  return (
    <>
      {showChild && (
        <>
          <div
            style={{
              margin: "auto",
              height: "100%",
              width: "100%",
              position: "fixed",
              zIndex: 100,
            }}
          >
            <div
              style={{
                margin: "auto",
                width: "100%",
                padding: "260px 0",
              }}
            >
              <h1>CityGuide</h1>
              <h1>~ MyHeartBeatMap ~</h1>
              <h5>Find Beauty And Surprise Inside Your City</h5>
              <div className="line" />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <ArrowCircleUpIcon
                onClick={() => {
                  setShowChild(!showChild);
                }}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  color: "white",
                  fontSize: "8rem",
                }}
              />
            </div>
          </div>
          <div
            style={{
              margin: "auto",
              textalign: "center",
              /* The image used */
              backgroundImage: "url('../giphy.gif')",

              /* Full height */
              width: "100vw",
              height: "100vh",
              top: 0,
              /* Center and scale the image nicely */
              backgroundPosition: "center",
              backgroundRepeat: "no - repeat",
              backgroundSize: "cover",
              opacity: "0.5",
            }}
          ></div>
        </>
      )}
      {!showChild && (
        <div>
          <div
            style={{
              margin: "350px 0px 100px",
              padding: "260px 100px0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1
              class="green"
              style={{
                color: "white",
                fontSize: "40px",
                alignItems: "center",
                display: "flex",
                marginTop: "10px",
              }}
            >
              My City:{" "}
            </h1>
            <div
              style={{
                display: "flex",
                gap: "20px",
                alignItems: "center",
                marginLeft: "50px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <StateSelect
                  countryid={countryid}
                  onChange={handleStateChange}
                  placeHolder="Select State"
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "40px",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                    fontWeight: "bold",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "16px",
                  }}
                />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <CitySelect
                  countryid={countryid}
                  stateid={state.id}
                  // onChange={(e) => console.log(e)}
                  onChange={handleCityChange}
                  placeHolder="Select City"
                  style={{
                    cursor: "pointer",
                    width: "200px",
                    height: "40px",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                    fontWeight: "bold",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "16px",
                  }}
                />
              </div>
            </div>

            {/* <Select
              className="my_select"
              value={selectedOption}
              options={options}
              // onChange={(option) => setSelectedOption(option)}
              placeholder="Select..."
              onChange={handleChange}
            />
            {selectedOption && <p>Selected: {selectedOption.label}</p>} */}
          </div>
        </div>
      )}
      <div
        style={{
          margin: "auto",
          height: "100%",
          width: "100%",
          background: "#284642",
          top: 0,
          position: "fixed",
          zIndex: -1,
        }}
      />
    </>
  );
}

export default Landing;
