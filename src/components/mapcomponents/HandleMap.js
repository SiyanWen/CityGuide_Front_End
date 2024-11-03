import React, { useEffect, useState } from "react";
import { Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

import MarkerCluster from "./ClusterMark";
const DEFAULT_CENTER = { lat: 47.608013, lng: -122.335167 };
const DEFAULT_ZOOM = 12;
const DEFAULT_ZOOM_WITH_LOCATION = 16;

const MapHandler = ({ place, onLoad }) => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (onLoad && place && place.geometry.location) {
      setPosition(place.geometry.location);
    }
    if (!onLoad || !place) {
      setPosition(null);
    }
  }, [place, onLoad]);

  return (
    <Map
      id="gmap"
      mapId={process.env.REACT_APP_MAP_ID}
      gestureHandling={"greedy"}
      disableDefaultUI={true}
      center={position ?? DEFAULT_CENTER}
      zoom={position ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM}
    >
      {position && (
        <AdvancedMarker position={position} scale={0.05}>
          <Pin
            background={"red"}
            borderColor={"#DC143C"}
            glyphColor={"white"}
          ></Pin>
        </AdvancedMarker>
      )}
      
      {/* <MarkerCluster /> */}
    </Map>
  );
};

export default MapHandler;
