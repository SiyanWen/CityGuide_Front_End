import React from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import Box from "@mui/material/Box";

function Survey() {
  return (
    <>
      <ResponsiveAppBar secondElem={"My Plan"} />
      {/* <Box sx={{ paddingTop: "64px" }}>
        <h1 className="green">this is Survey</h1>
        <Link to="/cityguide/planning">planning</Link>
      </Box> */}
      <h1 class="green">this is Survey</h1>

      <Link to="/cityguide/planning">planning</Link>
    </>
  );
}
export default Survey;
