"use client";
import CardDashboardComponent from "@/component/CardDashboardComponent";
import { Col, Row } from "antd";
import React from "react";
import { FaUserFriends, FaHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BiGlassesAlt } from "react-icons/bi";

const Dashboard = () => {
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Pengguna"
            count={110}
            icon={<FaUserFriends style={{ fontSize: 50 }} />}
          />
        </Col>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Dokter"
            count={1237}
            icon={<FaUserDoctor style={{ fontSize: 50 }} />}
          />
        </Col>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Spesialis"
            count={726}
            icon={<BiGlassesAlt style={{ fontSize: 50 }} />}
          />
        </Col>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Rumah Sakit"
            count={110}
            icon={<FaHospital style={{ fontSize: 50 }} />}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
