import React, { useRef, useEffect, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import "../../styles/Autocomplete.css"

const PlaceAutocomplete = ({ onPlaceSelect, onPlace }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);

  const inputRef = useRef(null);

  const places = useMapsLibrary("places");

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
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
      console.log(JSON.stringify(placeAutocomplete.getPlace()));
    });
  }, [placeAutocomplete]);

  useEffect(() => {
    if (!onPlace) {
      inputRef.current.value = null;
      setPlaceAutocomplete(null);
    }
  }, [onPlace]);

  return (
    <div className="autocomplete-container">
      <input
        ref={inputRef}
        style={{ width: "800px", minWidth: "500px", height: "30px" }}
      />
    </div>
  );
};

export default PlaceAutocomplete;
