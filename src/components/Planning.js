import React from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "./ResponsiveAppBar";
import RoutesRender from "./RoutesPlan";

const DEFAULT_CENTER = { lat: 47.608013, lng: -122.335167 };

function Planning() {
  return (
    <>
      <ResponsiveAppBar secondElem={"My Plan Solution"} />

      <APIProvider
        solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
        apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        version="beta"
      >
        <Map
          defaultZoom={13}
          defaultCenter={DEFAULT_CENTER}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        />
        <RoutesRender />
      </APIProvider>

      <Link to="/cityguide/route">route</Link>
    </>
  );
}
export default Planning;
