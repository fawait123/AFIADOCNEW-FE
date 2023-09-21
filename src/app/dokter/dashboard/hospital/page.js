"use client";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import Column from "antd/es/table/Column";
import React, { useState } from "react";

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

const Hospital = () => {
  const [open, setOpen] = useState(false);
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Rumah Sakit</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => setOpen(true)}
        >
          Tambah Rumah Sakit
        </Button>
        <Modal
          title="Modal Tambah Rumah Sakit"
          centered
          open={open}
          onOk={() => setOpen(false)}
          okText="Tambah Rumah Sakit"
          cancelText="Batal"
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row gutter={[10]}>
              <Col span={12}>
                <Form.Item
                  name="provinceID"
                  label="Provinsi"
                  rules={[{ required: false }]}
                >
                  <Select placeholder={"Provinsi"}>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="districtID"
                  label="Kabupaten"
                  rules={[{ required: false }]}
                >
                  <Select placeholder={"Kabupaten"}>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10]}>
              <Col span={12}>
                <Form.Item
                  name="subdistrictID"
                  label="Kecamatan"
                  rules={[{ required: false }]}
                >
                  <Select placeholder={"Kecamatan"}>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="villageID"
                  label="Desa"
                  rules={[{ required: false }]}
                >
                  <Select placeholder={"Desa"}>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10]}>
              <Col span={12}>
                <Form.Item
                  name="type"
                  label="Tipe"
                  rules={[{ required: false }]}
                >
                  <Select placeholder={"Tipe"}>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nama"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[10]}>
              <Col flex={1}>
                <Form.Item
                  name="optional"
                  label="Opsional"
                  rules={[{ required: false }]}
                >
                  <TextArea
                    placeholder="Opsional"
                    autoSize={{
                      minRows: 2,
                      maxRows: 6,
                    }}
                  />
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
            onChange={() => console.log("change")}
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
        pagination={{
          pageSize: 10,
        }}
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

export default Hospital;
