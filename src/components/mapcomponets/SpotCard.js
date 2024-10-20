import React, { useContext, useState } from "react";
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
import {message} from "antd";
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
const SpotCard = () => {

  const spotsList=[{formatted_address:"400 Broad St, Seattle, WA 98109美国",
    geometry:{location:{lat:47.6205063,lng:-122.3492774},
    viewport:{south:47.6191151197085,west:-122.3506456302915,north:47.6218130802915,east:-122.3479476697085}},
    name:"Space Needle",
    place_id:"ChIJ-bfVTh8VkFQRDZLQnmioK9s",
    description:"",
    rating:4.6,
    photoUrl:"https://lh3.googleusercontent.com/places/ANXAkqG7K0AYPNXI6zDZGB_UQ3afbnE-en1ExAYpLcFKHrKuw-3VMw9tn7U53CR_jPpz_-nheABMjucOM2z7Bcd5NozDUDhoCfk1Bs0=s1600-w400"
    },
    {formatted_address:"1483 Alaskan Way Pier 59, Seattle, WA 98101美国",
    geometry:{location:{lat:47.60740020000001,lng:-122.3429559},viewport:{south:47.60608386970851,west:-122.3437540302915,north:47.6087818302915,east:-122.3410560697085}},
    name:"Seattle Aquarium",
    place_id:"ChIJQ_oEiK1qkFQRg3bU4l3mmWs",
    description:"",
    rating:4.3,
    photoUrl:"https://lh3.googleusercontent.com/places/ANXAkqElQzEOidYGttexoPsjvRbchyfAH64VFey-Ei64ipbVtw9j2CcuEABEgI3UO-yga8lnxUbxLZwgmkHOa_xpQmRaM28yENAfP-o=s1600-w400",
    },
    {formatted_address:"1410 NE Campus Pkwy, Seattle, WA 98195美国",
    geometry:{location:{lat:47.65671709999999,lng:-122.3066181},viewport:{south:47.641133,west:-122.32550785,north:47.66781700000001,east:-122.29272125}},
    name:"University of Washington",
    place_id:"ChIJ6zWFnZIUkFQRoyu4AXksdGs",
    description:"",
    rating:4.6,
    photoUrl:"https://lh3.googleusercontent.com/places/ANXAkqH-PinSTtkYfx8C995mCE_peJlMzNr-ZKma1vTXVFDb3F_YT396yutQzXb61KM52IOspVzT561EmcRi3m2FzziyzIkIYd7sbtM=s1600-w400",
    },
    {formatted_address:"704 Terry Ave, Seattle, WA 98104美国",
    geometry:{location:{lat:47.6071992,lng:-122.324147},viewport:{south:47.6056492697085,west:-122.3257266302915,north:47.6083472302915,east:-122.3230286697085}},
    name:"弗赖伊艺术博物馆",
    place_id:"ChIJEWIFw7dqkFQRDw3cK6AcdXA",
    description:"",
    rating:2,
    photoUrl:"https://lh3.googleusercontent.com/places/ANXAkqFXFbfOi7xr2Q3Y4eTs7GtHvUJEnZ1v0lBqjvdF2qgXqivWtjsOasWzJRxKCi0XgUVK9lvPBURcT4OcYFIIFdCwNOZVs7QHggk=s1600-w400",},
    {formatted_address:"美国华盛顿西雅图邮政编码: 98199",
    geometry:{location:{lat:47.6619696,lng:-122.435739},viewport:{south:47.6606206197085,west:-122.4370879802915,north:47.6633185802915,east:-122.4343900197085}},
    name:"西点灯塔",
    place_id:"ChIJBV2stQM-kFQRKppAFLB6HKg",
    description:"",
    rating:4.6,
    photoUrl:"https://lh3.googleusercontent.com/places/ANXAkqHZTUgeM9HZDJwu7rJPjjF0Tz2vY8Hh2fFV5iTCkQlTLMiiz0fMFDqIhmWMgLbi519XVj2ekxk6nwi0SSVC6IIHUxae-1vAJ8Y=s1600-w400",}];

  const [open, setOpen] = useState(false);
  

  const handleRemove = (spotId) => {
    removeSpotFromMySelection(spotId)
      .then(()=>{setOpen(true)})
      .catch((err) => message.error(err.message))
  };

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
      {spotsList.map((spot, index) => {
        return (
          <ThemeProvider theme={myTheme}>
            <div className="card-container">
              <Card sx={{ display: "flex", maxWidth: 450 }} key={index}>
                <div className="photo-cotainer">
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={spot.photoUrl}
                    alt={spot.name}
                  />
                </div>

                <Box sx={{ display: "flex", flexDirection: "column" }}>
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
                      <div className='description'>
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
                        onClick={handleRemove(spot.id)}
                      ></Button>
                      <Snackbar
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                        open={open}
                        autoHideDuration={3000}
                        onClose={handleClose}
                      >
                        <Alert
                          onClose={handleClose}
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
      })}
    </>
  );
};

export default SpotCard;
