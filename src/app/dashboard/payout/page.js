"use client";
import { getBank } from "@/API/bank";
import { getPayout, updatePayout } from "@/API/payout";
import { getList, payoutByAdmin } from "@/API/wallet";
import { colorPallate } from "@/utils/colorpallate";
import {
  Breadcrumb,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Table,
  Tag,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { BiMoneyWithdraw, BiSolidCloudUpload } from "react-icons/bi";
import { FaEdit, FaMoneyBill } from "react-icons/fa";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Payout = () => {
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [formValue] = useForm();
  const [dataBank, setDataBank] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [dataPayout, setdataPayout] = useState({
    count: 0,
    limit: 20,
    page: 1,
    rows: [],
  });

  const getData = () => {
    getPayout(
      {
        page: dataPayout.page,
        limit: dataPayout.limit,
      },
      (response) => {
        setdataPayout({
          rows: response.rows,
        });
      }
    );
  };

  const getDataBank = () => {
    getBank({}, (response) => {
      setDataBank(response);
    });
  };

  useEffect(() => {
    getData();
    getDataBank();
  }, []);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const payoutaction = () => {
    setLoadingBtn(true);
    formValue
      .validateFields()
      .then(() => {
        let formData = formValue.getFieldsValue();
        updatePayout(
          {
            id: dataDetail.id,
          },
          formData,
          (response) => {
            setDataDetail(null);
            setOpen(false);
            formValue.resetFields();
            getData();
          }
        ).catch((err) => {
          setLoadingBtn(false);
        });
      })
      .catch((err) => {
        setLoadingBtn(false);
      });
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
          <Breadcrumb.Item>Payout</Breadcrumb.Item>
        </Breadcrumb>
        <Modal
          title={"Ubah Status"}
          centered
          open={open}
          onOk={() => {
            payoutaction();
          }}
          okText={"Ubah"}
          confirmLoading={loadingBtn}
          cancelText="Batal"
          onCancel={() => {
            setOpen(false);
            setDataDetail(null);
            formValue.resetFields();
          }}
          width={1000}
        >
          <Form
            form={formValue}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Row>
              <Col span={24} style={{ marginRight: 5 }}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select defaultValue={dataDetail?.status}>
                    {["pending", "success"].map((item) => {
                      return <Select.Option value={item}>{item}</Select.Option>;
                    })}
                  </Select>
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
            onChange={(value) => setdataPayout({ limit: value })}
            defaultActiveFirstOption={true}
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
        dataSource={dataPayout.rows}
        scroll={{
          x: 1500,
        }}
      >
        <Column title="Nama" dataIndex="name" key="name" />
        <Column
          title="Jumlah"
          key="cashless"
          render={(_, record) => (
            <Tag color="blue">
              IDR {record?.amount?.toLocaleString("id", "ID")}
            </Tag>
          )}
        />
        <Column
          title="Berita Acara"
          key="ba"
          render={(_, record) => <p>{record.ba}</p>}
        />
        <Column
          title="Keterangan"
          key="description"
          render={(_, record) => <p>{record.description}</p>}
        />
        <Column
          title="Success"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            return (
              <Tag color={record.status == "pending" ? "yellow" : "blue"}>
                {record.status}
              </Tag>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Row gutter={[10]}>
              <Col>
                <FaEdit
                  color={colorPallate.blue}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDataDetail(record);
                    setOpen(true);
                  }}
                />
              </Col>
            </Row>
          )}
        />
      </Table>
    </div>
  );
};

export default Payout;
