"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";

const PasienPages = () => {
  const [listInputs, setListInputs] = useState([
    {
      tindakan: "",
      hasil: "",
    },
  ]);
  return (
    <Row gutter={[10, 10]}>
      <Col span={18}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <Form layout="vertical" name="formpasien">
                <Row>
                  <Col span={24}>
                    <Form.Item style={{ width: "100%" }} label={"Pilih Pasien"}>
                      <Select>
                        <Select.Option value={"gigih prasetia"}>
                          gigih prasetia
                        </Select.Option>
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
      <Col span={6}>
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Card>
              <p style={{ fontWeight: 500 }}>Tindakan</p>
              {[1, 2, 3].map((va) => {
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
                    <p>Burhans</p>
                    <p>RGS-02201293</p>
                  </div>
                );
              })}
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
                <p>20</p>
              </div>
            </Card>
          </Col>
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
        </Row>
      </Col>
    </Row>
  );
};

export default PasienPages;
