"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Row,
  Image,
  Modal,
  Badge,
  Spin,
  Dropdown,
  Input,
  Tag,
  Form,
  Card,
  Grid,
} from "antd";
import { colorPallate } from "@/utils/colorpallate";
import "./page.css";
import { useRouter } from "next/navigation";
import { publicDashboard, publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { IoBagSharp } from "react-icons/io5";
import { AiFillLike, AiOutlineCloseCircle } from "react-icons/ai";
import LayoutApp from "@/component/app_component/LayoutApp";
import { useForm } from "antd/es/form/Form";
import { insertBooking } from "@/API/booking";
import { isUndefined } from "lodash";
// import {useBrea}
const { useBreakpoint } = Grid;

const Home = () => {
  const navigation = useRouter();
  const [specialistData, setSpecialistData] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [isModalChat, setIsModalChat] = useState(false);
  const [isModalBooking, setIsModalBooking] = useState(false);
  const [loadingSpecialist, setLoadingSpecialist] = useState(false);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [detailDoctor, setDetailDoctor] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [nameEntitiy, setNameEntitiy] = useState("");
  const [form] = useForm();
  const screens = useBreakpoint();
  // console.log(DoctorData);

  const showModal = () => {
    setIsModalChat(true);
  };
  const handleOk = () => {
    setIsModalChat(false);
    navigation.push(`/chat/${selectDoctor?.user?.id}`);
  };
  const handleCancel = () => {
    setIsModalChat(false);
  };

  const getDataSPecialist = () => {
    setLoadingSpecialist(true);
    publicDashboard({ isActive: 1 }, (res) => {
      setSpecialistData(res);
      setLoadingSpecialist(false);
    });
  };

  const getDataDoctor = () => {
    setLoadingDoctor(true);
    publicDashboardDoctor({ isActive: 1 }, (res) => {
      setDoctorData(res);
      setLoadingDoctor(false);
    });
  };

  const storeBooking = () => {
    form.validateFields().then(() => {
      let formValue = form.getFieldsValue();
      let payload = {
        date: formValue.date,
        doctorID: selectDoctor.id,
        time: formValue.time,
      };

      insertBooking(payload, (response) => {
        setIsModalBooking(false);
        navigation.push("/booking");
      });
    });
  };

  useEffect(() => {
    getDataSPecialist();
    getDataDoctor();

    if (localStorage.getItem("token")) {
      setIsLogin(true);
    }
    let Entitiy = JSON.parse(localStorage.getItem("user"))?.role?.name;
    // console.log(Entitiy);
    setNameEntitiy(isUndefined(Entitiy) ? "pengguna" : Entitiy);
  }, []);

  return (
    <div>
      {/* CONTENT */}
      <LayoutApp>
        <Row justify={"space-between"} align={"middle"}>
          <Col
            md={{
              span: 24,
            }}
            lg={{ span: 12 }}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ width: "50%" }}>
              <p style={{ fontWeight: 600, fontSize: 40 }}>AFIA DOC</p>
              <p style={{ fontSize: 16, marginBottom: 30 }}>
                Konsultasikan Kesehatan Anda.
              </p>
              <p style={{ textAlign: "justify", color: "gray" }}>
                Consequat Lorem commodo mollit ut enim do ipsum. Nulla cillum
                ipsum magna deserunt commodo consequat officia duis. Id et
                commodo qui excepteur fugiat deserunt amet ad occaecat ipsum in
                reprehenderit minim. Elit enim fugiat dolor sunt incididunt
                culpa cupidatat amet deserunt.
              </p>
              <Row gutter={[10, 10]} style={{ display: "flex", marginTop: 20 }}>
                <Col>
                  <Button
                    onClick={() => {
                      navigation.push("/tanyadokter");
                    }}
                    type="primary"
                  >
                    Chat Dokter
                  </Button>
                </Col>
                <Col>
                  <Button type="default" style={{ border: "1px solid blue" }}>
                    Cari Obat
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>

          <Col
          // span={12}
          // md={{
          //   span: 24,
          // }}
          // lg={{ span: 12 }}
          >
            <Image
              alt="doctor"
              src={"/assets/doctor.svg"}
              width={"100%"}
              height={400}
              preview={false}
            />
          </Col>
        </Row>
        <div style={{ padding: "20px 0px" }}>
          <Row justify={"center"} style={{ marginBottom: 20 }}>
            <Col span={18}>
              <p style={{ fontSize: 27, fontWeight: "bold" }}>Spesialis</p>
              <p style={{ margin: "10px 0px 40px 0px" }}>
                Pilih kategori dokter sesuai dengan kebutuhan anda
              </p>
              <Row
                justify={"center"}
                gutter={[100, 20]}
                style={{ margin: "20px 0px" }}
              >
                {loadingSpecialist ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  specialistData.map((val, i) => {
                    return (
                      <Col span={6} key={i}>
                        <Card
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            // console.log(val.id);
                            navigation.push(`/specialist/${val.id}`);
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{ objectFit: "contain" }}
                              alt="afia-docs"
                              src={`${BASE_URL}/public/uploads/${val.picture}`}
                              width={60}
                              preview={false}
                              height={60}
                            />
                            <p
                              style={{
                                textAlign: "center",
                                color: colorPallate.blue,
                                marginTop: 10,
                              }}
                            >
                              {val.name}
                            </p>
                          </div>
                        </Card>
                      </Col>
                    );
                  })
                )}
              </Row>
            </Col>
          </Row>
          <Row justify={"center"}>
            <Col span={18}>
              <p style={{ fontSize: 27, fontWeight: "bold" }}>Dokter</p>
              <p style={{ margin: "10px 0px 40px 0px" }}>
                Pilih dokter untuk konsultasi kesehatan anda
              </p>
              <Row
                justify={"space-evenly"}
                // gutter={[100, 20]}
                // style={{ margin: "20px 0px" }}
              >
                {loadingDoctor ? (
                  <div
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Spin />
                  </div>
                ) : (
                  DoctorData.map((doc, i) => {
                    return (
                      <Col
                        // span={8}
                        // sm={{ span: 24 }}
                        // xs={{ span: 24 }}
                        // md={{
                        //   span: 10,
                        // }}
                        style={{ cursor: "pointer" }}
                        onClick={() => setDetailDoctor(doc)}
                      >
                        <div
                          key={doc.id}
                          style={{
                            // backgroundColor: "red",
                            padding: 10,
                            boxShadow: "0.1px 1px 3px gray",
                            fontSize: 12,
                            width: "100%",
                            borderRadius: 10,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Image
                            style={{
                              objectFit: "cover",
                              objectPosition: "top",
                              // borderRadius: "100%",
                            }}
                            alt="afia-docs"
                            src={`${BASE_URL}/public/uploads/${doc.photos}`}
                            width={70}
                            preview={false}
                            height={100}
                          />
                          <div style={{ flex: 1, marginLeft: 10 }}>
                            <p style={{ marginTop: 10, fontWeight: 500 }}>
                              {doc.name},
                              {doc.academics.map((aca) => aca.degree)}
                            </p>
                            {/* msmsm */}
                            <p>{doc?.specialist?.name || "not set"}</p>

                            {/* {console.log(doc)} */}
                            {doc.prices.map((item) => {
                              return (
                                <Tag
                                  color={item.type == "chatt" ? "blue" : "red"}
                                  title={item.type}
                                  style={{ margin: "7px 2px" }}
                                >
                                  {item.price.toLocaleString("id", "ID")}
                                </Tag>
                              );
                            })}
                            <div
                              style={{
                                display: "flex",
                                // justifyContent: "space-around",
                                margin: "10px 0px",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                }}
                              >
                                <IoBagSharp />
                                <p style={{ color: "gray", marginLeft: 5 }}>
                                  4 tahun
                                </p>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  alignContent: "center",
                                  marginLeft: 10,
                                }}
                              >
                                <AiFillLike />
                                <p style={{ color: "gray", marginLeft: 5 }}>
                                  100
                                </p>
                              </div>
                            </div>
                            <Button
                              style={{
                                marginLeft: 10,
                                display: nameEntitiy !== "pengguna" && "none",
                              }}
                              type="primary"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                showModal();
                                setSelectDoctor(doc);
                                // e.preventDefault();
                              }}
                            >
                              Chat
                            </Button>
                            <Button
                              style={{
                                marginLeft: 10,
                                display: nameEntitiy !== "pengguna" && "none",
                              }}
                              type="default"
                              color="red"
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                setIsModalBooking(true);
                                setSelectDoctor(doc);
                                // e.preventDefault();
                              }}
                            >
                              Booking
                            </Button>
                            <Modal
                              style={{
                                top: 250,
                              }}
                              title={`Chat dengan ${selectDoctor?.name}`}
                              okText="Mulai"
                              cancelText="Batal"
                              open={isModalChat}
                              onOk={handleOk}
                              onCancel={() => {
                                setDetailDoctor(null);
                                setSelectDoctor(null);
                                setIsModalChat(false);
                              }}
                            >
                              <p>
                                Chatt dengan dokter {selectDoctor?.name} seharga{" "}
                                <Tag color="blue">
                                  {selectDoctor?.prices
                                    .find((el) => el.type == "chatt")
                                    .price.toLocaleString("id", "ID")}
                                </Tag>
                                , pastikan saldo anda cukup{" "}
                              </p>
                            </Modal>
                          </div>
                        </div>
                      </Col>
                    );
                  })
                )}
              </Row>
            </Col>
          </Row>
        </div>
      </LayoutApp>
      <Modal
        style={{
          top: 250,
        }}
        title={`Booking Dokter ${selectDoctor?.name}`}
        okText="Book"
        cancelText="Batal"
        open={isModalBooking}
        onOk={() => {
          storeBooking();
        }}
        onCancel={() => {
          setSelectDoctor(null);
          setIsModalBooking(false);
        }}
      >
        <p style={{ marginBottom: 10 }}>
          Harga Booking{" "}
          <Tag color="blue">
            {selectDoctor?.prices
              .find((el) => el.type == "booking")
              .price.toLocaleString("id", "ID")}
          </Tag>
          , saldo AFIA WALLET anda akan dikurangi secara otomatis. pastikan
          saldo anda cukup
        </p>
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tanggal"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your date!",
              },
            ]}
          >
            <Input type="date"></Input>
          </Form.Item>
          <Form.Item
            label="Waktu"
            name="time"
            rules={[
              {
                required: true,
                message: "Please input your time!",
              },
            ]}
          >
            <Input type="time"></Input>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        footer={null}
        onCancel={() => setDetailDoctor(null)}
        open={detailDoctor !== null}
      >
        <Col
          style={{
            backgroundColor: colorPallate.gray,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Col style={{ cursor: "pointer", width: 350, color: "gray" }}>
            <div
              key={detailDoctor?.id}
              style={{
                padding: 10,
                boxShadow: "0.1px 1px 3px gray",
                fontSize: 12,
                borderRadius: 5,
              }}
            >
              <Image
                style={{
                  objectFit: "contain",
                }}
                alt="afia-docs"
                src={`${BASE_URL}/public/uploads/${detailDoctor?.photos}`}
                width={"100%"}
                preview={false}
                height={200}
              />
              <div>
                <p
                  style={{
                    marginTop: 15,
                    fontWeight: 600,
                    fontSize: 16,
                  }}
                >
                  {detailDoctor?.name},{" "}
                  {detailDoctor?.academics.map((aca) => aca.degree)}
                </p>
                <p style={{ margin: "13px 0px" }}>Dokter Umum</p>
                <div
                  style={{
                    display: "flex",
                    margin: "10px 0px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
                    <IoBagSharp />
                    <p style={{ color: "gray", marginLeft: 5 }}>4 tahun</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignContent: "center",
                      marginLeft: 10,
                    }}
                  >
                    <AiFillLike />
                    <p style={{ color: "gray", marginLeft: 5 }}>100</p>
                  </div>
                </div>
                <Row>
                  <Col span={24}>
                    <Row>
                      <Col span={24}>
                        <Row gutter={[10, 10]}>
                          <Col span={24}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                src="/assets/academic.svg"
                                width={40}
                                height={40}
                                alt="academic"
                              />
                              <div style={{ marginLeft: 10 }}>
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  PENDIDIKAN
                                </p>
                                {detailDoctor?.academics.map((aca) => (
                                  <>
                                    <p style={{ marginTop: 5 }}>{aca.name},</p>
                                    <p>
                                      {aca.year_entry} - {aca.year_out}
                                    </p>
                                  </>
                                ))}
                              </div>
                            </div>
                          </Col>
                          <Col span={24}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                src="/assets/work.svg"
                                width={40}
                                height={40}
                                alt="academic"
                              />
                              <div style={{ marginLeft: 10 }}>
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  PEKERJAAN
                                </p>
                                {detailDoctor?.works.map((work) => (
                                  <>
                                    <p style={{ marginTop: 5 }}>{work.name},</p>
                                    <p>
                                      {work.year_entry} - {work.year_out}
                                    </p>
                                  </>
                                ))}
                              </div>
                            </div>
                          </Col>
                          <Col span={24}>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "start",
                                alignItems: "center",
                              }}
                            >
                              <Image
                                src="/assets/money.svg"
                                width={40}
                                height={40}
                                alt="academic"
                              />
                              <div style={{ marginLeft: 10 }}>
                                <p
                                  style={{
                                    fontSize: 16,
                                    fontWeight: "bold",
                                  }}
                                >
                                  NOMOR STR
                                </p>
                                <p style={{ marginTop: 5 }}>
                                  {detailDoctor?.STR}
                                </p>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Col>
      </Modal>
    </div>
  );
};

export default Home;
