"use client";
import { getBank } from "@/API/bank";
import { postPayout } from "@/API/payout";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";

const PayoutDokter = ({ onClose }) => {
  const [formValue] = useForm();
  const [dataBank, setDataBank] = useState([]);

  useEffect(() => {
    getBank({}, (response) => {
      setDataBank(response);
    });
  }, []);

  return (
    <Form
      form={formValue}
      name="basic"
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}

      onFinish={() => {
        formValue.validateFields().then((value) => {
          //   console.log(value);
          postPayout(
            {
              id: JSON.parse(localStorage.getItem("user")).id,
            },
            value,
            (response) => {
              formValue.resetFields();
              onClose();
            }
          ).catch((err) => {
            //   setLoadingBtn(false);
          });
        });
      }}
      autoComplete="off"
      layout="vertical"
    >
      <Row>
        <Col span={24} style={{ marginRight: 5 }}>
          <Form.Item
            label="Bank"
            name="bank"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              {dataBank.map((item) => {
                return (
                  <Select.Option value={item.code}>{item.name}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginRight: 5 }}>
          <Form.Item
            label="No Rekening"
            name="norek"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" onWheel={(e) => e.target.blur()} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginRight: 5 }}>
          <Form.Item
            label="Nama Penerima"
            name="name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginRight: 5 }}>
          <Form.Item
            label="Jumlah"
            name="amount"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="number" onWheel={(e) => e.target.blur()} />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginRight: 5 }}>
          <Form.Item
            label="Berita Acara"
            name="ba"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
        </Col>
        <Col span={24} style={{ marginTop: 20 }}>
          <Form.Item>
            <Button style={{ width: "100%" }} htmlType="submit" type="primary">
              Tarik
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default PayoutDokter;
