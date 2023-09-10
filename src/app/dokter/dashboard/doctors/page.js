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
  Card,
  Tag,
  Image,
  Tooltip,
} from "antd";
import _debounce from "lodash/debounce";

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
import { FaEye } from "react-icons/fa";
import { PATH_IMAGE } from "@/utils/base_url";
import API from "@/API";

const Doctors = () => {
  const { confirm } = Modal;
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);
  const [detailModal, setDetailModal] = useState({
    status: false,
    dataDetail: null,
  });
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
  const [dataSpecialist, setDataSpecialist] = useState([]);
  const [form] = Form.useForm();
  const [dataDoctor, setDataDoctor] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [count, setCount] = useState(10);
  const [search, setSearch] = useState(null);

  const getData = () => {
    setLoadingTable(true);
    getDoctor(
      { page: page, limit: limit, isActive: 1, search: search },
      (res) => {
        setDataDoctor(res.rows);
        setCount(res.count);
        setLoadingTable(false);
      }
    );
  };

  const handleOnKeyUp = (e) => {
    let value = e.target.value;
    setPage(1);
    setSearch(value);
  };

  useEffect(() => {
    getData();
  }, [page, limit, search]);

  let debounceOnKeyUp = _debounce(handleOnKeyUp, 800);
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
    setLoadingBtn(true);
    form
      .validateFields()
      .then(() => {
        const formData = new FormData();
        let formValues = form.getFieldsValue();
        let keys = Object.keys(form.getFieldsValue());
        keys.map((item, index) => {
          // console.log(item, typeof formValues[item]);
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

        storeDoctor(formData, (res) => {
          setOpen(false);
          setLoadingBtn(false);
          getDoctor(
            {
              page: 1,
              limit: 10,
              isActive: 1,
            },
            (res) => {
              setDataDoctor(res);
            }
          );
          form.resetFields();
        });
      })
      .catch((err) => {
        setLoadingBtn(false);
      });
  };

  const editDoctor = () => {
    setLoadingBtn(true);
    form
      .validateFields()
      .then(async () => {
        const formData = new FormData();
        let formValues = form.getFieldValue();
        console.log(formValues);
        const dataUpdate = await API({
          url: "/admin/doctor/show",
          method: "get",
          params: {
            id: formValues.id,
          },
        }).then((res) => {
          return res.data.results.data.doctor;
        });

        formValues.specialistID = dataUpdate?.specialist?.name;
        formValues.provinceID = dataUpdate?.addresses?.[0].provinceID;
        formValues.districtID = dataUpdate?.addresses?.[0].districtID;
        formValues.subdistrictID = dataUpdate?.addresses?.[0].subdistrictID;
        formValues.villageID = dataUpdate?.addresses?.[0].villageID;
        // console.log(formValues);

        let keys = Object.keys(formValues);
        keys.map((item, index) => {
          if (item == "photos") {
            if (formValues[item].file) {
              formData.append("photos", formValues[item].file.originFileObj);
            }
          } else if (item == "ktp") {
            if (formValues[item].file) {
              formData.append("ktp", formValues[item].file.originFileObj);
            }
          } else if (item == "practice") {
            if (formValues[item].file) {
              formData.append("practice", formValues[item].file.originFileObj);
            }
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

        console.log(prices);

        formData.append("uprices", JSON.stringify(prices));

        updateDoctor(formValues.id, formData, (res) => {
          setOpen(false);
          setLoadingBtn(false);
          getDoctor(
            {
              page: 1,
              limit: 10,
              isActive: 1,
            },
            (res) => {
              setDataDoctor(res);
            }
          );
          form.resetFields();
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
          open={detailModal.status}
          okText="Validasi"
          cancelText="Batal"
          onOk={() =>
            setDetailModal({
              ...detailModal,
              status: false,
            })
          }
          onCancel={() =>
            setDetailModal({
              ...detailModal,
              status: false,
            })
          }
        >
          <Card>
            <Row gutter={[10, 10]}>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  objectFit: "cover",
                  padding: "20px 0px",
                }}
              >
                <Image
                  src={`${PATH_IMAGE}/${detailModal.dataDetail?.photos}`}
                  width={100}
                  height={100}
                  style={{ borderRadius: "100%", objectFit: "cover" }}
                />
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>NIK/STR</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.STR} /{" "}
                      {detailModal.dataDetail?.NIK}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Nama</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.name}
                      {", "}
                      {detailModal.dataDetail?.academics?.map(
                        (el) => el.degree
                      )}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Tempat ,Tanggal Lahir</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.placebirth}
                      {", "}
                      {detailModal.dataDetail?.birthdate}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Jenis Kelamin</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>{detailModal.dataDetail?.gender}</p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Agama</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>{detailModal.dataDetail?.religion}</p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Email</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>{detailModal.dataDetail?.email}</p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Telfon</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>{detailModal.dataDetail?.phone}</p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Alamat</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {/* {detailModal.dataDetail?.NIK} */}

                      {detailModal.dataDetail?.addresses[0].province.name +
                        ", " +
                        detailModal.dataDetail?.addresses[0].district.name +
                        ", " +
                        detailModal.dataDetail?.addresses[0].subdistrict?.name +
                        ", " +
                        detailModal.dataDetail?.addresses[0].village.name +
                        ", " +
                        detailModal.dataDetail?.addresses[0].rtrw}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Akademik</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.academics?.map((el) => {
                        return (
                          el.name +
                          ", " +
                          el.year_entry +
                          " - " +
                          el.year_out +
                          " "
                        );
                      })}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Pekerjaan</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.works?.map((el) => {
                        return (
                          el.name +
                          ", " +
                          el.year_entry +
                          " - " +
                          el.year_out +
                          " "
                        );
                      })}
                    </p>
                  </div>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      width: "30%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <p>Harga</p>
                    <p>:</p>
                  </div>
                  <div style={{ width: "70%", marginLeft: 10 }}>
                    <p>
                      {detailModal.dataDetail?.prices?.map((el) => {
                        return (
                          <>
                            <Tag
                              color={`${
                                el.type == "chatt" ? "blue" : "yellow"
                              }`}
                              title={el.type}
                            >
                              {el.price.toLocaleString("id", "ID")}
                            </Tag>
                          </>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        </Modal>
        <Modal
          title={`${edit ? "Ubah" : "Tambah"} Dokter`}
          confirmLoading={loadingBtn}
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
                  {/* {console.log(form.getFieldsValue().photos)} */}
                  <Upload {...props}>
                    {edit ? (
                      <Tooltip title="klik untuk preview dan update Gambar">
                        <Image
                          src={`${PATH_IMAGE}/${form.getFieldsValue()?.photos}`}
                          width={"100%"}
                          preview={true}
                          // height={100}
                          style={{ objectFit: "contain" }}
                        />
                      </Tooltip>
                    ) : (
                      <Button icon={<UploadOutlined />}>
                        File harus png | jpg | jpeg
                      </Button>
                    )}
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
                  {/* {console.log(
                    `${PATH_IMAGE}/${form.getFieldsValue()?.photos}`
                  )} */}
                  <Upload {...props}>
                    {edit ? (
                      <Tooltip title="klik untuk preview dan update KTP">
                        <Image
                          src={`${PATH_IMAGE}/${form.getFieldsValue()?.ktp}`}
                          width={"100%"}
                          preview={true}
                          // height={100}
                          style={{ objectFit: "contain" }}
                        />
                      </Tooltip>
                    ) : (
                      <Button icon={<UploadOutlined />}>
                        File harus png | jpg | jpeg
                      </Button>
                    )}
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
                    {edit ? (
                      <Tooltip title="klik untuk preview dan update Praktek">
                        <Image
                          src={`${PATH_IMAGE}/${
                            form.getFieldsValue()?.practice
                          }`}
                          width={"100%"}
                          preview={true}
                          // height={100}
                          style={{ objectFit: "contain" }}
                        />
                      </Tooltip>
                    ) : (
                      <Button icon={<UploadOutlined />}>
                        File harus png | jpg | jpeg
                      </Button>
                    )}
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
          <Input
            style={{ width: 200 }}
            placeholder="Cari..."
            onKeyUp={(e) => debounceOnKeyUp(e)}
          />
        </Col>
      </Row>
      {/* <div style={{ overflow: "auto" }}> */}
      <Table
        loading={loadingTable}
        dataSource={dataDoctor}
        scroll={{
          x: 1500,
        }}
        pagination={{
          current: page,
          pageSize: limit,
          total: count,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
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
                <FaEye
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setDetailModal({
                      status: true,
                      dataDetail: record,
                    });
                  }}
                />
              </Col>
              <Col>
                <FaPencil
                  color={colorPallate.blue}
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    const dataUpdate = await API({
                      url: "/admin/doctor/show",
                      method: "get",
                      params: {
                        id: record.id,
                      },
                    }).then((res) => {
                      return res.data.results.data.doctor;
                    });

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
                          ? dataUpdate?.addresses?.[0]?.province?.name
                          : null,
                      districtID:
                        record.addresses.length > 0
                          ? dataUpdate?.addresses?.[0]?.district?.name
                          : null,
                      subdistrictID:
                        record.addresses.length > 0
                          ? dataUpdate?.addresses?.[0]?.subdistrict?.name
                          : null,
                      villageID:
                        record.addresses.length > 0
                          ? dataUpdate?.addresses?.[0]?.village?.name
                          : null,
                      booking: dataUpdate?.prices.find((el) => {
                        return el.type === "booking";
                      })?.price,
                      chatt: dataUpdate?.prices.find((el) => {
                        return el.type === "chatt";
                      })?.price,
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
