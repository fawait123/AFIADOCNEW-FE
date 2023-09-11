"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useState } from "react";
import { Button, Card, Col, Modal, Row, Table, Tabs } from "antd";
import { useRouter } from "next/navigation";
import API from "@/API";
import { useEffect } from "react";
const ProsesAntrian = () => {
  const navigation = useRouter();
  const [modalDetailPemeriksaan, setModalDetailPemeriksaan] = useState({
    status: false,
    dataContext: {},
  });
  const [dataProcess, setDataProcess] = useState([]);
  const [dataReschedule, setDataReschedule] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const datadummy = [
    {
      no: 1,
      namadokter: "fawait",
      status: "Proses",
      no_register: "ABSK09999",
      no_register: "active",
    },
  ];

  useEffect(() => {
    gettableProcess("process", (res) => setDataProcess(res));
    gettableProcess("reschedule", (res) => setDataReschedule(res));
    gettableProcess("done", (res) => setDataSelesai(res));
  }, []);

  const gettableProcess = async (status, next) => {
    await API({
      method: "GET",
      url: "/admin/registration",
      params: {
        status,
      },
    }).then((response) => {
      next(response.data.results.data);
    });
  };

  console.log(modalDetailPemeriksaan);
  return (
    <LayoutApp>
      <div style={{ width: "100%", minHeight: "90vh" }}>
        <Card>
          <Tabs defaultActiveKey="proses">
            <Tabs.TabPane tab="Proses" key={"proses"}>
              <Card style={{ overflow: "auto" }}>
                <Table rowKey={"id"} dataSource={dataProcess}>
                  <Table.Column
                    render={(_, rec, index) => {
                      return index + 1;
                    }}
                    align="center"
                    title="No"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.doctor?.name;
                    }}
                    align="center"
                    title="Nama Dokter"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return "process";
                    }}
                    align="center"
                    title="Status"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec.registrationID;
                    }}
                    align="center"
                    title="No Registrasi"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.patient?.name;
                    }}
                    align="center"
                    title="Nama Pasien"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec.registrationID?.split(".")[1];
                    }}
                    align="center"
                    title="Nomor Antrian"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return (
                        <p
                          style={{ color: "gray", cursor: "pointer" }}
                          onClick={() => {
                            navigation.push(
                              `/pengguna/antrian_booking/detail/${rec?.doctor?.id}`
                            );
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
                <Table rowKey={"id"} dataSource={dataReschedule}>
                  <Table.Column
                    render={(_, rec, index) => {
                      return index + 1;
                    }}
                    align="center"
                    title="No"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.doctor?.name;
                    }}
                    align="center"
                    title="Nama Dokter"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return "reschedule";
                    }}
                    align="center"
                    title="Status"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec.registrationID;
                    }}
                    align="center"
                    title="No Registrasi"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.patient?.name;
                    }}
                    align="center"
                    title="Nama Pasien"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec.registrationID?.split(".")[1];
                    }}
                    align="center"
                    title="Nomor Antrian"
                  />
                </Table>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Selesai" key={"selesai"}>
              <Card style={{ overflow: "auto" }}>
                <Table rowKey={"id"} dataSource={dataSelesai}>
                  <Table.Column
                    render={(_, rec, index) => {
                      return index + 1;
                    }}
                    align="center"
                    title="No"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.doctor?.name;
                    }}
                    align="center"
                    title="Nama Dokter"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return "selesai";
                    }}
                    align="center"
                    title="Status"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec.registrationID;
                    }}
                    align="center"
                    title="No Registrasi"
                  />
                  <Table.Column
                    render={(_, rec) => {
                      return rec?.patient?.name;
                    }}
                    align="center"
                    title="Nama Pasien"
                  />

                  <Table.Column
                    render={(_, rec) => {
                      return (
                        <p
                          style={{ color: "gray", cursor: "pointer" }}
                          onClick={() => {
                            setModalDetailPemeriksaan({
                              status: true,
                              dataContext: rec,
                            });
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
      </div>
      <Modal
        title={"Detail Pemeriksaan"}
        width={"80%"}
        footer={null}
        onCancel={() => {
          setModalDetailPemeriksaan({
            status: false,
          });
        }}
        open={modalDetailPemeriksaan.status}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Data Pasien
              </p>
              <p>NIK : {modalDetailPemeriksaan?.dataContext?.patient?.NIK}</p>
              <p>Nama : {modalDetailPemeriksaan?.dataContext?.patient?.name}</p>
              <p>
                Email : {modalDetailPemeriksaan?.dataContext?.patient?.email}
              </p>
              <p>
                Handphone :{" "}
                {modalDetailPemeriksaan?.dataContext?.patient?.phone}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Data Dokter
              </p>
              <p>NIK : {modalDetailPemeriksaan?.dataContext?.doctor?.NIK}</p>
              <p>Nama : {modalDetailPemeriksaan?.dataContext?.doctor?.name}</p>
              <p>
                Email : {modalDetailPemeriksaan?.dataContext?.doctor?.email}
              </p>
              <p>
                Handphone : {modalDetailPemeriksaan?.dataContext?.doctor?.phone}
              </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Keluhan
              </p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Pemeriksaan
              </p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Diagnosa
              </p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
              <p>- example content</p>
            </Card>
          </Col>
          <Col span={24}>
            <p style={{ textAlign: "right" }}>
              {modalDetailPemeriksaan?.dataContext?.date}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Button
                onClick={() => {
                  setModalDetailPemeriksaan({
                    status: false,
                  });
                }}
                style={{ width: 200 }}
              >
                Kembali
              </Button>
              <p>{modalDetailPemeriksaan?.dataContext?.doctor?.name}</p>
            </div>
          </Col>
        </Row>
      </Modal>
    </LayoutApp>
  );
};

export default ProsesAntrian;
