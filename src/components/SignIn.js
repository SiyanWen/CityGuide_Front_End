import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./appbarcomponents/ResponsiveAppBar";
import { login } from "../utils";

const SignIn = (props) => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const {isLoggedIn, setIsLoggedIn} = props;
  const navigate = useNavigate();

  // check the status of login
  useEffect(() => {
    // const storedStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    // setIsLoggedIn(storedStatus);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const onFinish = (data) => {
    setLoading(true);

    login(data)
      .then(() => {
        message.success(`Login Successful`);
        console.log(data)
        localStorage.setItem("username", data.email);
        // localStorage.setItem("isLoggedIn", true);
        setIsLoggedIn(true);
        setUsername(data.email);
        navigate("/cityguide/mapping");
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <ResponsiveAppBar
        secondElem={"Sign In"}
        isLoggedIn={isLoggedIn}
        username={username}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
      />

      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        requiredMark={false}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
      >
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: "bold" }}>Email</span>}
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            type="password"
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
          style={{
            width: "500px",
          }}
        >
          <Link
            to="/cityguide/signup/"
            style={{
              display: "inline-block",
              width: "120px",
              color: "white",
              padding: "6px",
              marginLeft: "60px",
              backgroundColor: "#284642",
              borderRadius: "4px",
              border: "1px solid #1890ff",
            }}
          >
            Go to Sign Up
          </Link>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{
              width: "120px",
              backgroundColor: "#284642",
              height: "36px",
              borderRadius: "4px",
              marginLeft: "40px",
            }}
            loading={loading}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
export default SignIn;
