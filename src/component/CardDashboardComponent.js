"use client";
import React from "react";
import { Card } from "antd";
import { colorPallate } from "@/utils/colorpallate";

const CardDashboardComponent = (props) => {
  return (
    <Card
      bordered={false}
      style={{
        width: "100%",
        background:
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <div>
          <h1 style={{ color: "white" }}>{props.title}</h1>
          <h6 style={{ color: colorPallate.gray, fontSize: 18 }}>
            {props.count}
          </h6>
        </div>
        <div style={{ color: "white" }}>{props.icon}</div>
      </div>
    </Card>
  );
};

export default CardDashboardComponent;
