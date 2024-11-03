import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./appbarcomponents/ResponsiveAppBar";
import Plan from "./surveycomponents/Plan";
import Box from "@mui/material/Box";

function Survey() {
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn"));

  // check the status of login
  // useEffect(() => {
  //   const storedStatus = localStorage.getItem("isLoggedIn");
  //   const storedUsername = localStorage.getItem("username");
  //   // setIsLoggedIn(storedStatus);
  //   // if (storedUsername) {
  //   //   setUsername(storedUsername);
  //   // }
  // }, []);
  return (
    <>
      <ResponsiveAppBar
        secondElem={"Sign In"}
        isLoggedIn={isLoggedIn}
        username={username}
        // setIsLoggedIn={setIsLoggedIn}
        // setUsername={setUsername}
      />
      {/* <Box sx={{ paddingTop: "64px" }}>
        <h1 className="green">this is Survey</h1>
        <Link to="/cityguide/planning">planning</Link>
      </Box> */}

      <Plan/>
    </>
  );
}
export default Survey;
