import React, { useRef, useEffect, useState } from "react";
import { getMySelection } from "../utils";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Space ,
  Divider, 
  Button,
  message,
  Steps,
  theme,
  Card,
  Row,
  Col,
} from "antd";
import StartEndMenu from "./StartEndMenu";

const { Option } = Select;
let index = 0;
// First
const Form0 = ({ setDays, spotList }) => {
  const [numSelectors, setNumSelectors] = useState();
  const [selectedValues, setSelectedValues] = useState({}); // Store selected values
  const [spotItems, setSpotItems] = useState(spotList);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const addItem = (e) => {
    e.preventDefault();
    setSpotItems([...spotList, name ]); //|| `New item ${index++}`
    console.log(spotItems);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const handleNumChange = (value) => {
    setNumSelectors(value);
    setSelectedValues((prevState) => ({
      ...prevState, // Keep existing selected values
      ...Array(value)
        .fill()
        .reduce(
          (acc, _, i) => ({ ...acc, [`selector${i + 1}`]: undefined }),
          {}
        ), // Initialize new selectors
    }));
  };

  const handleSelectChange = (value, key) => {
    setSelectedValues((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

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
          value={numSelectors}
          onChange={(e) => {
            setDays(Number(e.target.value));
            handleNumChange(Number(e.target.value));
          }} // Update days state in parent
        />
      </Form.Item>

      <Form.Item label="Select start and end point">
        {Array(numSelectors)
          .fill()
          .map((_, i) => (
            <Select
              key={`selector${i + 1}`}
              defaultValue={selectedValues[`selector${i + 1}`]}
              onChange={(value) =>
                handleSelectChange(value, `selector${i + 1}`)
              }
              style={{ width: 400, marginRight: 10 }}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <Divider
                    style={{
                      margin: "8px 0",
                    }}
                  />
                  <Space
                    style={{
                      padding: "0 8px 4px",
                    }}
                  >
                    <Input
                      placeholder="Please enter your spot"
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
                      Add spot
                    </Button>
                  </Space>
                </>
              )}
              options={spotItems.map((item) => ({
                label: item.name,
                value: item.name,
              }))}
            />
          ))}
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

  const [surveyInfo, setSurveyInfo] = useState({
    travel_days: 1,
    spots_per_day: 2,
    budgets: { food: 0, transport: 0, ticket: 0, total: 0 },
  });
  const [startEndSpot, setStartEndSpot] = useState({});
  const [traffic, setTraffic] = useState({});

  const spots = [
    {
      name: "Seattle Aquarium ",
      location: { lat: 47.607559279254026, lng: -122.34299870775699 },
    },
    {
      name: "Space Needle",
      location: { lat: 47.62009964037968, lng: -122.3490756210929 },
    },
    {
      name: "University of Washington ",
      location: { lat: 47.65686865308057, lng: -122.30661818625246 },
    },
    {
      name: "Frye Art Museum ",
      location: { lat: 47.60813784186174, lng: -122.32415216405876 },
    },
    {
      name: "West Point Lighthouse",
      location: { lat: 47.662946075385655, lng: -122.4358662863737 },
    },
  ];
  const [spotList, setSpotList] = useState(spots); //[]

  // useEffect(() => {
  //   getMySelection()
  //     .then((data) => {
  //       setSpotList(data);
  //     })
  //     .catch((err) => message.error(err.message))
  //     .finally(() => {
  //       deleteProperties();
  //     });
  // }, []);

  // const deleteProperties = () => {
  //   setSpotList((prevState) =>
  //     prevState.reduce((ary, spot) => {
  //       const newObj = { ...spot };
  //       const propertiesToDelete = [
  //         "userId",
  //         "rating",
  //         "ratingCount",
  //         "cost",
  //         "durationTime",
  //         "openingHours",
  //         "latitude",
  //         "longitude",
  //         "coverImgUrl",
  //       ];
  //       if (propertiesToDelete.some((key) => newObj[key])) {
  //         // Keep only items that don't have any of the properties to delete
  //         return ary;
  //       }
  //       return [...ary, newObj];
  //     }, [])
  //   );
  // };

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
      return <Form0 setDays={setDays} spotList={spotList} />;
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
          <Button type="primary">
            <Link
              to="/cityguide/planning"
              onClick={() => message.success("Processing complete!")}
            >
              survey
            </Link>
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
