"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useState } from "react";
import { Button, Card, Col, Form, Modal, Row, Table, Tabs, Tag } from "antd";
import { useRouter } from "next/navigation";
import API from "@/API";
import { useEffect } from "react";
import { FaExclamationCircle, FaEye } from "react-icons/fa";
import moment from "moment";
import { FaX } from "react-icons/fa6";
import { BsCalendarCheckFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import TextArea from "antd/es/input/TextArea";
import { useForm } from "antd/es/form/Form";
const ProsesAntrian = () => {
  const navigation = useRouter();
  const [modalDetailPemeriksaan, setModalDetailPemeriksaan] = useState({
    status: false,
    dataContext: {},
  });
  const [modalCancel, setModalCancel] = useState({
    status: false,
    dataContext: {},
  });

  const [dataProcess, setDataProcess] = useState([]);
  const [dataReschedule, setDataReschedule] = useState([]);
  const [dataSelesai, setDataSelesai] = useState([]);
  const [dataCancel, setDataCancel] = useState([]);
  const [formCancel] = useForm();
  const [loadingCancel, setLoadingCancel] = useState(false);

  useEffect(() => {
    gettableProcess(["process"], (res) => setDataProcess(res));
    gettableProcess(["reschedule"], (res) => setDataReschedule(res));
    gettableProcess(["done"], (res) => setDataSelesai(res));
    gettableProcess(["cancel"], (res) => setDataCancel(res));
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

  const getDetailRekamMedis = async (id) => {
    await API({
      method: "get",
      url: "/admin/medical-record",
      params: {
        registrationID: id,
      },
    }).then((response) => {
      setModalDetailPemeriksaan({
        dataContext: response?.data?.results?.data[0],
        status: true,
      });
    });
  };
  return (
    <LayoutApp>
      <div style={{ width: "100%", minHeight: "90vh" }}>
        <Card>
          <Tabs defaultActiveKey="proses">
            <Tabs.TabPane tab="Proses" key={"proses"}>
              <Card style={{ overflow: "auto" }}>
                <Table
                  pagination={{
                    pageSize: 10,
                  }}
                  rowKey={"id"}
                  dataSource={dataProcess}
                >
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
                        <>
                          <FaEye
                            style={{ color: "gray", cursor: "pointer" }}
                            onClick={() => {
                              navigation.push(
                                `/pengguna/antrian_booking/detail/${rec?.doctor?.id}?date=${rec.date}`
                              );
                            }}
                          />
                          <AiFillCloseCircle
                            style={{
                              color: "red",
                              cursor: "pointer",
                              marginLeft: 10,
                            }}
                            onClick={() =>
                              setModalCancel({ status: true, dataContext: rec })
                            }
                          />
                        </>
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
                      return moment(rec?.due_date).format("DD MMMM YYYY");
                    }}
                    align="center"
                    title="Tanggal Reshedule"
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
                        <>
                          <AiFillCloseCircle
                            style={{
                              color: "red",
                              cursor: "pointer",
                              marginLeft: 10,
                            }}
                            onClick={() =>
                              setModalCancel({ status: true, dataContext: rec })
                            }
                          />
                        </>
                      );
                    }}
                    align="center"
                    title="Aksi"
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
                        <FaEye
                          onClick={() => {
                            getDetailRekamMedis(rec?.id);
                          }}
                          style={{ cursor: "pointer" }}
                        />
                      );
                    }}
                    align="center"
                    title="Aksi"
                  />
                </Table>
              </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Cancel" key={"cancel"}>
              <Card style={{ overflow: "auto" }}>
                <Table rowKey={"id"} dataSource={dataCancel}>
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
                      return rec?.description;
                    }}
                    align="center"
                    title="Alasan"
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
          <Col span={24}>
            <p>
              Berikut merupakan detail rekam medis dari pasien untuk nomor
              registrasi{" "}
              <Tag color="blue">
                {
                  modalDetailPemeriksaan?.dataContext?.registration
                    ?.registrationID
                }
              </Tag>{" "}
              pada tanggal{" "}
              <Tag color="blue">
                {moment(modalDetailPemeriksaan?.dataContext?.createdAt).format(
                  "DD MMMM YYYY"
                )}
              </Tag>
            </p>
          </Col>
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
              <p>{modalDetailPemeriksaan?.dataContext?.complaint}</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Diagnosa
              </p>
              <p>{modalDetailPemeriksaan?.dataContext?.diagnosis}</p>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 20 }}>
                Tindakan
              </p>
              {modalDetailPemeriksaan?.dataContext?.detail == null
                ? null
                : JSON.parse(modalDetailPemeriksaan?.dataContext?.detail).map(
                    (item) => {
                      return (
                        <p>
                          {item?.action} {item?.result}
                        </p>
                      );
                    }
                  )}
            </Card>
          </Col>
        </Row>
      </Modal>
      <Modal
        title={"Batalkan Registrasi"}
        width={"80%"}
        footer={null}
        onCancel={() => {
          setModalCancel({
            status: false,
            dataContext: {},
          });
        }}
        open={modalCancel.status}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form form={formCancel} layout="vertical">
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label={"Keterangan"}
              >
                <TextArea />
              </Form.Item>
              <Button
                type="primary"
                loading={loadingCancel}
                onClick={() => {
                  setLoadingCancel(true);
                  formCancel
                    .validateFields()
                    .then(async (field) => {
                      await API({
                        url: "admin/registration/cancel",
                        method: "put",
                        params: {
                          id: modalCancel?.dataContext?.id,
                        },
                        data: field,
                      })
                        .then((response) => {
                          formCancel.resetFields();
                          setModalCancel({
                            status: false,
                            dataContext: {},
                          });
                          setLoadingCancel(false);
                          gettableProcess(["process"], (res) =>
                            setDataProcess(res)
                          );
                        })
                        .catch((err) => {
                          setLoadingCancel(false);
                        });
                    })
                    .catch((err) => {
                      setLoadingCancel(false);
                    });
                }}
              >
                Batalkan
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal>
    </LayoutApp>
  );
};

export default ProsesAntrian;
