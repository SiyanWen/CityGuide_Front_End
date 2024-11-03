import React, { useRef, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Select, Space, Divider, Button } from "antd";
// import { addToUserSpot} from "../../utils";
import AutoInput from "./AutoInput";

const Form0 = ({ setDays, spotList, updateStartEnd }) => {
  const [daysNum, setDaysNum] = useState();
  const [numSelectors, setNumSelectors] = useState();
  const [selectedValues, setSelectedValues] = useState({}); // Store selected values
  const [spotItems, setSpotItems] = useState(spotList);
  const [newSpot, setNewSpot] = useState(null);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    e.preventDefault();
    setSpotItems((prevSpotItems) => {
      return [...prevSpotItems, { name }];
    });
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    console.log(newSpot);
    // addToUserSpot(newSpot)
    // .then(() => {console.log("add successful!")})
    // .catch((err) => message.error(err.message))
    // .finally(setNewSpot(null))
  };

  const handleNumChange = (value) => {
    setDaysNum(value);
    value = value + 1;
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

  useEffect(() => {
    console.log(selectedValues);
    updateStartEnd(selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    console.log(spotItems);
  }, [spotItems]);

  const selectorHolder = (i) => {
    if (i === 0) {
      return "Day 1 Start Spot";
    } else {
      return `Day ${i} End Spot`;
    }
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
          value={daysNum}
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
              key={`selector${i}`}
              placeholder={selectorHolder(i)}
              defaultValue={selectedValues[`selector${i}`]}
              onChange={(value) => handleSelectChange(value, `selector${i}`)}
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
                    <AutoInput
                      value={name}
                      changeValue={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                      setNewSpot={setNewSpot}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={addItem}
                    >
                      Add spot
                    </Button>
                  </Space>
                </>
              )}
              options={spotItems.map((item) => ({
                label: item.name,
                value: item.name, //if the object contains id, value:item.originalGid
              }))}
            />
          ))}
      </Form.Item>
    </Form>
  );
};

export default Form0;
