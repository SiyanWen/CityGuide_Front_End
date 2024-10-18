import React, { useState } from "react";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ".../styles/MySelection.css";


import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../../MyMuiTheme";

import SpotCard from "./SpotCard";

//spotsList={mySpots} onDeleted={onDeleted} spotcard
const MySelection = ({open, onClose}) => {
  const [spotsData, setSpotsData] = useState([]);

  useEffect(() => {
    getMySelection()
      .then((data) => {
        setSpotsData(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
  }, []);

  return (
    <ThemeProvider theme={myTheme}>
      <Drawer anchor="right" open={open} sx={{ width: 550 }}>
        <div className="main-container">
          <div className="selection-list">
            <SpotCard spotsList={spotsData}/>
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
              >
                <Link to="/cityguide/survey">survey</Link>
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
