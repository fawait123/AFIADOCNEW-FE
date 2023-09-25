"use client";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Row, Image, Dropdown } from "antd";
import { colorPallate } from "@/utils/colorpallate";
import { useRouter } from "next/navigation";
import { publicDashboard, publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { IoBagSharp } from "react-icons/io5";
import {
  AiFillLike,
  AiOutlineCloseCircle,
  AiOutlinePoweroff,
} from "react-icons/ai";
import { BiBookAdd, BiWallet } from "react-icons/bi";
import { MdOutlineManageAccounts } from "react-icons/md";
import { HiOutlineReceiptTax } from "react-icons/hi";
import {
  FaAppStore,
  FaArchive,
  FaBlog,
  FaHome,
  FaMap,
  FaMapMarked,
  FaUsers,
} from "react-icons/fa";
import { getWallet } from "@/API/wallet";
import { Grid } from "antd";
import { FaPerson } from "react-icons/fa6";
import Screens from "@/utils/Screens";
import Texting from "@/utils/Texting";
import API from "@/API";
const { useBreakpoint } = Grid;

const LayoutApp = ({ children }) => {
  const screens = useContext(Screens);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const navigation = useRouter();
  const fontSize = useContext(Texting);
  const [address, setAddress] = useState(null);

  // console.log(screens, fontSize, "context");

  const getDataWallet = async () => {
    await getWallet((res) => {
      setWallet(res.amount);
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // window.location.href = "/login";
    navigation.push("/login");
  };

  const getLogin = () => {
    if (window) {
      if (window.localStorage.getItem("token")) {
        setUser(JSON.parse(window.localStorage.getItem("user")));
        setIsLogin(true);
      }
    } else {
      if (localStorage.getItem("token")) {
        setIsLogin(true);
      }
    }
  };

  const getAddress = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      await API({
        url: "/public/find-location",
        method: "get",
        params: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      }).then((response) => {
        setAddress(
          response?.data?.results?.data.length > 0
            ? response?.data?.results?.data[0]?.administrativeLevels?.level1long
            : null
        );
      });
    });
  };

  useEffect(() => {
    getLogin();
    if (user) {
      getDataWallet();
    }
    getAddress();
  }, []);

  const items = screens.xs
    ? [
        {
          key: "0",
          label: (
            <div
              style={{
                width: 200,
                color: colorPallate.blue,
                display: screens.xs ? "block" : "none",
              }}
            >
              <h3>{user?.name}</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <FaMapMarked
                  style={{ marginRight: 5, color: "gray", fontSize: 10 }}
                />
                <span style={{ color: "gray", fontSize: 10 }}>{address}</span>
              </div>
            </div>
          ),
        },

        {
          key: "3",
          label: (
            <div
              onClick={() =>
                navigation.push("/pengguna/antrian_booking/process_antrian")
              }
            >
              Booking
            </div>
          ),
          icon: <BiBookAdd />,
          disabled: false,
        },

        {
          key: "5",
          label: (
            <div onClick={() => navigation.push("/pengguna/pasien")}>
              Pasien
            </div>
          ),
          icon: <FaUsers />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => navigation.push("/")}>Beranda</div>,
          icon: <FaHome />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => navigation.push("/")}>Artikel</div>,
          icon: <FaArchive />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => navigation.push("/")}>Aplikasi</div>,
          icon: <FaAppStore />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => navigation.push("/")}>Riwayat</div>,
          icon: <FaBlog />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => logout()}>Logout</div>,
          icon: <AiOutlinePoweroff />,
          disabled: false,
        },
      ]
    : [
        {
          key: "0",
          label: (
            <div
              style={{
                width: 200,
                color: colorPallate.blue,
                display: screens.xs ? "block" : "none",
              }}
            >
              <h3>{user?.name}</h3>
            </div>
          ),
        },
        {
          key: "3",
          label: (
            <div
              onClick={() =>
                navigation.push("/pengguna/antrian_booking/process_antrian")
              }
            >
              Booking
            </div>
          ),
          icon: <BiBookAdd />,
          disabled: false,
        },

        {
          key: "5",
          label: (
            <div onClick={() => navigation.push("/pengguna/pasien")}>
              Pasien
            </div>
          ),
          icon: <FaUsers />,
          disabled: false,
        },
        {
          key: "6",
          label: <div onClick={() => logout()}>Logout</div>,
          icon: <AiOutlinePoweroff />,
          disabled: false,
        },
      ];

  return (
    <div>
      {/* Header */}
      <Row
        justify={"space-between"}
        style={{
          padding: screens.xs ? "10px 20px" : "10px 30px",
          borderBottom: "1px solid #F0F0F0",
          position: "sticky",
          top: 0,
          zIndex: 99,
          background: "white",
          marginBottom: screens.xs ? 20 : 0,
        }}
        align={"middle"}
      >
        <Col span={1}>
          <Image
            onClick={() => {
              navigation.push("/");
            }}
            style={{ objectFit: "contain", cursor: "pointer" }}
            alt="afia-docs"
            src={"/assets/logo.png"}
            width={60}
            height={60}
            preview={false}
          />
          {/* <div style={{  }}>
            <FaMap /> Jl. Pandega rini sinduadi, sleman yogyakarta
          </div> */}
        </Col>
        <Col xs={{ span: 0 }} md={{ span: 8 }} xl={{ span: 15 }}>
          <Row gutter={20}>
            {[
              { name: "Beranda", url: "/" },
              { name: "Artikel", url: "/" },
              { name: "Aplikasi", url: "/" },
              { name: "Riwayat", url: "/" },
              { name: "Pasien", url: "/pengguna/pasien" },
              {
                name: "Booking",
                url: "/pengguna/antrian_booking/process_antrian",
              },
            ].map((val, i) => {
              return (
                <Col key={i} style={{ cursor: "pointer" }}>
                  {" "}
                  <p
                    onClick={() => navigation.push(val.url)}
                    className="text"
                    style={{ fontWeight: 450, fontSize: 14 }}
                  >
                    {val.name}
                  </p>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLogin ? (
            user?.role?.name !== "pengguna" ? (
              <Button
                onClick={() => {
                  const Entitiy = JSON.parse(localStorage.getItem("user"))?.role
                    ?.name;

                  if (Entitiy === "dokter") {
                    navigation.push("/dokter/dashboard");
                  } else if (Entitiy === "admin") {
                    navigation.push("/admin/dashboard");
                  }
                  // console.log(Entut)
                }}
                type="primary"
              >
                Dashboard
              </Button>
            ) : (
              <Dropdown menu={{ items }}>
                <a
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginRight: 20,
                  }}
                >
                  <img
                    alt=""
                    src={
                      "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    }
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "100%",
                      marginRight: 10,
                      border: `2px solid ${colorPallate.blue}`,
                    }}
                  />
                  <div>
                    <p style={{ display: screens.xs ? "none" : "block" }}>
                      {user.name}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "start",
                        alignItems: "center",
                        display: screens.xs ? "none" : "block",
                      }}
                    >
                      <FaMapMarked
                        style={{ marginRight: 5, color: "gray", fontSize: 10 }}
                      />
                      <span style={{ color: "gray", fontSize: 10 }}>
                        {address}
                      </span>
                    </div>
                  </div>
                </a>
              </Dropdown>
            )
          ) : (
            <Button
              onClick={() => {
                navigation.push("/login");
              }}
              type="primary"
            >
              Login
            </Button>
          )}
        </Col>
      </Row>
      {/* CONTENT*/}
      <div
        style={{
          marginTop: screens.xs ? 0 : 30,
          width: "100%",
        }}
      >
        {children}
      </div>
      {/* FOOTER */}
      <Row
        style={{ padding: screens.xs ? 20 : 60, background: colorPallate.blue }}
      >
        <Col
          span={screens.xs ? 24 : 7}
          style={{ marginBottom: screens.xs ? 10 : 0, padding: 15 }}
        >
          <Row>
            <Col span={24}>
              <h1 style={{ color: "white", marginBottom: 8 }}>AFIA DOC</h1>
            </Col>
            <Col>
              <p style={{ color: "white", textAlign: "justify" }}>
                Selamat datang di portal kesehatan kami, Afia Doc adalah sumber
                informasi kesehatan terkemuka dan anda dapat terhubung dengan
                dokter berpengalaman
              </p>
            </Col>
          </Row>
        </Col>
        <Col
          span={screens.xs ? 24 : 7}
          style={{ marginBottom: screens.xs ? 10 : 0, padding: 15 }}
        >
          <Row>
            <Col span={24}>
              <h2 style={{ color: "white", marginBottom: 8 }}>Afia Doc</h2>
            </Col>
            <Col span={24}>
              {[
                { name: "Tentang Kami", url: "/" },
                { name: "Kontak Kami", url: "/" },
                { name: "Artikel", url: "/" },
                { name: "Karir", url: "/" },
                { name: "Tim Dokter", url: "/" },
              ].map((item) => {
                return (
                  <span
                    style={{
                      display: "block",
                      color: "white",
                      margin: "10px 0px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigation.push(item.url)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Col
          span={screens.xs ? 24 : 7}
          style={{ marginBottom: screens.xs ? 10 : 0, padding: 15 }}
        >
          <Row>
            <Col span={24}>
              <h2 style={{ color: "white", marginBottom: 8 }}>Informasi</h2>
            </Col>
            <Col span={24}>
              {[
                { name: "Syarat & Ketentuan", url: "/" },
                { name: "Kebijakan Privasi", url: "/" },
                { name: "Gabung Di Tim Dokter", url: "/" },
                { name: "Pasang Iklan", url: "/" },
              ].map((item) => {
                return (
                  <span
                    style={{
                      display: "block",
                      color: "white",
                      margin: "10px 0px",
                      cursor: "pointer",
                    }}
                    onClick={() => navigation.push(item.url)}
                  >
                    {item.name}
                  </span>
                );
              })}
            </Col>
          </Row>
        </Col>
        <Col
          span={screens.xs ? 24 : 3}
          style={{ marginBottom: screens.xs ? 10 : 0, padding: 15 }}
        >
          <Row>
            <Col span={24}>
              <span style={{ color: "white", fontSize: 14 }}>
                Apakah Kamu Dokter ?{" "}
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                  onClick={() => navigation.push("/dokter/doctor_register")}
                >
                  Daftar
                </span>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* LiCENSE FOOTER */}
      <Row
        style={{
          backgroundColor: "#35406B",
          textAlign: "left",
          color: "white",
          padding: screens.xs ? "10px 20px" : "10px 60px",
        }}
      >
        <Col span={24} style={{ margin: "0px auto", padding: 10 }}>
          <p>&copy; AFIA DOC 2023. ALL RIGHTS RESERVED version 1.0.0</p>
        </Col>
      </Row>
    </div>
  );
};

export default LayoutApp;
