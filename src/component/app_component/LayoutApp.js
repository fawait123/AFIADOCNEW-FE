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
    await API({
      url: "/public/find-location",
      method: "get",
      params: {
        latitude: -7.748424,
        longitude: 110.356346,
      },
    }).then((response) => {
      setAddress(
        response?.data?.results?.data.length > 0
          ? response?.data?.results?.data[0]?.administrativeLevels?.level1long
          : null
      );
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
          padding: screens.xs ? "10px 0px" : "10px 30px",
          borderBottom: "1px solid #F0F0F0",
          position: "sticky",
          top: 0,
          zIndex: 99,
          background: "white",
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
            {["Beranda", "Artikel", "Aplikasi", "Riwayat"].map((val, i) => {
              return (
                <Col key={i} style={{ cursor: "pointer" }}>
                  {" "}
                  <p
                    onClick={() => navigation.push("/")}
                    className="text"
                    style={{ fontWeight: 450, fontSize: 14 }}
                  >
                    {val}
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginRight: 7,
            }}
          >
            <FaMapMarked style={{ marginRight: 5, color: "gray" }} />
            <p style={{ color: "gray" }}>{address}</p>
          </div>
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
                  <p style={{ display: screens.xs ? "none" : "block" }}>
                    {user.name}
                  </p>
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
      <div
        style={{
          backgroundColor: colorPallate.blue,
          color: "white",
          padding: "10px 10px",
        }}
      >
        <div style={{ width: "85%", margin: "0px auto" }}>
          <p style={{ fontSize: fontSize.xl, fontWeight: "bold" }}>AFIA DOCS</p>
        </div>
        <Row justify={"space-between"} align={"top"} style={{ marginTop: 20 }}>
          <Col
            span={screens.xs ? 24 : 8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: fontSize.md,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
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
            span={screens.xs ? 24 : 8}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: fontSize.md,
                  fontWeight: "500",
                  marginBottom: 10,
                }}
              >
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
            span={screens.xs ? 24 : 8}
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
                      fontSize: fontSize.md,
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
                  {user ? null : (
                    <>
                      {" "}
                      <p
                        style={{
                          fontSize: fontSize.md,
                          fontWeight: "500",
                          margin: " 5px 0px",
                        }}
                      >
                        Apakah kamu Dokter?
                      </p>
                      <Button
                        style={{ borderRadius: 2 }}
                        onClick={() =>
                          navigation.push("/dokter/doctor_register")
                        }
                      >
                        Daftar
                      </Button>
                    </>
                  )}
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

export default LayoutApp;
