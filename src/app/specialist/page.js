"use client";
import DashboardLayout from "@/component/dashbordlayout";
import {
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

const Specialist = () => {
  const [open, setOpen] = useState(false);
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <DashboardLayout>
      <div>
        <div>
          <Button
            type="primary"
            style={{ marginBottom: 10 }}
            onClick={() => setOpen(true)}
          >
            Tambah
          </Button>
          <Modal
            title="Modal Tambah Specialist"
            centered
            open={open}
            onOk={() => setOpen(false)}
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
              <Row>
                <Col flex={1} style={{ marginRight: 5 }}>
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please input your name!",
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
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
    </DashboardLayout>
  );
};

export default Specialist;
