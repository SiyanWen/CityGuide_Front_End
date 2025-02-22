import React, { useState, useEffect, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { Fab } from "@mui/material";
import { Home } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import "../../styles/CustomMap.css";
import myTheme from "../../MyMuiTheme";
import PlaceAutocomplete from "./AutocompleteString";
import MapHandler from "./HandleMap";
import SideWindow from "./SideWindow";
// import SideWindowButton from "./SideWindowButton";

const CustomMap = () => {
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const DEFAULT_CENTER = { lat: 47.608013, lng: -122.335167 };
  const DEFAULT_ZOOM = 12;

  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (loaded  && selectedPlace && selectedPlace.geometry.location) {
      setPosition(selectedPlace.geometry.location);
    }
    if (!loaded || !selectedPlace) {
      setPosition(null);
    }
  }, [selectedPlace, loaded]);

  // const handleSelectedPlace = (newPlace) => {
  //   setSelectdPlace(newPlace);
  // };

  // const handleClearSelectedPlace = () => {

  // };

  //   const updateSelection = (newAdd) => {
  //     setAllSelection([...allSelection,newAdd]);
  //   };
  //   const DeleteSelection = (index) => {
  //     setAllSelection(allSelection.filter((_, i) => i !== index));
  // };

  const isLoading = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) return;
    setOpen(true);
  }, [loaded]);

  const clearSpot = () => {
    setSelectedPlace(null);
    setLoaded(false);
    setOpen(false);
  };

  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={API_KEY}
      version="beta"
    >
      <div className="map-container">

        <div className="floating-navigation">
          <PlaceAutocomplete
            onPlaceSelect={setSelectedPlace}
            onPlace={selectedPlace}
          />

          <ThemeProvider theme={myTheme}>
            <div style={{ paddingLeft: "30px" }}>
              <Fab
                variant="extended"
                aria-label="none"
                color="primary"
                size="small"
                onClick={isLoading}
                style={{ boxShadow: "none" }}
              >
                Search
              </Fab>
            </div>

            <div style={{ paddingLeft: "20px" }}>
              <Fab
                variant="extended"
                aria-label="home"
                color="primary"
                size="small"
                style={{ boxShadow: "none", transform: "scale(0.95)" }}
                onClick={()=>{window.location.href = "/cityguide/search";}}
              >
                {/* <Link to="/cityguide/search"></Link> */}
                <Home fontSize="small" />
              </Fab>
            </div>
          </ThemeProvider>
        </div>

        {/* <SideWindowButton open={open} onClose={clearSpot}/> */}

        {/* <SharedDataContext.Provider value={{ totalSelection, setTotalSelection }}> */}
        <SideWindow
          place={selectedPlace}
          open={open}
          onClose={clearSpot}
        ></SideWindow>
        {/* </SharedDataContext.Provider> */}

        <Map
          id="gmap"
          mapId={process.env.REACT_APP_MAP_ID}
          defaultCenter={DEFAULT_CENTER}
          defaultZoom={DEFAULT_ZOOM}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
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
        </Map>

        <MapHandler place={selectedPlace} onLoad={loaded} />
      </div>
    </APIProvider>
  );
};

export default CustomMap;
