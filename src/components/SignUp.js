import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { BASE_URL } from "../constants";
import ResponsiveAppBar from "./ResponsiveAppBar";
import { signup } from "../utils";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 16,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check the status of login
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn") === "true";
    if (storedStatus) {
      navigate("/cityguide/userinfo");
    }
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(storedStatus);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signupOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    console.log("Data submitted:", data); // Debugging line

    signup(data)
      .then(() => {
        console.log("Signup successful"); // Debugging line
        setDisplayModal(false);
        localStorage.setItem("username", data.username);
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        setUsername(data.username);
        message.success("Successfully signed up");
        navigate("/cityguide/signin");
      })
      .catch((err) => {
        console.error("Signup failed:", err.message); // Debugging line
        message.error(err.message);
      });
  };

  return (
    <>
      <ResponsiveAppBar
        secondElem={"Sign Up"}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />
      <Form
        name="register"
        onFinish={onFinish}
        className="register"
        preserve={false}
        {...formItemLayout}
      >
        <Form.Item
          name="user_name"
          label={<span style={{ fontWeight: "bold" }}>Username</span>}
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            placeholder="TYPE IN YOUR NAME"
            style={{
              width: "300px",
              border: "1px solid #D3D3D3",
              borderRadius: "6px",
              padding: "10px",
              height: "40px",
            }}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "TYPE IN YOUR NAME")}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span style={{ fontWeight: "bold" }}>Email</span>}
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            placeholder="TYPE IN YOUR EMAIL"
            style={{
              width: "300px",
              border: "1px solid #D3D3D3",
              borderRadius: "6px",
              padding: "10px",
              height: "40px",
            }}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "TYPE IN YOUR EMAIL")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span style={{ fontWeight: "bold" }}>Password</span>}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            placeholder="SET YOUR PASSWORD"
            style={{
              width: "300px",
              border: "1px solid #D3D3D3",
              borderRadius: "6px",
              padding: "10px",
              height: "40px",
            }}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "SET YOUR PASSWORD")}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          label={<span style={{ fontWeight: "bold" }}>Re-enter Password</span>}
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="RETYPE YOUR PASSWORD"
            style={{
              width: "300px",
              border: "1px solid #D3D3D3",
              borderRadius: "6px",
              padding: "10px",
              height: "40px",
            }}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "RETYPE YOUR PASSWORD")}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={{ fontWeight: "bold" }}>Upload a profile photo</span>
          }
        >
          <Upload
            name="avatar"
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isLt5M = file.size / 1024 / 1024 < 5;
              if (!isLt5M) {
                message.error("Photo must be smaller than 5MB!");
              }
              return isLt5M;
            }}
          >
            <Button
              icon={<UploadOutlined />}
              style={{
                border: "1px solid #D3D3D3",
                borderRadius: "6px",
              }}
            >
              Select
            </Button>
          </Upload>
          <span
            style={{
              marginTop: "10px",
              display: "block",
              fontStyle: "italic",
              color: "#888",
            }}
          >
            (Photo should be &lt; 5MB)
          </span>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Link
            to="/cityguide/signin/"
            style={{
              display: "inline-block",
              width: "40%",
              color: "white",
              padding: "6px",
              backgroundColor: "#284642",
              borderRadius: "4px",
              border: "1px solid #1890ff",
            }}
          >
            Go to Sign In
          </Link>
          <Button
            type="primary"
            htmlType="submit"
            className="register-btn"
            style={{
              width: "40%",
              height: "36px",
              marginLeft: "20px",
              backgroundColor: "#284642",
              borderRadius: "4px",
            }}
          >
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignUp;
