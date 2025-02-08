import React, { useEffect, useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import {useMap} from '@vis.gl/react-google-maps';

// import MarkerCluster from "./ClusterMark";
// const DEFAULT_CENTER = { lat: 47.608013, lng: -122.335167 };
// const DEFAULT_ZOOM = 12;
// const DEFAULT_ZOOM_WITH_LOCATION = 16;

const MapHandler = ({ place, onLoad }) => {
  const map = useMap("gmap");
  console.log("useMap",map);
  
  useEffect(() => {
    console.log("enter useEffect");
    if (!map || !onLoad || !place  ) return;
    console.log("map and place load",place);
    if (place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
    }
  }, [map, onLoad ,place]);

  return null;
};

export default MapHandler;
