import React, { useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Landing";
import Search from "./Search";
import Mapping from "./Mapping";
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
  console.log("Main isLoggedIn:",isLoggedIn);
  // const handleSignedIn = (token) => {
  //   if (token) {
  //     localStorage.setItem(TOKEN_KEY, token);
  //     setIsSignedIn(true);
  //   }
  // };

  const showLanding = () => {
    return <Landing />;
  };

  const showSearch = () => {
    return <Search />;
  };

  const showMapping = () => {
    // return <Mapping />;
    console.log("showMapping isLoggedin:",isLoggedIn);
    return isLoggedIn ? <Mapping isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
  };
  const showSurvey = () => {
    // return <Survey />
    return isLoggedIn ? <Survey /> : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
  };
  const showPlanning = () => {
    return isLoggedIn ? <Planning /> : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
  };
  const showRoute = () => {
    return isLoggedIn ? <RouteCom /> : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
  };
  const showFinished = () => {
    return isLoggedIn ? <Finished /> : <SignIn isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
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

  const [city, setCity] = useState({ id: "", name: "" });

  // 父容器接收城市ID和名称的函数
  const handleCitySelection = (cityId, cityName) => {
    setCity({ id: cityId, name: cityName });

    // 在父容器中打印城市ID和城市名称
    console.log("From main");
    console.log("Selected City ID:", cityId);
    console.log("Selected City Name:", cityName);
  };
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          exact
          element={<Landing onCityChange={handleCitySelection} />}
        />
        <Route
          path="/cityguide"
          exact
          element={<Landing onCityChange={handleCitySelection} />}
        />
        <Route path="/cityguide/search" element={showSearch()} />
        <Route path="/cityguide/mapping" element={showMapping()} />
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
