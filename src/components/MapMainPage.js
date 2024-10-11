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
  // const position = { lat: 47.608013, lng: -122.335167 };
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // const[allSelection, setAllSelection]=useState([]);

  const [selectedPlace, setSelectdPlace] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [open, setOpen] = useState(false);

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
    setSelectdPlace(null);
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
            onPlaceSelect={setSelectdPlace}
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
              >
                <Home fontSize="small" />
              </Fab>
            </div>
          </ThemeProvider>
        </div>

        {/* <SharedDataContext.Provider value={{ totalSelection, setTotalSelection }}> */}
        <SideWindow place={selectedPlace} open={open} onClose={clearSpot}></SideWindow>
        {/* </SharedDataContext.Provider> */}

        <MapHandler place={selectedPlace} onLoad={loaded}/>
      </div>
    </APIProvider>
  );
};

export default CustomMap;
