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

const TabRole = ({
  dataRoles,
  handlePaginationRoleLimit,
  handlePaginationRolePage,
  valuePaginate,
  setValuePaginate,
  handleSearch,
}) => {
  const { Column, ColumnGroup } = Table;
  const [open, setOpen] = useState(false);
  const [formValue] = useForm();

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          <Breadcrumb.Item>Akses</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => setOpen(true)}
        >
          Tambah Akses
        </Button>
        <Modal
          title="Modal Tambah Akses"
          centered
          open={open}
          onOk={() => setOpen(false)}
          okText="Tambah Akses"
          cancelText="Batal"
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
                  label="Nama Tampilan"
                  name="display_name"
                  rules={[
                    {
                      required: true,
                      message: "Nama Tampilan harus di isi!",
                    },
                  ]}
                >
                  <Input.Password placeholder="Nama Tampilan" />
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
            onChange={(e) => {
              setValuePaginate({
                ...valuePaginate,
                limit: parseInt(e),
                page: 1,
                loading: true,
              });

              handlePaginationRoleLimit(parseInt(e));
            }}
            options={[
              {
                value: 10,
                label: "10",
              },
              {
                value: 25,
                label: 25,
              },
              {
                value: 50,
                label: "50",
              },
              {
                value: 100,
                label: "100",
                disabled: true,
              },
            ]}
          />
        </Col>
        <Col>
          <Input
            style={{ width: 200 }}
            onChange={(e) => handleSearch(e)}
            placeholder="Search..."
          />
        </Col>
      </Row>
      {/* <div style={{ overflow: "auto" }}> */}
      <Table
        dataSource={dataRoles?.rows}
        loading={valuePaginate.loading}
        scroll={{
          x: 1500,
        }}
        pagination={{
          current: valuePaginate?.page,
          pageSize: valuePaginate?.limit,
          total: valuePaginate?.total,
        }}
        onChange={(e) => {
          setValuePaginate({
            ...valuePaginate,
            page: e.current,
            loading: true,
            // limit: e.pageSize,
          });

          handlePaginationRolePage(e.current);
        }}
      >
        <Column
          title="Nama Akses"
          fixed="left"
          dataIndex="display_name"
          key="id"
        />
      </Table>
    </div>
  );
};

export default TabRole;
