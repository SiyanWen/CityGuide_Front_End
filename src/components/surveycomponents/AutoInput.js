import React, { useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { addToUserSpot, modify_url } from "../../utils";

const AutoInput=({changeValue,keyDown})=>{
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const [data, setData]=useState();
    const photo = useMemo(() => {
        return { photo_reference: "" };
      }, []);

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
          "rating",
          "types",
          "user_ratings_total",
          "price_level",
          "opening_hours",
          "reviews",
          "photos"
        ],
      };
  
      setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;
    
        placeAutocomplete.addListener("place_changed", () => {
            let data = placeAutocomplete.getPlace();
            console.log(JSON.stringify(placeAutocomplete.getPlace()));

            let img_url = JSON.stringify(data.photos[0].getUrl());
            let reference = modify_url(img_url);
            photo["photo_reference"] = `${reference}`;
            delete data.photos;
            setData(data);
        });
      }, [placeAutocomplete,data,photo]);

      return (
        <div className="autoinput-container">
          <input
            ref={inputRef}
            value={data.name}
            onChange={changeValue}
            onKeyDown={keyDown}
            style={{ width: "80px", minWidth: "100px", height: "25px" }}
          />
        </div>
      );

};

export default AutoInput;
