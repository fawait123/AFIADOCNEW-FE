"use client";
import { Button, Col, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { colorPallate } from "@/utils/colorpallate";

const ChatField = () => {
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
          <Avatar size={40} icon={<UserOutlined />} />
          <p style={{ marginLeft: 10 }}>Achmad Fawait</p>
        </div>
      </div>
      <Row
        style={{
          height: "100%",
          overflow: "auto",
          backgroundColor: "aliceblue",
        }}
      >
        <Col>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((val) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    border: "1px solid green",
                    padding: "5px 10px",
                    borderRadius: "10px 10px 10px 3px",
                    color: "green",
                    maxWidth: "45%",
                  }}
                >
                  <p>
                    Duis velit anim laborum incididunt magna. Amet proident
                    deserunt officia deserunt consectetur aute aliqua aute
                    exercitation ad exercitation. Enim ut et ea et ea. Quis
                    officia deserunt id proident qui do dolore aliquip in.
                    Excepteur qui culpa aute reprehenderit ad elit est duis
                    officia incididunt sit eiusmod elit sit. Ex ex reprehenderit
                    qui aliqua exercitation officia enim velit proident dolor
                    ipsum minim voluptate culpa. Officia eiusmod proident et
                    voluptate in ea sit.
                  </p>
                </div>
              </div>
            );
          })}

          {[1, 2, 3, 4, 5, 6].map((val) => {
            return (
              <div
                key={val}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  padding: "10px 10px",
                }}
              >
                <div
                  style={{
                    border: "1px solid gray",
                    padding: "5px 10px",
                    borderRadius: "10px 10px 3px 10px",
                    color: "gray",
                    maxWidth: "45%",
                  }}
                >
                  <p>
                    Veniam labore sunt sunt dolore reprehenderit duis quis dolor
                    aute.
                  </p>
                </div>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row
        gutter={10}
        style={{ padding: "10px", backgroundColor: colorPallate.gray }}
      >
        <Col flex={1}>
          {" "}
          <Input placeholder="Messages" />
        </Col>
        <Col span={2}>
          <Button style={{ width: "100%" }} type="primary">
            Send
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ChatField;
