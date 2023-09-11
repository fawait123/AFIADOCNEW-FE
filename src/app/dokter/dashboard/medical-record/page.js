"use client";
import API from "@/API";
import LayoutApp from "@/component/app_component/LayoutApp";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";

const Page = () => {
  const [dataAntrian, setDataAntrian] = useState([]);
  const [rekamMedis, setRekamMedis] = useState(null);
  const [listInputs, setListInputs] = useState([
    {
      tindakan: "",
      hasil: "",
    },
  ]);

  const getAntrian = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    await API({
      method: "GET",
      url: "/admin/registration",
      params: {
        doctorID: user.prefixID,
      },
    }).then((response) => {
      setDataAntrian(response.data.results.data);
    });
  };

  useEffect(() => {
    getAntrian();
  }, []);
  return (
    <Row gutter={[10, 10]}>
      <Col span={16}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <Form layout="vertical" name="formpasien">
                <Row>
                  <Col span={24}>
                    <Form.Item style={{ width: "100%" }} label={"Pilih Pasien"}>
                      <Select>
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
                    <Form.Item style={{ width: "100%" }} label={"Keluhan"}>
                      <Input.TextArea
                        style={{
                          height: 120,
                        }}
                      ></Input.TextArea>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item style={{ width: "100%" }} label={"Diagnosa"}>
                      <Input.TextArea
                        style={{
                          height: 120,
                        }}
                      ></Input.TextArea>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.List name="names" initialValue={listInputs}>
                      {(fields, { add, remove }, { errors }) => (
                        <Row gutter={[10, 10]}>
                          {fields.map((field, index) => {
                            // console.log(field);
                            return (
                              <>
                                <Col span={11}>
                                  <Form.Item
                                    label="Tindakan"
                                    name={index + "tindakan"}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>

                                <Col span={11}>
                                  <Form.Item
                                    label="Hasil"
                                    name={index + "hasil"}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                                {index === 0 ? (
                                  <Col span={2}>
                                    <Form.Item label=" ">
                                      <Button onClick={add}>+</Button>
                                    </Form.Item>
                                  </Col>
                                ) : (
                                  <Col span={2}>
                                    <Form.Item label=" ">
                                      <Button
                                        style={{
                                          backgroundColor: "red",
                                          color: "white",
                                        }}
                                        onClick={() => remove(field.name)}
                                      >
                                        -
                                      </Button>
                                    </Form.Item>
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
          <Col span={24}>
            <Card>
              <p>span</p>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={8}>
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

                <Row gutter={[0, 10]}>
                  <Col span={12}>
                    <p style={{ fontWeight: 500 }}>Keluhan</p>
                    <p>- Sakit Kepala</p>
                    <p>- Sakit Perut</p>
                  </Col>
                  <Col span={12}>
                    <p style={{ fontWeight: 500 }}>Diagnosa</p>
                    <p>- Sakit Kepala</p>
                    <p>- Sakit Perut</p>
                  </Col>
                  <Col span={12}>
                    <p style={{ fontWeight: 500 }}>Tindakan</p>
                    <p>- Sakit Kepala</p>
                    <p>- Sakit Perut</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          ) : null}
        </Row>
      </Col>
    </Row>
  );
};

export default Page;
