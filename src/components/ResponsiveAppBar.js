import React, { useState } from "react";

import { TOKEN_KEY } from "../constants";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import Logo from "../home.png";
import { Space } from "antd";
import "../styles/Landing.css";
function ResponsiveAppBar(props) {
  const isSignedIn = true;
  const { secondElem } = props;
  const [showProfile, setShowProfile] = React.useState(false);
  const handleLogout = (isSignedIn) => {
    localStorage.removeItem(TOKEN_KEY);
    isSignedIn = false;
    console.log("Logged out");
  };

  return (
    <div
      className="header"
      style={{
        top: "0px",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#284642",
        padding: "10px",
      }}
    >
      <h2 style={{ fontSize: "50px" }}>
        <img src={Logo} style={{ width: "40px", margin: "20px" }} />
        <Link to="/cityguide/" style={{ color: "white" }}>
          City Guide
        </Link>
        <span style={{ margin: "20px" }}>| {secondElem}</span>
      </h2>

      <p>
        {showProfile && (
          <tb>
            <tr>
              <Link to="/cityguide/signin/" style={{ color: "black" }}>Sign In</Link>
            </tr>
            <tr>
              <Link to="/cityguide/signup/" style={{ color: "black" }}>Sign Up</Link>
            </tr>
            <tr>
              <Link to="/cityguide/userinfo/" style={{ color: "black" }}>My Profile</Link>
            </tr>
            <tr>
              <Link to="/cityguide/mygallery/" style={{ color: "black" }}>My Gallery</Link>
            </tr>
            <tr onClick={handleLogout} style={{ cursor: "pointer" }}>
              Log out
            </tr>
          </tb>
        )}

        <UserOutlined
          onClick={() => {
            setShowProfile(!showProfile);
          }}
          style={{ color: "white", fontSize: "40px", margin: "20px" }}
        />
      </p>
    </div>
  );
}
export default ResponsiveAppBar;
