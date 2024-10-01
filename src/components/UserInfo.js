import React from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";

function UserInfo() {
  return (
    <>
      <ResponsiveAppBar secondElem={"MyAccount"} />
      <h1 class="green">this is UserInfo</h1>

      <Link to="/cityguide/mygallery">Go to Gallery</Link>
    </>
  );
}
export default UserInfo;