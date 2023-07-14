"use client";
import React, { useState } from "react";
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
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import Column from "antd/es/table/Column";

const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
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
                <Form.Item
                  name="company"
                  label="Instansi"
                  rules={[{ required: false }]}
                >
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nip" label="NIP" rules={[{ required: false }]}>
                  <Input placeholder="NIP" />
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
                  name="initialDegree"
                  label="Gelar Depan"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Gelar Depan" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="finalDegree"
                  label="Gelar Belakang"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Gelar Belakang" />
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
        dataSource={data}
        scroll={{
          x: 1500,
        }}
      >
        <Column
          title="First Name"
          fixed="left"
          dataIndex="firstName"
          key="firstName"
        />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />

        <Column title="Age" dataIndex="age" key="age" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Tags"
          dataIndex="tags"
          key="tags"
          render={(tags) => (
            <>
              {tags.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
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