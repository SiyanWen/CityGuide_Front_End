
// import React from "react";
// import CustomMap from "./MapMainPage.js";

// const App = () => {

//   return(
//     <div>
//       <CustomMap />
//     </div>
//   );

// };

// import React, { useState, useContext } from "react";
// import ResponsiveAppBar from "./ResponsiveAppBar";
// import Main from "./Main";
// import { Container } from "@mui/material";
// import { useLocation } from "react-router-dom";
// import { TOKEN_KEY } from "../constants";

// function App() {
//   // 判断用户是否登录，如果登录存在isLoggedIn
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     // 如果有TOKEN_KEY,就是登录成功的状态
//     localStorage.getItem(TOKEN_KEY) ? true : false
//   );

//   const logout = () => {
//     // 登出remove当前token
//     localStorage.removeItem(TOKEN_KEY);
//     setIsLoggedIn(false);
//   };

//   const loggedIn = (token) => {
//     if (token) {
//       // 如果token存在,保存TOKEN_KEY去localStorage
//       localStorage.setItem(TOKEN_KEY, token);
//       setIsLoggedIn(true);
//     }
//   };

//   const location = useLocation();
//   // 如果当前路径是 '/'，则不显示 AppBar
//   // const hideAppBar = location.pathname === "/";
//   const hideAppBar = true;
//   // 假设 AppBar 的高度是 64px
//   const appBarHeight = 64;

//   return (
//     <div className="App">
//       {!hideAppBar && (
//         <Container>
//           <ResponsiveAppBar
//             position="fixed"
//             style={{ top: 0, zIndex: 1, width: "100%" }}
//             isLoggedIn={isLoggedIn}
//             handleLogout={logout}
//           />
//         </Container>
//       )}
//       <Container
//         style={{ paddingTop: !hideAppBar ? `${appBarHeight}px` : "0px" }}
//       >
//         <Main isLoggedIn={isLoggedIn} handleLoggedIn={loggedIn} />
//       </Container>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
// import Main from "./Main";
// import Plan from "./surveycomponents/Plan";
// import Planning from "./Planning";
import Mapping from "./Mapping";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="App">
      {/* <Main /> */}
      {/* <Plan/> */}
      <Mapping/>
      {/* <Planning/> */}
    </div>
  );
}

export default App;
