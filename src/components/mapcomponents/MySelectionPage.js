import React, { useState, useEffect } from "react";
import { Layout, message } from "antd";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import SpotCard from "./SpotCard";
import Box from "@mui/joy/Box";
import { getMySelection } from "../../utils";
import myTheme from "../../MyMuiTheme";
import { ThemeProvider } from "@mui/material/styles";
import Survey from "../Survey";

const { Content, Sider } = Layout;
const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  backgroundColor: "white",
};
const contentStyle = {
  height: "100%",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
};

const List = [
  {
    formatted_address: "400 Broad St, Seattle, WA 98109美国",
    geometry: {
      location: { lat: 47.6205063, lng: -122.3492774 },
      viewport: {
        south: 47.6191151197085,
        west: -122.3506456302915,
        north: 47.6218130802915,
        east: -122.3479476697085,
      },
    },
    name: "Space Needle",
    place_id: "ChIJ-bfVTh8VkFQRDZLQnmioK9s",
    description: "",
    rating: 4.6,
    photoUrl:
      "https://lh3.googleusercontent.com/places/ANXAkqG7K0AYPNXI6zDZGB_UQ3afbnE-en1ExAYpLcFKHrKuw-3VMw9tn7U53CR_jPpz_-nheABMjucOM2z7Bcd5NozDUDhoCfk1Bs0=s1600-w400",
  },
  {
    formatted_address: "1483 Alaskan Way Pier 59, Seattle, WA 98101美国",
    geometry: {
      location: { lat: 47.60740020000001, lng: -122.3429559 },
      viewport: {
        south: 47.60608386970851,
        west: -122.3437540302915,
        north: 47.6087818302915,
        east: -122.3410560697085,
      },
    },
    name: "Seattle Aquarium",
    place_id: "ChIJQ_oEiK1qkFQRg3bU4l3mmWs",
    description: "",
    rating: 4.3,
    photoUrl:
      "https://lh3.googleusercontent.com/places/ANXAkqElQzEOidYGttexoPsjvRbchyfAH64VFey-Ei64ipbVtw9j2CcuEABEgI3UO-yga8lnxUbxLZwgmkHOa_xpQmRaM28yENAfP-o=s1600-w400",
  },
  {
    formatted_address: "1410 NE Campus Pkwy, Seattle, WA 98195美国",
    geometry: {
      location: { lat: 47.65671709999999, lng: -122.3066181 },
      viewport: {
        south: 47.641133,
        west: -122.32550785,
        north: 47.66781700000001,
        east: -122.29272125,
      },
    },
    name: "University of Washington",
    place_id: "ChIJ6zWFnZIUkFQRoyu4AXksdGs",
    description: "",
    rating: 4.6,
    photoUrl:
      "https://lh3.googleusercontent.com/places/ANXAkqH-PinSTtkYfx8C995mCE_peJlMzNr-ZKma1vTXVFDb3F_YT396yutQzXb61KM52IOspVzT561EmcRi3m2FzziyzIkIYd7sbtM=s1600-w400",
  },
  {
    formatted_address: "704 Terry Ave, Seattle, WA 98104美国",
    geometry: {
      location: { lat: 47.6071992, lng: -122.324147 },
      viewport: {
        south: 47.6056492697085,
        west: -122.3257266302915,
        north: 47.6083472302915,
        east: -122.3230286697085,
      },
    },
    name: "弗赖伊艺术博物馆",
    place_id: "ChIJEWIFw7dqkFQRDw3cK6AcdXA",
    description: "",
    rating: 2,
    photoUrl:
      "https://lh3.googleusercontent.com/places/ANXAkqFXFbfOi7xr2Q3Y4eTs7GtHvUJEnZ1v0lBqjvdF2qgXqivWtjsOasWzJRxKCi0XgUVK9lvPBURcT4OcYFIIFdCwNOZVs7QHggk=s1600-w400",
  },
  {
    formatted_address: "美国华盛顿西雅图邮政编码: 98199",
    geometry: {
      location: { lat: 47.6619696, lng: -122.435739 },
      viewport: {
        south: 47.6606206197085,
        west: -122.4370879802915,
        north: 47.6633185802915,
        east: -122.4343900197085,
      },
    },
    name: "西点灯塔",
    place_id: "ChIJBV2stQM-kFQRKppAFLB6HKg",
    description: "",
    rating: 4.6,
    photoUrl:
      "https://lh3.googleusercontent.com/places/ANXAkqHZTUgeM9HZDJwu7rJPjjF0Tz2vY8Hh2fFV5iTCkQlTLMiiz0fMFDqIhmWMgLbi519XVj2ekxk6nwi0SSVC6IIHUxae-1vAJ8Y=s1600-w400",
  },
];

const MySelectionPage = ({spotsList, setSpotsList}) => {
  const DEFAULT_CENTER = { lat: 47.608013, lng: -122.335167 };
  const DEFAULT_ZOOM = 12;
  const navigate = useNavigate();
  // const [spotsList, setSpotsList] = useState(null);
  const [load, setLoad] = useState(false);
  let cart;

  useEffect(() => {
    if (load) {
      setSpotsList(cart);
      console.log("spotsList:", spotsList);
    }
  }, [load]);

  useEffect(() => {
    console.log("useEffect is running, load:", load);

    getMySelection()
      .then((data) => {
        console.log("getMySelection resolved with data:", data);

        if (!data || !Array.isArray(data.cart_spots)) {
          console.error(
            "Invalid data format! cart_spots is missing or not an array.",
            data
          );
          return;
        }
        cart = data.cart_spots;
        console.log("Cart:", cart);
        setSpotsList((prev) => {
          console.log("Previous spotsList:", prev);
          console.log("New spotsList:", cart);
          return cart;
        });
        
        setTimeout(() => {
          console.log("In useEffect spotsList:", spotsList);
          // setLoad(true);
        }, 1600);
      
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  useEffect(() => {
    console.log("spotsList updated:", spotsList); // Check the updated value here
  }, [spotsList]);

  //   getMySelection()
  //   .then((data) => {
  //     console.log("get data",data);
  //     setTimeout(()=>{setSpotsList(data);},1500)
  //     console.log("spotsList",spotsList);
  //   })
  // .catch(
  //   (err) => {message.error(err.message);}
  // ).finally(()=>setLoad(false))
  // }

  const handleLinkClick = () => {
    navigate("/cityguide/survey");
    // return <Survey spotList={spotsList}/>;
  };

  return (
    <Layout>
      <Content width="70%" style={contentStyle}>
        <APIProvider
          solutionChannel="GMP_devsite_samples_v3_rgmbasicmap"
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          version="beta"
        >
          <div
            className="map"
            style={{
              width: "100%",
              height: "100vh",
              zIndex: 0,
            }}
          >
            <Map
              id="gmap"
              mapId={process.env.REACT_APP_MAP_ID}
              defaultCenter={DEFAULT_CENTER}
              defaultZoom={DEFAULT_ZOOM}
              gestureHandling={"greedy"}
              disableDefaultUI={true}
            >
              {spotsList &&
                spotsList.map((spot, index) => {
                  return (
                    <AdvancedMarker
                      key={spot.original_gid}
                      position={{ lat: spot.latitude, lng: spot.longitude }}
                      scale={0.05}
                    >
                      <Pin
                        background={"#26433e"}
                        glyphColor={"#94d2bd"}
                        borderColor={"#26433e"}
                      />
                    </AdvancedMarker>
                  );
                })}
            </Map>
          </div>
        </APIProvider>
      </Content>

      <Sider width="30%" style={siderStyle}>
        <ThemeProvider theme={myTheme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <SpotCard spots={spotsList} newList={setSpotsList} />

            <Stack direction="row" spacing={8} padding={3}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<RemoveIcon fontSize="small" />}
                onClick={() => {
                  navigate("/cityguide/mapping");
                }}
              >
                Back to Map
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<AddIcon fontSize="small" />}
                onClick={() => {
                  handleLinkClick();
                }}
              >
                Go to Plan
              </Button>
            </Stack>
          </Box>
        </ThemeProvider>
      </Sider>
    </Layout>
  );
};
export default MySelectionPage;
