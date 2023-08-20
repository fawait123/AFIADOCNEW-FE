"use client";
import {
  SmileOutlined,
  HomeOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaUserDoctor, FaHospital } from "react-icons/fa6";
import {
  BiMoneyWithdraw,
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiWallet,
} from "react-icons/bi";
import { HiOutlineReceiptTax } from "react-icons/hi";

import { Layout, Menu, Button, theme, Row, Col } from "antd";
import { Dropdown, message, Space, Tooltip } from "antd";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { colorPallate } from "@/utils/colorpallate";
import { AiOutlinePoweroff } from "react-icons/ai";
import { FaMoneyBill, FaUsers } from "react-icons/fa";
import { MdOutlineManageAccounts } from "react-icons/md";

import { BsKey, BsKeyFill } from "react-icons/bs";
import { getWallet } from "@/API/wallet";

const { Header, Sider, Content } = Layout;
const DashboardLayout = ({ children }) => {
  const [responsiveLayout, setResponsiveLayout] = useState({
    breakpoint: null,
    collapse: false,
    collapseWidth: 100,
  });

  const [menu, setMenu] = useState([]);
  const [wallet, setWallet] = useState(0);
  const [user, setUser] = useState(null);

  const navigation = useRouter();
  const path = usePathname();

  const getDataWallet = () => {
    getWallet((res) => {
      setWallet(res.amount);
    });
  };

  const getUser = () => {
    setUser(JSON.parse(window.localStorage.getItem("user")));
  };

  // console.log(path);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: (
        <div style={{ width: 200 }}>
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
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <MdOutlineManageAccounts />
          <div style={{ marginLeft: 10 }}>Notifikasi</div>
        </div>
      ),
      disabled: false,
    },
    {
      key: "3",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <HiOutlineReceiptTax />
          <div style={{ marginLeft: 10 }}>Booking</div>
        </div>
      ),

      disabled: false,
    },
    {
      key: "4",
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUsers />
          <div style={{ marginLeft: 10 }}>Profil</div>
        </div>
      ),

      disabled: false,
    },
    {
      key: "5",
      label: (
        <div
          style={{ display: "flex", alignItems: "center" }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigation.push("/login");
          }}
        >
          <AiOutlinePoweroff />
          <div style={{ marginLeft: 10 }}>Logout</div>
        </div>
      ),

      disabled: false,
    },
  ];

  useEffect(() => {
    const roleManagement = JSON.parse(window.localStorage.getItem("user"));
    if (roleManagement?.role?.name === "pengguna") {
      navigation.push("/");
    }

    getDataWallet();
    getUser();

    let TemplateMenu = [
      {
        key: "/dashboard",
        icon: <HomeOutlined />,
        label: "Dashboard",
        prefix: "all",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/user",
        icon: <UserOutlined />,
        label: "Pengguna",
        prefix: "admin",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/doctors",
        icon: <FaUserDoctor />,
        label: "Dokter",
        prefix: "admin",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/validation",
        icon: <BsKeyFill />,
        label: "Validasi Dokter",
        prefix: "admin",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/specialist",
        icon: <SubnodeOutlined />,
        label: "Spesialis",
        prefix: "admin",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/booking",
        icon: <SubnodeOutlined />,
        label: "Booking",
        prefix: "dokter",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/chat",
        icon: <SubnodeOutlined />,
        label: "Chat",
        prefix: "dokter",
        onClick: (e) => navigation.push(e.key),
      },
      {
        key: "/dashboard/wallet",
        icon: <FaMoneyBill />,
        label: "Wallet",
        onClick: (e) => navigation.push(e.key),
        prefix: "admin",
      },
      {
        key: "/dashboard/payout",
        icon: <BiMoneyWithdraw />,
        label: "Payout",
        onClick: (e) => navigation.push(e.key),
        prefix: "admin",
      },
    ];

    let menusManagement = TemplateMenu.filter((items) => {
      return (
        items.prefix === roleManagement?.role?.name || items.prefix === "all"
      );
    });

    // console.log(menusManagement);
    setMenu(menusManagement);
  }, []);

  return (
    <Layout>
      <Sider
        style={
          responsiveLayout.breakpoint
            ? {
                backgroundColor: "white",
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                zIndex: 10,
                left: 0,
                top: 0,
                bottom: 0,
              }
            : { backgroundColor: "white" }
        }
        trigger={null}
        collapsible={false}
        collapsed={responsiveLayout.collapse}
        breakpoint="md"
        onBreakpoint={(s) => {
          setResponsiveLayout({ ...responsiveLayout, breakpoint: s });
        }}
        collapsedWidth={responsiveLayout.breakpoint ? 0 : 95}
      >
        <div
          className="demo-logo-vertical"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            width={55}
            height={55}
            style={{ objectFit: "contain", margin: "10px 0px" }}
            src={"/assets/logo.png"}
            alt="logo"
          />
          {responsiveLayout.breakpoint ? (
            <Button
              onClick={() =>
                setResponsiveLayout({
                  ...responsiveLayout,
                  collapse: !responsiveLayout.collapse,
                })
              }
              type="primary"
              style={{ width: "97%", borderRadius: 5, marginBottom: 10 }}
            >
              <BiSolidLeftArrow />
            </Button>
          ) : null}
        </div>
        <Menu
          theme="light"
          mode="inline"
          // defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          // stya
          items={menu}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={
              responsiveLayout.collapse ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )
            }
            onClick={() =>
              setResponsiveLayout({
                ...responsiveLayout,
                collapse: !responsiveLayout.collapse,
              })
            }
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Dropdown
            menu={{
              items,
            }}
          >
            <a
              onClick={(e) => e.preventDefault()}
              style={{ display: "flex", alignItems: "center", marginRight: 20 }}
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
              <p>{user?.name}</p>
            </a>
          </Dropdown>
        </Header>
        <Content
          className="font-def"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "80vh",
            background: colorBgContainer,
            overflow: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DashboardLayout;
