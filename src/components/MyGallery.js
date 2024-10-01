import React from "react";

import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
function MyGallery() {
  return (
    <>
      <ResponsiveAppBar secondElem={"My Gallery"}/>
      <h1>this is My Gallery</h1>
    </>
  );
}
export default MyGallery;
