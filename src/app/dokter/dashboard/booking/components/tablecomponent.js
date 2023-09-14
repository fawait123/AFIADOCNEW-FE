import API from "@/API";
import { Button, Checkbox, Col, Row, Table } from "antd";
import React, { useState } from "react";

export const TableComponent = ({ datas, loading, type, getData }) => {
  const [reschedule, setReschedule] = useState([]);

  return (
    <Row gutter={[10, 10]}>
      {type == "process" ? (
        <Col span={24}>
          <Button
            onClick={async () => {
              const dataPost = reschedule.map((vls) => {
                return vls.id;
              });

              await API({
                url: "admin/registration/reschedule",
                method: "put",
                data: {
                  id: dataPost,
                },
              }).then((res) => {
                // console.log(res);
                getData();
              });
            }}
            type="primary"
          >
            Reschedule
          </Button>
        </Col>
      ) : null}
      <Col span={24}>
        <Table rowKey={"id"} dataSource={datas} loading={loading}>
          {type == "process" ? (
            <Table.Column
              render={(_, rec, index) => {
                return (
                  <Checkbox
                    onChange={(e) => {
                      let status = e.target.checked;
                      if (status) {
                        setReschedule([...reschedule, rec]);
                      } else {
                        let rescheduleTemp = [...reschedule].filter((res) => {
                          return res.id !== rec.id;
                        });
                        setReschedule(rescheduleTemp);
                      }
                    }}
                  />
                );
              }}
              align="center"
              title={
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p>Select All</p>
                  <Checkbox style={{ marginLeft: 10 }} />
                </div>
              }
            />
          ) : null}
          <Table.Column
            render={(_, rec) => {
              return rec.registrationID;
            }}
            align="center"
            title="No Registrasi"
          />
          <Table.Column
            render={(_, rec) => {
              return rec?.patient?.name;
            }}
            align="center"
            title="Nama Pasien"
          />
          <Table.Column
            render={(_, rec) => {
              return rec.registrationID?.split(".")[1];
            }}
            align="center"
            title="Nomor Antrian"
          />
          {/* <Table.Column
        render={(_, rec) => {
          return (
            <p
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => {
                navigation.push(
                  `/pengguna/antrian_booking/detail/${rec?.doctor?.id}`
                );
              }}
            >
              LIHAT
            </p>
          );
        }}
        align="center"
        title="Aksi"
      /> */}
        </Table>
      </Col>
    </Row>
  );
};
