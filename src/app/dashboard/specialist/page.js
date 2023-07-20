"use client";
import {
  destroySpecialist,
  getSpecialist,
  storeSpecialist,
  updateSpecialist,
} from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { colorPallate } from "@/utils/colorpallate";
import {
  Avatar,
  Breadcrumb,
  Button,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import Column from "antd/es/table/Column";
import React, { useEffect, useState } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Specialist = () => {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [formValue] = useForm();
  const { confirm } = Modal;
  const [dataSpecialist, setDataSpecialist] = useState({
    count: 0,
    limit: 0,
    page: 0,
    rows: [],
  });

  useEffect(() => {
    getSpecialist((res) => setDataSpecialist(res));
  }, []);

  const addSpecialist = () => {
    let formData = new FormData();

    formValue.validateFields().then(async () => {
      const { name, picture } = formValue.getFieldValue();
      formData.append("name", name);
      formData.append("picture", picture.file.originFileObj);

      await storeSpecialist(formData, (response) => {
        setOpen(false);
        formValue.resetFields();
        getSpecialist((res) => setDataSpecialist(res));
      });
    });
  };

  const editSpecialist = () => {
    let formData = new FormData();

    formValue.validateFields().then(async () => {
      const { name, picture, id } = formValue.getFieldValue();
      formData.append("name", name);
      if (picture.file) {
        formData.append("picture", picture.file.originFileObj);
      }
      await updateSpecialist({ formData, id }, (res) => {
        setOpen(false);
        formValue.resetFields();
        getSpecialist((res) => setDataSpecialist(res));
      });
    });
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
          <Breadcrumb.Item>Spesialis</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => setOpen(true)}
        >
          Tambah Spesialis
        </Button>
        <Modal
          title={`Modal ${edit ? "Ubah" : "Tambah"} Spesialis`}
          centered
          open={open}
          onOk={() => (edit ? editSpecialist() : addSpecialist())}
          okText={`${edit ? "Ubah" : "Tambah"} Spesialis`}
          cancelText="Batal"
          onCancel={() => {
            formValue.setFieldsValue({
              name: null,
            });
            setEdit(false);
            setOpen(false);
          }}
          width={1000}
        >
          <Form
            form={formValue}
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
              <Col flex={1}>
                <Form.Item
                  label="Gambar"
                  name="picture"
                  rules={[
                    {
                      required: true,
                      message: "Gambar harus di isi!",
                    },
                  ]}
                >
                  <Upload onChange={(file) => console.log(file)} maxCount={1}>
                    <Button icon={<BiSolidCloudUpload />}>Upload</Button>
                  </Upload>
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
        dataSource={dataSpecialist.rows}
        scroll={{
          x: 1500,
        }}
      >
        <Column title="Nama" dataIndex="name" key="name" />
        <Column
          title="Gambar"
          key="picture"
          render={(_, record) => (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: 100,
                overflow: "hidden",
              }}
            >
              <Image src={`${BASE_URL}/public/uploads/${record.picture}`} />
            </div>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Row gutter={[10]}>
              <Col>
                <FaPencil
                  color={colorPallate.blue}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    formValue.setFieldsValue(record);
                    setEdit(true);
                    setOpen(true);
                  }}
                />
              </Col>
              <Col>
                <FaTrash
                  color={colorPallate.red}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    confirm({
                      title: "Apakah anda yakin ingin menghapus data ?",
                      content: "Hapus data",
                      onOk() {
                        destroySpecialist({ id: record.id }, (res) => {
                          getSpecialist((res) => setDataSpecialist(res));
                        });
                      },
                      okText: "Hapus data",
                      onCancel() {
                        console.log("Cancel");
                      },
                      cancelText: "Batal",
                    });
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

export default Specialist;
