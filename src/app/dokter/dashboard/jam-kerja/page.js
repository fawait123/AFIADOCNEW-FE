"use client";
import { colorPallate } from "@/utils/colorpallate";
import { Button, Card, Checkbox, Col, Input, Row } from "antd";
import React, { useState } from "react";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import API from "@/API";
import { useEffect } from "react";
// import moment from "moment";

const dayIndicator = [
  {
    day: "2",
    as: "Senin",
  },
  {
    day: "3",
    as: "Selasa",
  },
  {
    day: "4",
    as: "Rabu",
  },
  {
    day: "5",
    as: "Kamis",
  },
  {
    day: "6",
    as: "Jumat",
  },
  {
    day: "7",
    as: "Sabtu",
  },
  {
    day: "1",
    as: "Minggu",
  },
];

const JamKerja = () => {
  const [valueDay, setValueDay] = useState([
    {
      day: "1",
      as: "Minggu",
      isHoliday: true,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "2",
      as: "Senin",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "3",
      as: "Selasa",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "4",
      as: "Rabu",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "5",
      as: "Kamis",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "6",
      as: "Jumat",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
    {
      day: "7",
      as: "Sabtu",
      isHoliday: false,
      start_time: "00:00:00",
      end_time: "00:00:00",
      status: "weekday",
    },
  ]);

  useEffect(() => {
    const doctorID = JSON.parse(localStorage.getItem("user")).prefixID;

    getDataday(doctorID);
  }, []);
  const getDataday = async (doctorID) => {
    await API({
      url: "admin/schedule",
      method: "get",
      params: {
        doctorID,
      },
    }).then((res) => {
      let dataResponse = res?.data?.results?.data?.rows;
      let ValueState = dataResponse.map((values) => {
        return {
          day: parseInt(values.day),
          as: dayIndicator.find((i) => parseInt(i.day) === parseInt(values.day))
            ?.as,
          isHoliday: values.status === "holiday" ? true : false,
          start_time: values.start_time,
          end_time: values.end_time,
          status: values.status,
        };
      });
      let soort = ValueState.sort((a, b) => parseInt(a.day) - parseInt(b.day));

      // console.log(soort);
      setValueDay(soort);
    });
  };

  console.log(valueDay);
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
        {valueDay.map((value, index) => {
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
                  <Checkbox
                    value={value.isHoliday}
                    onChange={(e) => {
                      let valueCheck = e.target.value;
                      let dataValueTemp = [...valueDay];
                      dataValueTemp[index].isHoliday = !valueCheck;
                      setValueDay(dataValueTemp);
                    }}
                    checked={value.isHoliday}
                  />{" "}
                  <p
                    style={{
                      fontWeight: "500",
                      marginLeft: 10,
                      fontSize: 17,
                    }}
                  >
                    {value.as}
                  </p>
                </div>
                <Row gutter={[10, 10]}>
                  <Col span={12}>
                    <TimePicker
                      disabled={value.isHoliday ? true : false}
                      onChange={(e) => {
                        // console.log(moment(e.d).format("hh:mm:ss"));

                        // console.log();
                        let dataValueTemp = [...valueDay];
                        dataValueTemp[index].start_time = e.format("hh:mm:ss");

                        setValueDay(dataValueTemp);
                      }}
                      value={dayjs(value.start_time, "HH:mm:ss")}
                    />
                  </Col>
                  <Col span={12}>
                    <TimePicker
                      disabled={value.isHoliday ? true : false}
                      onChange={(e) => {
                        let dataValueTemp = [...valueDay];
                        dataValueTemp[index].end_time = e.format("hh:mm:ss");

                        setValueDay(dataValueTemp);
                      }}
                      value={dayjs(value.end_time, "HH:mm:ss")}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          );
        })}
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
          onClick={async () => {
            const dataPost = valueDay.map((data) => {
              return {
                // ...data,
                day: data.day,
                start_time: data.isHoliday ? "" : data.start_time,
                end_time: data.isHoliday ? "" : data.end_time,
                status: data.isHoliday ? "holiday" : "weekday",
              };
            });

            // console.log(dataPost);
            // API

            const response = await API({
              url: "admin/schedule",
              method: "post",
              params: {
                doctorID: JSON.parse(localStorage.getItem("user")).prefixID,
              },
              data: dataPost,
            }).then((res) => {
              getDataday(JSON.parse(localStorage.getItem("user")).prefixID);
            });
          }}
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
