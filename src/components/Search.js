import React from "react";

import { Link } from "react-router-dom";
import "../styles/Landing.css";

function Search() {
  return (
    <>
      <h1 class="green">this is Search</h1>
      <Link to="/cityguide/mapping">mapping</Link>
    </>
  );
}
export default Search;
