import React,{useEffect,useState} from 'react';
import {useMap,AdvancedMarker,Pin} from "@vis.gl/react-google-maps";


const MapHandler = ({place}) => {
    const map = useMap();
    const[position,setPosition]=useState(null);
    

    // const data = await getCoordsFromAddress(place);
    // const coordinates=data.geometry.locations;
    // const name=data.address_components.long_name;
  
    useEffect(() => {
      if (!map || !place) return;
  
      if (place.geometry && place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      }

      if (place.geometry && place.geometry.location) {
        const geo=place.geometry.location;
        setPosition(geo);
        // setPid(place.place_id);
      }
    }, [map,place]);

    return position && (
      <>
        <AdvancedMarker position={position} scale={0.05}>
          <Pin 
            background={"red"}
            borderColor={"#DC143C"}
            glyphColor={"white"}>
          </Pin>
        </AdvancedMarker>

      </>
     );
  };

export default MapHandler;