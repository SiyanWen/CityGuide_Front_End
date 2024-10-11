import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const MarkerCluster = ({ spotsList }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {spotsList.map((spot) => {
        return (
          <div>
            <AdvancedMarker
              position={spot.geometry.location}
              scale={0.05}
            >
              <Pin
                background={"#26433e"}
                borderColor={"#26433e"}
                glyphColor={"#94d2bd"}
              ></Pin>
            </AdvancedMarker>

            <Popover
              id="mouse-over-popover"
              sx={{ pointerEvents: "none" }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>{spot.name}</Typography>
            </Popover>
          </div>
        );
      })}
    </>
  );
};

export default MarkerCluster;
