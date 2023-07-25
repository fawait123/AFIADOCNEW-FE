"use client";
import { Badge, Button, Card, Col, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { colorPallate } from "@/utils/colorpallate";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";

const ChatPage = ({ params }) => {
  return (
    <div
      style={{
        // width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "0px 180px",
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "10px 10px",
          backgroundColor: colorPallate.gray,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Avatar size={40} icon={<UserOutlined />} />
            <p style={{ marginLeft: 10 }}>
              <Badge text={"Devin Raymond Faisal"} color={colorPallate.blue} />
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", marginRight: 20 }}
          >
            <BsFillTelephoneFill
              style={{ color: colorPallate.blue, marginRight: 20 }}
              size={14}
            />
            <AiOutlineVideoCamera
              style={{ color: colorPallate.blue }}
              size={18}
            />
          </div>
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
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((val) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  padding: "10px 10px",
                }}
              >
                <Card style={{ width: "50%" }}>
                  <p style={{ textAlign: "justify" }}>
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
                </Card>
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
                <Card style={{ width: "50%", background: colorPallate.blue }}>
                  <p style={{ textAlign: "justify", color: "white" }}>
                    Veniam labore sunt sunt dolore reprehenderit duis quis dolor
                    aute.
                  </p>
                </Card>
              </div>
            );
          })}
        </Col>
      </Row>
      <Row
        gutter={10}
        style={{ padding: "20px", backgroundColor: colorPallate.gray }}
      >
        <Col flex={1}>
          {" "}
          <Input placeholder="Kirim Pesan" />
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

export default ChatPage;
