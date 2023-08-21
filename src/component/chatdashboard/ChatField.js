"use client";
import { Badge, Button, Card, Col, Form, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { colorPallate } from "@/utils/colorpallate";
import { useForm } from "antd/es/form/Form";

const ChatField = ({ datas, params, send }) => {
  const [form] = useForm();
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px 10px",
          backgroundColor: colorPallate.gray,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            size={40}
            style={{
              color: "white",
              backgroundColor: "gray",
            }}
            icon={<UserOutlined />}
          />

          <p style={{ marginLeft: 10, color: "black" }}>
            {" "}
            <Badge
              color={colorPallate.blue}
              style={{ marginRight: "10px" }}
            />{" "}
            {params?.name}
          </p>
        </div>
      </div>
      <Row
        style={{
          height: "100%",
          overflow: "auto",
          backgroundColor: "aliceblue",
        }}
      >
        <Col flex={1}>
          {datas.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: params.id == item?.senderID ? "start" : "end",
                  padding: "10px 10px",
                }}
              >
                <Card
                  style={{
                    width: "50%",
                    background:
                      params.id == item?.senderID ? "" : colorPallate.blue,
                  }}
                >
                  <p
                    style={{
                      textAlign: "justify",
                      color: params.id == item?.senderID ? "black" : "white",
                    }}
                  >
                    {item?.message}
                  </p>
                </Card>
              </div>
            );
          })}
        </Col>
      </Row>
      <Form form={form}>
        <Row
          gutter={10}
          style={{ padding: "10px 80px", backgroundColor: colorPallate.gray }}
        >
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="message"
          >
            <Col flex={1}>
              {" "}
              <Input
                style={{ color: colorPallate.blue }}
                placeholder="Kirim Pesan"
              />
            </Col>
          </Form.Item>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => {
                form.validateFields().then(() => {
                  send({
                    ...form.getFieldsValue(),
                    params,
                  });
                });
              }}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChatField;
