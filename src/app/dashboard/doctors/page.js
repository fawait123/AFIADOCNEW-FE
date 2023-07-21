"use client";
import React, { useEffect, useState } from "react";
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
  Breadcrumb,
  Table,
  Tag,
  Space,
  Card,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Column from "antd/es/table/Column";
import { getDoctor, getRegional } from "@/API/doctor";
import moment from "moment/moment";
import { colorPallate } from "@/utils/colorpallate";
import { BsFillTrashFill } from "react-icons/bs";
import { isNull } from "lodash";

const Doctors = () => {
  const [open, setOpen] = useState(false);
  const [dataProvince, setDataProvince] = useState({
    ProvSelect: null,
    data: [],
  });
  const [dataDistrict, setDataDistrict] = useState({
    DistSelect: null,
    data: [],
  });
  const [dataSubDistrict, setDataSubDistrict] = useState({
    SubDistSelect: null,
    data: [],
  });
  const [datavillage, setDataVillage] = useState({
    VillageSelect: null,
    data: [],
  });
  const [form] = Form.useForm();
  const [dataDoctor, setDataDoctor] = useState({
    count: 0,
    limit: 0,
    page: 0,
    rows: [],
  });
  const [addingForm, setAddingForm] = useState({
    FormPendidikan: [1],
    FormPekerjaan: [1],
  });

  useEffect(() => {
    getDoctor((res) => {
      setDataDoctor(res);
    });
  }, []);

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

  console.log(dataProvince);
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
        {/* <p>Doctors</p> */}
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Dokter</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => setOpen(true)}
          type="primary"
        >
          Tambah Dokter
        </Button>
        <Modal
          title="Tambah Dokter"
          centered
          open={open}
          okText="Tambah Dokter"
          cancelText="Batal"
          onOk={() => {
            // console.log(form.getFieldValue());
            form.validateFields().then(() => {
              console.log(form.getFieldValue());

              //   {
              //     name,
              //     gender,
              //     religion,
              //     email,
              //     phone,
              //     birthdate,
              //     placebirth,
              //     provinceID,
              //     districtID,
              //     subdistrictID,
              //     villageID,
              //     rtrw,
              //     NIK,
              //     NRP,
              //     photos,
              //     price,
              // }
            });

            // console.log(form);
          }}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 30 }}>
            <Row gutter={[20]}>
              <Col span={12}>
                <Form.Item name="str" label="STR" rules={[{ required: false }]}>
                  <Input placeholder="STR" />
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
                  label="Nama"
                  rules={[{ required: false }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Gender"
                  name={"Jenis Kelamin"}
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
                  label="Agama"
                  rules={[{ required: false }]}
                >
                  <Input placeholder="Agama" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: false, type: "email" }]}
                >
                  <Input placeholder="Email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="phone"
                  label="Telepon"
                  rules={[
                    {
                      required: true,
                      message: "Phone isn't valid",
                    },
                  ]}
                >
                  <Input type="number" placeholder="Telepon" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Harga"
                  rules={[
                    {
                      required: false,

                      message: "price isn't valid",
                    },
                  ]}
                >
                  <Input type="number" placeholder="harga" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="photos"
                  label="Gambar"
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>
                      File harus png | jpg | jpeg
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Provinsi"
                  name={"provinceID"}
                  rules={[{ required: false }]}
                >
                  <Select
                    onFocus={() => {
                      setDataProvince({ ...dataProvince, ProvSelect: null });
                      // setDataDistrict
                      getRegional({ type: "province" }, (data) =>
                        setDataProvince({
                          ...dataProvince,
                          data: data.data.results.data,
                        })
                      );
                    }}
                  >
                    {dataProvince.data.map((prov) => {
                      return (
                        <Select.Option key={prov.id} value={prov.id}>
                          <p
                            onClick={() =>
                              setDataProvince({
                                ...dataProvince,
                                ProvSelect: prov.code,
                              })
                            }
                            style={{ width: "100%" }}
                          >
                            {prov.name}
                          </p>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kabupaten"
                  name={"districtID"}
                  rules={[{ required: false }]}
                  // onFocus={()=>}
                >
                  <Select
                    disabled={isNull(dataProvince.ProvSelect)}
                    onFocus={() =>
                      getRegional(
                        { parentID: dataProvince.ProvSelect },
                        (data) =>
                          // console.log(data)
                          setDataDistrict({
                            ...dataDistrict,
                            data: data.data.results.data,
                          })
                      )
                    }
                  >
                    {dataDistrict.data.map((dist) => {
                      return (
                        <Select.Option value={dist.id}>
                          <p
                            onClick={() =>
                              setDataDistrict({
                                ...dataDistrict,
                                DistSelect: dist.code,
                              })
                            }
                            style={{ width: "100%" }}
                          >
                            {dist.name}
                          </p>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Kecamatan"
                  disabled={isNull(dataDistrict.DistSelect)}
                  onFocus={() => {
                    getRegional(
                      { parentID: dataDistrict.DistSelect },
                      (Sub) => {
                        setDataSubDistrict({
                          ...dataSubDistrict,
                          data: Sub.data.results.data,
                        });
                      }
                    );
                  }}
                  name={"subdistrictID"}
                  rules={[{ required: false }]}
                >
                  <Select>
                    {dataSubDistrict.data.map((subs) => {
                      return (
                        <Select.Option key={subs.id} value={subs.id}>
                          {/* {subs.name} */}
                          <p
                            onClick={() =>
                              setDataSubDistrict({
                                ...dataSubDistrict,
                                SubDistSelect: subs.code,
                              })
                            }
                            style={{ width: "100%" }}
                          >
                            {subs.name}
                          </p>
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Desa"
                  disabled={isNull(dataSubDistrict.SubDistSelect)}
                  onFocus={() => {
                    getRegional(
                      { parentID: dataSubDistrict.SubDistSelect },
                      (village) => {
                        setDataVillage({
                          ...datavillage,
                          data: village.data.results.data,
                        });
                      }
                    );
                  }}
                  name={"villageID"}
                  rules={[{ required: false }]}
                >
                  <Select>
                    {datavillage.data.map((vill) => {
                      return (
                        <Select.Option key={vill.id} value={vill.id}>
                          {vill.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="rt"
                  label="RT"
                  rules={[
                    {
                      required: true,
                      message: "rt isn't valid",
                    },
                  ]}
                >
                  <Input type="number" placeholder="RT" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="rw"
                  label="RW"
                  rules={[
                    {
                      required: true,
                      message: "rw isn't valid",
                    },
                  ]}
                >
                  <Input type="number" placeholder="RW" />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.List name={"academics"}>
                  {(academics, { add, remove }) => {
                    return (
                      <>
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: 500 }}>Riwayat Pendidikan</p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: colorPallate.blue,
                            }}
                            onClick={() => add()}
                            // style={{ width: "40%" }}
                          >
                            <AiOutlinePlusCircle />
                            <p>Tambah</p>
                          </div>
                        </Col>
                        {academics.map((field, index) => (
                          <Card
                            key={field.key}
                            style={{
                              marginBottom: 10,
                            }}
                          >
                            <BsFillTrashFill
                              color="red"
                              style={{ position: "absolute", right: 20 }}
                              onClick={() => remove(field.name)}
                            />

                            <Row gutter={[10, 10]} style={{ width: "100%" }}>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "name"]}
                                  label={`Nama`}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "degree"]}
                                  label={`Gelar `}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={[10, 10]} style={{ width: "100%" }}>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_entry"]}
                                  label={`Masuk `}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_out"]}
                                  label={`Lulus `}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                      </>
                    );
                  }}
                </Form.List>
              </Col>
              <Col span={24}>
                <Form.List name={"works"}>
                  {(works, { add, remove }) => {
                    return (
                      <>
                        <Col
                          span={24}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p style={{ fontWeight: 500 }}>Riwayat Pekerjaan</p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: colorPallate.blue,
                            }}
                            onClick={() => add()}
                            // style={{ width: "40%" }}
                          >
                            <AiOutlinePlusCircle />
                            <p>Tambah</p>
                          </div>
                        </Col>
                        {works.map((field, index) => (
                          <Card
                            key={field.key}
                            style={{
                              marginBottom: 10,
                            }}
                          >
                            <BsFillTrashFill
                              color="red"
                              style={{ position: "absolute", right: 20 }}
                              onClick={() => remove(field.name)}
                            />

                            <Row gutter={[10, 10]} style={{ width: "100%" }}>
                              <Col span={24}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "name"]}
                                  label={`Nama`}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            </Row>
                            <Row gutter={[10, 10]} style={{ width: "100%" }}>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_entry"]}
                                  label={`Masuk `}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_out"]}
                                  label={`Lulus `}
                                  rules={[{ required: false }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                      </>
                    );
                  }}
                </Form.List>
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
            onChange={() => console.log("oke")}
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
        dataSource={dataDoctor.rows}
        scroll={{
          x: 1500,
        }}
      >
        <Column
          title="NIK/NIP"
          fixed="left"
          key="NIK"
          render={(_, record) => {
            return <span>{record.NIK + "/" + record.NIP}</span>;
          }}
        />
        <Column title="Nama" dataIndex="name" key="name" />

        <Column
          title="Tempat, Tanggal Lahir"
          key="birthdate"
          render={(_, record) => {
            return (
              <span>
                {record.placebirth +
                  ", " +
                  moment(record.birthdate).format("DD MMMM YYYY")}
              </span>
            );
          }}
        />
        <Column
          title="Jenis Kelamin"
          key="gender"
          render={(_, record) => {
            return (
              <span>{record.gender == "L" ? "Laki Laki" : "Perempuan"}</span>
            );
          }}
        />
        <Column title="Agama" key="religion" dataIndex={"religion"} />
        <Column title="Email" key="email" dataIndex={"email"} />
        <Column title="Telpon" key="phone" dataIndex={"phone"} />
        <Column
          title="Alamat"
          key="address"
          render={(_, record) => {
            return record.addresses.length > 0 ? (
              <span>
                {record.addresses[0].province.name +
                  ", " +
                  record.addresses[0].district.name +
                  ", " +
                  record.addresses[0].subdistrict?.name +
                  ", " +
                  record.addresses[0].village.name +
                  ", " +
                  record.addresses[0].rtrw}
              </span>
            ) : null;
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <Space size="middle">
              <a>Invite {record.lastName}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};

export default Doctors;
