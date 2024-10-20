import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";

let index = 0;

const StartEndMenu = ({bedisable, Placeholder,spots}) => {
  const [spotItems, setSpotItems] = useState(spots);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  const addItem = () => {
    // e.preventDefault();
    
    setSpotItems([...spots, name || `New item ${index++}`]);
    console.log(spotItems);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{
        width: 300,
      }}
      placeholder={Placeholder}
      disable={bedisable}
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
  );
};

export default StartEndMenu;
