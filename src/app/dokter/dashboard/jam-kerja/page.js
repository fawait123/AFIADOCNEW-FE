"use client";
import { colorPallate } from "@/utils/colorpallate";
import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import React from "react";

const JamKerja = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Row gutter={[10, 10]}>
        {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map(
          (value, index) => {
            return (
              <Col key={index} span={8}>
                <Card>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      marginBottom: 20,
                    }}
                  >
                    <Checkbox checked={true} />{" "}
                    <p
                      style={{
                        fontWeight: "500",
                        marginLeft: 10,
                        fontSize: 17,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                  <Row gutter={[10, 10]}>
                    <Col span={12}>
                      <Input
                        placeholder="start"
                        onWheel={(e) => e.target.blur()}
                        type="number"
                        min={0}
                        max={23}
                      />
                    </Col>
                    <Col span={12}>
                      <Input
                        placeholder="end"
                        onWheel={(e) => e.target.blur()}
                        type="number"
                        min={0}
                        max={23}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            );
          }
        )}
      </Row>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            width: "20%",
            backgroundColor: colorPallate.red,
            color: "white",
          }}
        >
          Kembali
        </Button>
        <Button
          style={{
            width: "20%",

            color: "white",
          }}
          type="primary"
        >
          Simpan
        </Button>
      </div>
    </div>
  );
};

export default JamKerja;
