"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Image,
  Row,
  Modal,
  Badge,
  Spin,
  Tag,
  Form,
} from "antd";
import { colorPallate } from "@/utils/colorpallate";
import { Input } from "antd";
import {
  getSpecialist,
  publicDashboard,
  publicDashboardDoctor,
  publicDashboardDoctorQuery,
} from "@/API/http";
import { BASE_URL, PATH_IMAGE } from "@/utils/base_url";
import { AiOutlineCloseCircle, AiFillLike } from "react-icons/ai";
import { IoBagSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import LayoutApp from "@/component/app_component/LayoutApp";
import { useForm } from "antd/es/form/Form";
import { insertBooking } from "@/API/booking";
import { isUndefined } from "lodash";

const { Search } = Input;
const TanyaDokter = () => {
  const [DoctorData, setDoctorData] = useState([]);
  const [SpecialistData, setSpecialistData] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [isModalChat, setIsModalChat] = useState(false);
  const [isModalBooking, setIsModalBooking] = useState(false);
  const [chatDokter, setChatDokter] = useState(null);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [loadingSpecialist, setLoadingSpecialist] = useState(false);
  const [form] = useForm();
  const navigation = useRouter();
  const [nameEntitiy, setNameEntitiy] = useState("");

  const getDataDoctor = () => {
    setLoadingDoctor(true);
    publicDashboardDoctor({ isActive: 1 }, (res) => {
      setDoctorData(res);
      setLoadingDoctor(false);
    });
  };

  const getDataSpecialist = () => {
    setLoadingSpecialist(true);
    publicDashboard({ isActive: 1 }, (res) => {
      setSpecialistData(res);
      setLoadingSpecialist(false);
    });
  };

  useEffect(() => {
    getDataDoctor();
    getDataSpecialist();

    let Entitiy = JSON.parse(localStorage.getItem("user"))?.role?.name;
    // console.log(Entitiy);
    setNameEntitiy(isUndefined(Entitiy) ? "pengguna" : Entitiy);
  }, []);

  const showModal = () => {
    setIsModalChat(true);
  };
  const handleOk = () => {
    setIsModalChat(false);
    navigation.push(`/chat/${chatDokter?.id}`);
  };
  const handleCancel = () => {
    setIsModalChat(false);
  };

  const storeBooking = () => {
    form.validateFields().then(() => {
      let formValue = form.getFieldsValue();
      let payload = {
        date: formValue.date,
        doctorID: chatDokter.id,
        time: formValue.time,
      };
      // console.log(payload);
      insertBooking(payload, (response) => {
        setIsModalBooking(false);
        navigation.push("/booking");
      });
    });
  };
  return (
    <LayoutApp>
      <div style={{ marginBottom: 380 }}>
        <Col span={20} style={{ margin: "0px auto" }}>
          <div style={{ padding: "10px 10px" }}>
            <Breadcrumb
              items={[
                {
                  title: "Home",
                },
                {
                  title: "Tanya Dokter",
                },
              ]}
            />
          </div>
          <Row gutter={[10, 10]} style={{ padding: "10px 10px" }} wrap={true}>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <div>
                <div style={{ textAlign: "start" }}>
                  <p
                    style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}
                  >
                    Chat Dokter DI AFIA DOC ?
                  </p>
                  {/* /////////////////////// */}
                  <div
                    style={{
                      display: "flex",
                      width: 350,
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src="https://www.halodoc.com/assets/svg/tc-ensure-new-1.webp"
                      width={70}
                    />
                    <p style={{ marginLeft: 10 }}>
                      Satu aplikasi untuk berbagai kebutuhan – periksa dokter,
                      tes lab hingga penebusan resep obat.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: 350,
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src="https://www.halodoc.com/assets/svg/tc-ensure-new-2.webp"
                      width={70}
                    />
                    <p style={{ marginLeft: 10 }}>
                      Dapatkan rujukan ke pemeriksaan offline di RS atau
                      pemeriksaan diagnostik jika diperlukan.
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      width: 350,
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Image
                      src="https://www.halodoc.com/assets/svg/tc-ensure-new-3.webp"
                      width={70}
                    />
                    <p style={{ marginLeft: 10 }}>
                      Dapat diintegrasikan dengan asuransimu agar kebutuhan
                      kesehatan online terjamin asuransi.
                    </p>
                  </div>
                </div>
              </div>
            </Col>
            {selectDoctor === null ? (
              <Col xs={{ span: 24 }} md={{ span: 12 }}>
                <Search
                  allowClear={true}
                  placeholder="Cari Dokter"
                  size="large"
                  loading={false}
                  onSearch={(value) => {
                    setLoadingDoctor(true);
                    publicDashboardDoctorQuery(
                      { isActive: 1 },
                      value,
                      (res) => {
                        setDoctorData(res);
                        setLoadingDoctor(false);
                      }
                    );
                  }}
                />
                <p style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>
                  Rekomendasi Dokter
                </p>
                <p style={{ margin: "7px 0px 40px 0px" }}>
                  Pilih dokter untuk konsultasi kesehatan anda
                </p>
                <Row
                  gutter={[10, 10]}
                  justify={"start"}
                  style={{ marginTop: 10 }}
                  wrap={true}
                >
                  {loadingDoctor ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Spin />
                    </div>
                  ) : DoctorData.length > 0 ? (
                    DoctorData.map((doc) => {
                      return (
                        <Col span={12} style={{ cursor: "pointer" }}>
                          <div
                            // name="parent"
                            id="parent1"
                            key={doc.id}
                            onClick={() => {
                              // console.log(e);
                              setSelectDoctor(doc);
                            }}
                            style={{
                              padding: 10,
                              boxShadow: "0.1px 1px 3px gray",
                              fontSize: 12,
                              borderRadius: 10,
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{
                                objectFit: "cover",
                                objectPosition: "top",
                              }}
                              alt="afia-docs"
                              src={`${BASE_URL}/public/uploads/${doc.photos}`}
                              width={70}
                              preview={false}
                              height={100}
                            />
                            <div style={{ flex: 1, marginLeft: 10 }}>
                              <p style={{ marginTop: 10, fontWeight: 500 }}>
                                {doc.name},{" "}
                                {doc.academics.map((aca) => aca.degree)}
                              </p>
                              <p>{doc?.specialist?.name}</p>
                              {doc.prices.map((item) => {
                                return (
                                  <Tag
                                    color={
                                      item.type == "chatt" ? "blue" : "red"
                                    }
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
                                  setChatDokter(doc);
                                  // setIsModalChat(false);
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
                                size="small"
                                type="default"
                                color="red"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsModalBooking(true);
                                  setChatDokter(doc);
                                  // e.preventDefault();
                                }}
                              >
                                Booking
                              </Button>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Image
                        preview={false}
                        src="/assets/Oops.svg"
                        width={180}
                        height={180}
                      />
                    </div>
                  )}
                </Row>
                <p style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>
                  Specialist
                </p>
                <p style={{ margin: "7px 0px 40px 0px" }}>
                  Pilih kategori dokter sesuai dengan kebutuhan anda
                </p>
                <Row
                  gutter={[10, 10]}
                  justify={"start"}
                  style={{ marginTop: 10 }}
                  wrap={true}
                >
                  {loadingSpecialist ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Spin />
                    </div>
                  ) : (
                    SpecialistData.map((spec) => {
                      return (
                        <Col span={12} style={{ cursor: "pointer" }}>
                          <div
                            // name="parent"
                            id="parent1"
                            key={spec.id}
                            onClick={() =>
                              navigation.push(`/specialist/${spec.id}`)
                            }
                            style={{
                              padding: 10,
                              boxShadow: "0.1px 1px 3px gray",
                              fontSize: 12,
                              borderRadius: 10,
                              display: "flex",
                              // justifyContent: "space-evenly",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              style={{
                                objectFit: "cover",
                                objectPosition: "top",
                              }}
                              alt="afia-docs"
                              src={`${PATH_IMAGE}/${spec.picture}`}
                              width={70}
                              preview={false}
                              height={70}
                            />
                            <div style={{ flex: 1, marginLeft: 10 }}>
                              <p style={{ marginTop: 10, fontWeight: 500 }}>
                                {spec.name}
                              </p>
                            </div>
                          </div>
                        </Col>
                      );
                    })
                  )}
                </Row>
              </Col>
            ) : (
              <Col
                xs={{ span: 24 }}
                md={{ span: 12 }}
                style={{
                  backgroundColor: colorPallate.gray,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  onClick={() => {
                    setSelectDoctor(null);
                  }}
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    opacity: 0.8,
                  }}
                >
                  <AiOutlineCloseCircle color="gray" size={35} />
                </div>
                <Col style={{ cursor: "pointer", width: 350, color: "gray" }}>
                  <div
                    key={selectDoctor.id}
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
                      src={`${BASE_URL}/public/uploads/${selectDoctor.photos}`}
                      width={"100%"}
                      preview={false}
                      height={200}
                    />
                    <div>
                      <p
                        style={{ marginTop: 15, fontWeight: 600, fontSize: 16 }}
                      >
                        {selectDoctor.name},{" "}
                        {selectDoctor.academics.map((aca) => aca.degree)}
                      </p>
                      <p style={{ margin: "13px 0px" }}>Dokter Umum</p>
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
                                      {selectDoctor.academics.map((aca) => (
                                        <>
                                          <p style={{ marginTop: 5 }}>
                                            {aca.name},
                                          </p>
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
                                      {selectDoctor.works.map((work) => (
                                        <>
                                          <p style={{ marginTop: 5 }}>
                                            {work.name},
                                          </p>
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
                                        {selectDoctor.STR}
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
                    {/* {console.log(selectDoctor)} */}
                  </div>
                </Col>
              </Col>
            )}
          </Row>
        </Col>
        {/* <Modal
          style={{
            top: 250,
          }}
          title={`Chat dengan ${chatDokter?.name}`}
          open={isModalChat}
          okText={"Mulai"}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            Chatt dengan dokter {chatDokter?.name} seharga{" "}
            <Badge text={"test"} color={colorPallate.red} />, pastikan saldo
            anda cukup
          </p>
        </Modal> */}
        {/* CHATT */}
        <Modal
          style={{
            top: 250,
          }}
          title={`Chat dengan ${chatDokter?.name}`}
          okText="Mulai"
          cancelText="Batal"
          open={isModalChat}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>
            Chatt dengan dokter {chatDokter?.name} seharga{" "}
            <Tag color="blue">
              {chatDokter?.prices
                .find((el) => el.type == "chatt")
                .price.toLocaleString("id", "ID")}
            </Tag>
            , pastikan saldo anda cukup{" "}
          </p>
        </Modal>
        {/* BOOKING */}
        <Modal
          style={{
            top: 250,
          }}
          title={`Booking Dokter ${chatDokter?.name}`}
          okText="Book"
          cancelText="Batal"
          open={isModalBooking}
          onOk={() => {
            storeBooking();
          }}
          onCancel={() => {
            setIsModalBooking(false);
          }}
        >
          <p style={{ marginBottom: 10 }}>
            Harga Booking{" "}
            <Tag color="blue">
              {chatDokter?.prices
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
      </div>
    </LayoutApp>
  );
};

export default TanyaDokter;
