"use client";
import { getDoctor } from "@/API/doctor";
import { PATH_IMAGE } from "@/utils/base_url";
import { colorPallate } from "@/utils/colorpallate";
import { Col, Image, List, Row } from "antd";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { ListComponent } from "./components/ListComponent";

export default function DoctorDetail({ params }) {
  const [data, setData] = useState({});

  const getData = () => {
    getDoctor(
      {
        page: 0,
        limit: 10,
        doctorID: params.id,
      },
      (response) => {
        console.log(response);
        if (response.rows.length > 0) {
          setData(response.rows[0]);
        }
      }
    );
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Row
        gutter={[10]}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Col>
          <Image
            src={`${PATH_IMAGE}/${data.photos}`}
            width={120}
            height={120}
            style={{ borderRadius: 100, objectFit: "cover" }}
          />
        </Col>
      </Row>
      <Row
        gutter={[10, 10]}
        justify={"center"}
        style={{ padding: "10px 80px", marginTop: 15 }}
      >
        <Col span={12}>
          <div>
            <ListComponent />
            <ListComponent />
            <ListComponent />
            <ListComponent />
          </div>
        </Col>
      </Row>
    </div>
  );
}
