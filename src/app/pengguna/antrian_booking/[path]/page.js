"use client";
import LayoutApp from "@/component/app_component/LayoutApp";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { Button, Card, Col, Row, Select } from "antd";
import Texting from "@/utils/Texting";
import { useRouter } from "next/navigation";
import PasienPages from "../../../dokter/dashboard/medical-record/page";
import ProsesAntrian from "../process_antrian/page";

const AntrianPage = () => {
  const navigation = useRouter();
  const params = useParams();
  const fontSize = useContext(Texting);
  const [selenjutnya, setSelanjutnya] = useState(false);
  // console.log(params);

  return (
    <LayoutApp>
      {params.path !== "pasien" ? (
        !selenjutnya ? (
          <div style={{ minHeight: "90vh", padding: "10px 0px" }}>
            <Row justify={"center"} gutter={[0, 20]}>
              <Col span={22}>
                <p>List Antrian Dokter Fawait, S KOM | 2023 02 01</p>
              </Col>
              <Col span={22}>
                <Card>
                  <Row
                    style={{ height: 500, overflow: "auto" }}
                    gutter={[0, 10]}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((val, index) => {
                      return (
                        <Col span={24} key={index}>
                          <Card>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-around",
                              }}
                            >
                              <p>RGS - 202230101</p>
                              <p>Dr hesemeleh</p>
                              <p>6 menit</p>
                              <p>{index}</p>
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
                    <p>1 jam 40 menit</p>
                    <p>20</p>
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
                  <p>List Antrian Dokter Fawait, S KOM | 2023 02 01</p>
                  <Select style={{ width: "100%", marginTop: 10 }}>
                    <Select.Option value={"satu"}>satu</Select.Option>
                  </Select>
                </div>

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button style={{ maxWidth: 300, width: 300 }}>Batal</Button>
                  <Button
                    style={{ maxWidth: 300, width: 300 }}
                    onClick={() => {
                      // alert("akka");
                      navigation.push("/antrian_booking/pasien");
                    }}
                  >
                    Proses
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )
      ) : (
        <Card>
          <ProsesAntrian />
        </Card>
      )}
    </LayoutApp>
  );
};

export default AntrianPage;
