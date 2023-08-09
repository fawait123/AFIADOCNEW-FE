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
import {
  getDoctor,
  getRegional,
  storeDoctor,
  updateDoctor,
} from "@/API/doctor";
import moment from "moment/moment";
import { colorPallate } from "@/utils/colorpallate";
import { BsFillTrashFill } from "react-icons/bs";
import { isNull } from "lodash";
import { getSpecialist } from "@/API/http";
import { FaPencil, FaTrash } from "react-icons/fa6";

const Doctors = () => {
  const { confirm } = Modal;
  const [edit, setEdit] = useState(false);
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
  const [dataAcademic, setDataAcademic] = useState([
    {
      name: null,
      year_entry: null,
      year_out: null,
      degree: null,
    },
  ]);
  const [dataWork, setDataWork] = useState([
    {
      name: null,
      year_entry: null,
      year_out: null,
    },
  ]);
  const [prices, setPrices] = useState([
    {
      booking: null,
      price: null,
    },
  ]);
  const [dataSpecialist, setDataSpecialist] = useState([]);
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
      const extension = ["image/png", "image/jpg", "image/jpeg", "image/svg"];
      if (extension.filter((item) => item == file.type).length == 0) {
        message.error(`${file.name} is not a png|jpg|jpeg|svg file`);
      }

      return true;
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const tambahDoctor = () => {
    // console.log(form.getFieldsValue());
    // form.validateFields().then(() => {
    const formData = new FormData();
    let formValues = form.getFieldsValue();
    console.log(formValues, "jsjsj");
    let keys = Object.keys(form.getFieldsValue());
    keys.map((item, index) => {
      // console.log(item, typeof formValues[item]);
      if (item == "photos") {
        formData.append("photos", formValues[item].file.originFileObj);
      } else if (item == "academics" || item == "works") {
        formData.append(item, JSON.stringify(formValues[item]));
      } else {
        formData.append(item, formValues[item]);
      }
    });

    // storeDoctor(formData, (res) => {
    //   setOpen(false);
    //   getDoctor((res) => {
    //     setDataDoctor(res);
    //   });
    //   form.resetFields();
    // });
    // });
  };

  const editDoctor = () => {
    form.validateFields().then(() => {
      const formData = new FormData();
      let formValues = form.getFieldValue();
      let keys = Object.keys(form.getFieldValue());
      keys.map((item, index) => {
        if (item == "photos") {
          if (formValues[item].file) {
            formData.append("photos", formValues[item].file.originFileObj);
          }
        } else if (item == "academics" || item == "works") {
          formData.append(item, JSON.stringify(formValues[item]));
        } else {
          formData.append(item, formValues[item]);
        }
      });

      updateDoctor(formValues.id, formData, (res) => {
        setOpen(false);
        getDoctor((res) => {
          setDataDoctor(res);
        });
        form.resetFields();
      });
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
        {/* <p>Doctors</p> */}
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Dokter</Breadcrumb.Item>
        </Breadcrumb>
        <Button
          style={{ marginBottom: 10 }}
          onClick={() => {
            setOpen(true);
            setEdit(false);
            form.resetFields();
          }}
          type="primary"
        >
          Tambah Dokter
        </Button>
        <Modal
          title={`${edit ? "Ubah" : "Tambah"} Dokter`}
          centered
          open={open}
          okText={`${edit ? "Ubah" : "Tambah"} Dokter`}
          cancelText="Batal"
          onOk={() => (edit ? editDoctor() : tambahDoctor())}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          <Form form={form} layout="vertical" style={{ marginTop: 30 }}>
            <Row gutter={[20]}>
              <Col span={12}>
                <Form.Item name="str" label="STR" rules={[{ required: true }]}>
                  <Input placeholder="STR" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="nik" label="NIK" rules={[{ required: true }]}>
                  <Input placeholder="NIK" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nama"
                  rules={[{ required: true }]}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  label="Jenis Kelamin"
                  name={"gender"}
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="L">Laki-Laki</Select.Option>
                    <Select.Option value="P">Perempuan</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="placebirth"
                  label="Tempat Lahir"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Tempat Lahir" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="birthdate"
                  label="Tanggal Lahir"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Tanggal Lahir" type="date" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="religion"
                  label="Agama"
                  rules={[{ required: true }]}
                >
                  <Select>
                    <Select.Option value="Islam">Islam</Select.Option>
                    <Select.Option value="Kristen">Kristen</Select.Option>
                    <Select.Option value="Hindu">Hindu</Select.Option>
                    <Select.Option value="Buddha">Buddha</Select.Option>
                    <Select.Option value="Konghucu">Konghucu</Select.Option>
                    <Select.Option value="Katholik">Katholik</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, type: "email" }]}
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
              {/* <Col span={12}>
                <Form.Item
                  name="price"
                  label="Harga"
                  rules={[
                    {
                      required: true,

                      message: "price isn't valid",
                    },
                  ]}
                >
                  <Input type="number" placeholder="harga" />
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item
                  name="specialistID"
                  label="Spesialis"
                  rules={[{ required: true }]}
                >
                  <Select
                    onFocus={() => {
                      getSpecialist((res) => {
                        setDataSpecialist(res.rows);
                      });
                    }}
                  >
                    {dataSpecialist.map((item) => {
                      return (
                        <Select.Option value={item.id}>
                          {item.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="photos"
                  label="Gambar"
                  rules={[
                    {
                      required: true,
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
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
                  rules={[{ required: true }]}
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
                <Card>
                  {/* <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        name="chat"
                        label="Chat"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input type="number" placeholder="harga" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="booking"
                        label="Booking"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input type="number" placeholder="harga" />
                      </Form.Item>
                    </Col>
                  </Row> */}
                  <Form.List name={"prices"} initialValue={prices}>
                    {(prices, { add, remove }) => {
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
                          {prices.map((field, index) => (
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
                                    name={[index, "booking"]}
                                    label={`Booking`}
                                    rules={[{ required: true }]}
                                  >
                                    <Input />
                                  </Form.Item>
                                </Col>
                              </Row>
                              <Row gutter={[10, 10]} style={{ width: "100%" }}>
                                <Col span={24}>
                                  <Form.Item
                                    // style={{ width: "100%" }}
                                    name={[index, "price"]}
                                    label={`Harga`}
                                    rules={[{ required: true }]}
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
                </Card>
              </Col>

              <Col span={24}>
                <Form.List name={"academics"} initialValue={dataAcademic}>
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
                                  rules={[{ required: true }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "degree"]}
                                  label={`Gelar `}
                                  rules={[{ required: true }]}
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
                                  rules={[{ required: true }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_out"]}
                                  label={`Lulus `}
                                  rules={[{ required: true }]}
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
                <Form.List name={"works"} initialValue={dataWork}>
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
                                  rules={[{ required: true }]}
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
                                  rules={[{ required: true }]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={12}>
                                <Form.Item
                                  // style={{ width: "100%" }}
                                  name={[index, "year_out"]}
                                  label={`Lulus `}
                                  rules={[{ required: true }]}
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
          title="NIK/STR"
          fixed="left"
          key="NIK"
          render={(_, record) => {
            return <span>{record.NIK + "/" + record.STR}</span>;
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
            <Row gutter={[10]}>
              <Col>
                <FaPencil
                  color={colorPallate.blue}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    console.log(record);
                    setDataAcademic(record.academics);
                    setDataWork(record.works);
                    form.setFieldsValue({
                      ...record,
                      nik: record.NIK,
                      str: record.STR,
                      rt: record.addresses.length
                        ? record.addresses[0].rtrw.split("/")[0]
                        : null,
                      rw: record.addresses.length
                        ? record.addresses[0].rtrw.split("/")[1]
                        : null,
                      provinceID:
                        record.addresses.length > 0
                          ? record.addresses[0].provinceID
                          : null,
                      districtID:
                        record.addresses.length > 0
                          ? record.addresses[0].districtID
                          : null,
                      subdistrictID:
                        record.addresses.length > 0
                          ? record.addresses[0].subdistrictID
                          : null,
                      villageID:
                        record.addresses.length > 0
                          ? record.addresses[0].villageID
                          : null,
                    });
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
                        console.log("oke");
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

export default Doctors;
