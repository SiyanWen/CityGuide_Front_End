import React, { useContext, useState } from "react";
import { PlaceOverview } from "@googlemaps/extended-component-library/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import "../styles/SideWindow.css";

import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../MyMuiTheme";

import CollectiveButton from "./CollectiveButton.js";
import MySelection from "./MySelection.js";

const SideWindow = ({ placeId, open, onClose }) => {

  // const{totalSelection}=useContext(TotalSelectionContext);

  const [mySelection, setMySection] = useState(false);
  const handleClick=()=>{setMySection(!mySelection)};

  return (
    <Drawer anchor="right" open={open} sx={{width:550}}>
      <div className="main-container">
        <ThemeProvider theme={myTheme}>
          <div className="place-overview">
            <PlaceOverview
              size="x-large"
              place={placeId}
              googleLogoAlreadyDisplayed
            ></PlaceOverview>
          </div>
          <div className="top-button">
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
                <CollectiveButton/>
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
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon fontSize="small" />}
                onClick={handleClick}
              >
                Add to Plan
              </Button>
            </Stack>
          </div>
        </ThemeProvider>
        <MySelection open={mySelection} onClose={onClose}/>
      </div>
    </Drawer>
  );
};

export default SideWindow;
