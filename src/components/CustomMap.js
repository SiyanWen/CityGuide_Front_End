import React, { useState, useEffect, useContext, createContext } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Fab } from "@mui/material";
import { Home } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material/styles";

import "../styles/CustomMap.css";
import myTheme from "../MyMuiTheme";
import PlaceAutocomplete from "./AutocompleteString";
import MapHandler from "./HandleMap";
import SideWindow from "./SideWindow";

// const TotalSelectionContext=createContext();

const CustomMap = () => {
  const position = { lat: 47.608013, lng: -122.335167 };
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // const[totalSelection, setTotalSelection]=useState([]);

  const [selectedPlace, setSelectdPlace] = useState(null);
  const [pid, setPid] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

  // const overlayLayoutRef = useRef(null);
  // const [overlayIsOpen, setOverlayIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedPlace) return;

    if (selectedPlace && selectedPlace.place_id) {
      setPid(selectedPlace.place_id);
    }
  }, [selectedPlace]);

  const isLoading = () => {
    setLoaded(true);
  };

  useEffect(() => {
    if (!loaded) return;
    setOpen(true);
  }, [loaded]);

  const clearSpot = () => {
    setSelectdPlace(null);
    setPid(null);

    setOpen(false);
  };

  return (
    <APIProvider
      solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
      apiKey={API_KEY}
      version="beta"
    >
      <div className="floating-navigation">
        <PlaceAutocomplete onPlaceSelect={setSelectdPlace} onLoaded={loaded} />

        <ThemeProvider theme={myTheme}>
          <div style={{ paddingLeft: "30px" }}>
            <Fab
              variant="extended"
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
            >
              <Home fontSize="small" />
            </Fab>
          </div>
        </ThemeProvider>
      </div>

      <Map
        defaultZoom={13}
        defaultCenter={position}
        mapId={process.env.REACT_APP_MAP_ID}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
      />

      {/* map view follow the pin */}
      {loaded ? (
        <MapHandler place={selectedPlace} />
      ) : (
        console.log("wait for passing")
      )}

      {/* <SharedDataContext.Provider value={{ totalSelection, setTotalSelection }}> */}
      <SideWindow placeId={pid} open={open} onClose={clearSpot}></SideWindow>
      {/* </SharedDataContext.Provider> */}
    </APIProvider>
  );
};

export default CustomMap;
