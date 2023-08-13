"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useEffect, useState } from "react";
import { Card, Col, Space, Table, Tag } from "antd";
import { getBooking } from "@/API/booking";
import moment from "moment";
const { Column, ColumnGroup } = Table;

const BookingPage = () => {
  const [dataBook, setDataBook] = useState([]);

  const getData = async () => {
    let payload = {
      userID: JSON.parse(window.localStorage.getItem("user")).id,
    };
    await getBooking(payload, (response) => {
      setDataBook(response);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutApp>
      <Col span={23} style={{ margin: "0px auto" }}>
        <Card style={{ marginBottom: 20 }}>
          <h3>BookingPage</h3>
        </Card>
        <Table dataSource={dataBook}>
          <Column
            title="Tanggal"
            dataIndex="date"
            key="date"
            render={(_, record) => {
              return <p>{moment(record.date).format("DD MMMM YYYY")}</p>;
            }}
          />
          <Column
            title="Dokter"
            dataIndex="doctorID"
            key="doctorID"
            render={(_, record) => {
              return <p>{record.doctor.name}</p>;
            }}
          />
          <Column
            title="Status"
            dataIndex="status"
            key="status"
            render={(_, record) => {
              return (
                <Tag color={record.status == "proccess" ? "yellow" : "blue"}>
                  {record.status}
                </Tag>
              );
            }}
          />
        </Table>
      </Col>
    </LayoutApp>
  );
};

export default BookingPage;
