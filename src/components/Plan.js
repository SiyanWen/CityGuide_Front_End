import React, { useState } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Steps,
  theme,
  Card,
  Row,
  Col,
} from "antd";

const { Option } = Select;

// First
const Form0 = ({ setDays }) => {
  return (
    <Form layout="vertical">
      <Form.Item
        label="How many days do you plan to travel?"
        layout="horizontal"
      >
        <Input
          placeholder="Type in days (1-7)"
          type="number"
          min={1}
          max={7} // Limit to 15 days
          onChange={(e) => setDays(Number(e.target.value))} // Update days state in parent
        />
      </Form.Item>
    </Form>
  );
};

// Second
const Form1 = ({ days }) => {
  //   const [days, setDays] = useState(1);

  const generateTrafficPreferences = () => {
    const dayInputs = [];
    for (let i = 1; i <= days; i++) {
      dayInputs.push(
        <Select placeholder={`Day ${i}`} key={i} style={{ width: "100%" }}>
          <Option value="low">drives</Option>
          <Option value="medium">public</Option>
          <Option value="high">bicycle</Option>
          <Option value="high">walk</Option>
          {/* <Option value="high">High</Option> */}
          {/* rives public bicycle walk */}
        </Select>
      );
    }
    return dayInputs;
  };

  return (
    <Form layout="vertical">
      {/* Number of Spots Input */}
      <Form.Item
        label="How many spots would you like to visit in a day?"
        layout="horizontal"
        type="number"
      >
        <Input placeholder="Type in number of spots" />
      </Form.Item>

      {/* Traffic Preferences for each day */}
      <Form.Item label="Traffic preferences">
        <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
          {generateTrafficPreferences()}
        </div>
      </Form.Item>
    </Form>
  );
};

// Third
const Form2 = () => {
  return (
    <Row gutter={16}>
      {/* Food Input */}
      <Col span={6}>
        <Card title="Food" bordered={false} style={{ textAlign: "center" }}>
          <Input placeholder="0" />
        </Card>
      </Col>

      {/* Transport Input */}
      <Col span={6}>
        <Card
          title="Transport"
          bordered={false}
          style={{ textAlign: "center" }}
        >
          <Input placeholder="0" />
        </Card>
      </Col>

      {/* Ticket Input */}
      <Col span={6}>
        <Card title="Ticket" bordered={false} style={{ textAlign: "center" }}>
          <Input placeholder="0" />
        </Card>
      </Col>

      {/* Total Input */}
      <Col span={6}>
        <Card title="Total" bordered={false} style={{ textAlign: "center" }}>
          <Input placeholder="0" />
        </Card>
      </Col>
    </Row>
  );
};

// 3 steps to finish setup
const steps = [
  {
    title: "First Question",
    content: <Form0 />,
  },
  {
    title: "Second Question",
    content: <Form1 />,
  },
  {
    title: "Final Question",
    content: <Form2 />,
  },
];

const Plan = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [days, setDays] = useState(1);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  const renderStepContent = () => {
    if (current === 0) {
      return <Form0 setDays={setDays} />;
    } else if (current === 1) {
      return <Form1 days={days} />;
    } else if (current === 2) {
      return <Form2 />;
    }
  };

  // interface
  return (
    <div>
      <h2>We're almost there...</h2>
      <p>Help us to plan your trip better:</p>

      <Steps current={current} items={items} />
      <div style={contentStyle}>{renderStepContent()}</div>
      <div style={{ marginTop: 24 }}>
        {/*  */}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}

        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Back
          </Button>
        )}
      </div>

      <Form layout="vertical">
        <Form.Item>
          <Button type="link">Skip</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Plan;
