"use client";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Image } from "antd";
import { colorPallate } from "@/utils/colorpallate";
import "../page.css";
import { useRouter } from "next/navigation";
import { publicDashboard, publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";

const LayoutTanyaDokter = ({ children }) => {
  const navigation = useRouter();

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
      <>{children}</>
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

export default LayoutTanyaDokter;