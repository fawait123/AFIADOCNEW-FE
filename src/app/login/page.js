"use client";
import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";
const onFinish = (values) => {
  console.log("Success:", values);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const Login = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card
        // title="Login"
        bordered={true}
        style={{
          width: 400,
        }}
        className="shadow-sm shadow-slate-500"
      >
        <div className="flex justify-center">
          <Image
            width={120}
            height={120}
            className="mb-5"
            src={"/assets/logo.png"}
          />
        </div>
        {/* <p className="text-center pb-10 font-bold text-xl ">LOGIN</p> */}
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

          {/* <Form.Item>
            <Button type="primary"  htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
          <button className="bg-blue-600 py-2 px-4 w-full rounded-md text-white">
            Submit
          </button>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
