import React, { useState } from "react";

import { TOKEN_KEY } from "../../constants";
import "../../styles/Landing.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useLocation, useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { logout } from "../../utils";
import { message } from "antd";

const pages = ["My Account", "My Gallery", "Log out"];

const ResponsiveAppBar = ({
  isLoggedIn,
  username,
  secondElem,
  setIsLoggedIn,
  setUsername,
}) => {
  // from react-router-dom
  const navigate = useNavigate();
  const image = false;
  // 点击头像之后的下拉框
  const [anchorElNav, setAnchorElNav] = useState(null); // El - element
  const handleLogout = () => {
    logout()
      .then(() => {
        message.success("Logout Successful");
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
        setUsername(null); // Clear the username
        navigate("/"); // Redirect to home page
      })
      .catch((err) => {
        message.error("Logout failed: " + err.message);
      });
  };
  const handleOpenNavMenu = (event) => {
    // 当点击事件触发后，event传进来当前点击的元素。
    // 这个函数的作用是设置导航菜单锚点，点击之后将当前元素设置锚点
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // 点击navigate后进入的方法
  const handleNavigate = (page) => {
    // Navigate function to handle page redirection
    // '/代表是一个URL，后面变成小写'
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

  return (
    <AppBar
      position="static"
      style={{
        background: "#284642",
        top: 0,
        zIndex: 1,
        height: "120px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          height: "100%",
          alignItems: "center",
          paddingRight: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src={"/home.png"}
            alt="Logo"
            style={{
              width: "40px", // 调整图片宽度
              height: "40px", // 调整图片高度
              marginRight: "10px",
            }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            // href点击之后转到的地址，如果只有‘/’表示去home page
            href="/"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              margin: "10px",
            }}
          >
            City Guide
          </Typography>
          <Typography
            // header 6
            variant="h5"
            noWrap
            component="a"
            sx={{
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              margin: "10px",
            }}
          >
            | {secondElem}
          </Typography>
        </Box>
        <Box
          sx={{
            // position: "flex", // 固定位置
            top: 0, // 距离顶部
            right: "20px", // 距离右侧
            padding: "10px", // 内边距
            zIndex: 1000, // 确保在其他元素上面
            display: "flex", // 使用 flex 布局
            gap: "10px", // 按钮或头像之间的间距
          }}
        >
          {!isLoggedIn ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/cityguide/signin")}
                style={{
                  backgroundColor: "#1877F2",
                  borderRadius: "4px",
                }}
              >
                Sign in
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/cityguide/signup")}
                style={{
                  backgroundColor: "#1877F2",
                  borderRadius: "4px",
                }}
              >
                Register
              </Button>
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
        </Box>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
