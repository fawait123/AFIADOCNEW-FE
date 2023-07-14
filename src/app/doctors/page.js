"use client";
import React, { useState } from "react";
import DashboardLayout from "@/component/dashbordlayout";
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
} from "antd";

import { UploadOutlined } from "@ant-design/icons";

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
    <DashboardLayout>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <p>Doctors</p>
        <Button onClick={() => setOpen(true)} type="primary">
          Add Doctor
        </Button>
        <Modal
          title="Add Doctor"
          centered
          open={open}
          okText="Add Doctor"
          okButtonProps={{
            style: { backgroundColor: "green" },
          }}
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
                  label="Company"
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
                  label="Name"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="initialDegree"
                  label="Initial Degree"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Initial Degree" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="finalDegree"
                  label="Final Degree"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Final Degree" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name={"gender"}
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
                  label="Religion"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Religion" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: false, type: "email" }]}
                >
                  <Input placeholder="Religion" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[
                    {
                      required: false,
                      type: "number",
                      message: "Phone isn't valid",
                    },
                  ]}
                >
                  <Input placeholder="Religion" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="photos"
                  label="Photos"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload png only</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Doctors;
