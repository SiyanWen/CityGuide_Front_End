import React from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

function Planning() {
  return (
    <>
      
      <ResponsiveAppBar secondElem={"My Plan Solution"}/>
      <h1 class="green">this is Planning</h1>
      <Link to="/cityguide/route">route</Link>
    </>
  );
}
export default Planning;
