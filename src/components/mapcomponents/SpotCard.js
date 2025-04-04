import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
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
import { message } from "antd";
import { removeSpotFromMySelection } from "../../utils";

import { ThemeProvider } from "@mui/material/styles";
import myTheme from "../../MyMuiTheme";
import "../../styles/SpotCard.css";

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
const SpotCard = ({ spots, newList }) => {
  const [mySelection, setMySelection] = useState(spots||[]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (spots) {
      setMySelection(spots);
    }
  }, [spots]);

const deleteSpot = (spotId) => {
    const updatedMySelection = mySelection.filter(
      (spot) => spot.id !== spotId
    );
    console.log("spotid:", spotId)
    removeSpotFromMySelection(spotId)
    .then(()=>{setOpen(true)})
    .catch((err) => message.error(err.message));
    setMySelection(updatedMySelection);
    setUpdate(true); 
  };

  useEffect(() => {
    if (update) {
      newList(mySelection);
      setUpdate(false); 
    }
  }, [update, mySelection, newList]);

  // const handleRemove = (spotId) => {
  //   removeSpotFromMySelection(spotId)
  //     .then(()=>{setOpen(true)})
  //     .catch((err) => message.error(err.message))
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // {
  //   `https://maps.googleapis.com/maps/api/place/photo` +
  //   `?maxwidth=400&photoreference=${spot.image_url}` +
  //   `&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  // }
  return (
    <>
      {/* when the backend is ok, use mySelection instead of hard code spotsList*/}
      {mySelection && mySelection.length > 0 ? (
        mySelection.map((spot) => {
          return (
            <ThemeProvider theme={myTheme}>
              <div className="card-container">
                <Card sx={{ display: "flex", width:"100%" }}>
                  <div className="photo-cotainer">
                    <CardMedia
                      component="img"
                      sx={{ width:100,height:100}}
                      image={`https://maps.googleapis.com/maps/api/place/photo`
                        +`?maxwidth=400&photoreference=${spot.cover_img_url}`
                        +`&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
                      }
                      alt={spot.name}
                    />
                  </div>

                  <Box sx={{ display: "flex", flexDirection: "column"}}>
                    <div className="content-cotainer">
                      <CardContent sx={{ flex: "1 0 auto" }}>
                        <div className="main-content">
                          <Typography component="div" variant="h5">
                            {spot.name}
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
                              value={spot.rating}
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
                          <div className="description">
                            <Typography
                              variant="subtitle1"
                              component="div"
                              sx={{ color: "text.secondary" }}
                            >
                              Description:{spot.description}
                            </Typography>
                          </div>
                        </div>
                      </CardContent>
                    </div>

                    <CardActions>
                      <div className="button-cotainer-top">
                        <Stack direction="row" spacing={1} padding={1}>
                          <CollectiveButton />
                          <Button
                            size='small'
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              navigate("/cityguide/mygallery");
                            }}
                            startIcon={<MoreHorizIcon fontSize="small" />}
                          />
                        </Stack>
                      </div>

                      <div className="button-cotainer-bottom">
                        <Button
                          size='small'
                          variant="contained"
                          color="secondary"
                          startIcon={<RemoveIcon fontSize="small" />}
                          onClick={() => {
                            deleteSpot(spot.id);
                          }}
                          // handleRemove(spot.id) ???
                        />
                        <Snackbar
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                          open={open}
                          autoHideDuration={3000}
                          onClose={() => {
                            handleClose();
                          }}
                        >
                          <Alert
                            onClose={() => {
                              handleClose();
                            }}
                            severity="success"
                            variant="filled"
                            sx={{ width: "100%" }}
                          >
                            Remove success!
                          </Alert>
                        </Snackbar>
                      </div>
                    </CardActions>
                  </Box>
                </Card>
              </div>
            </ThemeProvider>
          );
        })
      )
    :<></>}
    </>
  );
};

export default SpotCard;
