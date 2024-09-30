import React, { useEffect, useState } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {Map, AdvancedMarker} from "@vis.gl/react-google-maps"

const CustomMap = () => {
  const[markerLocation, setMarkerLocation]=useState({lat:47.608013,lng:-122.335167,}); //seatlle

  return(
      <div className='map-container'>
          <Map
          defaultZoom={13}
          defaultCenter={markerLocation}
          gestureHandling={"greedy"}
          disableDefaultUI
          />

      </div>
  );

    // const [map, setMap] = useState(null);

  // const containerStyle = {
  //   width: "100%",
  //   height: "100%",
  // };

  // const center = {
  //   lat: 47.608013,
  //   lng: -122.335167,
  // };

  // useEffect(() => {
  //   // Check if the API key is available in the environment variables
  //   if (!process.env.REACT_APP_GOOGLE_MAPS_API_KEY) {
  //     console.error("Google Maps API key not found.");
  //     return;
  //   }
  // }, []);


  // return (
  //   <LoadScript
  //     googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
  //     libraries={["places"]}
  //   >
  //     <GoogleMap
  //       mapContainerStyle={containerStyle}
  //       center={center}
  //       zoom={10}
  //       onLoad={(map) => setMap(map)}
  //     >
  //       {/* Add your map markers or other components here */}
  //     </GoogleMap>
  //   </LoadScript>
  // );
}

export default CustomMap;
