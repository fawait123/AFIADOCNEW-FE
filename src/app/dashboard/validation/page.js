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
  Image,
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
import { FaEye } from "react-icons/fa";
import { PATH_IMAGE } from "@/utils/base_url";

const Validation = () => {
  const { confirm } = Modal;
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(false);
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
    getDoctor(
      {
        page: 0,
        limit: 10,
        isActive: 0,
      },
      (res) => {
        setDataDoctor(res);
      }
    );
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
        {/* <p>Validation</p> */}
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Dokter</Breadcrumb.Item>
        </Breadcrumb>
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
            <FaEye
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDetailModal({
                  status: true,
                  dataDetail: record,
                });
              }}
            />
          )}
        />
      </Table>
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
                    {detailModal.dataDetail?.academics?.map((el) => el.degree)}
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
                  {console.log(detailModal.dataDetail?.addresses)}
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
                            color={`${el.type == "chatt" ? "blue" : "yellow"}`}
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
    </div>
  );
};

export default Validation;
