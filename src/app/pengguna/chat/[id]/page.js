"use client";
import { Badge, Button, Card, Col, Form, Input, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";
import React from "react";
import { colorPallate } from "@/utils/colorpallate";
import { AiOutlineVideoCamera } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { getChatt, storeChatt } from "@/API/chatt";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "antd/es/form/Form";
import { getDoctorByID } from "@/API/doctor";
import { getUserByID } from "@/API/user";

const ChatPage = ({ params }) => {
  const [dataChatt, setDataChatt] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [dataDoctor, setDataDoctor] = useState(null);
  const [form] = useForm();

  const getDoctor = () => {
    getUserByID(
      {
        id: params.id,
      },
      (response) => {
        setDataDoctor(response.results.data);
      }
    );
  };
  const getData = () => {
    getChatt(
      {
        receiverID: params.id,
        page: 1,
        limit: 40,
      },
      (response) => {
        setDataChatt(response.rows);
        getData();
      }
    );
  };

  const sendChatt = () => {
    setLoadingBtn(true);
    form
      .validateFields()
      .then(() => {
        let formValues = form.getFieldsValue();
        storeChatt(
          {
            message: formValues.message,
            receiverID: params.id,
          },
          (response) => {
            setLoadingBtn(false);
            form.resetFields();
            getData();
          }
        );
      })
      .catch((err) => {
        setLoadingBtn(false);
      });
  };

  useEffect(() => {
    getData();
    getDoctor();
  }, []);
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
              <Badge
                text={dataDoctor?.doctor?.name}
                color={colorPallate.blue}
              />
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
          {dataChatt.map((item, index) => {
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
          style={{ padding: "20px", backgroundColor: colorPallate.gray }}
        >
          <Col span={22}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name={"message"}
            >
              <Input placeholder="Kirim Pesan" />
            </Form.Item>
          </Col>
          <Col span={2}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              onClick={() => sendChatt()}
              loading={loadingBtn}
            >
              Send
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ChatPage;
