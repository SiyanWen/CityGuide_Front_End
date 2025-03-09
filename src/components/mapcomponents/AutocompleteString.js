import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import "../../styles/Autocomplete.css"
import { WidthFull } from "@mui/icons-material";

const PlaceAutocomplete = ({ onPlaceSelect, onPlace }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);

  const inputRef = useRef(null);

  const places = useMapsLibrary("places");
  useEffect(()=>{console.log('inputref work:',inputRef.current)},[inputRef.current]);
  useEffect(() => {
    if (!places || !inputRef.current) return;

    const options = {
      fields: [
        "geometry",
        "name",
        "formatted_address",
        "place_id",
        // "rating",
        // "types",
        // "user_ratings_total",
        // "price_level",
        // "opening_hours",
        // "reviews",
        // "photos"
      ],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    console.log("place autocomplete",placeAutocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      // onPlaceSelect(placeAutocomplete.getPlace());
      const place = placeAutocomplete.getPlace();
      onPlaceSelect(place);
      console.log(JSON.stringify(placeAutocomplete.getPlace()));
      console.log(placeAutocomplete.getPlace());
      
    });
  }, [placeAutocomplete]);

  useEffect(() => {
    if (!onPlace) {
      inputRef.current.value = null;
      setPlaceAutocomplete(null);
    }
  }, [onPlace]);

  return (
    <>
    <div className="autocomplete">
      <input
        ref={inputRef}
        // style={{ width: "800px", minWidth: "500px", height: "30px" }}
        style={{width:"100%", height:"100%", padding: "0px",border: "none", outline: "none",boxSizing: "border-box",zIndex:'1200'}}
      />
    </div>
    </>
  );
};

export default PlaceAutocomplete;
