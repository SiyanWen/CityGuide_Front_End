import React, { useState,useEffect } from "react";

import { Routes, Route, Navigate, useNavigate} from "react-router-dom";

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
  const [isSignedIn, setIsSignedIn] = useState(true);
  const handleSignedIn = (token) => {
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      setIsSignedIn(true);
    }
  };
  const [city, setCity] = useState({ id: "", name: "" });
  const [state, setState] = useState({ id: "", name: "" });
  const navigate = useNavigate();

  useEffect(()=>{
    if (city.name)
    console.log("from main after",state);
    console.log("from main after",city);
    navigate("/cityguide/search");
  },[city.name])

  const showLanding = () => {
    return <Landing />;
  };

  const showSearch = () => {
    return <Search onState={state} onCity={city} />;
  };

  const showMapping = () => {
    // return <Mapping />;
    return isSignedIn ? <Mapping /> : <SignIn />;
  };
  const showSurvey = () => {
    // return <Survey />
    return isSignedIn ? <Survey /> : <SignIn />;
  };
  const showPlanning = () => {
    return isSignedIn ? <Planning /> : <SignIn />;
  };
  const showRoute = () => {
    return isSignedIn ? <RouteCom /> : <SignIn />;
  };
  const showFinished = () => {
    return isSignedIn ? <Finished /> : <SignIn />;
  };

  const showSignIn = () => {
    // return isSignedIn ? (
    //   <Navigate to="/cityguide/search" />
    // ) : (
    //   <SignIn handleSignedIn={handleSignedIn} />
    // );
    return <SignIn handleSignedIn={handleSignedIn} />;
  };

  const showSignUp = () => {
    // return isSignedIn ? <Navigate to="/cityguide/search" /> : <SignUp />;
    return <SignUp handleSignedIn={handleSignedIn} />;
  };
  const showMyGallery = () => {
    return isSignedIn ? <MyGallery /> : <Navigate to="/cityguide/signin" />;
  };
  const showUserInfo = () => {
    return isSignedIn ? <UserInfo /> : <Navigate to="/cityguide/signin" />;
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
