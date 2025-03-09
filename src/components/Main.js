import React, { useState, useEffect } from "react";

import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";
import Landing from "./Landing";
import Search from "./Search";
import Mapping from "./Mapping";
import MySelectionPage from "./mapcomponents/MySelectionPage";
import Survey from "./Survey";
import Planning from "./Planning";
import RouteCom from "./Route";
import Finished from "./Finished";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import MyGallery from "./MyGallery";
import UserInfo from "./UserInfo";
import { TOKEN_KEY } from "../constants";

function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("Main isLoggedIn:", isLoggedIn);
  // const handleSignedIn = (token) => {
  //   if (token) {
  //     localStorage.setItem(TOKEN_KEY, token);
  //     setIsSignedIn(true);
  //   }
  // };
  const [username, setUsername] = useState("");
  const [city, setCity] = useState({ id: "", name: "" });
  const [state, setState] = useState({ id: "", name: "" });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // const storedStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    // setIsLoggedIn(storedStatus);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  console.log("from main after", state);
  console.log("from main after", city);
  console.log("from main after", selectedPlace);

  // useEffect(()=>{
  //   if (city)
  //   console.log("from main after",state);
  //   console.log("from main after",city);
  //   navigate("/cityguide/search");
  // },[city])

  const showLanding = () => {
    return <Landing />;
  };

  const showSearch = () => {
    return (
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Search
          isLoggedIn={isLoggedIn}
          username={username}
          setUsername={setUsername}
          setIsLoggedIn={setIsLoggedIn}
          onState={state}
          onCity={city}
          onPlaceSelect={setSelectedPlace}
        />
      </APIProvider>
    );
  };

  const showMapping = () => {
    // return <Mapping />;
    console.log("showMapping isLoggedin:", isLoggedIn);
    return isLoggedIn ? (
      <Mapping
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        place={selectedPlace}
      />
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const showMySelection = () => {
    return isLoggedIn ? (
      <MySelectionPage />
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const showSurvey = () => {
    // return <Survey />
    console.log("showSurvey", isLoggedIn, setIsLoggedIn);
    return isLoggedIn ? (
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Survey />
      </APIProvider>
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const showPlanning = () => {
    return isLoggedIn ? (
      <Planning />
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const showRoute = () => {
    return isLoggedIn ? (
      <RouteCom />
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };
  const showFinished = () => {
    return isLoggedIn ? (
      <Finished />
    ) : (
      <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    );
  };

  const showSignIn = () => {
    // return isLoggedIn ? (
    //   <Navigate to="/cityguide/search" />
    // ) : (
    //   <SignIn handleSignedIn={handleSignedIn} />
    // );
    return <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
  };

  const showSignUp = () => {
    // return isLoggedIn ? <Navigate to="/cityguide/search" /> : <SignUp />;
    return <SignUp isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
  };
  const showMyGallery = () => {
    return isLoggedIn ? <MyGallery /> : <Navigate to="/cityguide/signin" />;
  };
  const showUserInfo = () => {
    return isLoggedIn ? <UserInfo /> : <Navigate to="/cityguide/signin" />;
  };
  //http://localhost:3000/cityguide

  // 父容器接收城市ID和名称的函数
  // const handleCitySelection = (cityId, cityName) => {
  //   useEffect(()=>{
  //     setCity(prevState => ({ id: cityId, name: cityName }))
  //   },[cityId,cityName]);

  // 在父容器中打印城市ID和城市名称
  //   console.log("From main");
  //   console.log("Selected City ID:", cityId);
  //   console.log("Selected City Name:", cityName);
  //   console.log(city);
  //   setTimeout(()=>{navigate("/cityguide/search")},5000)
  // };

  // const handleStateSelection = (stateId, stateName) => {
  //   useEffect(()=>{
  //     setState(prevState => ({ id: stateId, name: stateName }))
  //   },[stateId, stateName]);
  //   console.log("Selected State Name:", stateName);
  //   console.log(state);
  // };

  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          exact
          element={<Landing onStateChange={setState} onCityChange={setCity} />}
        />
        <Route
          path="/cityguide"
          exact
          element={<Landing onStateChange={setState} onCityChange={setCity} />}
        />
        <Route path="/cityguide/search" element={showSearch()} />
        <Route path="/cityguide/mapping" element={showMapping()} />
        <Route path="/cityguide/myselection" element={showMySelection()} />
        <Route path="/cityguide/survey" element={showSurvey()} />
        <Route path="/cityguide/planning" element={showPlanning()} />
        <Route path="/cityguide/route" element={showRoute()} />
        <Route path="/cityguide/finished" element={showFinished()} />
        <Route path="/cityguide/signin" element={showSignIn()} />
        <Route path="/cityguide/signup" element={showSignUp()} />
        <Route path="/cityguide/mygallery" element={showMyGallery()} />
        <Route path="/cityguide/userinfo" element={showUserInfo()} />
      </Routes>
    </div>
  );
}

export default Main;
