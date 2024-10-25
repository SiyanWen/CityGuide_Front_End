import React from "react";

import { Link } from "react-router-dom";

function RouteCom() {
  return (
    <>
      <h1 class="green">this is Route</h1>

      <Link to="/cityguide/finished">finished</Link>
    </>
  );
}
export default RouteCom;
