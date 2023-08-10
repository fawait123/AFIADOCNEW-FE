"use client";
import React, { useEffect, useState } from "react";
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
import { FaUsers } from "react-icons/fa";
import { getWallet } from "@/API/wallet";

const LayoutApp = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);
  const navigation = useRouter();

  const getDataWallet = () => {
    getWallet((res) => {
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

  useEffect(() => {
    if (user) {
      getDataWallet();
    }
    getLogin();
  }, []);

  // console.log(specialistData);
  const items = [
    {
      key: "1",

      label: (
        <div
          style={{ width: 200 }}
          onClick={() => navigation.push("/account_balance")}
        >
          <p>AFIA WALLET</p>
          <div
            style={{
              display: "flex",
              justifyItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p style={{ color: "green", fontWeight: 700 }}>
              Rp {wallet.toLocaleString("id", "ID")}
            </p>
            <BiWallet size={20} />
          </div>
        </div>
      ),
      // icon: <SmileOutlined />,
    },
    {
      key: "2",
      label: <div>Account Details</div>,
      icon: <MdOutlineManageAccounts />,
      disabled: false,
    },
    {
      key: "3",
      label: <div onClick={() => navigation.push("/booking")}>Booking</div>,
      icon: <BiBookAdd />,
      disabled: false,
    },
    {
      key: "4",
      label: <div>Tax Information</div>,
      icon: <HiOutlineReceiptTax />,
      disabled: false,
    },
    {
      key: "5",
      label: <div>User Management</div>,
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
        <Col xs={{ span: 0 }} md={{ span: 2 }} xl={{ span: 2 }}>
          {isLogin ? (
            user.role.name !== "pengguna" ? (
              <Button
                onClick={() => {
                  navigation.push("/dashboard");
                }}
                type="primary"
              >
                Dashboard
              </Button>
            ) : (
              <Dropdown
                menu={{
                  items,
                }}
              >
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
                  <p>{user.name}</p>
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
      {children}
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
                  {user ? null : (
                    <>
                      {" "}
                      <p
                        style={{
                          fontSize: 20,
                          fontWeight: "500",
                          margin: " 5px 0px",
                        }}
                      >
                        Apakah kamu Dokter?
                      </p>
                      <Button
                        style={{ borderRadius: 2 }}
                        onClick={() => navigation.push("/doctor_register")}
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
