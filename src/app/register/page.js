"use client";
import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row, theme } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";
import { colorPallate } from "@/utils/colorpallate";
import { useForm } from "antd/es/form/Form";
import { authenticationLogin } from "@/API/http";
import { useRouter } from "next/navigation";

const Register = () => {
  //   const { useToken } = theme;
  const navigation = useRouter();
  const [formValue] = useForm();
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: colorPallate.gray,
      }}
    >
      <Card
        // title="Register"
        bordered={true}
        style={{
          width: 400,
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Image
            width={120}
            height={120}
            style={{ marginBottom: 10, objectFit: "contain" }}
            src={"/assets/logo.png"}
          />
        </div>
        {/* <p className="text-center pb-10 font-bold text-xl ">LOGIN</p> */}
        <Form
          name="basic"
          // onFinish={onFinish}
          initialValues={{
            is_active: false,
          }}
          // form={formValue}
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
          <Button
            // loading={loading}
            // onClick={() => loginAction()}
            type="primary"
            htmlType="submit"
          >
            Register
          </Button>
        </Form>
        <div
          style={{
            marginTop: 15,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "10pt" }}>
            Sudah punya akun?{" "}
            <span
              onClick={() => navigation.push("/login")}
              style={{ color: colorPallate.blue, cursor: "pointer" }}
            >
              Masuk
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default Register;
