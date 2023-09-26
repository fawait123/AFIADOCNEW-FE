"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useContext, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import Texting from "@/utils/Texting";
import { useRouter } from "next/navigation";
import PasienPage from "@/app/pengguna/pasien/page";
import ProsesAntrian from "../../process_antrian/page";
import { useEffect } from "react";
import API from "@/API";
import moment from "moment";
import Screens from "@/utils/Screens";

const ListPage = () => {
  const screen = useContext(Screens);
  const navigation = useRouter();
  const query = useSearchParams();
  const params = useParams();
  const [form] = Form.useForm();
  const fontSize = useContext(Texting);
  const [selenjutnya, setSelanjutnya] = useState(false);
  const [dataPatients, setDataPatients] = useState([]);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [dataAntrian, setDataAntrian] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAntrian();
    getDataTablePatient();
    getDokter();
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);
  const getAntrian = async () => {
    await API({
      method: "get",
      url: "admin/registration",
      params: {
        doctorID: params.dokterid,
        status: ["process", "reschedule"],
        date: query.get("date"),
      },
    }).then((res) => {
      setDataAntrian(res.data.results.data);
    });
  };
  const getDokter = async () => {
    await API({
      url: "/admin/doctor/public",
      method: "get",
      params: {
        doctorID: params.dokterid,
      },
    }).then((respon) => {
      setDataDoctor(respon.data.results.data.rows[0]);
      // console.log(respon);
    });
  };

  const getDataTablePatient = async () => {
    await API({
      url: "/admin/patient",
      method: "get",
    }).then((res) => {
      const result = res.data.results.data.rows;
      // console.log(result);
      setDataPatients(result);
    });
  };

  return (
    <LayoutApp>
      {
        !selenjutnya ? (
          <div style={{ minHeight: "90vh", padding: "10px 0px" }}>
            <Row justify={"center"} gutter={[0, 20]}>
              <Col span={22}>
                <p
                  style={{
                    fontSize: screen.xs ? 14 : 18,
                    fontWeight: "bold",
                    color: "#213555",
                  }}
                >
                  {" "}
                  ANTRIAN{" "}
                  {`${dataDoctor?.name?.toUpperCase()} | ${moment().format(
                    "MM-DD-YYYY"
                  )}`}
                </p>
              </Col>
              <Col span={22}>
                <Card>
                  <Row
                    style={{ height: 500, overflow: "auto" }}
                    gutter={[0, 10]}
                  >
                    {dataAntrian?.map((val, index) => {
                      return (
                        <Col span={24} key={index}>
                          <Card
                            style={{
                              background:
                                user?.id == val?.userID ? "#213555" : "#F0F0F0",
                              color:
                                user?.id == val?.userID ? "white" : "black",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: screen.xs
                                  ? "center"
                                  : "space-around",
                                flexDirection: screen.xs ? "column" : "row",
                                alignItems: screen.xs ? "start" : "center",
                              }}
                            >
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontSize: screen.xs ? 16 : 14,
                                }}
                              >
                                {val?.registrationID}
                              </p>
                              <p>
                                {val?.patient?.name}{" "}
                                {screen.xs ? (
                                  <span> , {(index + 1) * 7} menit</span>
                                ) : null}
                              </p>
                              <p style={{ display: screen.xs ? "none" : "" }}>
                                {(index + 1) * 7} menit
                              </p>
                              <h1 style={{ display: screen.xs ? "none" : "" }}>
                                {++index}
                              </h1>
                            </div>
                            <div
                              style={{
                                position: "absolute",
                                right: 30,
                                top: 15,
                                display: screen.xs ? "" : "none",
                              }}
                            >
                              <h1>{index++}</h1>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                  <div
                    style={{
                      marginTop: 30,
                      display: "flex",
                      justifyContent: "space-around",
                      background: "#7091F5",
                      color: "white",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <p>TOTAL PASIEN</p>
                    <p>
                      {moment()
                        .add(7 * dataAntrian.length, "minute")
                        .calendar()}
                    </p>
                    <p>{dataAntrian.length}</p>
                  </div>
                </Card>
              </Col>
              <Col
                span={22}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  type="primary"
                  onClick={() => navigation.back()}
                  style={{ maxWidth: 300, width: 300 }}
                >
                  Kembali
                </Button>
              </Col>
            </Row>
          </div>
        ) : (
          <div style={{ minHeight: "90vh", padding: "10px 0px" }}>
            <Row justify={"center"}>
              <Col
                span={22}
                style={{
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p>
                    {" "}
                    Antrian{" "}
                    {`${dataDoctor?.name} | ${moment().format("MM-DD-YYYY")}`}
                  </p>
                  <Form form={form}>
                    <Form.Item
                      name="patientID"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        style={{
                          width: "100%",
                          marginTop: 10,
                          marginBottom: 10,
                        }}
                      >
                        {dataPatients.map((val, index) => {
                          return (
                            <Select.Option
                              key={index}
                              value={val.id}
                            >{`${val.NIK} ${val.name}`}</Select.Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                  </Form>
                  <div>
                    {dataDoctor?.prices
                      ?.filter((value) => {
                        return value.type === "booking";
                      })
                      .map((v) => {
                        return (
                          <Input
                            readOnly={true}
                            value={v?.price?.toLocaleString("id", "ID")}
                          />
                        );
                      })}
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )
        //   ) : (
        //     <Card>
        //       <ProsesAntrian />
        //     </Card>
        //   )}
      }
    </LayoutApp>
  );
};

export default ListPage;
