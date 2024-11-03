import React, { useState, useEffect } from "react";
import axios from "axios";
import ResponsiveAppBar from "./appbarcomponents/ResponsiveAppBar";
import { styled } from "@mui/system";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import { TOKEN_KEY } from "../constants";
import { getUserInfo, logout } from "../utils";
import { message } from "antd";
import {
  Box,
  Button,
  TextField,
  Avatar,
  Grid,
  Typography,
  IconButton,
  DialogContentText,
  Container,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

const Sidebar = styled(Box)({
  width: "250px",
  // backgroundColor: "#f5f5f5",
  padding: "0px",
  // height: "100%",
});

function stringToColor(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}

function stringAvatar(username) {
  return {
    sx: {
      bgcolor: stringToColor(username),
      width: 80,
      height: 80,
      mb: 2,
    },
    children: `${username.split(" ")[0][0]}${
      username.split(" ")[1] ? username.split(" ")[1][0] : ""
    }`,
  };
}
// 获取名字缩写
const getInitials = (name) => {
  const nameArray = name.split(" ");
  const initials = nameArray.map((n) => n[0]).join("");
  return initials;
};

function UserInfo() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [avatar, setAvatar] = useState(null); // 存储头像 URL
  const [selectedFile, setSelectedFile] = useState(null); // 存储上传的文件

  // 为每个弹框分别设置独立的状态
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false); // 控制上传图片的弹框状态
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // 控制删除确认弹框的状态

  // 检查登录状态
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(storedStatus);
  }, []);

  useEffect(() => {
    getUserInfo()
      .then((data) => {
        setUsername(data.username);
        setEmail(data.email);
        setPassword(data.password);
        setCity(data.city);
      })
      .catch((err) => {
        message.error(err.message);
      });
  }, []);

  // 2. 提交新头像（表单提交）
  const handleAvatarSubmit = (event) => {
    event.preventDefault(); // 防止默认的表单提交行为

    if (!selectedFile) {
      console.log("No file selected");
      return;
    }

    // 创建表单数据
    const formData = new FormData();
    formData.append("avatar", selectedFile); // 将选中的文件添加到 FormData 中

    // 使用 axios 发送上传请求
    axios
      .post(`${BASE_URL}/user/avatar/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 必须指定 multipart/form-data 头
        },
      })
      .then((response) => {
        console.log("Avatar updated:", response.data);
        setAvatar(response.data.avatarUrl); // 更新头像为新的 URL
      })
      .catch((error) => {
        console.error("Error uploading avatar:", error);
      });
  };

  // 处理文件选择
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // 存储选中的文件
      setAvatar(URL.createObjectURL(file)); // 预览选中的文件
    }
  };

  // 删除头像
  const handleDelete = () => {
    setAvatar(null);
    setSelectedFile(null);
  };

  // 确认删除操作并导航到主页
  const handleConfirmDelete = () => {
    console.log("User deleted");
    setOpenDeleteDialog(false);
    navigate("/");
  };

  // 打开上传头像弹框
  const handleAvatarClick = () => {
    setOpenAvatarDialog(true);
  };

  // 关闭上传头像弹框
  const handleCloseAvatarDialog = () => {
    setOpenAvatarDialog(false);
  };

  // 打开删除账号弹框
  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  // 关闭删除账号弹框
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // navigation
  const navigate = useNavigate();
  const handleNavigate = (page) => {
    let url =
      page === "My Selection"
        ? "planning"
        : page.replace(/\s+/g, "").toLowerCase();
    if (page === "Log out") {
      handleLogout();
    } else {
      navigate(`/cityguide/${url}`);
    }
  };

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
      })
      .finally(() => {
        localStorage.removeItem("username");
        localStorage.removeItem("isLoggedIn");
      });
  };

  return (
    <>
      <ResponsiveAppBar
        position="fixed"
        isLoggedIn={isLoggedIn}
        username={username}
        secondElem="My Account"
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <Container
        maxWidth="lg" // 设置为大屏布局，并且最大宽度为1200px
        sx={{
          mt: 10, // 顶部留出空间给AppBar
          width: "100%",
          maxWidth: "1200px", // 设置最大宽度为1200px
          margin: "0 auto", // 水平居中
        }}
      >
        <Grid
          container
          sx={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          {/* Sidebar */}

          <Sidebar>
            <Box sx={{ width: "100%", marginTop: "20px" }}>
              <Typography
                variant="h6" // 使用更小的字体大小
                sx={{
                  marginBottom: "10px", // 与下方内容的距离
                  width: "100%",
                  textAlign: "center", // 文字居中
                  borderBottom: "1px solid grey", // 添加底部边框作为线条，颜色和宽度可以自定义
                  paddingBottom: "10px", // 让底部边框和文字有一点距离
                }}
              >
                My Profile
              </Typography>
              {/* 显示头像 */}
              <IconButton
                onClick={handleAvatarClick}
                sx={{
                  marginTop: "100px",
                  "&:hover": {
                    backgroundColor: "transparent", // 移除 IconButton hover 时的背景色
                  },
                }}
              >
                <Avatar
                  src={avatar} // If avatar URL exists, it will be displayed
                  alt="User Avatar"
                  style={{ backgroundColor: "#8B0000" }}
                  sx={{
                    // backgroundColor: avatar ? "transparent" : "#8B0000", // 如果有头像，背景透明；否则暗红色
                    // backgroundColor: "#8B0000",
                    color: "white", // 没有头像时缩写的颜色
                    width: 56, // 可以根据需要调整头像的大小
                    height: 56,
                  }}
                  {...(!avatar && stringAvatar(username))} // If no avatar, it shows the initials with background color
                />
              </IconButton>
              {/* 弹出框 开始 */}
              <Dialog open={openAvatarDialog} onClose={handleCloseAvatarDialog}>
                <DialogContent>
                  {/* 预览头像 */}
                  <Grid container spacing={2} alignItems="center">
                    <Avatar
                      src={avatar}
                      alt="User Avatar"
                      style={{
                        margin: "20px",
                        marginBottom: "30px",
                        backgroundColor: "#8B0000",
                      }}
                      {...(!avatar && stringAvatar(username))} // If no avatar, it shows the initials with background color
                    ></Avatar>

                    <DialogTitle
                      sx={{
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                        color: "black",
                      }}
                    >
                      Select an image to upload
                    </DialogTitle>
                  </Grid>

                  <Grid item>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Button
                        onClick={handleDelete}
                        color="error"
                        style={{ marginRight: "10px" }} // 设置右边距
                      >
                        DELETE
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        style={{ display: "block" }}
                      />
                    </div>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAvatarDialog} color="primary">
                    CANCEL
                  </Button>
                  <Button
                    onClick={handleCloseAvatarDialog}
                    color="primary"
                    disabled={!selectedFile}
                  >
                    SAVE
                  </Button>
                </DialogActions>
              </Dialog>
              {/* 弹出框 结束 */}
              <Typography variant="h6">{username}</Typography>
              <Button
                variant="contained"
                sx={{
                  mt: 20,
                  backgroundColor: "#284642",
                  width: "200px",
                  textTransform: "none",
                }}
                onClick={() => handleNavigate("My Gallery")}
              >
                Go to My Gallery
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  backgroundColor: "#284642",
                  width: "200px",
                  textTransform: "none",
                }}
                onClick={() => handleNavigate("My Selection")}
              >
                Go to My Selection
              </Button>
            </Box>
          </Sidebar>

          {/* Main Content */}
          <Box
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 10,
              ml: 10,
            }}
          >
            <Box sx={{ mt: 3 }}>
              <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "right", fontWeight: "bold", pr: 2 }}
                  >
                    Username:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    sx={{
                      height: "40px", // 调整 TextField 高度
                      width: "250px",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        borderRadius: "6px", // 设置圆角
                        height: "40px", // 设置输入框高度
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey", // 初始边框颜色设置为浅灰色
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 鼠标悬停时的边框颜色
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 聚焦时的边框颜色
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Email */}
              <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "right", fontWeight: "bold", pr: 2 }}
                  >
                    Email:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    sx={{
                      height: "40px", // 调整 TextField 高度
                      width: "250px",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        borderRadius: "6px", // 设置圆角
                        height: "40px", // 设置输入框高度
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey", // 初始边框颜色设置为浅灰色
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 鼠标悬停时的边框颜色
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 聚焦时的边框颜色
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Password */}
              <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "right", fontWeight: "bold", pr: 2 }}
                  >
                    Password:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    sx={{
                      height: "40px", // 调整 TextField 高度
                      width: "250px",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        borderRadius: "6px", // 设置圆角
                        height: "40px", // 设置输入框高度
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey", // 初始边框颜色设置为浅灰色
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 鼠标悬停时的边框颜色
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 聚焦时的边框颜色
                      },
                    }}
                  />
                </Grid>
              </Grid>

              {/* Destination City */}
              <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={4}>
                  <Typography
                    variant="body1"
                    sx={{ textAlign: "right", fontWeight: "bold", pr: 2 }}
                  >
                    Destination City:
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    sx={{
                      height: "40px", // 调整 TextField 高度
                      width: "250px",
                      borderRadius: "6px",
                      "& .MuiInputBase-root": {
                        borderRadius: "6px", // 设置圆角
                        height: "40px", // 设置输入框高度
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "grey", // 初始边框颜色设置为浅灰色
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 鼠标悬停时的边框颜色
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#40a9ff", // 聚焦时的边框颜色
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              sx={{
                display: "flex", // 使用 flex 布局
                justifyContent: "flex-start", // 子元素左对齐
                alignItems: "center", // 子元素垂直居中（可选）
              }}
            >
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  ml: 20,
                  backgroundColor: "#284642",
                  width: "150px",
                  textTransform: "none",
                  marginRight: 6,
                }}
                onClick={() => handleNavigate("Log out")}
              >
                Log out
              </Button>
              <Button
                variant="contained"
                sx={{
                  mt: 4,
                  backgroundColor: "#284642",
                  width: "180px",
                  textTransform: "none",
                  color: "error",
                }}
                onClick={handleDeleteClick} // 点击删除按钮时打开弹框
              >
                Delete Your Account
              </Button>
            </Box>

            {/* 确认删除的弹框 */}
            <Dialog
              open={openDeleteDialog}
              onClose={handleCloseDeleteDialog} // 点击关闭时关闭弹框
            >
              <DialogTitle>{"Confirm Deletion"}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete your account?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                {/* 取消按钮 */}
                <Button onClick={handleCloseDeleteDialog} color="primary">
                  Cancel
                </Button>
                {/* 确认删除按钮 */}
                <Button onClick={handleConfirmDelete} color="error" autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Container>
    </>
  );
}
export default UserInfo;
