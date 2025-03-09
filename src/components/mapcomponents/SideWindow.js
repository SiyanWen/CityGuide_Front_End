import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlaceOverview } from "@googlemaps/extended-component-library/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
// import "../../styles/SideWindow.css";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../../MyMuiTheme.js";

import AddToMySelection from "./AddToMySelection.js";
import CollectiveButton from "./CollectiveButton.js";
import MySelection from "./MySelection.js";

const SideWindow = ({ place, open, onClose,isLoggedIn }) => {
  const [pid, setPid] = useState(null);
  const [mySelection, setMySelection] = useState([]);
  // const [openList, setOpenList] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (place && place.place_id) {
      setPid(place.place_id);
      console.log(place.place_id);
    }

    // if (!place) {
    //   setOpenList(false);
    // }
  }, [place]);

  const handleAdd = () => {
    const spotAttribute = Object.entries(place);
    setMySelection([...mySelection, ...spotAttribute]);
    console.log(spotAttribute);
    console.log(mySelection);
  };

  const handleClick = () => {
    navigate("/cityguide/myselection");
    // setOpenList(true);
    // console.log("true");
  };

  const deleteSpot = (outerIndex) => {
    const updatedMySelection = mySelection.filter((_, i) => i !== outerIndex);
    setMySelection(updatedMySelection);
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Drawer
        anchor="right"
        open={open}
        sx={{
          "& .MuiDrawer-paper": {
            width: "20vw",
            height: "100vh",
            position: "absolute",
          },
        }}
      >
        <ThemeProvider theme={myTheme}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              p: 2,
              bgcolor: "background.paper",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClick}
              >
                My Selection
              </Button>

              <Button variant="contained" color="secondary">
                <Link to="/cityguide/mygallery"></Link>
                My Gallery
              </Button>

              <CollectiveButton />
            </Stack>
          </Box>

          <Box sx={{ overflow: "auto", pt: 8, pb: 8 }}>
            <div style={{ height: "1500px", padding: "16px" }}>
              <PlaceOverview
                size="x-large"
                place={pid}
                googleLogoAlreadyDisplayed
              ></PlaceOverview>
            </div>
          </Box>

          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              p: 2,
              bgcolor: "background.paper",
              borderTop: "1px solid #ddd",
            }}
          >
            <Stack
              direction="row"
              spacing={5}
              sx={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                size="small"
                startIcon={<RemoveIcon fontSize="small" />}
                onClick={onClose}
              >
                Back to Map
              </Button>

              <AddToMySelection place={place} />
            </Stack>
          </Box>

          {/* 点击My Selection后打开的另外一个drawer */}
          {/* <MySelection open={openList} onClose={onClose} isLoggedIn={isLoggedIn}/> */}
        </ThemeProvider>
      </Drawer>
    </Box>
  );
};

export default SideWindow;
