"use client";
import { getBank } from "@/API/bank";
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
import { FaMoneyBill } from "react-icons/fa";
import _debounce from "lodash/debounce";

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [formValue] = useForm();
  const [dataBank, setDataBank] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [dataWallet, setdataWallet] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  const getData = () => {
    setLoadingTable(true);
    getList(
      {
        page: page,
        limit: limit,
        search: search,
      },
      (response) => {
        setdataWallet(response.results.data.rows);
        setCount(response.results.data.count);
        setLoadingTable(false);
      }
    );
  };

  const getDataBank = () => {
    getBank({}, (response) => {
      setDataBank(response);
    });
  };

  const handleSearch = (e) => {
    let value = e.target.value;
    setSearch(value);
    setPage(1);
  };

  useEffect(() => {
    getDataBank();
  }, []);

  useEffect(() => {
    getData();
  }, [page, limit, search]);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  let debounceSearch = _debounce(handleSearch, 800);
  const payoutaction = () => {
    setLoadingBtn(true);
    formValue
      .validateFields()
      .then(() => {
        let formData = formValue.getFieldsValue();
        payoutByAdmin(
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
          <Breadcrumb.Item>Wallet</Breadcrumb.Item>
        </Breadcrumb>
        <Modal
          title={"Tarik Dana"}
          centered
          open={open}
          onOk={() => {
            payoutaction();
          }}
          okText={"Tarik"}
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
                        <Select.Option value={item.code}>
                          {item.name}
                        </Select.Option>
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
                  <Input type="text" />
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
                  <Input type="number" />
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
            onChange={(value) => setdataWallet({ limit: value })}
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
          <Input
            style={{ width: 200 }}
            placeholder="Cari..."
            onKeyUp={(e) => debounceSearch(e)}
          />
        </Col>
      </Row>
      {/* <div style={{ overflow: "auto" }}> */}
      <Table
        dataSource={dataWallet}
        loading={loadingTable}
        pagination={{
          current: page,
          pageSize: limit,
          total: count,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
        }}
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
              IDR {record?.cashless?.amount?.toLocaleString("id", "ID")}
            </Tag>
          )}
        />
        <Column
          title="Terakhir Update"
          dataIndex="updatedAt"
          key="name"
          render={(_, record) => {
            return (
              <p>{moment(record.updatedAt).format("DD MMMM YYYY HH:mm:ss")}</p>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Row gutter={[10]}>
              <Col>
                <BiMoneyWithdraw
                  color={colorPallate.blue}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDataDetail(record);
                    setOpen(true);
                  }}
                />
              </Col>
              <Col>
                <FaMoneyBill
                  color={colorPallate.red}
                  style={{ cursor: "pointer" }}
                  onClick={() => {}}
                />
              </Col>
            </Row>
          )}
        />
      </Table>
    </div>
  );
};

export default Wallet;
