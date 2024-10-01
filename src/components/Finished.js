import React from "react";

import { Link } from "react-router-dom";

function Finished() {
  return (
    <>
      <h1 class="green">this is Finished</h1>

      <Link to="/cityguide/route">See my trip plan</Link>
      <br />
      <Link to="/cityguide/planning">Return to planning page</Link>
      <br />
      <Link to="/cityguide/">Return to Home Page</Link>
    </>
  );
}
export default Finished;
