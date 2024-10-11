import React from "react";

import { Link } from "react-router-dom";
import "../styles/Landing.css";
import ResponsiveAppBar from "./ResponsiveAppBar";

function Search() {
  return (
    <>
      {/* <h1 class="green">this is Search</h1>
      <Link to="/cityguide/mapping">mapping</Link> */}
      <ResponsiveAppBar
        position="fixed"
        style={{ top: 0, zIndex: 2, width: "100%", background: "transparent" }}
        secondElem={"Search"}
      />
    </>
  );
}
export default Search;
