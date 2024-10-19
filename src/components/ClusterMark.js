import React, { useState } from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const MarkerCluster = () => {
  const spots=[
    {name:'Seattle Aquarium ', location: {lat: 47.607559279254026,lng: -122.34299870775699}},
    {name:'Space Needle', location: {lat: 47.62009964037968,lng: -122.3490756210929}},
    {name:'University of Washington ', location: {lat: 47.65686865308057,lng: -122.30661818625246}},
    {name:'Frye Art Museum ', location: {lat: 47.60813784186174,lng: -122.32415216405876}},
    {name:'West Point Lighthouse', location: {lat: 47.662946075385655,lng: -122.4358662863737}},];

  const [spotsList,setSpotsList]=useState(spots);
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
      {spotsList.map((spot,index) => {
        return (
          <div key={index}>
            <AdvancedMarker
              position={spot.location}
              scale={0.05}
              clickable={true}
              onClick={handlePopoverOpen}
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
