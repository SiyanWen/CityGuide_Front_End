import React, { useState, useEffect } from "react";
import ResponsiveAppBar from "./ResponsiveAppBar";
import {
  Layout,
  Menu,
  Card,
  Row,
  Col,
  Button,
  theme,
  Avatar,
  FloatButton,
  Pagination,
} from "antd";


import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  MinusOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Content, Sider } = Layout;

const MyGallery = () => {

  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check the status of login
  useEffect(() => {
    const storedStatus = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(storedStatus);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  //
  const [selectedRoutes, setSelectedRoutes] = useState([]);

  const routes = [
    {
      id: 1,
      title: "Weekend Indulging Line",
      description: "All weekend eating, drinking, shopping, hiking...",
      cover: "Map Cover 1",
    },
    {
      id: 2,
      title: "Historic Journey",
      description: "Explore the historical spots in the city...",
      cover: "Map Cover 2",
    },
    // 添加更多路线
  ];

  const addToCart = (route) => {
    setSelectedRoutes([...selectedRoutes, route]);
  };

  const removeFromCart = (routeId) => {
    setSelectedRoutes(selectedRoutes.filter((route) => route.id !== routeId));
  };

  const [collapsed, setCollapsed] = useState(false);

  const { Meta } = Card;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 侧边栏 */}
      
      <Sider
        width={200}
        collapsible
        trigger={null}
        collapsed={collapsed}
        theme="light"
        style={{ minWidth: "60vh" }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "15px",
            width: 64,
            height: 55,
          }}
        >
          Menu
        </Button>

        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              //   icon: <UserOutlined />,
              label: "My Trip Plan",
            },
            {
              key: "2",
              //   icon: <VideoCameraOutlined />,
              label: "Routes Gallery",
            },
            {
              key: "3",
              //   icon: <UploadOutlined />,
              label: "Sports Gallery",
            },
          ]}
        />

        {/* Float button back to my selection */}
        <FloatButton
          icon={<ArrowRightOutlined />}
          shape="square"
          tooltip={<div>My Selection</div>}
          style={{
            left: 20,
            height: 60,
            width: 60,
            fontSize: 60,
          }}
        />
      </Sider>

      <Layout>
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Row gutter={[16, 16]}>
            {routes.map((route) => (
              <Col span={6} key={route.id}>
                <Card
                  style={{
                    width: 300,
                    marginTop: 10,
                  }}
                  cover={
                    <img
                      alt="example"
                      //   src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                      src="https://imgcache.dealmoon.com/thumbimg.dealmoon.com/dealmoon/19a/102/66a/75dbe0ab7db7768da2763cb.png_1080_0_40_23ea.png"
                    />
                  }
                  actions={[
                    <Button
                      type="text"
                      onClick={() => addToCart(route)}
                      icon={<PlusOutlined />}
                    >
                      Add to Cart
                    </Button>,
                    <Button
                      type="text"
                      onClick={() => removeFromCart(route.id)}
                      icon={<MinusOutlined />}
                    >
                      Remove
                    </Button>,
                  ]}
                >
                  <Meta
                    avatar={
                      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />
                    }
                    title="Weekend Indulging Line"
                    description="Test"
                  />
                  <Meta description="timerating" />
                </Card>
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MyGallery;
