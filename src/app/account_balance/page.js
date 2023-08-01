"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import { colorPallate } from "@/utils/colorpallate";
import { Card, Col, Collapse, Form, Input, Modal, Row } from "antd";
import React, { useEffect, useState } from "react";
import "./account_balance.css";
import { AiFillBank } from "react-icons/ai";
import { FaHistory, FaMoneyBillAlt, FaWallet, FaSync } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { HiQrcode } from "react-icons/hi";
import { MdAccountBalanceWallet, MdPayments } from "react-icons/md";
import { getHistory, getWallet, topUp } from "@/API/wallet";
import API from "@/API";
const { Panel } = Collapse;
const AccountBalancePage = () => {
  const [open, setOpen] = useState({ status: false, title: "" });
  // const [openBank,setOpenBank]= useState()
  const [wallet, setWallet] = useState(0);
  const [payload, setPayload] = useState({
    bank: null,
    amount: null,
  });
  const [history, setHistory] = useState([]);

  const getDataWallet = () => {
    getWallet((res) => {
      setWallet(res.amount);
    });
  };

  const getDataHistory = () => {
    getHistory((res) => {
      console.log("res", res);
      setHistory(res);
    });
  };

  const checkTopup = async (data) => {
    const res = await API({
      url: "/admin/cashless/topup/check",
      method: "get",
      params: {
        midtransID: data.id,
      },
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
              <MdAccountBalanceWallet size={30} style={{ marginRight: 10 }} />
              <div>
                <h3>AFIA WALLET</h3>
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
            {history.map((val) => {
              let detail = JSON.parse(val.detail);
              console.log(detail);
              return (
                <Col key={val.id} span={24}>
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
                          <p>{`Topup transfer bank ${detail.va_numbers[0].bank.toUpperCase()}`}</p>
                          <p style={{ fontSize: 11, color: "gray" }}>
                            {detail.transaction_status}
                          </p>
                          <p
                            style={{
                              fontSize: 11,
                              color: "gray",
                              fontWeight: "bold",
                            }}
                          >
                            VA : {detail.va_numbers[0].va_number}
                          </p>
                          <p style={{ fontSize: 11, color: "gray" }}>
                            {detail.expiry_time}
                          </p>
                        </div>
                      </div>
                      <div onClick={() => console.log("oke")}>
                        <h4
                          style={{
                            color: val.status === "success" ? "green" : "red",
                          }}
                        >
                          + {detail.gross_amount.toLocaleString("id", "ID")}
                        </h4>
                        {val.status == "settlement" ? null : (
                          <div
                            // style={{
                            //   cursor: "pointer",
                            //   width: 100,
                            //   height: 100,
                            //   background: "blue",
                            // }}
                            onClick={() => checkTopup(val)}
                          >
                            <FaSync />
                          </div>
                        )}
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
        <Collapse>
          <Panel header="Transfer Bank" key="1" showArrow={true}>
            <Row gutter={10}>
              {[
                { name: "BCA", icon: <FaWallet /> },
                { name: "BRI", icon: <FaWallet /> },
                { name: "MANDIRI", icon: <FaWallet /> },
                { name: "BNI", icon: <FaWallet /> },
              ].map((bank) => {
                return (
                  <Col span={4}>
                    <Card
                      className={`cards ${
                        payload.bank == bank.name ? "cards-select" : ""
                      }`}
                      onClick={() =>
                        setPayload({ ...payload, bank: bank.name })
                      }
                    >
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
                    {/* {payload.bank == bank.name ? (
                      <Input
                        placeholder="jumlah"
                        onChange={(event) =>
                          setPayload({ ...payload, amount: event.target.value })
                        }
                        style={{ marginTop: 20 }}
                      />
                    ) : null} */}
                  </Col>
                );
              })}
            </Row>
          </Panel>
          {/* <Panel header="Virtual Account" key="2" showArrow={true}>
            <p>a</p>
          </Panel> */}
        </Collapse>
        <Modal
          title={payload?.bank}
          open={payload.bank === null ? false : true}
          onOk={() => {
            // setPayload({ ...payload, bank: null });
            topUp(payload, (next) => {
              // console.log(next);
              setOpen({ status: false, title: "" });
              getDataHistory();
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
