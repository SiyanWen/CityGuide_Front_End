import React from "react";
import CustomMap from "./CustomMap";
import {APIProvider} from '@vis.gl/react-google-maps'



function App(){
  return(
    <div className="app">
      {/* <APIProvider apiKey={process.env.GOOGLE_MAPS_API_KEY}>
        <CustomMap/>
      </APIProvider> */}
      <CustomMap/>
    </div>
  );
}

export default App;
