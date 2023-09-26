"use client";
import API from "@/API";
import LayoutApp from "@/component/app_component/LayoutApp";
import Screens from "@/utils/Screens";
import { Button, Card, Col, Form, Input, Row, Select, Tag } from "antd";
import { useForm } from "antd/es/form/Form";
import moment from "moment";
import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

const Page = () => {
  const screens = useContext(Screens);
  const [form] = useForm();
  const [dataAntrian, setDataAntrian] = useState([]);
  const [rekamMedis, setRekamMedis] = useState(null);
  const [listInputs, setListInputs] = useState([
    {
      action: null,
      result: null,
    },
  ]);

  const getAntrian = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    await API({
      method: "GET",
      url: "/admin/registration",
      params: {
        doctorID: user.prefixID,
        status: ["process", "reschedule"],
        date: moment().format("YYYY-MM-DD"),
      },
    }).then((response) => {
      setDataAntrian(response.data.results.data);
    });
  };

  const getRekamMedis = async (e) => {
    await API({
      url: "/admin/medical-record",
      method: "get",
      params: {
        limit: 5,
        patientID: e,
      },
    }).then((response) => {
      setRekamMedis(response.data.results.data);
    });
  };

  const handleClick = async () => {
    form.validateFields().then(async () => {
      const fieldValue = form.getFieldsValue();
      await API({
        url: "/admin/medical-record",
        method: "post",
        data: fieldValue,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          getAntrian();
          form.resetFields();
          setRekamMedis(null);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  useEffect(() => {
    getAntrian();
  }, []);
  return (
    <Row gutter={[10, 10]}>
      <Col span={screens.xs ? 24 : 14}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <Form layout="vertical" name="formpasien" form={form}>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      style={{ width: "100%" }}
                      label={"Pilih Pasien"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="patientID"
                    >
                      <Select onChange={(e) => getRekamMedis(e)}>
                        {dataAntrian.map((item, index) => {
                          return (
                            <Select.Option
                              value={item?.patient?.id}
                              key={index}
                            >
                              {item?.patient?.name}
                            </Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      style={{ width: "100%" }}
                      label={"Keluhan"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="complaint"
                    >
                      <Input.TextArea
                        style={{
                          height: 120,
                        }}
                      ></Input.TextArea>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      style={{ width: "100%" }}
                      label={"Diagnosa"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                      name="diagnosis"
                    >
                      <Input.TextArea
                        style={{
                          height: 120,
                        }}
                      ></Input.TextArea>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.List
                      name="detail"
                      initialValue={[
                        {
                          action: null,
                          result: null,
                        },
                      ]}
                    >
                      {(fields, { add, remove }) => (
                        <Row gutter={[10, 10]}>
                          {fields.map((field, index) => {
                            return (
                              <>
                                <Col
                                  span={screens.xs ? 24 : 11}
                                  key={index + "action"}
                                >
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                    label="Tindakan"
                                    name={[index, "action"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col
                                  span={screens.xs ? 24 : 11}
                                  key={index + "result"}
                                >
                                  <Form.Item
                                    rules={[
                                      {
                                        required: true,
                                      },
                                    ]}
                                    label="Hasil"
                                    name={[index, "result"]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                {index === 0 ? (
                                  <Col
                                    span={screens.xs ? 24 : 2}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      type="primary"
                                      onClick={() => add()}
                                      block={screens.xs ? true : false}
                                    >
                                      +
                                    </Button>
                                  </Col>
                                ) : (
                                  <Col
                                    span={screens.xs ? 24 : 2}
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Button
                                      style={{
                                        backgroundColor: "red",
                                        color: "white",
                                      }}
                                      block={screens.xs ? true : false}
                                      onClick={() => remove(field.name)}
                                    >
                                      -
                                    </Button>
                                  </Col>
                                )}
                              </>
                            );
                          })}
                        </Row>
                      )}
                    </Form.List>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={screens.xs ? 24 : 10}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <p style={{ fontWeight: 500 }}>List Antrian</p>
              {dataAntrian.length > 0 ? (
                dataAntrian.map((va) => {
                  return (
                    <div
                      key={va}
                      style={{
                        display: "flex",
                        padding: 10,
                        justifyContent: "space-between",
                        // width: "100%",
                        border: "1px solid gray",
                        margin: "10px 0px",
                        borderRadius: 5,
                      }}
                    >
                      <p>{va?.patient?.name}</p>
                      <p>{va?.registrationID}</p>
                    </div>
                  );
                })
              ) : (
                <p>Tidak ada data antrian</p>
              )}
              <div
                style={{
                  display: "flex",
                  padding: 10,
                  justifyContent: "space-between",
                  // width: "100%",

                  margin: "10px 0px",
                }}
              >
                <p>Total Pasien</p>
                <p>{dataAntrian.length}</p>
              </div>
            </Card>
          </Col>
          {rekamMedis ? (
            <Col span={24}>
              <Card>
                <p style={{ fontWeight: 500, marginBottom: 10 }}>
                  History Rekam Medis Pasien
                </p>

                {rekamMedis.length > 0 ? (
                  rekamMedis?.map((item) => {
                    return (
                      <Card style={{ marginBottom: 4 }}>
                        <Tag color="blue" style={{ marginBottom: 4 }}>
                          Pemeriksaan Tanggal{" "}
                          {moment(item?.createdAt).format("DD MMMM YYYY")}
                        </Tag>
                        <p style={{ fontWeight: "bold", margin: 4 }}>
                          Dokter {item?.doctor?.name}
                        </p>
                        <Row gutter={[0, 10]} style={{ marginBottom: 7 }}>
                          <Col span={12}>
                            <p style={{ fontWeight: 500 }}>Keluhan</p>
                            <p>{item?.complaint}</p>
                          </Col>
                          <Col span={12}>
                            <p style={{ fontWeight: 500 }}>Diagnosa</p>
                            <p>{item?.diagnosis}</p>
                          </Col>
                          <Col span={24}>
                            <p style={{ fontWeight: 500 }}>Tindakan</p>
                            {JSON.parse(item?.detail).map((det) => {
                              return (
                                <>
                                  <p>
                                    {det?.action}, {det?.result}
                                  </p>
                                </>
                              );
                            })}
                          </Col>
                        </Row>
                      </Card>
                    );
                  })
                ) : (
                  <p>Tidak ada data rekam medis</p>
                )}
              </Card>
            </Col>
          ) : null}
        </Row>
      </Col>
      <Col span={24}>
        <Button type="primary" onClick={() => handleClick()}>
          Simpan
        </Button>
      </Col>
    </Row>
  );
};

export default Page;
