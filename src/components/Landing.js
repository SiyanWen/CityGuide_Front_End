import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DownCircleFilled } from "@ant-design/icons";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import { TOKEN_KEY } from "../constants";
import { UserOutlined } from "@ant-design/icons";
import Select from "react-select";

// import SelectState from "./SelectState"

function Landing() {
  const [showChild, setShowChild] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();
  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
    // console.log("inputValue=" + selectedOption.label);
    navigate("/cityguide/search");
  }
  const handleLogout = (isSignedIn) => {
    localStorage.removeItem(TOKEN_KEY);
    isSignedIn = false;
    console.log("Logged out");
  };
  const options = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

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
              <ArrowCircleDownIcon
                onClick={() => {
                  setShowChild(!showChild);
                }}
                style={{ color: "white", fontSize: "8rem" }}
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
              height: "100vh",
              width: "100%",
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
            <h1 class="green" style={{ color: "white", fontSize: "40px" }}>
              My City:{" "}
            </h1>{" "}
            <Select
              className="my_select"
              value={selectedOption}
              options={options}
              onChange={handleChange}
            />
            {selectedOption && <p>Selected: {selectedOption.label}</p>}
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          <UserOutlined
            onClick={() => {
              setShowProfile(!showProfile);
            }}
            style={{ color: "white", fontSize: "40px", margin: "20px" }}
          />
          <br />
          <br />
          {showProfile && (
            <tb>
              <tr>
                <Link to="/cityguide/signin/" style={{ color: "black" }}>
                  Sign In
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/signup/" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/userinfo/" style={{ color: "black" }}>
                  My Profile
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/mygallery/" style={{ color: "black" }}>
                  My Gallery
                </Link>
              </tr>
              <tr onClick={handleLogout} style={{ cursor: "pointer" }}>
                Log out
              </tr>
            </tb>
          )}
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
          // opacity: "0.5",
        }}
      />
    </>
  );
}

export default Landing;
