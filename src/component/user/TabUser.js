"use client";
import React, { useState } from "react";
import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Form,
  Button,
  Checkbox,
  Breadcrumb,
  Tabs,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { isUndefined } from "lodash";
import { AddUser, EditUser } from "@/API/http";

const TabUser = ({ dataUser }) => {
  const { Column, ColumnGroup } = Table;
  const [open, setOpen] = useState(false);
  const [statusModal, setStatusModal] = useState("");
  const [formValue] = useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
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
          <Breadcrumb.Item>Pengguna</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => {
            setOpen(true);
            formValue.resetFields();
            setStatusModal("Tambah");
          }}
        >
          Tambah Pengguna
        </Button>
        <Modal
          title={`Modal ${statusModal} Pengguna`}
          centered
          open={open}
          onOk={() => {
            formValue.validateFields().then((value) => {
              if (statusModal === "Tambah") {
                AddUser(value, (res) => {
                  formValue.resetFields();
                });
                setOpen(false);
                setStatusModal("");
              } else if (statusModal === "Edit") {
                EditUser(value, "id", (res) => console.log(res));
              }
            });
          }}
          okText={statusModal}
          cancelText="Batal"
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form
            name="basic"
            // onFinish={onFinish}
            initialValues={{
              is_active: false,
            }}
            form={formValue}
            autoComplete="off"
            layout="vertical"
          >
            <Row>
              <Col flex={1} style={{ marginRight: 5 }}>
                <Form.Item
                  label="Nama"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Nama harus di isi!",
                    },
                  ]}
                >
                  <Input placeholder="Nama" />
                </Form.Item>
              </Col>
              <Col flex={1} style={{ marginLeft: 5 }}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Email harus di isi!",
                    },
                  ]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col flex={1} style={{ marginRight: 5 }}>
                <Form.Item
                  label="Username"
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Username harus di isi!",
                    },
                  ]}
                >
                  <Input placeholder="Username" />
                </Form.Item>
              </Col>
              <Col flex={1} style={{ marginLeft: 5 }}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      min: 8,
                      message: "Password harus di isi!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item
                  label="IsActive"
                  name="is_active"
                  valuePropName="checked"
                  rules={[
                    {
                      type: "is_active",
                      required: true,
                      message: "IsActive harus di isi!",
                    },
                  ]}
                >
                  <Checkbox>AKTIF</Checkbox>
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
            onChange={handleChange}
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
        dataSource={dataUser?.rows}
        loading={!dataUser.rows ? true : false}
      >
        <Column title="Name" fixed="left" dataIndex="name" key="id" />
        <Column title="Email" dataIndex="email" key="id" />
        <Column
          title="Role"
          key="id"
          render={(_, record) => {
            return <div>{record.prefix}</div>;
          }}
        />

        <Column
          title="Status"
          dataIndex="is_active"
          key="id"
          render={(_) => {
            return _ ? "Active" : "-";
          }}
        />
        <Column
          title="Action"
          // dataIndex="is_active"
          key="id"
          render={(_, record) => {
            return (
              <div style={{ display: "flex" }}>
                <FaTrash color="red" />
                <FaPencil
                  color="blue"
                  style={{ marginLeft: 20 }}
                  onClick={() => {
                    setOpen(true);
                    setStatusModal("Edit");
                    // console.log(record);
                    formValue.setFieldValue("name", record.name);
                    formValue.setFieldValue("password", "");
                    formValue.setFieldValue("email", record.email);
                    formValue.setFieldValue("username", record.username);
                    formValue.setFieldValue("is_active", record.is_active);
                  }}
                />
              </div>
            );
          }}
        />
      </Table>
    </div>
  );
};

export default TabUser;
