"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Card, Col, Form, Image, Input, Row, Select } from "antd";
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
  const params = useParams();
  const [form] = Form.useForm();
  const fontSize = useContext(Texting);
  const [selenjutnya, setSelanjutnya] = useState(true);
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
  const getAntrian = async (date = null) => {
    await API({
      method: "get",
      url: "admin/registration",
      params: {
        doctorID: params.dokterid,
        status: ["process", "reschedule"],
        date:
          date == null
            ? moment().format("YYYY-MM-DD")
            : moment(date).format("YYYY-MM-DD"),
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
        //   params.path !== "pasien" ? (
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
                  ANTRIAN{" "}
                  {`${dataDoctor?.name?.toUpperCase()} | ${moment(
                    form.getFieldValue()?.date
                  ).format("DD MMMM YYYY")}`}
                </p>
              </Col>
              <Col span={22}>
                <Card>
                  <Row
                    style={{
                      height: 500,
                      overflow: "auto",
                    }}
                  >
                    {dataAntrian.length > 0 ? (
                      dataAntrian?.map((val, index) => {
                        return (
                          <Col span={24} key={index}>
                            <Card
                              style={{
                                background:
                                  user?.id == val?.userID
                                    ? "#213555"
                                    : "#F0F0F0",
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
                                  {val?.patient?.name?.toUpperCase()}{" "}
                                  {screen.xs ? (
                                    <span> , {(index + 1) * 7} menit</span>
                                  ) : null}
                                </p>
                                <p style={{ display: screen.xs ? "none" : "" }}>
                                  {(index + 1) * 7} menit
                                </p>
                                <h1
                                  style={{ display: screen.xs ? "none" : "" }}
                                >
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
                      })
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          width: "100vw",
                        }}
                      >
                        <Image
                          preview={false}
                          src="/assets/Oops.svg"
                          alt="Oops"
                        />
                      </div>
                    )}
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
                  type="default"
                  style={{ maxWidth: 300, width: 300 }}
                  onClick={() => setSelanjutnya(true)}
                >
                  Kembali
                </Button>
                <Button
                  style={{ maxWidth: 300, width: 300 }}
                  type="primary"
                  onClick={() => {
                    const field = form.getFieldValue();
                    API({
                      url: "/admin/registration",
                      method: "post",
                      data: {
                        patientID: field.patientID,
                        doctorID: params.dokterid,
                        price: dataDoctor?.prices?.find((value) => {
                          return value.type === "booking";
                        })?.price,
                        date: field.date,
                      },
                    }).then((resp) =>
                      navigation.push(
                        "/pengguna/antrian_booking/process_antrian"
                      )
                    );
                  }}
                >
                  Proses
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
                  <p
                    style={{
                      fontSize: screen.xs ? 14 : 18,
                      fontWeight: "bold",
                      color: "#213555",
                    }}
                  >
                    {" "}
                    ANTRIAN {`${dataDoctor?.name}`}
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
                    <Form.Item
                      name={"date"}
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        placeholder="tanggal"
                        min={moment().format("YYYY-MM-DD")}
                        type="date"
                      />
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

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    style={{ maxWidth: 300, width: 300 }}
                    onClick={() => navigation.back()}
                  >
                    Batal
                  </Button>
                  <Button
                    style={{ maxWidth: 300, width: 300 }}
                    type="primary"
                    onClick={() => {
                      form.validateFields().then((response) => {
                        setSelanjutnya(false);
                        getAntrian(response?.date);
                      });
                    }}
                  >
                    Selanjutnya
                  </Button>
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
