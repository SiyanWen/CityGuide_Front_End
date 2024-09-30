"use client";

import React from "react";
// import { createRoot } from "react-dom/client";
import {APIProvider, Map,} from "@vis.gl/react-google-maps";

const API_KEY= process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const App=()=>{
  // const position ={ lat:47.608013,lng:-122.335167,};
  return(
    <APIProvider 
    solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
    apikey={API_KEY}>
      <div style={{height: "100vh"}}>
        <Map 
        defaultZoom={8} 
        defaultCenter={{ lat:47.608013,lng:-122.335167}} 
        mapId={process.env.MAP_ID}
        gestureHandling={"greedy"}
        disableDefaultUI={true}/>
      </div>;
    </APIProvider>
  );

}

export default App;

// import React from "react";
// import CustomMap from "./CustomMap";
// import {APIProvider} from '@vis.gl/react-google-maps'



// const App=()=>{
//   return(
//     <div className="app">
//       <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
//         <CustomMap/>
//       </APIProvider>
//     </div>
//   );
// }