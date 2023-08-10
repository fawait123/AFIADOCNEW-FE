"use client";
import React, { useEffect, useState } from "react";
import { Badge, Breadcrumb, Space, Table, Tag } from "antd";
import { getBooking } from "@/API/booking";
import { FaEye } from "react-icons/fa";
import moment from "moment";
const { Column, ColumnGroup } = Table;
const Booking = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    let user = JSON.parse(window.localStorage.getItem("user"));
    let params = {
      doctorID: user.prefixID,
    };
    getBooking(params, (response) => {
      setData(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Booking</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table dataSource={data}>
        <Column
          title="Pasien"
          dataIndex="userID"
          key="userID"
          render={(_, record) => {
            return <p>{record.user.name}</p>;
          }}
        />
        <Column
          title="Tanggal"
          dataIndex="date"
          key="date"
          render={(_, record) => {
            return moment(record.date).format("dddd MMMM YYYY");
          }}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            return (
              <>
                <Tag color={record.status == "proccess" ? "yellow" : "blue"}>
                  {record.status}
                </Tag>
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <FaEye style={{ cursor: "pointer" }} />
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
export default Booking;
