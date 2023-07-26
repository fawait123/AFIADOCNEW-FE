"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import { colorPallate } from "@/utils/colorpallate";
import { Card, Col, Collapse, Modal, Row } from "antd";
import React, { useState } from "react";
import "./account_balance.css";
import { AiFillBank } from "react-icons/ai";
import { FaHistory, FaMoneyBillAlt, FaWallet } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiQrcode } from "react-icons/hi";
import { MdAccountBalanceWallet, MdPayments } from "react-icons/md";
const { Panel } = Collapse;
const AccountBalancePage = () => {
  const [open, setOpen] = useState({ status: false, title: "" });

  return (
    <LayoutApp>
      <Row justify={"center"}>
        <Col span={20}>
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: colorPallate.blue,
              }}
            >
              <MdAccountBalanceWallet size={30} style={{ marginRight: 10 }} />
              <div>
                <h3>Your Balance</h3>
                <h4>Rp 18.000</h4>
              </div>
            </div>
          </Card>
          <Row
            gutter={[20, 20]}
            style={{
              backgroundColor: colorPallate.gray,
              margin: "20px 0px",
              padding: "20px 10px",
            }}
          >
            {[
              {
                name: "Isi Saldo",
                icon: <FaWallet size={40} />,
              },
              {
                name: "Bayar",
                icon: <MdPayments size={40} />,
              },
              {
                name: "Transfer",
                icon: <FaMoneyBillTransfer size={40} />,
              },
              {
                name: "Kode Bayar",
                icon: <HiQrcode size={40} />,
              },
              {
                name: "Transfer Bank",
                icon: <AiFillBank size={40} />,
              },
              {
                name: "Minta Dana",
                icon: <FaMoneyBillAlt size={40} />,
              },
            ].map((val) => {
              return (
                <Col key={val.name} span={8}>
                  <Card
                    onClick={() => setOpen({ status: true, title: val.name })}
                    className="cards"
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        color: colorPallate.blue,
                      }}
                    >
                      {val.icon}
                      <p>{val.name}</p>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <Card>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                color: colorPallate.blue,
              }}
            >
              <FaHistory size={30} style={{ marginRight: 10 }} />
              <h3>History Transaksi</h3>
            </div>
          </Card>
          <Row
            gutter={[10, 10]}
            style={{
              backgroundColor: colorPallate.gray,
              margin: "20px 0px",
              padding: "10px 10px",
            }}
          >
            {[
              {
                name: "Isi Saldo",
                icon: <FaWallet size={30} />,
                metode: "Bank",
                amount: 48000,
                createdAt: "15 Juli 2023",
                sign: "+",
              },
              {
                name: "Pembayaran",
                icon: <MdPayments size={30} />,
                metode: "AFIA PAY",
                amount: 30000,
                createdAt: "25 Juli 2023",
                sign: "-",
              },
            ].map((val) => {
              return (
                <Col key={val.name} span={24}>
                  <Card>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: colorPallate.blue,
                        }}
                      >
                        <div>{val.icon}</div>
                        <div style={{ marginLeft: 20 }}>
                          <p>{val.name}</p>
                          <p style={{ fontSize: 11, color: "gray" }}>
                            {val.metode}
                          </p>
                          <p style={{ fontSize: 11, color: "gray" }}>
                            {val.createdAt}
                          </p>
                        </div>
                      </div>
                      <h4 style={{ color: val.sign === "+" ? "green" : "red" }}>
                        {val.sign} Rp {val.amount.toLocaleString()}
                      </h4>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
      <Modal
        title={open.title}
        centered
        open={open.status}
        onOk={() => setOpen({ status: false, title: "" })}
        onCancel={() => setOpen({ status: false, title: "" })}
        width={1000}
      >
        <Collapse>
          <Panel header="Transfer Bank" key="1" showArrow={false}>
            <Row gutter={10}>
              {[
                { name: "BCA", icon: <FaWallet /> },
                { name: "BRI", icon: <FaWallet /> },
                { name: "MANDIRI", icon: <FaWallet /> },
                { name: "BNI", icon: <FaWallet /> },
              ].map((bank) => {
                return (
                  <Col span={4}>
                    <Card className="cards">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {bank.icon}
                        <p style={{ marginLeft: 10 }}>{bank.name}</p>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Panel>
          <Panel header="Virtual Account" key="2" showArrow={false}>
            <p>a</p>
          </Panel>
        </Collapse>
      </Modal>
    </LayoutApp>
  );
};

export default AccountBalancePage;
