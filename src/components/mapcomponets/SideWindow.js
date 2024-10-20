import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlaceOverview } from "@googlemaps/extended-component-library/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "../../styles/SideWindow.css";

import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../../MyMuiTheme.js";

import AddToMySelection from "./AddToMySelection.js";
import CollectiveButton from "./CollectiveButton.js";
import MySelection from "./MySelection.js";

const SideWindow = ({ place, open, onClose }) => {
  const [pid, setPid] = useState(null);
  const [mySelection, setMySelection] = useState([]);
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    if (place && place.place_id) {
      setPid(place.place_id);
      console.log(place.place_id);
    }

    if (!place) {
      setOpenList(false);
    }
  }, [place]);

  const handleAdd = () => {
    const spotAttribute = Object.entries(place);
    setMySelection([...mySelection, ...spotAttribute]);
    console.log(spotAttribute);
    console.log(mySelection);
  };

  const handleClick = () => {
    setOpenList(true);
    console.log("true");
  };

  const deleteSpot = (outerIndex) => {
    const updatedMySelection = mySelection.filter((_, i) => i !== outerIndex);
    setMySelection(updatedMySelection);
  };

  return (
    <Drawer anchor="right" open={open} sx={{ width: 550 }}>
      <div className="main-container">
        <ThemeProvider theme={myTheme}>
          <div className="place-overview">
            <PlaceOverview
              size="x-large"
              place={pid}
              googleLogoAlreadyDisplayed
            ></PlaceOverview>
          </div>

          <div className="top-button">
            <div className="my-gallery">
            <Button
                variant="contained"
                color="secondary"
              >
                <Link to="/cityguide/mygallery"></Link>
                My Gallery
              </Button>
            </div>
            <div className="my-selection">
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                My Selection
              </Button>
            </div>

            <div className="collective-button">
              <CollectiveButton />
            </div>
          </div>

          <div className="bottom-button">
            <Stack direction="row" spacing={8} padding={3}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RemoveIcon fontSize="small" />}
                onClick={onClose}
              >
                Back to Map
              </Button>

              <AddToMySelection place={place} />
            </Stack>
          </div>
        </ThemeProvider>

        <MySelection
          open={openList}
          onClose={onClose}
        />
      </div>
    </Drawer>
  );
};

export default SideWindow;
