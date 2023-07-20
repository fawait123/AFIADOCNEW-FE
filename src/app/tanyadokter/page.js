"use client";
import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Col, Image, Row, Modal } from "antd";
import { colorPallate } from "@/utils/colorpallate";
import { Input } from "antd";
import { publicDashboardDoctor } from "@/API/http";
import { BASE_URL } from "@/utils/base_url";
import { AiOutlineCloseCircle, AiFillLike } from "react-icons/ai";
import { IoBagSharp } from "react-icons/io5";

const { Search } = Input;
const TanyaDokter = () => {
  const [DoctorData, setDoctorData] = useState([]);
  const [selectDoctor, setSelectDoctor] = useState(null);
  const [isModalChat, setIsModalChat] = useState(false);

  useEffect(() => {
    publicDashboardDoctor((res) => {
      setDoctorData(res);
    });
  }, []);

  // console.log(DoctorData);
  const showModal = () => {
    setIsModalChat(true);
  };
  const handleOk = () => {
    setIsModalChat(false);
  };
  const handleCancel = () => {
    setIsModalChat(false);
  };
  return (
    <div style={{ marginBottom: 380 }}>
      <Col span={20} style={{ margin: "0px auto" }}>
        <div style={{ padding: "10px 10px" }}>
          <Breadcrumb
            items={[
              {
                title: "Home",
              },
              {
                title: "Tanya Dokter",
              },
            ]}
          />
        </div>
        <Row gutter={[10, 10]} style={{ padding: "10px 10px" }} wrap={true}>
          <Col xs={{ span: 24 }} md={{ span: 12 }}>
            <div>
              <div style={{ textAlign: "start" }}>
                <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>
                  Chat Dokter DI AFIA DOC ?
                </p>
                {/* /////////////////////// */}
                <div
                  style={{
                    display: "flex",
                    width: 350,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    src="https://www.halodoc.com/assets/svg/tc-ensure-new-1.webp"
                    width={70}
                  />
                  <p style={{ marginLeft: 10 }}>
                    Satu aplikasi untuk berbagai kebutuhan – periksa dokter, tes
                    lab hingga penebusan resep obat.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: 350,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    src="https://www.halodoc.com/assets/svg/tc-ensure-new-2.webp"
                    width={70}
                  />
                  <p style={{ marginLeft: 10 }}>
                    Dapatkan rujukan ke pemeriksaan offline di RS atau
                    pemeriksaan diagnostik jika diperlukan.
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: 350,
                    alignItems: "center",
                    marginBottom: 20,
                  }}
                >
                  <Image
                    src="https://www.halodoc.com/assets/svg/tc-ensure-new-3.webp"
                    width={70}
                  />
                  <p style={{ marginLeft: 10 }}>
                    Dapat diintegrasikan dengan asuransimu agar kebutuhan
                    kesehatan online terjamin asuransi.
                  </p>
                </div>
              </div>
            </div>
          </Col>
          {selectDoctor === null ? (
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <Search
                placeholder="Cari Dokter"
                enterButton="Search"
                size="large"
                loading={false}
              />
              <p style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>
                Rekomendasi Dokter
              </p>
              <Row
                gutter={[10, 10]}
                justify={"start"}
                style={{ marginTop: 10 }}
                wrap={true}
              >
                {DoctorData.map((doc) => {
                  return (
                    <Col span={12} style={{ cursor: "pointer" }}>
                      <div
                        // name="parent"
                        id="parent1"
                        key={doc.id}
                        onClick={() => {
                          // console.log(e);
                          setSelectDoctor(doc);
                        }}
                        style={{
                          padding: 10,
                          boxShadow: "0.1px 1px 3px gray",
                          fontSize: 12,
                          borderRadius: 10,
                          display: "flex",
                          // justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            // borderRadius: "100%",
                          }}
                          alt="afia-docs"
                          src={`${BASE_URL}/public/uploads/${doc.photos}`}
                          width={70}
                          preview={false}
                          height={100}
                        />
                        <div style={{ flex: 1, marginLeft: 10 }}>
                          <p style={{ marginTop: 10, fontWeight: 500 }}>
                            {doc.name}, {doc.initialDegree}., {doc.finalDegree}
                          </p>
                          <p>Dokter Umum</p>
                          <div
                            style={{
                              display: "flex",
                              // justifyContent: "space-around",
                              margin: "10px 0px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignContent: "center",
                              }}
                            >
                              <IoBagSharp />
                              <p style={{ color: "gray", marginLeft: 5 }}>
                                4 tahun
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignContent: "center",
                                marginLeft: 10,
                              }}
                            >
                              <AiFillLike />
                              <p style={{ color: "gray", marginLeft: 5 }}>
                                100
                              </p>
                            </div>
                          </div>
                          <Button
                            style={{ marginLeft: 10 }}
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              showModal();
                              // setIsModalChat(false);
                              // e.preventDefault();
                            }}
                          >
                            Chat
                          </Button>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
              <p style={{ marginTop: 20, fontWeight: 600, fontSize: 20 }}>
                Dokter Specialist
              </p>
              <Row
                gutter={[10, 10]}
                justify={"start"}
                style={{ marginTop: 10 }}
                wrap={true}
              >
                {DoctorData.map((doc) => {
                  return (
                    <Col span={12} style={{ cursor: "pointer" }}>
                      <div
                        // name="parent"
                        id="parent1"
                        key={doc.id}
                        onClick={() => {
                          // console.log(e);
                          setSelectDoctor(doc);
                        }}
                        style={{
                          padding: 10,
                          boxShadow: "0.1px 1px 3px gray",
                          fontSize: 12,
                          borderRadius: 10,
                          display: "flex",
                          // justifyContent: "space-evenly",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          style={{
                            objectFit: "cover",
                            objectPosition: "top",
                            // borderRadius: "100%",
                          }}
                          alt="afia-docs"
                          src={`${BASE_URL}/public/uploads/${doc.photos}`}
                          width={70}
                          preview={false}
                          height={100}
                        />
                        <div style={{ flex: 1, marginLeft: 10 }}>
                          <p style={{ marginTop: 10, fontWeight: 500 }}>
                            {doc.name}, {doc.initialDegree}., {doc.finalDegree}
                          </p>
                          <p>Dokter Umum</p>
                          <div
                            style={{
                              display: "flex",
                              // justifyContent: "space-around",
                              margin: "10px 0px",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignContent: "center",
                              }}
                            >
                              <IoBagSharp />
                              <p style={{ color: "gray", marginLeft: 5 }}>
                                4 tahun
                              </p>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                alignContent: "center",
                                marginLeft: 10,
                              }}
                            >
                              <AiFillLike />
                              <p style={{ color: "gray", marginLeft: 5 }}>
                                100
                              </p>
                            </div>
                          </div>
                          <Button
                            style={{ marginLeft: 10 }}
                            type="primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              showModal();
                              // setIsModalChat(false);
                              // e.preventDefault();
                            }}
                          >
                            Chat
                          </Button>
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </Col>
          ) : (
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              style={{
                backgroundColor: colorPallate.gray,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                onClick={() => {
                  setSelectDoctor(null);
                }}
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  opacity: 0.8,
                }}
              >
                <AiOutlineCloseCircle color="gray" size={35} />
              </div>
              <Col style={{ cursor: "pointer", width: 350, color: "gray" }}>
                <div
                  key={selectDoctor.id}
                  style={{
                    padding: 10,
                    boxShadow: "0.1px 1px 3px gray",
                    fontSize: 12,
                    borderRadius: 5,
                  }}
                >
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    alt="afia-docs"
                    src={`${BASE_URL}/public/uploads/${selectDoctor.photos}`}
                    width={"100%"}
                    preview={false}
                    height={200}
                  />
                  <p style={{ marginTop: 15, fontWeight: 500, fontSize: 14 }}>
                    {selectDoctor.name}, {selectDoctor.initialDegree}.,{" "}
                    {selectDoctor.finalDegree}
                  </p>
                  <p>{selectDoctor.email}</p>
                  <p>{selectDoctor.placebirth}</p>
                  {/* {console.log(selectDoctor)} */}
                </div>
              </Col>
            </Col>
          )}
        </Row>
      </Col>
      <Modal
        style={{
          top: 250,
        }}
        title="Basic Modal"
        open={isModalChat}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
};

export default TanyaDokter;
