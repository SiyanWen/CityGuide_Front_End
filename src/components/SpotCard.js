import React, { useContext, useState } from "react";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import RemoveIcon from "@mui/icons-material/Remove";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../MyMuiTheme";
import "../styles/SpotCard.css";

import CollectiveButton from "./CollectiveButton";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

//spotsList, onDeleted
const SpotCard = () => {
  return (
    <>
      {/* {spotsList.map((innerArray, outerIndex) => {
        return ( */}
      <ThemeProvider theme={myTheme}>
        <div className="card-container">
          <Card sx={{ display: "flex", maxWidth: 450 }}>
            {/* {innerArray.map((key,value) => (
                <div> */}
            <div className="photo-cotainer">
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image="https://maps.google.com/maps/contrib/117621118677247774346"
                alt="Space Needle"
              />
            </div>

            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <div className="content-cotainer">
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <div className="main-content">
                    <Typography component="div" variant="h5">
                      Space Needle
                    </Typography>
                  </div>
                  <div className="sub-content">
                    <Typography
                      variant="subtitle1"
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      Rating
                    </Typography>
                  </div>
                  <div className="stars">
                    <Box
                      sx={{
                        width: 150,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={4.6}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Box sx={{ ml: 2 }}>{labels[4.6]}</Box>
                    </Box>
                  </div>
                </CardContent>
              </div>

              <CardActions>
                <div className="button-cotainer-top">
                  <Stack direction="row" spacing={1} padding={1}>
                    <CollectiveButton />
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<MoreHorizIcon fontSize="small" />}
                      onClick={() => {}}
                    ></Button>
                  </Stack>
                </div>
                <div className="button-cotainer-bottom">
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<RemoveIcon fontSize="small" />}
                    onClick={() => {}}
                  ></Button>
                </div>
              </CardActions>
            </Box>
            {/* </div>
              ))} */}
          </Card>
        </div>
      </ThemeProvider>
      {/* //   );
      // })} */}
    </>
  );
};

export default SpotCard;
