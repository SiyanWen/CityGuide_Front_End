import React, {useEffect, useState } from "react";
import {
  Input,
  Select,
  Card,
  Row,
  Col,
} from "antd";

const Form2 = ({ updateBudgets }) => {
    const [food, setFood] = useState(0);
    const [transport, setTransport] = useState(0);
    const [ticket, setTicket] = useState(0);
    const [total, setTotal] = useState(0);
  
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
            <Input
              placeholder="0"
              type="number"
              value={food}
              onChange={(e) => {
                setFood(Number(e.target.value));
              }}
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
            <Input
              placeholder="0"
              type="number"
              value={transport}
              onChange={(e) => {
                setTransport(Number(e.target.value));
              }}
            />
          </Card>
        </Col>
  
        {/* Ticket Input */}
        <Col span={6}>
          <Card title="Ticket" bordered={false} style={{ textAlign: "center" }}>
            <Input
              placeholder="0"
              type="number"
              value={ticket}
              onChange={(e) => {
                setTicket(Number(e.target.value));
              }}
            />
          </Card>
        </Col>
  
        {/* Total Input */}
        <Col span={6}>
          <Card title="Total" bordered={false} style={{ textAlign: "center" }}>
            <Input
              placeholder="0"
              type="number"
              value={total}
              onChange={(e) => {
                setTotal(Number(e.target.value));
              }}
            />
          </Card>
        </Col>
      </Row>
    );
  };

  export default Form2;