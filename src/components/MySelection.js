import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import "../styles/MySelection.css";

import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../MyMuiTheme";

import SpotCard from "./SpotCard";

//spotsList={mySpots} onDeleted={onDeleted} spotcard
const MySelection = ({ mySpots, onDeleted, open, onClose }) => {

  return (
    <ThemeProvider theme={myTheme}>
      <Drawer anchor="right" open={open} sx={{ width: 550 }}>
        <div className="main-container">
          <div className="selection-list">
            <SpotCard />
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
                onClick={() => {}}
              >
                Go to Plan
              </Button>
            </Stack>
          </div>
        </div>
      </Drawer>
    </ThemeProvider>
  );
};

export default MySelection;
