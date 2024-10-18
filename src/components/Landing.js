import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DownCircleFilled } from "@ant-design/icons";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDownTwoTone";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import { useNavigate } from "react-router-dom";
import "../styles/Landing.css";
import { TOKEN_KEY } from "../constants";
import { UserOutlined } from "@ant-design/icons";
import Select from "react-select";

import {
  Typography,
  Button,
  TextField,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// import SelectState from "./SelectState"

function Landing() {
  const [showChild, setShowChild] = React.useState(true);
  const [showProfile, setShowProfile] = React.useState(false);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 40,
      borderRadius: 5,
      paddingLeft: 10,
      fontSize: "16px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "16px",
    }),
  };

  ///////////////////////////////////////////////////////
  // drag arrow event
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ top: 0 }); // 控制箭头位置
  const startY = useRef(null);

  const handleMouseDown = (e) => {
    setDragging(true);
    startY.current = e.clientY; // 记录鼠标开始的Y坐标
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;

    const dragDistance = startY.current - e.clientY;
    if (dragDistance < 0) {
      // 确保只处理向上拖动的情况
      setPosition({ top: dragDistance }); // 更新箭头的位置
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    if (position.top < -50) {
      // 如果拖动超过50px，触发 onClick 行为
      setShowChild(!showChild);
    }
    setPosition({ top: 0 }); // 重置位置
  };

  ////////////////////////////////////////////////////////

  const navigate = useNavigate();
  function handleChange(selectedOption) {
    setSelectedOption(selectedOption);
    // console.log("inputValue=" + selectedOption.label);
    navigate("/cityguide/search");
  }
  const handleLogout = (isSignedIn) => {
    localStorage.removeItem(TOKEN_KEY);
    isSignedIn = false;
    console.log("Logged out");
  };
  const options = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "DC", label: "District Of Columbia" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" },
  ];

  return (
    <>
      {showChild && (
        <>
          <div
            style={{
              margin: "auto",
              height: "100%",
              width: "100%",
              position: "fixed",
              zIndex: 100,
            }}
          >
            <div
              style={{
                margin: "auto",
                width: "100%",
                padding: "260px 0",
              }}
            >
              <h1>CityGuide</h1>
              <h1>~ MyHeartBeatMap ~</h1>
              <h5>Find Beauty And Surprise Inside Your City</h5>
              <div className="line" />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <ArrowCircleUpIcon
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={() => {
                  setShowChild(!showChild);
                }}
                style={{
                  position: "relative",
                  top: `${position.top}px`, // 动态控制箭头的位置
                  cursor: "pointer", // 鼠标悬停显示手型
                  color: "white",
                  fontSize: "8rem",
                  transition: "top 0.3s ease", // 平滑的拖动效果
                  animation: "moveUp 2s infinite", // 加入动画效果
                }}
              />
            </div>
          </div>
          <div
            style={{
              margin: "auto",
              textalign: "center",
              /* The image used */
              backgroundImage: "url('../giphy.gif')",

              /* Full height */
              width: "100vw",
              height: "100vh",
              top: 0,
              /* Center and scale the image nicely */
              backgroundPosition: "center",
              backgroundRepeat: "no - repeat",
              backgroundSize: "cover",
              opacity: "0.5",
            }}
          ></div>
        </>
      )}
      {!showChild && (
        <div>
          {/* <Box
            sx={{
              backgroundColor: "#1976d2",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <Box
              sx={{
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "8px",
                maxWidth: "900px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Select
                className="my_select"
                value={selectedOption}
                options={options}
                onChange={handleChange}
                placeholder="Where are you going?"
                styles={{
                  control: (base) => ({
                    ...base,
                    width: 300,
                    fontSize: "16px",
                    padding: "8px",
                  }),
                }}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select your dates"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                color="primary"
                sx={{ height: "56px" }}
              >
                Search
              </Button>
            </Box>
          </Box> */}
          <div
            style={{
              margin: "350px 0px 100px",
              padding: "260px 100px0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h1 class="green" style={{ color: "white", fontSize: "40px" }}>
              My City:{" "}
            </h1>
            <Select
              className="my_select"
              value={selectedOption}
              options={options}
              // onChange={(option) => setSelectedOption(option)}
              placeholder="Select..."
              onChange={handleChange}
            />
            {selectedOption && <p>Selected: {selectedOption.label}</p>}
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Select a date"
                value={selectedDate}
                onChange={(newValue) => setSelectedDate(newValue)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    style={{ backgroundColor: "white" }}
                  />
                )}
              />
            </LocalizationProvider>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "56px" }}
              onClick={handleChange}
            >
              Search
            </Button> */}
            {/* <Select
              className="my_select"
              value={selectedOption}
              options={options}
            />
            {selectedOption && <p>Selected: {selectedOption.label}</p>}
            <LocalizationProvider
              className="my_select"
              dateAdapter={AdapterDayjs}
            >
              <DatePicker
                label="Select a date"
                value={selectedDate}
                onChange={(newValue) => {
                  setSelectedDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider> */}

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
          {/* 静态图片展示 */}
          <Box sx={{ padding: "40px 0" }}>
            <Typography variant="h5" align="center" gutterBottom>
              Nearby destinations
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ ml: 2 }}>
              {[
                {
                  city: "New York",
                  img: "/NY.jpg",
                  activities: "1740 things to do",
                },
                {
                  city: "Las Vegas",
                  img: "/NY.jpg",
                  activities: "873 things to do",
                },
                {
                  city: "Key West",
                  img: "/NY.jpg",
                  activities: "251 things to do",
                },
                {
                  city: "San Diego",
                  img: "/NY.jpg",
                  activities: "348 things to do",
                },
                {
                  city: "Miami",
                  img: "/NY.jpg",
                  activities: "726 things to do",
                },
                {
                  city: "New Orleans",
                  img: "/NY.jpg",
                  activities: "521 things to do",
                },
              ].map((place, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="140"
                      image={place.img} // 替换为图片的路径
                      alt={place.city}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {place.city}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {place.activities}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          {/* <UserOutlined
            onClick={() => {
              setShowProfile(!showProfile);
            }}
            style={{ color: "white", fontSize: "40px", margin: "20px" }}
          /> 
          <br />
          <br />
          {/* {showProfile && (
            <tb>
              <tr>
                <Link to="/cityguide/signin/" style={{ color: "black" }}>
                  Sign In
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/signup/" style={{ color: "black" }}>
                  Sign Up
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/userinfo/" style={{ color: "black" }}>
                  My Profile
                </Link>
              </tr>
              <tr>
                <Link to="/cityguide/mygallery/" style={{ color: "black" }}>
                  My Gallery
                </Link>
              </tr>
              <tr onClick={handleLogout} style={{ cursor: "pointer" }}>
                Log out
              </tr>
            </tb>
          )} */}
        </div>
      )}
      <div
        style={{
          margin: "auto",
          height: "100%",
          width: "100%",
          background: "#284642",
          top: 0,
          position: "fixed",
          zIndex: -1,
          // opacity: "0.5",
        }}
      />
    </>
  );
}

export default Landing;
