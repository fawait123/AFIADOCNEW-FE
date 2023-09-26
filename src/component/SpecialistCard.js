import Texting from "@/utils/Texting";
import { colorPallate } from "@/utils/colorpallate";
import { Card, Col, Image } from "antd";
import React from "react";
import { useContext } from "react";

export const SpecialistCard = () => {
  const fontSize = useContext(Texting);
  return (
    <Col span={6} key={1}>
      <Card
        style={{
          cursor: "pointer",
          border: "1px solid #B4B4B3",
          height: 150,
          position: "relative",
          background: "url('./assets/background.png')",
          objectFit: "cover",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
        onClick={() => {
          navigation.push(``);
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            background: "black",
            opacity: 0.4,
          }}
        />
        <p
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            marginTop: 10,
            fontSize: fontSize.md,
          }}
        >
          {"KANDUNGAN"}
        </p>
      </Card>
    </Col>
  );
};
