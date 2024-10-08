import React, { useContext, useState } from "react";
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

const SpotCard = (mySelections) => {
  return (
    <>
      {mySelections.map((mySelection) => {
        return (
          <ThemeProvider theme={myTheme}>
            <Card sx={{ display: "flex", maxWidth: 450 }}>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={mySelection.photo}
                alt={mySelection.name}
              />
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {mySelection.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ color: "text.secondary" }}
                  >
                    Rating
                  </Typography>
                  <Box
                    sx={{ width: 150, display: "flex", alignItems: "center" }}
                  >
                    <Rating
                      name="text-feedback"
                      value={value}
                      readOnly
                      precision={0.5}
                      emptyIcon={
                        <StarIcon
                          style={{ opacity: 0.55 }}
                          fontSize="inherit"
                        />
                      }
                    />
                    <Box sx={{ ml: 2 }}>{labels[mySelection.rating]}</Box>
                  </Box>
                </CardContent>

                <CardActions>
                  <Stack direction="row" spacing={8} padding={3}>
                    <CollectiveButton />
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<MoreHorizIcon fontSize="small" />}
                      onClick={() => {}}
                    ></Button>
                  </Stack>

                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<RemoveIcon fontSize="small" />}
                    onClick={() => {}}
                  ></Button>
                </CardActions>
              </Box>
            </Card>
          </ThemeProvider>
        );
      })}
    </>
  );
};

export default SpotCard;
