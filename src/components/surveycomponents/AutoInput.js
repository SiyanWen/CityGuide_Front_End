import React, { useEffect, useRef, useState, useMemo } from "react";
import { useMapsLibrary, APIProvider } from "@vis.gl/react-google-maps";
import { addToUserSpot, modify_url } from "../../utils";
import "../../styles/AutoInput.css";

const AutoInput = ({ value, changeValue, keyDown, setNewSpot }) => {
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [placeGM, setPlaceGM] = useState(null);
  const [data, setData] = useState();
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
        "photos",
      ],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    console.log("Does it work here autocomplete");
  }, [places, inputRef.current]);

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
      setNewSpot({ ...data, ...photo });
    });
  }, [placeAutocomplete, data, photo]);

  useEffect(() => {
    if (!data) return;
    setPlaceGM(
      new places.Place({ id: data.place_id, requestedLanguage: "en" })
    );
    console.log("Does it work here place");
  }, [data]);

  useEffect(() => {
    if (!placeGM) return;
    const another_req = { fields: ["editorialSummary"] };
    placeGM.fetchFields(another_req);
    let str = placeGM.editorialSummary;
    setNewSpot((prevState) => ({
      ...prevState,
      ["edieditorial_summary"]: `${str}`,
    }));
    console.log("Does it work here summary");
  }, [placeGM]);

  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
      version="beta"
    >
      <div className="autoinput-container">
        <input
          ref={inputRef}
          value={value}
          onChange={changeValue}
          onKeyDown={keyDown}
        />
      </div>
    </APIProvider>
  );
};

export default AutoInput;
