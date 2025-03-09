// import React from "react";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMapsLibrary, APIProvider } from "@vis.gl/react-google-maps";
import { logout } from "../utils";
import { message } from "antd";
import "../styles/Landing.css";
import Input from "@mui/joy/Input";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/joy/IconButton";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CardContent from "@mui/joy/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/joy/Typography";
import SearchIcon from "@mui/icons-material/Search";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import CollectiveButton from "./mapcomponents/CollectiveButton.js";
// import { ThemeProvider } from "@mui/material/styles";
// import myTheme from "../MyMuiTheme.js";
import "../styles/Search.css";

const pages = ["My Account", "Log out"];
const pages1 = ["Sign in", "Sign up"];

function Search({
  isLoggedIn,
  setIsLoggedIn,
  username,
  setUsername,
  onCity,
  onState,
  onPlaceSelect,
}) {
  const cardList = [1, 2, 3, 4];
  const topicsList = [
    "HIKING",
    "NATURE",
    "CULTURE",
    "EATING",
    "DRINKING",
    "SHOPPING",
  ];

  const image = false;
  const [anchorElNav, setAnchorElNav] = useState(null); // El - element
  const navigate = useNavigate();

  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const [place, setPlace] = useState(null);
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    console.log("input:", inputRef.current);
  }, [inputRef.current]);

  useEffect(() => {
    if (!places || !inputRef.current) return;
    const inputElement = inputRef.current.querySelector("input");
    if (!inputElement) return;
    console.log("placeAutocomplete work here");
    const options = {
      fields: ["geometry", "name", "formatted_address", "place_id"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputElement, options));
    console.log(placeAutocomplete);
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;
    placeAutocomplete.addListener("place_changed", () => {
      setPlace(placeAutocomplete.getPlace());
    });
    console.log("placedetails:", JSON.stringify(placeAutocomplete.getPlace()));
    console.log("place:", place);
  }, [place, placeAutocomplete]);

  // const handleChange=(event)=>{setInputValues(event.target.value)};

  const handleSearch = () => {
    // e.preventDefault();
    // console.log('Submitted value:',inputValues);
    // setInputValues('');
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    onPlaceSelect(place);
    console.log("onPlaceSelect:", onPlaceSelect);
    navigate("/cityguide/mapping");
    setOpen(false);
  }, [open]);

  const navigToMySelection = () => {
    navigate("/cityguide/myselection");
  };

  const backToCity = () => {
    navigate("/cityguide");
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        message.success("Logout Successful");

        setIsLoggedIn(false);
        console.log("handle logout1", isLoggedIn, setIsLoggedIn);
        setUsername(null); // Clear the username
        navigate("/search"); // Redirect to home page
      })
      .catch((err) => {
        message.error("Logout failed: " + err.message);
      });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page) => {
    let url =
      page === "My Account"
        ? "userinfo"
        : page.replace(/\s+/g, "").toLowerCase();
    if (page === "Log out") {
      handleLogout();
    } else {
      navigate(`/cityguide/${url}`);
    }

    handleCloseNavMenu();
  };

  const handleNavigateTwo = (page1) => {
    let url = page1.replace(/\s+/g, "").toLowerCase();
    navigate(`/cityguide/${url}`);

    handleCloseNavMenu();
  };

  return (
    <>
      {/* <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}> */}
        {onCity && (
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
                width: "20vw",
                height: "5vh",
              }}
            >
              <IconButton
                variant="contained"
                onClick={() => {
                  backToCity();
                }}
              >
                <ArrowBackIosNewIcon />
                Back to My City | {onState.name}, {onCity.name}
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
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="outlined"
                    color="light grey"
                    size="small"
                    opacity="0.5"
                    sx={{
                      borderRadius: "50%",
                      height: "6vh",
                      mr: 2,
                      "&:active": { boxShadow: "none" },
                      "&:focus": { boxShadow: "none" },
                      "&:hover": { boxShadow: "none" },
                    }}
                    onClick={handleOpenNavMenu}
                  >
                    <PersonOutlineOutlinedIcon fontSize="medium" />
                  </Button>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    // 如果anchorElNav有东西的话就会打开网页
                    open={Boolean(anchorElNav)}
                    // 如果点击屏幕别的地方要关闭这个drop down
                    onClose={handleCloseNavMenu}
                  >
                    {/* 匹配上面定义的常量 pages 里面的页面*/}
                    {pages1.map((page1) => (
                      <MenuItem
                        key={page1}
                        onClick={() => handleNavigateTwo(page1)}
                      >
                        <Typography textAlign="center">{page1}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Box sx={{ flexGrow: 1 }}>
                  <IconButton
                    size="large"
                    aria-label="open menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    sx={{
                      "&:hover": {
                        backgroundColor: "transparent", // 移除 IconButton hover 时的背景色
                      },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: 65,
                        height: 65,
                        marginRight: "40px",
                        cursor: "pointer",
                        backgroundColor: image ? "transparent" : "#8B0000", // 如果没有Image，设置背景色
                        color: image ? "inherit" : "white", // 设置首字母缩写颜色
                      }}
                      src={image} // 如果 Image 存在，会显示头像
                      alt="User Avatar"
                    >
                      {!image && username && username.charAt(0).toUpperCase()}{" "}
                      {/* 如果没有image，显示首字母 */}
                    </Avatar>
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    // 如果anchorElNav有东西的话就会打开网页
                    open={Boolean(anchorElNav)}
                    // 如果点击屏幕别的地方要关闭这个drop down
                    onClose={handleCloseNavMenu}
                  >
                    {/* 匹配上面定义的常量 pages 里面的页面*/}
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={() => handleNavigate(page)}>
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              )}

              <Tooltip title="Go to my selection">
                <Button
                  variant="outlined"
                  color="light grey"
                  size="medium"
                  opacity="0.5"
                  sx={{
                    borderRadius: "50%",
                    height: "6vh",
                    mr: 2,
                    "&:active": { boxShadow: "none" },
                    "&:focus": { boxShadow: "none" },
                    "&:hover": { boxShadow: "none" },
                  }}
                  onClick={() => {
                    navigToMySelection();
                  }}
                >
                  <ShoppingCartOutlinedIcon fontSize="medium" />
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
              ref={inputRef}
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
            {/* <div className="autocomplete-container"> */}
            {/* <input
                placeholder="Search Spots "
                ref={inputRef}
                style={{ position: "relative",
                  top: -150,
                  left: -20,
                  width: "75vw",
                  height: 45, }}
              /> */}
            {/* </div> */}

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
              {topicsList.map((topic, index) => {
                return (
                  <Button
                    size="lg"
                    sx={{ width: "8%" }}
                    variant="contained"
                    color="#C7F7C7"
                    onClick={() => {}}
                    key={index}
                  >
                    {topic}
                  </Button>
                );
              })}
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
                  position: "absolute",
                  top: "9vh",
                  width: "80%",
                  display: "flex",
                  gap: 15,
                  flexWrap: "wrap",
                }}
              >
                {cardList.map((card, index) => {
                  return (
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
                      key={index}
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
                        <Typography level="title-lg">
                          Route Title{card}
                        </Typography>
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
                  );
                })}
              </Box>
            </Box>
            {/* </ThemeProvider> */}
          </Box>
        )}
      {/* </APIProvider> */}
    </>
  );

  // return(<h1>zzzzzzz</h1>);
}
// }
export default Search;
