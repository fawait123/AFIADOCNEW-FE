"use client";
import CardDashboardComponent from "@/component/CardDashboardComponent";
import { Card, Col, Row } from "antd";
import React from "react";
import { FaUserFriends, FaHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { BiGlassesAlt } from "react-icons/bi";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";
import Maps from "@/component/dashboard/Maps";
import { colorPallate } from "@/utils/colorpallate";
import { useState } from "react";
import { getDashboard } from "@/API/dashboard";
import { useEffect } from "react";

const Dashboard = () => {
  const [dataDashboard, setDataDashboard] = useState({});

  const getData = () => {
    getDashboard((response) => {
      setDataDashboard(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  // const labels = Utils.months({ count: 7 });
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const dataLine = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [100, 200, 300, 400, 500, 600, 700],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [100, 200, 300, 400, 500, 600, 700],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    // DASHBOARD ADMIN
    <div>
      <Row gutter={[10, 10]}>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Pengguna"
            count={dataDashboard?.card?.user || 0}
            icon={<FaUserFriends style={{ fontSize: 50 }} />}
          />
        </Col>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Dokter"
            count={dataDashboard?.card?.doctor || 0}
            icon={<FaUserDoctor style={{ fontSize: 50 }} />}
          />
        </Col>
        <Col flex={1}>
          <CardDashboardComponent
            title="Total Spesialis"
            count={dataDashboard?.card?.specialist || 0}
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
      <Row
        gutter={[10, 10]}
        style={{ display: "flex", alignItems: "center", marginTop: 40 }}
      >
        <Col flex={1}>
          <Line options={options} data={dataLine} />
        </Col>
        <Col flex={1}>
          <Doughnut data={data} />
        </Col>
      </Row>
      <Row gutter={15} style={{ marginTop: 50 }}>
        <Col span={4}>
          <Card title="Total Earnings" bordered={false}>
            {[
              { title: "Provinsi", color: "red" },
              { title: "Kabupten", color: "blue" },
              { title: "Kecamatan", color: "green" },
              { title: "Desa", color: "purple" },
            ].map((x, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 5,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "100%",
                        backgroundColor: x.color,
                        marginRight: 5,
                      }}
                    />{" "}
                    <p>{x.title}</p>
                  </div>
                  <p>1200$</p>
                </div>
              );
            })}
          </Card>
        </Col>
        <Col flex={1}>
          <div>
            <Maps datas={dataDashboard.maps} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
