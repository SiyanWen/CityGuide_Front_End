// import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import Input from "@mui/joy/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Remove";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CollectiveButton from "./mapcomponents/CollectiveButton.js";
// import { ThemeProvider } from "@mui/material/styles";
// import myTheme from "../MyMuiTheme.js";
import ResponsiveAppBar from "./appbarcomponents/ResponsiveAppBar";
import Mapping from "./Mapping";

function Search() {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/cityguide/mapping");
  };
  return (
    <Box>
      <h1>Mark My Target Spots</h1>
      {/* <ThemeProvider theme={myTheme}> */}
      <Input
        variant="soft"
        placeholder="Search Spots "
        startDecorator={<SearchIcon fontSize="xl" />}
        endDecorator={
          <Button
            variant="contained"
            color="neutral"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </Button>
        }
        sx={{ width: 300 }}
      />

      <Box
        sx={{
          width: "80%",
          maxWidth: 500,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          HIKING
        </Button>
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          NATURE
        </Button>
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          CULTURE
        </Button>
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          EATING
        </Button>
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          DRINKING
        </Button>
        <Button
          size="lg"
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          SHOPPING
        </Button>
      </Box>

      <Box>
        <h1>Top Route Recommendations</h1>
        <Button
          variant="plain"
          color="secondary"
          size="small"
          startDecorator={<ArrowRightAltIcon fontSize="small" />}
          onClick={{}}
        >
          See Ranking List
        </Button>
        <Box
          sx={{
            width: "80%",
            maxWidth: 500,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Card variant="outlined" sx={{ minWidth: 300 }}>
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    m: "-2px",
                    borderRadius: "50%",
                    background:
                      "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                  },
                }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  size="sm"
                  sx={{ ml: "auto" }}
                >
                  <MoreHoriz />
                </IconButton>
                <IconButton
                  size="sm"
                  variant="plain"
                  color="neutral"
                  sx={{ ml: "auto", alignSelf: "flex-start" }}
                >
                  <StarBorderIcon color="danger" />
                </IconButton>
              </Box>
            </CardContent>
            <div>
              <Typography level="title-lg">Route Title</Typography>
            </div>
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box
                sx={{
                  width: 0,
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <IconButton variant="plain" color="neutral" size="sm">
                  <AddCircleIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
      {/* </ThemeProvider> */}
    </Box>
  );
}
export default Search;
