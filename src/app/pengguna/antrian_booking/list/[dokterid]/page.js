"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import Texting from "@/utils/Texting";
import { useRouter } from "next/navigation";
import PasienPage from "@/app/pengguna/pasien/page";
import ProsesAntrian from "../../process_antrian/page";
import { useEffect } from "react";
import API from "@/API";
import moment from "moment";

const ListPage = () => {
  const navigation = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const fontSize = useContext(Texting);
  const [selenjutnya, setSelanjutnya] = useState(false);
  const [dataPatients, setDataPatients] = useState([]);
  const [dataDoctor, setDataDoctor] = useState([]);
  const [dataAntrian, setDataAntrian] = useState([]);
  // console.log(params);

  useEffect(() => {
    getAntrian();
    getDataTablePatient();
    getDokter();
  }, []);
  const getAntrian = async () => {
    await API({
      method: "get",
      url: "admin/registration",
      params: {
        doctorID: params.dokterid,
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
  console.log(dataAntrian);

  return (
    <LayoutApp>
      {
        //   params.path !== "pasien" ? (
        !selenjutnya ? (
          <div style={{ minHeight: "90vh", padding: "10px 0px" }}>
            <Row justify={"center"} gutter={[0, 20]}>
              <Col span={22}>
                <p>
                  {" "}
                  Antrian{" "}
                  {`${dataDoctor?.name} | ${moment().format("MM-DD-YYYY")}`}
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
                          <Card>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <p>{val?.registrationID}</p>
                              <p>{val?.patient?.name}</p>
                              {/* <p>Dr hesemeleh</p> */}
                              <p>{(index + 1) * 7} menit</p>
                              <p>{index + 1}</p>
                            </div>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                  <div
                    style={{
                      // maxWidth: "100%",
                      // backgroundColor: "red",
                      // padding: "20px 0px",
                      // padding: "10px 15px",
                      marginTop: 30,
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <p>Total Pasien</p>
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
                <Button style={{ maxWidth: 300, width: 300 }}>Batal</Button>
                <Button
                  style={{ maxWidth: 300, width: 300 }}
                  onClick={() => {
                    setSelanjutnya(true);
                  }}
                >
                  Selenjutnya
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

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button style={{ maxWidth: 300, width: 300 }}>Batal</Button>
                  <Button
                    style={{ maxWidth: 300, width: 300 }}
                    onClick={() => {
                      form.validateFields().then(async (res) => {
                        API({
                          url: "/admin/registration",
                          method: "post",
                          data: {
                            patientID: res.patientID,
                            doctorID: params.dokterid,
                            price: dataDoctor?.prices?.find((value) => {
                              return value.type === "booking";
                            })?.price,
                          },
                        }).then((resp) =>
                          navigation.push(
                            "/pengguna/antrian_booking/process_antrian"
                          )
                        );
                      });
                      // navigation.push(
                      //   "/pengguna/antrian_booking/process_antrian"
                      // );
                    }}
                  >
                    Proses
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
