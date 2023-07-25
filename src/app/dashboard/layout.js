"use client";
import {
  SmileOutlined,
  HomeOutlined,
  SubnodeOutlined,
} from "@ant-design/icons";

import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { FaUserDoctor, FaHospital } from "react-icons/fa6";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

import { Layout, Menu, Button, theme, Row, Col } from "antd";
import { Dropdown, message, Space, Tooltip } from "antd";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { colorPallate } from "@/utils/colorpallate";

const { Header, Sider, Content } = Layout;
const DashboardLayout = ({ children }) => {
  const [responsiveLayout, setResponsiveLayout] = useState({
    breakpoint: null,
    collapse: false,
    collapseWidth: 100,
  });
  const navigation = useRouter();
  const path = usePathname();

  // console.log(path);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Profile
        </a>
      ),
      icon: <SmileOutlined />,
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Logout
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: false,
    },
  ];

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
          items={[
            // {
            //   key: "1",
            //   icon: <Image width={20} height={20} src={"/assets/logo.png"} />,
            //   // label: "nav 1",
            // },
            {
              key: "/dashboard",
              icon: <HomeOutlined />,
              label: "Dashboard",
              onClick: (e) => navigation.push(e.key),
            },
            {
              key: "/dashboard/user",
              icon: <UserOutlined />,
              label: "Pengguna",
              onClick: (e) => navigation.push(e.key),
            },
            {
              key: "/dashboard/doctors",
              icon: <FaUserDoctor />,
              label: "Dokter",
              onClick: (e) => navigation.push(e.key),
            },
            {
              key: "/dashboard/specialist",
              icon: <SubnodeOutlined />,
              label: "Spesialis",
              onClick: (e) => navigation.push(e.key),
            },
            {
              key: "/dashboard/booking",
              icon: <SubnodeOutlined />,
              label: "Booking",
              onClick: (e) => navigation.push(e.key),
            },
            {
              key: "/dashboard/chat",
              icon: <SubnodeOutlined />,
              label: "Chat",
              onClick: (e) => navigation.push(e.key),
            },
            // {
            //   key: "/dashboard/hospital",
            //   icon: <FaHospital />,
            //   label: "Rumah Sakit",
            //   onClick: (e) => navigation.push(e.key),
            // },
          ]}
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
              <p>Achmad Fawait</p>
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
