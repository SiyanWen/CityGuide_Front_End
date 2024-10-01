import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import ResponsiveAppBar from "./ResponsiveAppBar";

import { BASE_URL } from "../constants";

function SignIn(props) {
  const { handleLoggedIn } = props;
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("values", values);
    const { username, password } = values;
    const option = {
      method: "POST",
      url: `${BASE_URL}/signin`,
      data: {
        username: username,
        password: password,
      },
      headers: { "Content-Type": "application/json" },
    };
    axios(option)
      .then((res) => {
        if (res.status === 200) {
          const { data } = res;
          handleLoggedIn(data);
          message.success("Signin succeed! ");
        }
      })
      .catch((err) => {
        console.log("Signin failed: ", err.message);
        message.error("Signin failed!");
      });
  };

  return (
    <>
      <ResponsiveAppBar secondElem={"Sign In"} />

      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Link
            to="/cityguide/signup/"
            style={{
              color: "black",
              padding: "6px",
              margin: "30px",
              backgroundColor: "#BDBDBD",
            }}
          >
            Go to SignUp
          </Link>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: "45%", backgroundColor: "#284642" }}
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignIn;
