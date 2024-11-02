import React, {useState } from "react";
import {
  Form,
  Input,
  Select,
} from "antd";

const { Option } = Select;

const Form1 = ({ days, updateSpotsPerDay, updateTraffic }) => {
    const [spotPerday, setSpotPerDay] = useState();
    // const [trafficPerDay, setTrafficPerDay] = useState({});
  
    const handleSelectChange = (value, key) => {
      updateTraffic((prevState) => ({
        ...prevState,
        [key]: value,
      }));
    };
  
    const generateTrafficPreferences = () => {
      const dayInputs = [];
      for (let i = 1; i <= days; i++) {
        dayInputs.push(
          <Select
            placeholder={`Day ${i}`}
            key={i}
            style={{ width: "100%" }}
            onChange={(value) => handleSelectChange(value, `Day ${i}`)}
          >
            <Option value="drives">drives</Option>
            <Option value="public">public</Option>
            <Option value="bicycle">bicycle</Option>
            <Option value="walk">walk</Option>
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
          <Input
            placeholder="Type in number of spots"
            type="number"
            min={1}
            max={12} // Limit to 12 spots
            value={spotPerday}
            onChange={(e) => {
              setSpotPerDay(Number(e.target.value));
              updateSpotsPerDay((prevState) => ({
                ...prevState,
                spots_per_day: parseInt(e.target.value, 10),
              }));
            }} // Update days state in parent
          />
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

  export default Form1;