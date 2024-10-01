import React from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

function Survey() {
  return (
    <>
      <ResponsiveAppBar secondElem={"My Plan"} />
      <h1 class="green">this is Survey</h1>

      <Link to="/cityguide/planning">planning</Link>
    </>
  );
}
export default Survey;
