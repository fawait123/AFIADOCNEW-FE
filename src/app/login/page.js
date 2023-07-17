"use client";
import React from "react";
import { Button, Checkbox, Form, Input, theme } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";
import { colorPallate } from "@/utils/colorpallate";
import { useForm } from "antd/es/form/Form";
import { authenticationLogin } from "@/API/http";
import { useRouter } from "next/navigation";

const Login = () => {
  const { useToken } = theme;
  const navigation = useRouter();
  const [formValue] = useForm();

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
        // title="Login"
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
        <Form form={formValue} layout="vertical">
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Button
            onClick={() => {
              formValue.validateFields().then(() => {
                const { username, password } = formValue.getFieldValue();
                authenticationLogin({ username, password }, () => {
                  navigation.push("/dashboard");
                  // console.log("login");
                });
              });
            }}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
