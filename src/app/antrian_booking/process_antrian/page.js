"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React from "react";
import { Card, Table, Tabs } from "antd";
import { useRouter } from "next/navigation";
const ProsesAntrian = () => {
  const navigation = useRouter();
  const datadummy = [
    {
      no: 1,
      namadokter: "fawait",
      status: "Proses",
      no_register: "ABSK09999",
      no_register: "active",
    },
  ];

  return (
    <LayoutApp>
      <Card>
        <Tabs defaultActiveKey="proses">
          <Tabs.TabPane tab="Proses" key={"proses"}>
            <Card style={{ overflow: "auto" }}>
              <Table rowKey={"no"} dataSource={datadummy}>
                <Table.Column
                  render={(_, rec) => {
                    return rec.no;
                  }}
                  align="center"
                  title="No"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.namadokter;
                  }}
                  align="center"
                  title="Nama Dokter"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.status;
                  }}
                  align="center"
                  title="Status"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.no_register;
                  }}
                  align="center"
                  title="No Registrasi"
                />
                <Table.Column
                  render={(_, rec) => {
                    return (
                      <p
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => {
                          navigation.push("/antrian_booking/list");
                        }}
                      >
                        LIHAT
                      </p>
                    );
                  }}
                  align="center"
                  title="Aksi"
                />
              </Table>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Reschedule" key={"reschedule"}>
            <Card style={{ overflow: "auto" }}>
              <Table rowKey={"no"} dataSource={datadummy}>
                <Table.Column
                  render={(_, rec) => {
                    return rec.no;
                  }}
                  align="center"
                  title="No"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.namadokter;
                  }}
                  align="center"
                  title="Nama Dokter"
                />
                <Table.Column
                  render={(_, rec) => {
                    return "Reschedule";
                  }}
                  align="center"
                  title="Status"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.no_register;
                  }}
                  align="center"
                  title="No Registrasi"
                />
                <Table.Column
                  render={(_, rec) => {
                    return (
                      <p
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => {
                          navigation.push("/antrian_booking/list");
                        }}
                      >
                        22-09-2023
                      </p>
                    );
                  }}
                  align="center"
                  title="Tanggal"
                />
              </Table>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Selesai" key={"selesai"}>
            <Card style={{ overflow: "auto" }}>
              <Table rowKey={"no"} dataSource={datadummy}>
                <Table.Column
                  render={(_, rec) => {
                    return rec.no;
                  }}
                  align="center"
                  title="No"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.namadokter;
                  }}
                  align="center"
                  title="Nama Dokter"
                />
                <Table.Column
                  render={(_, rec) => {
                    return "Selesai";
                  }}
                  align="center"
                  title="Status"
                />
                <Table.Column
                  render={(_, rec) => {
                    return rec.no_register;
                  }}
                  align="center"
                  title="No Registrasi"
                />
                <Table.Column
                  render={(_, rec) => {
                    return (
                      <p
                        style={{ color: "gray", cursor: "pointer" }}
                        onClick={() => {
                          navigation.push("/antrian_booking/list");
                        }}
                      >
                        LIHAT
                      </p>
                    );
                  }}
                  align="center"
                  title="Aksi"
                />
              </Table>
            </Card>
          </Tabs.TabPane>
        </Tabs>
      </Card>
    </LayoutApp>
  );
};

export default ProsesAntrian;
