"use client";
import ChatField from "@/component/chatdashboard/ChatField";
import ListContact from "@/component/chatdashboard/ListContact";
import { Col, Row } from "antd";
import React from "react";

const Chats = () => {
  return (
    <div style={{ height: "90vh", display: "flex", overflow: "hidden" }}>
      <div style={{ backgroundColor: "red", width: "20%" }}>
        <ListContact />
      </div>
      <div style={{ backgroundColor: "blue", width: "100%" }}>
        <ChatField />
      </div>
    </div>
  );
};

export default Chats;
