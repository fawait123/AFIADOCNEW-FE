"use client";
import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Upload,
  theme,
} from "antd";
import Card from "antd/es/card/Card";
import Image from "next/image";
import { colorPallate } from "@/utils/colorpallate";
import { useForm } from "antd/es/form/Form";
// import { authenticationLogin } from "@/API/http";
import { BsFillTrashFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { isNull } from "lodash";
import { getRegional, registerDoctor } from "@/API/doctor";
import { getPublicSpecialist } from "@/API/http";

const RegisterDoctor = () => {
  const { useToken } = theme;
  const navigation = useRouter();
  const [form] = useForm();
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataSpecialist, setDataSpecialist] = useState([]);

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
  const [loading, setLoading] = useState(false);

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

  const registerAction = () => {
    form.validateFields().then(() => {
      const formData = new FormData();
      let formValues = form.getFieldValue();
      let keys = Object.keys(form.getFieldValue());
      keys.map((item, index) => {
        console.log(item, typeof formValues[item]);
        if (item == "photos") {
          formData.append("photos", formValues[item].file.originFileObj);
        } else if (item == "ktp") {
          formData.append("ktp", formValues[item].file.originFileObj);
        } else if (item == "practice") {
          formData.append("practice", formValues[item].file.originFileObj);
        } else if (item == "academics" || item == "works") {
          formData.append(item, JSON.stringify(formValues[item]));
        } else {
          formData.append(item, formValues[item]);
        }
      });

      let prices = [
        {
          type: "chatt",
          price: formValues.chatt,
        },
        {
          type: "booking",
          price: formValues.booking,
        },
      ];

      formData.append("prices", JSON.stringify(prices));

      registerDoctor(formData, (res) => {
        form.resetFields();
        window.location.href = "/login";
      });
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // height: "100vh",
        backgroundColor: colorPallate.gray,
      }}
    >
      <Col span={12} style={{ margin: "0px auto" }}>
        <Card
          // title="RegisterDoctor"
          bordered={true}
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
              <Col span={12}>
                <Form.Item
                  name="specialistID"
                  label="Spesialis"
                  rules={[{ required: true }]}
                >
                  <Select
                    onFocus={() => {
                      getPublicSpecialist((res) => {
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

              <Col span={24} style={{ marginBottom: 10 }}>
                <Col span={24}>
                  <p style={{ fontWeight: 500 }}>Harga</p>
                </Col>
                <Card>
                  <Row gutter={[15, 15]}>
                    <Col span={12}>
                      <Form.Item
                        name="chatt"
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
                  </Row>
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
                  name="ktp"
                  label="KTP"
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
              <Col span={24}>
                <Form.Item
                  name="practice"
                  label="Bukti Praktik"
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
              <Col span={24}>
                <Button
                  type="primary"
                  style={{ width: "100%" }}
                  onClick={() => registerAction()}
                >
                  Register
                </Button>
              </Col>
            </Row>
          </Form>

          {/* <div
            style={{
              marginTop: 15,
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "10pt" }}>
              Belum punya account?{" "}
              <span
                onClick={() => navigation.push("/register")}
                style={{ color: colorPallate.blue, cursor: "pointer" }}
              >
                Register
              </span>
            </p>
          </div> */}
        </Card>
      </Col>
    </div>
  );
};

export default RegisterDoctor;
