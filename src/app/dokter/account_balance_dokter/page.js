"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import { colorPallate } from "@/utils/colorpallate";
import { Card, Col, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./account_balance.css";
import { FaHistory, FaWallet, FaSync } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiQrcode } from "react-icons/hi";
import { MdAccountBalanceWallet, MdPayments } from "react-icons/md";
import { getWallet, topUp } from "@/API/wallet";
import HistoryComponent from "./components/historycomponent";
import PayoutDokter from "./components/PayoutDokter";
import { getPayoutByUser } from "@/API/payout";

const AccountBalancePage = () => {
  const [open, setOpen] = useState({ status: false, title: "" });
  const [wallet, setWallet] = useState(0);
  const [payload, setPayload] = useState({
    bank: null,
    amount: null,
  });

  const [history, setHistory] = useState([]);
  const [loadingModal, setLoadingModal] = useState(false);

  const getDataWallet = () => {
    getWallet((res) => {
      setWallet(res.amount);
    });
  };

  const getDataHistory = () => {
    getPayoutByUser((res) => {
      console.log(res);
      setHistory(res);
    });
  };

  useEffect(() => {
    getDataWallet();
    getDataHistory();
  }, []);

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
              <MdAccountBalanceWallet size={35} style={{ marginRight: 10 }} />
              <div>
                <h3>AFIA WALLET</h3>
                <p>Saldo Anda</p>
                <h4>Rp {wallet?.toLocaleString("id", "ID")}</h4>
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
                name: "Tarik Saldo",
                icon: <FaWallet size={40} />,
              },
              {
                name: "History Penarikan",
                icon: <MdPayments size={40} />,
              },
              {
                name: "Transfer",
                icon: <FaMoneyBillTransfer size={40} />,
              },
              {
                name: "Kode Bayarmu",
                icon: <HiQrcode size={40} />,
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
            {history.map((item) => {
              return (
                <Col key={item.id} span={24}>
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
                        <div>
                          <FaWallet size={30} />
                        </div>
                        <div style={{ marginLeft: 20 }}>
                          <p>{item.description}</p>
                          <p
                            style={{
                              fontSize: 11,
                              color:
                                item.status == "success" ? "green" : "#FD8D14",
                            }}
                          >
                            {item.status}
                          </p>
                        </div>
                      </div>
                      <div onClick={() => console.log("oke")}>
                        <h4
                          style={{
                            color:
                              item.status === "success" ? "green" : "#FD8D14",
                          }}
                        >
                          + {item.amount.toLocaleString("id", "ID")}
                        </h4>
                      </div>
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
        footer={null}
        // onOk={() => {

        // }}

        onCancel={() => setOpen({ status: false, title: "" })}
        width={1000}
      >
        {open.title == "Tarik Saldo" ? (
          <PayoutDokter onClose={() => setOpen({ status: false, title: "" })} />
        ) : open.title == "Transfer" ? (
          <HistoryComponent />
        ) : open.title == "History" ? (
          <HistoryComponent />
        ) : open.title == "Kode Bayar" ? (
          <HistoryComponent />
        ) : open.title == "Transfer Bank" ? (
          <HistoryComponent />
        ) : (
          <HistoryComponent />
        )}
        <Modal
          title={payload?.bank}
          open={payload.bank === null ? false : true}
          confirmLoading={loadingModal}
          onOk={() => {
            // setPayload({ ...payload, bank: null });
            setLoadingModal(true);
            topUp(payload, (next) => {
              // console.log(next);
              setLoadingModal(false);
              setPayload({
                bank: null,
                amount: null,
              });
              // setOpen({ status: false, title: "" });
              getDataHistory();
            }).catch((err) => {
              setLoadingModal(false);
            });
          }}
          onCancel={() => {
            setPayload({
              bank: null,
              amount: null,
            });
          }}
        >
          <Input
            style={{ marginTop: 20 }}
            placeholder="Amount"
            type="number"
            onChange={(e) => {
              let { value } = e.target;
              setPayload({ ...payload, amount: value });
            }}
          ></Input>
        </Modal>
      </Modal>
    </LayoutApp>
  );
};

export default AccountBalancePage;
