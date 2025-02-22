// import React from "react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/Landing.css";
import Input from "@mui/joy/Input";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CollectiveButton from "./mapcomponents/CollectiveButton.js";
// import { ThemeProvider } from "@mui/material/styles";
// import myTheme from "../MyMuiTheme.js";
import "../styles/Search.css";
import ResponsiveAppBar from "./appbarcomponents/ResponsiveAppBar";
import Mapping from "./Mapping";

function Search() {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate("/cityguide/mapping");
  };

  const navigToAccount=()=>{
    navigate("/cityguide/userinfo");
  };

  const navigToMySelection=()=>{
    navigate("/cityguide/mapping");
  };

  const backToCity=()=>{
    navigate("/cityguide");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "5vh",
          left: "3vw",
          width: "10vw",
          height: "5vh",
              }}>
        <IconButton 
          variant="contained"
          onClick={()=>{backToCity()}}>
          <ArrowBackIosNewIcon/>
          Back to My City
        </IconButton>
      </Box>


      {/* Account & Cart */}
      <Box
        sx={{
          position: "absolute",
          top: "3vh",
          right: "3vw",
          width: "10vw",
          height: "10vh",
        }}
      >
        <Tooltip title="Go to my account">
          <Button
            variant="outlined"
            color="light grey"
            size='small'
            opacity="0.5" 
            sx={{ borderRadius: "50%", height:"6vh",mr:2, 
              '&:active':{boxShadow: 'none'},
              '&:focus':{boxShadow: 'none'},
              '&:hover':{boxShadow: 'none'}
            }}
            onClick={()=>{navigToAccount()}}
          >
            <PersonOutlineOutlinedIcon fontSize='medium'/>
          </Button>
        </Tooltip>
        <Tooltip title="Go to my selection">
          <Button
           variant="outlined"
           color="light grey"
           size='medium'
           opacity="0.5" 
           sx={{ borderRadius: "50%", height:"6vh", mr:2,
             '&:active':{boxShadow: 'none'},
             '&:focus':{boxShadow: 'none'},
             '&:hover':{boxShadow: 'none'}
           }}
            onClick={()=>{navigToMySelection()}}
          >
            <ShoppingCartOutlinedIcon fontSize='medium' />
          </Button>
        </Tooltip>
      </Box>

      <div className="header">
        <h1>Mark My Target Spots</h1>
      </div>

      {/* <ThemeProvider theme={myTheme}> */}

      {/* Input Bar */}
      <Input
        variant="soft"
        sx={{
          position: "relative",
          top: -150,
          left: -20,
          width: "75vw",
          height: 45,
        }}
        size="lg"
        placeholder="Search Spots "
        startDecorator={<SearchIcon fontSize="xl" />}
        endDecorator={
          <Button
            variant="contained"
            sx={{ height: 38 }}
            color="light grey"
            opacity="0.5"
            onClick={() => {
              handleSearch();
            }}
          >
            <h5>Search</h5>
          </Button>
        }
      />

      {/* Topics' Blocks */}
      <Box
        sx={{
          position: "relative",
          top: -140,
          left: "8vw",
          width: "80vw",
          height: "8vh",
          display: "flex",
          flexDirection: "row",
          p: 7,
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          HIKING
        </Button>
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          NATURE
        </Button>
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          CULTURE
        </Button>
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          EATING
        </Button>
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          DRINKING
        </Button>
        <Button
          size="lg"
          sx={{ width: "8%" }}
          variant="contained"
          color="#C7F7C7"
          onClick={() => {}}
        >
          SHOPPING
        </Button>
      </Box>

      {/* The bottom dark green block */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100vw",
          height: "50vh",
          bgcolor: "#26433e",
        }}
      >

        {/* Two sentence */}
        <Stack
          direction="row"
          spacing={50}
          padding={5}
          sx={{ justifyContent: "center", alignItems: "center" }}
        >
          <h2>Top Route Recommendations</h2>
          <Button
            variant="plain"
            color="secondary"
            size="large"
            sx={{
              position: "relative",
              left: "15vw",
              width: "12vw",
              height: "5vh",
            }}
            startDecorator={<TrendingFlatIcon fontSize="large" />}
            onClick={{}}
          >
            <h6>See Ranking List</h6>
          </Button>
        </Stack>

        {/* The routies recommendation cards */}
        <Box
          sx={{
            width: "80%",
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              position: "relative",
              top: "8vh",
              left: "10vw",
              width: "13vw",
              height: "13vh",
              bgcolor: "white",
              opacity: 0.3,
            }}
          >
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box
                sx={{
                  content: '""',
                  position: "absolute",
                  top: "1%",
                  right: 5,
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
            <div className="route-title">
              <Typography level="title-lg">Route Title</Typography>
            </div>
            <CardContent
              orientation="horizontal"
              sx={{ alignItems: "center", mx: -1 }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: "2%",
                  right: 5,
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
