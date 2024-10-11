import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

import { BASE_URL } from "../constants";
import ResponsiveAppBar from "./ResponsiveAppBar";

// (mobile) responsiveness design
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

function SignUp(props) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { username, password } = values;
    const opt = {
      method: "POST",
      url: `${BASE_URL}/signup`,
      data: {
        username: username,
        password: password,
      },
      headers: { "content-type": "application/json" },
    };

    axios(opt)
      .then((response) => {
        console.log(response);
        // case1: registered success
        if (response.status === 200) {
          message.success("Registration succeeded!");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("register failed: ", error.message);
        message.error("Registration failed!");
        // throw new Error('Signup Failed!')
      });
  };

  return (
    <>
      <ResponsiveAppBar secondElem={"Sign Up"} />
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="register"
      >
        <Form.Item
          name="username"
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
          label={<span style={{ fontWeight: "bold" }}>Password</span>}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
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
          name="confirm"
          label={<span style={{ fontWeight: "bold" }}>Re-enter Passward</span>}
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
          <Input
            type="password"
            placeholder="RETYPE YOUR PASSWORD"
            style={{
              width: "300px",
              border: "1px solid #D3D3D3", // 边框颜色
              borderRadius: "6px", // 圆角
              padding: "10px", // 内边距
              height: "40px", // 输入框高度
              textAlign: "center", // 居中对齐
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
}

export default SignUp;
