"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  message,
  Upload,
  Breadcrumb,
  Table,
  Tag,
  Space,
  Card,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Column from "antd/es/table/Column";
import { getDoctor } from "@/API/doctor";
import moment from "moment/moment";
import { colorPallate } from "@/utils/colorpallate";
import { BsFillTrashFill } from "react-icons/bs";

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataDoctor, setDataDoctor] = useState({
    count: 0,
    limit: 0,
    page: 0,
    rows: [],
  });
  const [addingForm, setAddingForm] = useState({
    FormPendidikan: [1],
    FormPekerjaan: [1],
  });

  useEffect(() => {
    getDoctor((res) => {
      setDataDoctor(res);
    });
  }, []);

  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

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
        {/* <p>Doctors</p> */}
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Dokter</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => setOpen(true)}
          type="primary"
        >
          Tambah Dokter
        </Button>
        <Modal
          title="Tambah Dokter"
          centered
          open={open}
          okText="Tambah Dokter"
          cancelText="Batal"
          onOk={() => {
            // console.log(form.getFieldValue());
            form.validateFields().then(() => {
              console.log(form.getFieldValue());
            });

            // console.log(form);
          }}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 30 }}>
            <Row gutter={[20]}>
              <Col span={12}>
                <Form.Item name="str" label="STR" rules={[{ required: false }]}>
                  <Input placeholder="STR" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nik" label="NIK" rules={[{ required: false }]}>
                  <Input placeholder="NIK" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nama"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name={"Jenis Kelamin"}
                  rules={[{ required: false }]}
                >
                  <Select>
                    <Select.Option value="Laki-laki">Laki-Laki</Select.Option>
                    <Select.Option value="Perempuan">Perempuan</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="religion"
                  label="Agama"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Agama" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: false, type: "email" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Telepon"
                  rules={[
                    {
                      required: false,
                      type: "number",
                      message: "Phone isn't valid",
                    },
                  ]}
                >
                  <Input placeholder="Telepon" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="photos"
                  label="Gambar"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>
                      File harus png | jpg | jpeg
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>

              <Col span={24}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                  }}
                >
                  <p style={{ fontWeight: 500 }}>Riwayat Pendidikan</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: colorPallate.blue,
                    }}
                    onClick={() =>
                      setAddingForm({
                        ...addingForm,
                        FormPendidikan: [
                          ...addingForm.FormPendidikan,
                          addingForm.FormPendidikan + 1,
                        ],
                      })
                    }
                    // style={{ width: "40%" }}
                  >
                    <AiOutlinePlusCircle />
                    <p>Tambah</p>
                  </div>
                </div>
                {addingForm.FormPendidikan.map((form, index) => {
                  return (
                    <Card
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      <BsFillTrashFill
                        color="red"
                        style={{ position: "absolute", right: 20 }}
                      />

                      <Row gutter={[10, 10]} style={{ width: "100%" }}>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`masuk_univ_${index + 1}`}
                            label={`Nama`}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`lulus_univ_${index + 1}`}
                            label={`Gelar `}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[10, 10]} style={{ width: "100%" }}>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`masuk_univ_${index + 1}`}
                            label={`Masuk `}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`lulus_univ_${index + 1}`}
                            label={`Lulus `}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </Col>
              <Col span={24}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    // backgroundColor: "red",
                  }}
                >
                  <p style={{ fontWeight: 500 }}>Riwayat Pekerjaan</p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: colorPallate.blue,
                    }}
                    onClick={() =>
                      setAddingForm({
                        ...addingForm,
                        FormPekerjaan: [
                          ...addingForm.FormPekerjaan,
                          addingForm.FormPekerjaan + 1,
                        ],
                      })
                    }
                    // style={{ width: "40%" }}
                  >
                    <AiOutlinePlusCircle />
                    <p>Tambah</p>
                  </div>
                </div>
                {addingForm.FormPekerjaan.map((form, index) => {
                  return (
                    <Card
                      style={{
                        marginBottom: 10,
                      }}
                    >
                      {/* <p>{index + 1}</p> */}
                      <BsFillTrashFill
                        color="red"
                        style={{ position: "absolute", right: 20 }}
                      />

                      <Row gutter={[10, 10]} style={{ width: "100%" }}>
                        <Col span={24}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`name ${index + 1}`}
                            label={`Nama`}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row gutter={[10, 10]} style={{ width: "100%" }}>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`masuk_univ_${index + 1}`}
                            label={`Masuk`}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Form.Item
                            // style={{ width: "100%" }}
                            name={`lulus_univ_${index + 1}`}
                            label={`Keluar `}
                            rules={[{ required: false }]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  );
                })}
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <Col>
          <Select
            defaultValue="10"
            style={{
              width: 70,
            }}
            onChange={() => console.log("oke")}
            options={[
              {
                value: "10",
                label: "10",
              },
              {
                value: "25",
                label: "25",
              },
              {
                value: "50",
                label: "50",
              },
              {
                value: "100",
                label: "100",
                disabled: true,
              },
            ]}
          />
        </Col>
        <Col>
          <Input style={{ width: 200 }} placeholder="Search..." />
        </Col>
      </Row>
      {/* <div style={{ overflow: "auto" }}> */}
      <Table
        dataSource={dataDoctor.rows}
        scroll={{
          x: 1500,
        }}
      >
        <Column
          title="NIK/NIP"
          fixed="left"
          key="NIK"
          render={(_, record) => {
            return <span>{record.NIK + "/" + record.NIP}</span>;
          }}
        />
        <Column title="Nama" dataIndex="name" key="name" />

        <Column
          title="Tempat, Tanggal Lahir"
          key="birthdate"
          render={(_, record) => {
            return (
              <span>
                {record.placebirth +
                  ", " +
                  moment(record.birthdate).format("DD MMMM YYYY")}
              </span>
            );
          }}
        />
        <Column
          title="Jenis Kelamin"
          key="gender"
          render={(_, record) => {
            return (
              <span>{record.gender == "L" ? "Laki Laki" : "Perempuan"}</span>
            );
          }}
        />
        <Column title="Agama" key="religion" dataIndex={"religion"} />
        <Column title="Email" key="email" dataIndex={"email"} />
        <Column title="Telpon" key="phone" dataIndex={"phone"} />
        <Column
          title="Alamat"
          key="address"
          render={(_, record) => {
            return record.addresses.length > 0 ? (
              <span>
                {record.addresses[0].province.name +
                  ", " +
                  record.addresses[0].district.name +
                  ", " +
                  record.addresses[0].subdistrict?.name +
                  ", " +
                  record.addresses[0].village.name +
                  ", " +
                  record.addresses[0].rtrw}
              </span>
            ) : null;
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default Doctors;
