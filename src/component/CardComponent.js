"use client";
import Screens from "@/utils/Screens";
import Texting from "@/utils/Texting";
import { BASE_URL } from "@/utils/base_url";
import { colorPallate } from "@/utils/colorpallate";
import { Button, Col, Image, Modal, Row, Tooltip } from "antd";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";

const CardComponent = ({ photo, name, specialist, allData }) => {
  const [openModal, setOpenModal] = useState(false);
  const navigation = useRouter();
  // console.log(allData);
  const screens = useContext(Screens);
  const fontSize = useContext(Texting);
  return (
    <div
      style={{
        borderRadius: "10px 10px 10px 10px",
        backgroundColor: "#f0f0f0",
        paddingBottom: 10,
        width: screens.xs ? "100%" : "80%",
        margin: "0px auto",
      }}
    >
      <Image
        src={photo}
        width={"100%"}
        style={{ objectFit: "cover", borderRadius: "10px 10px 0px 0px" }}
        height={screens.xs ? 100 : 200}
      />
      <div
        style={{
          fontSize: fontSize.sm,
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <p style={{ marginTop: 10 }}>{name}</p>
        <p
          style={{
            marginTop: 10,
            fontSize: fontSize.xs,
            color: "gray",
            fontWeight: "400",
          }}
        >
          {specialist?.name}
        </p>
        <p
          style={{
            marginTop: 5,
            fontSize: fontSize.xs,
            color: "gray",
            fontWeight: "100",
            cursor: "pointer",
          }}
          onClick={() => setOpenModal(true)}
        >
          lihat detail
        </p>
      </div>
      <Modal
        onCancel={() => {
          setOpenModal(false);
        }}
        open={openModal}
        footer={null}
      >
        <Row>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Image
              style={{
                borderRadius: 10,
                // width: 120,
                // height: 120,
                objectFit: "cover",
              }}
              src={`${BASE_URL}/public/uploads/${allData?.photos}`}
            />
          </Col>
          <Col span={24} style={{ padding: "10px 0px" }}>
            {/* <div style={{ display: "flex", width: "80%", margin: "0px auto" }}>
              <p style={{ flex: 1 }}>Name</p>
              <p style={{ width: 10 }}>:</p>
              <p style={{ flex: 1 }}>{allData.name}</p>
            </div> */}
            <p style={{ fontSize: fontSize.xl, fontWeight: 700 }}>
              {allData.name}
            </p>
            <p
              style={{ fontSize: fontSize.md, color: "gray", fontWeight: 700 }}
            >
              {allData?.specialist?.name}
            </p>

            {[
              {
                type: "STR",
                value: allData.STR,
              },
              {
                type: "Email",
                value: allData.email,
              },
              {
                type: "Phone",
                value: allData.phone,
              },
              {
                type: "Kelahiran",
                value: allData.placebirth,
              },
            ].map((dats, i) => {
              return (
                <div
                  style={{ display: "flex", marginTop: i === 0 ? 10 : 0 }}
                  key={i}
                >
                  <p
                    style={{
                      // maxWidth: 80,
                      // minWidth: 40,
                      width: 90,
                      fontSize: fontSize.sm,
                      color: "gray",
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {dats.type}
                  </p>
                  <p
                    style={{
                      width: 15,
                      fontSize: fontSize.sm,
                      color: "gray",
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    :
                  </p>
                  <p
                    style={{
                      // width: 300,
                      maxWidth: 300,
                      fontSize: fontSize.sm,
                      color: "gray",
                      fontWeight: 700,
                      marginTop: 10,
                    }}
                  >
                    {dats.value}
                  </p>
                </div>
              );
            })}
          </Col>
          <Col
            span={24}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {allData?.prices.map((butt) => {
              return (
                <Tooltip title={butt?.price}>
                  <Button
                    onClick={() => {
                      if (butt.type === "booking") {
                        navigation.push(`/antrian_booking/list`);
                      } else {
                        alert("belum ada action");
                      }
                    }}
                    style={{ width: "45%" }}
                    type="primary"
                  >
                    <p style={{ textTransform: "uppercase" }}>{butt?.type}</p>
                  </Button>
                </Tooltip>
              );
            })}
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CardComponent;
