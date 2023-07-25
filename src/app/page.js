"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Image, Modal, Badge, Spin } from "antd";
import { colorPallate } from "@/utils/colorpallate";
import "./page.css";
import { useRouter } from "next/navigation";
import { publicDashboard, publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { IoBagSharp } from "react-icons/io5";
import { AiFillLike, AiOutlineCloseCircle } from "react-icons/ai";

const Home = () => {
  const navigation = useRouter();
  const [specialistData, setSpecialistData] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [isModalChat, setIsModalChat] = useState(false);
  const [loadingSpecialist, setLoadingSpecialist] = useState(false);
  const [loadingDoctor, setLoadingDoctor] = useState(false);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [detailDoctor, setDetailDoctor] = useState(null);

  // console.log(DoctorData);
  const showModal = () => {
    setIsModalChat(true);
  };
  const handleOk = () => {
    setIsModalChat(false);
    navigation.push(`/chat/${selectDoctor?.id}`);
  };
  const handleCancel = () => {
    setIsModalChat(false);
  };

  const getDataSPecialist = () => {
    setLoadingSpecialist(true);
    publicDashboard((res) => {
      setSpecialistData(res);
      setLoadingSpecialist(false);
    });
  };

  const getDataDoctor = () => {
    setLoadingDoctor(true);
    publicDashboardDoctor((res) => {
      setDoctorData(res);
      setLoadingDoctor(false);
    });
  };

  useEffect(() => {
    getDataSPecialist();
    getDataDoctor();
  }, []);

  // console.log(specialistData);
  return (
    <div>
      {/* Header */}
      <Row
        justify={"space-between"}
        style={{ padding: "10px 30px" }}
        align={"middle"}
      >
        <Col span={1}>
          <Image
            style={{ objectFit: "contain" }}
            alt="afia-docs"
            src={"/assets/logo.png"}
            width={60}
            height={60}
            preview={false}
          />
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 8 }} xl={{ span: 5 }}>
          <Row gutter={20}>
            {["Beranda", "Artikel", "Aplikasi", "Riwayat"].map((val, i) => {
              return (
                <Col key={i}>
                  {" "}
                  <p className="text" style={{ fontWeight: 450, fontSize: 14 }}>
                    {val}
                  </p>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 1 }} xl={{ span: 1 }}>
          <Button
            onClick={() => {
              navigation.push("/login");
            }}
            type="primary"
          >
            Login
          </Button>
        </Col>
      </Row>
      {/* CONTENT */}
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
              ipsum magna deserunt commodo consequat officia duis. Id et commodo
              qui excepteur fugiat deserunt amet ad occaecat ipsum in
              reprehenderit minim. Elit enim fugiat dolor sunt incididunt culpa
              cupidatat amet deserunt.
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
          md={{
            span: 24,
          }}
          lg={{ span: 12 }}
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
              justify={"start"}
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
                    <Col
                      flex={1}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                      key={i}
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
              gutter={[100, 20]}
              style={{ margin: "20px 0px" }}
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
              ) : detailDoctor ? (
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
                      setDetailDoctor(null);
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
                      key={detailDoctor.id}
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
                        src={`${BASE_URL}/public/uploads/${detailDoctor.photos}`}
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
                          {detailDoctor.name},{" "}
                          {detailDoctor.academics.map((aca) => aca.degree)}
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
                                        {detailDoctor.academics.map((aca) => (
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
                                        {detailDoctor.works.map((work) => (
                                          <>
                                            <p style={{ marginTop: 5 }}>
                                              {work.name},
                                            </p>
                                            <p>
                                              {work.year_entry} -{" "}
                                              {work.year_out}
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
                                          {detailDoctor.STR}
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
              ) : (
                DoctorData.map((doc, i) => {
                  return (
                    <Col
                      span={12}
                      style={{ cursor: "pointer" }}
                      onClick={() => setDetailDoctor(doc)}
                    >
                      <div
                        key={doc.id}
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
                            {doc.name}, {doc.academics.map((aca) => aca.degree)}
                          </p>
                          <p>{doc?.specialist?.name || "not set"}</p>
                          <Badge
                            text={doc.price.toLocaleString("id", "ID")}
                            color={colorPallate.red}
                          />
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
                            style={{ marginLeft: 10 }}
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              showModal();
                              setSelectDoctor(doc);
                              // e.preventDefault();
                            }}
                          >
                            Chat
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
                              setSelectDoctor(null);
                              setIsModalChat(false);
                            }}
                          >
                            <p>
                              Chatt dengan dokter {selectDoctor?.name} seharga{" "}
                              <Badge
                                text={selectDoctor?.price.toLocaleString(
                                  "id",
                                  "ID"
                                )}
                                color={colorPallate.red}
                              />
                              , pastikan saldo anda cukup
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
      {/* FOOTER */}
      <div
        style={{
          backgroundColor: colorPallate.blue,
          color: "white",
          padding: "10px 10px",
        }}
      >
        <div style={{ width: "85%", margin: "0px auto" }}>
          <p style={{ fontSize: 25, fontWeight: "bold" }}>AFIA DOCS</p>
        </div>
        <Row justify={"space-between"} align={"top"} style={{ marginTop: 20 }}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
                Site Map
              </p>
              <Row gutter={30}>
                <Col>
                  <p style={{ marginBottom: 5 }}>FAQ</p>
                  <p style={{ marginBottom: 5 }}>Blog</p>
                  <p style={{ marginBottom: 5 }}>Syarat & Ketentuan</p>
                  <p style={{ marginBottom: 5 }}>Kebijakan Privasi</p>
                  <p style={{ marginBottom: 5 }}>Ketentuan</p>
                </Col>
                <Col>
                  <p style={{ marginBottom: 5 }}>Karir</p>
                  <p style={{ marginBottom: 5 }}>Security</p>
                  <p style={{ marginBottom: 5 }}>Media</p>
                  <p>Corporate Partnership</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <p style={{ fontSize: 20, fontWeight: "500", marginBottom: 10 }}>
                Layanan Pengaduan Konsumen
              </p>
              <Row gutter={30}>
                <Col>
                  <p style={{ marginBottom: 5 }}>
                    Jl. H.R. Rasuna Said Kav B32-33, Jakarta Selatan
                    help@halodoc.com / 021-5095-9900
                  </p>
                </Col>
                <Col>
                  <p style={{ marginTop: 5 }}>
                    Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga
                    Kementerian Perdagangan Republik Indonesia 0853 1111 1010
                    (WhatsApp)
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <Row gutter={30}>
                <Col>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      marginBottom: 5,
                    }}
                  >
                    Download App di
                  </p>
                  <Row>
                    <Col>
                      <Image width={100} src="/assets/playstore.png" />
                    </Col>
                  </Row>
                  <p
                    style={{
                      fontSize: 20,
                      fontWeight: "500",
                      margin: " 5px 0px",
                    }}
                  >
                    Apakah kamu Dokter?
                  </p>
                  <Button style={{ borderRadius: 2 }}>Daftar</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      {/* LiCENSE FOOTER */}
      <Row
        style={{
          backgroundColor: "#35406B",
          textAlign: "left",
          color: "white",
          padding: "10px 0px",
        }}
      >
        <Col span={21} style={{ margin: "0px auto" }}>
          <p>&copy; AFIA DOC 2023. ALL RIGHTS RESERVED</p>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
