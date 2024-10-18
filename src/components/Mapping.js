import React from "react";

import { Link } from "react-router-dom";
import "../styles/Landing.css";
function Mapping() {
  return (
    <>
      <h1 class="green">this is Mapping</h1>

      <Link to="/cityguide/survey">survey</Link>
    </>
  );
}
export default Mapping;
