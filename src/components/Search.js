// import React from "react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Mapping from "./Mapping";

function Search() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check the status of login
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(storedStatus);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  
  return (
    <>
      {/* <h1 class="green">this is Search</h1>
      <Link to="/cityguide/mapping">mapping</Link> */}
      <ResponsiveAppBar

        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}

        position="fixed"
        style={{ top: 0, zIndex: 2, width: "100%", background: "transparent" }}
        secondElem={"Search"}
      />
      <Mapping />
    </>
  );
}
export default Search;
