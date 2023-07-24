"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Image, Modal, Badge } from "antd";
import { colorPallate } from "@/utils/colorpallate";
import "./page.css";
import { useRouter } from "next/navigation";
import { publicDashboard, publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { IoBagSharp } from "react-icons/io5";
import { AiFillLike } from "react-icons/ai";

const Home = () => {
  const navigation = useRouter();
  const [specialistData, setSpecialistData] = useState([]);
  const [DoctorData, setDoctorData] = useState([]);
  const [isModalChat, setIsModalChat] = useState(false);

  // console.log(DoctorData);
  const showModal = () => {
    setIsModalChat(true);
  };
  const handleOk = () => {
    setIsModalChat(false);
  };
  const handleCancel = () => {
    setIsModalChat(false);
  };
  useEffect(() => {
    publicDashboard((res) => {
      setSpecialistData(res);
    });
    publicDashboardDoctor((res) => {
      setDoctorData(res);
    });
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
            <p style={{ fontSize: 27, fontWeight: "bold", marginBottom: 25 }}>
              Spesialis
            </p>
            <Row
              justify={"start"}
              gutter={[100, 20]}
              style={{ margin: "20px 0px" }}
            >
              {specialistData.map((val, i) => {
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
              })}
            </Row>
          </Col>
        </Row>
        <Row justify={"center"}>
          <Col span={18}>
            <p style={{ fontSize: 27, fontWeight: "bold", marginBottom: 25 }}>
              Dokter
            </p>
            <Row
              justify={"start"}
              gutter={[100, 20]}
              style={{ margin: "20px 0px" }}
            >
              {DoctorData.map((doc, i) => {
                return (
                  // <Col
                  //   flex={1}
                  //   key={i}
                  //   style={{
                  //     display: "flex",
                  //     flexDirection: "column",
                  //     alignItems: "center",
                  //   }}
                  // >
                  //   <Image
                  //     style={{ objectFit: "contain" }}
                  //     alt="afia-docs"
                  //     src={`${BASE_URL}/public/uploads/${val.photos}`}
                  //     width={60}
                  //     preview={false}
                  //     height={60}
                  //   />
                  //   <p
                  //     style={{
                  //       textAlign: "center",
                  //       color: colorPallate.blue,
                  //       marginTop: 10,
                  //     }}
                  //   >
                  //     {val.name}, {val.initialDegree}., {val.finalDegree}
                  //   </p>
                  // </Col>
                  <Col style={{ cursor: "pointer" }}>
                    <div
                      // name="parent"
                      // id="parent1"
                      key={doc.id}
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
                        <p>Dokter Umum</p>
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
                            <p style={{ color: "gray", marginLeft: 5 }}>100</p>
                          </div>
                        </div>
                        <Button
                          style={{ marginLeft: 10 }}
                          type="primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            showModal();
                            // e.preventDefault();
                          }}
                        >
                          Chat
                        </Button>
                        <Modal
                          style={{
                            top: 250,
                          }}
                          title="Basic Modal"
                          open={isModalChat}
                          onOk={handleOk}
                          onCancel={handleCancel}
                        >
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                          <p>Some contents...</p>
                        </Modal>
                      </div>
                    </div>
                  </Col>
                );
              })}
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
