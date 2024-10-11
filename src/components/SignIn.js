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

      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        requiredMark={false} // 全局隐藏所有字段的红星
        labelCol={{ span: 6 }} // 控制标签占用的栅格数
        wrapperCol={{ span: 18 }} // 控制输入框占用的栅格数
      >
        <Form.Item
          name="email"
          label={<span style={{ fontWeight: "bold" }}>Email</span>} // 使标签加粗
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
              width: "300px", // 固定宽度为400px
              border: "1px solid #D3D3D3", // 边框颜色
              borderRadius: "6px", // 圆角
              padding: "10px", // 内边距
              height: "40px", // 输入框高度
            }}
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "TYPE IN YOUR EMAIL")}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label={<span style={{ fontWeight: "bold" }}>Password</span>} // 使标签加粗
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
              width: "300px", // 固定宽度为400px
              border: "1px solid #D3D3D3", // 边框颜色
              borderRadius: "6px", // 圆角
              padding: "10px", // 内边距
              height: "40px", // 输入框高度
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
          >
            Sign in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default SignIn;
