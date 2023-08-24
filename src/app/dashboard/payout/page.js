"use client";
import { getBank } from "@/API/bank";
import { getPayout, updatePayout } from "@/API/payout";
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
import _debounce from "lodash/debounce";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";

const Payout = () => {
  const [open, setOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [formValue] = useForm();
  const [dataBank, setDataBank] = useState([]);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [dataPayout, setdataPayout] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  const getData = () => {
    setLoadingTable(true);
    getPayout(
      {
        page: page,
        limit: limit,
        search: search,
      },
      (response) => {
        setdataPayout(response.rows);
        setCount(response.count);
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
          <Input
            style={{ width: 200 }}
            placeholder="Cari..."
            onKeyUp={(e) => debounceSearch(e)}
          />
        </Col>
      </Row>
      {/* <div style={{ overflow: "auto" }}> */}
      <Table
        dataSource={dataPayout}
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
