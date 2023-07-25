"use client";
import ChatField from "@/component/chatdashboard/ChatField";
import ListContact from "@/component/chatdashboard/ListContact";
import { colorPallate } from "@/utils/colorpallate";
import { Col, Row } from "antd";
import React from "react";

const Chats = () => {
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        overflow: "hidden",
        borderRadius: 5,
        // boxShadow: "-3px 2px 2px 0px rgba(0,0,0,0.)",
      }}
    >
      <div style={{ width: "30%", marginRight: 1 }}>
        <div
          style={{
            height: 60,
            backgroundColor: colorPallate.gray,
            display: "flex",
            alignItems: "center",
            padding: "0px 10px",
            position: "sticky",
          }}
        >
          <p style={{ color: "black", fontWeight: 500, fontSize: 18 }}>Chats</p>
        </div>
        <div style={{ overflow: "auto", height: "100%" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((val) => {
            return <ListContact key={val} />;
          })}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        <ChatField />
      </div>
    </div>
  );
};

export default Chats;
