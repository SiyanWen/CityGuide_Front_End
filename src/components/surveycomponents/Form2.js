import React, { useEffect, useState } from "react";
import { Input, InputNumber, Select, Card, Row, Col } from "antd";

const Form2 = ({ updateBudgets }) => {
  const [food, setFood] = useState(0.00);
  const [transport, setTransport] = useState(0.00);
  const [ticket, setTicket] = useState(0.00);
  const [total, setTotal] = useState(0.00);

  useEffect(() => {
    setTotal(food + transport + ticket);
    if (!food || !transport || !ticket || !total) return;
    updateBudgets((prevState) => ({
      ...prevState,
      budgets: {
        ...prevState.budgets,
        food,
        transport,
        ticket,
        total,
      },
    }));
  }, [food, transport, ticket, total]);

  return (
    <Row gutter={16}>
      {/* Food Input */}
      <Col span={6}>
        <Card title="Food" bordered={false} style={{ textAlign: "center" }}>
          {/* <Input
              placeholder="0"
              type="number"
              value={food}
              onChange={(e) => {
                setFood(Number(e.target.value));
              }}
            /> */}
          <InputNumber
            defaultValue="0"
            min="0"
            max="1000000"
            step="0.01"
            value={food}
            onChange={(value) => {
              setFood(Number(value));
            }}
            stringMode
          />
        </Card>
      </Col>

      {/* Transport Input */}
      <Col span={6}>
        <Card
          title="Transport"
          bordered={false}
          style={{ textAlign: "center" }}
        >
          <InputNumber
            defaultValue="0"
            min="0"
            max="1000000"
            step="0.01"
            value={transport}
            onChange={(value) => {
              setTransport(Number(value));
            }}
            stringMode
          />
        </Card>
      </Col>

      {/* Ticket Input */}
      <Col span={6}>
        <Card title="Ticket" bordered={false} style={{ textAlign: "center" }}>
          <InputNumber
            defaultValue="0"
            min="0"
            max="1000000"
            step="0.01"
            value={ticket}
            onChange={(value) => {
              setTicket(Number(value));
            }}
            stringMode
          />
        </Card>
      </Col>

      {/* Total Input */}
      <Col span={6}>
        <Card title="Total" bordered={false} style={{ textAlign: "center" }}>
          <InputNumber
            defaultValue="0"
            min="0"
            max="1000000"
            step="0.01"
            value={total}
            onChange={(value) => {
              setTotal(Number(value));
            }}
            stringMode
          />
        </Card>
      </Col>
    </Row>
  );
};

export default Form2;
