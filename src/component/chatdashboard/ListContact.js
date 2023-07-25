"use client";
import { colorPallate } from "@/utils/colorpallate";
import { Avatar, Badge, Card } from "antd";
import { UserOutlined } from "@ant-design/icons";
import React from "react";

const ListContact = () => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
        }}
      >
        <div style={{ width: "30%" }}>
          <Avatar size={40} icon={<UserOutlined />} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "70%",
          }}
        >
          <div>
            <p style={{ color: colorPallate.blue }}>Achmad Fawait</p>
            <p style={{ fontSize: 10, color: "gray" }}>
              terakhir dilihat 09:00
            </p>
            <p style={{ fontSize: 10, fontWeight: 400, color: "black" }}>
              Reprehenderit cupid...
            </p>
          </div>
        </div>
        <Badge color={colorPallate.blue} count={5} />
      </div>
    </Card>
  );
};

export default ListContact;
