"use client";
import API from "@/API";
import LayoutApp from "@/component/app_component/LayoutApp";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FaEye } from "react-icons/fa6";
import moment from "moment";
import { FaTrash } from "react-icons/fa";
import Screens from "@/utils/Screens";
import { useContext } from "react";

const PasienPage = () => {
  const screen = useContext(Screens);
  let [formTambah] = Form.useForm();
  const [modalDetailPasien, setModalDetailPasien] = useState({
    status: false,
    dataContext: null,
  });
  const [modalTambahPasien, setModalTambahPasien] = useState({ status: false });
  const [dataMasterTable, setDataMasterTable] = useState({
    count: 1,
    rows: [],
    page: 1,
    limit: 10,
  });
  const [photo, setPhoto] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const uploadphoto = useRef(null);
  const datadummy = [
    {
      no: 1,
      namadokter: "fawait",
      status: "Proses",
      no_register: "ABSK09999",
      no_register: "active",
    },
  ];

  useEffect(() => {
    getDataTablePatient();
  }, []);
  const getDataTablePatient = async () => {
    await API({
      url: "/admin/patient",
      method: "get",
    }).then((res) => {
      const result = res.data.results.data;
      setDataMasterTable(result);
    });
  };

  return (
    <LayoutApp>
      <div style={{ width: "100%", minHeight: "90vh" }}>
        <Row justify={"center"} gutter={[0, 20]}>
          <Col span={20}>
            <Button onClick={() => setModalTambahPasien({ status: true })}>
              Tambah
            </Button>
          </Col>
          <Col span={20} style={{ overflow: "auto" }}>
            <Table
              rowKey={"id"}
              pagination={{
                current: dataMasterTable?.page,
                pageSize: dataMasterTable?.limit,
                total: dataMasterTable?.total,
              }}
              dataSource={dataMasterTable.rows}
            >
              <Table.Column
                render={(_, rec, index) => {
                  return index + 1;
                }}
                align="center"
                title="No"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.NIK;
                }}
                align="center"
                title="NIK"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.name;
                }}
                align="center"
                title="Nama"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.email;
                }}
                align="center"
                title="Email"
              />

              <Table.Column
                render={(_, rec) => {
                  return rec.blood;
                }}
                align="center"
                title="Gol Darah"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.gender;
                }}
                align="center"
                title="Kelamin"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.religion;
                }}
                align="center"
                title="Agama"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.placebirth;
                }}
                align="center"
                title="Tempat Lahir"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.birthdate;
                }}
                align="center"
                title="Tanggal Lahir"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.height;
                }}
                align="center"
                title="Tinggi Badan"
              />
              <Table.Column
                render={(_, rec) => {
                  return rec.weight;
                }}
                align="center"
                title="Berat Badan"
              />
              <Table.Column
                render={(_, rec) => {
                  return (
                    <>
                      <FaEye
                        onClick={() => {
                          setModalDetailPasien({
                            status: true,
                            dataContext: rec,
                          });
                        }}
                        style={{ cursor: "pointer" }}
                      />
                    </>
                  );
                }}
                align="center"
                title="Aksi"
              />
            </Table>
          </Col>
        </Row>
      </div>
      <Modal
        open={modalDetailPasien.status}
        footer={null}
        onCancel={() => {
          setModalDetailPasien({ status: false });
        }}
      >
        <Row justify={"center"} gutter={[0, 15]}>
          {console.log(modalDetailPasien)}
          <Col span={24}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Image
                style={{ borderRadius: "100%", objectFit: "cover" }}
                src={modalDetailPasien?.dataContext?.photo}
                height={100}
                width={100}
              />
            </div>
          </Col>
          <Col span={24}>
            <Row gutter={[0, 5]}>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>NIK</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.NIK}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Nama</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.name}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Email</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.email}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Gol Darah</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.blood}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Kelamin</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>
                    {modalDetailPasien?.dataContext?.gender == "L"
                      ? "Laki Laki"
                      : "Perempuan"}
                  </p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Tempat lahir</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.placebirth}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Tanggal lahir</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.birthdate}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>umur</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>
                    {moment().diff(
                      modalDetailPasien?.dataContext?.birthdate,
                      "years"
                    )}
                  </p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Agama</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.religion}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Tinggi Badan</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.height}</p>
                </div>
              </Col>
              <Col span={24}>
                <div style={{ display: "flex" }}>
                  <p style={{ width: 100 }}>Berat Badan</p>
                  <p style={{ width: 50, textAlign: "center" }}>:</p>
                  <p>{modalDetailPasien?.dataContext?.weight}</p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Modal>
      {/* ////////////////////////////////////////////////////// */}
      <Modal
        open={modalTambahPasien.status}
        // footer={null}
        cancelText={"Batal"}
        confirmLoading={loadingBtn}
        okText={"Tambah"}
        onOk={() => {
          setLoadingBtn(true);
          formTambah
            .validateFields()
            .then((res) => {
              API({
                url: "/admin/patient",
                data: res,
                method: "post",
              })
                .then(() => {
                  setModalTambahPasien({ status: false });
                  formTambah.resetFields();
                  getDataTablePatient();
                  setLoadingBtn(false);
                })
                .catch((error) => {
                  setLoadingBtn(false);
                });
            })
            .catch((err) => {
              console.log(err);
              setLoadingBtn(false);
            });
        }}
        onCancel={() => {
          setModalTambahPasien({ status: false });
        }}
      >
        <Form layout="vertical" name="addPasien" form={formTambah}>
          <Row justify={"center"} gutter={[0, 15]}>
            <Col span={24}>
              <Form.Item
                name={"photo"}
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={{
                      borderRadius: "100%",
                      objectFit: "cover",
                    }}
                    src={photo}
                    height={100}
                    width={100}
                  />

                  <Button
                    onClick={() => {
                      uploadphoto.current.click();
                    }}
                    style={{ marginTop: 10 }}
                  >
                    Upload
                  </Button>
                  <input
                    ref={uploadphoto}
                    onChange={(e) => {
                      const reader = new FileReader();
                      reader.addEventListener("load", () => {
                        // callback(reader.result)
                        setPhoto(reader.result);
                        formTambah.setFieldValue("photo", reader.result);
                      });
                      reader.readAsDataURL(e.target.files[0]);
                    }}
                    style={{ display: "none" }}
                    type="file"
                  />
                </div>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Row gutter={[10, 5]}>
                {[
                  { name: "NIK", label: "NIK", type: "number" },
                  { name: "name", label: "Nama", type: "text" },
                  {
                    name: "gender",
                    label: "Jenis Kelamin",
                    type: "select",
                    options: [
                      { name: "Laki-laki", value: "L" },
                      { name: "Perempuan", value: "P" },
                    ],
                  },
                  {
                    name: "religion",
                    label: "Agama",
                    type: "select",
                    options: [
                      { name: "Islam", value: "islam" },
                      { name: "Kristen", value: "kristen" },
                      { name: "Hindu", value: "hindu" },
                      { name: "Budha", value: "budha" },
                      { name: "Konghucu", value: "konghucu" },
                    ],
                  },
                  { name: "email", label: "Email", type: "text" },
                  { name: "phone", label: "Telepon", type: "text" },
                  { name: "birthdate", label: "Tanggal lahir", type: "date" },
                  { name: "placebirth", label: "Tempat lahir", type: "text" },
                  { name: "blood", label: "Gol Darah", type: "text" },
                  { name: "weight", label: "Berat Badan", type: "number" },
                  { name: "height", label: "Tinggi Badan", type: "number" },
                ].map((value, index) => {
                  return value.type === "select" ? (
                    <Col span={screen.xs ? 24 : 12} key={index}>
                      <Form.Item
                        name={value.name}
                        label={value.label}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select>
                          {value.options.map((option, key) => {
                            return (
                              <Select.Option value={option.value}>
                                {option.name}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  ) : (
                    <Col span={screen.xs ? 24 : 12} key={index}>
                      <Form.Item
                        name={value.name}
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                        label={value.label}
                      >
                        <Input type={value.type} />
                      </Form.Item>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal>
    </LayoutApp>
  );
};

export default PasienPage;
