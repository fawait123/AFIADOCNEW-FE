"use client";
import API from "@/API";
import { Button, Checkbox, Col, Form, Modal, Row, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaEye } from "react-icons/fa";

export const TableComponent = ({ datas, loading, type, getData }) => {
  const [reschedule, setReschedule] = useState([]);
  const [modalCancel, setModalCancel] = useState({
    status: false,
    dataContext: {},
  });
  const [loadingCancel, setLoadingCancel] = useState(false);
  const [formCancel] = useForm();

  return (
    <Row gutter={[10, 10]}>
      {type == "process" || type == "reschedule" ? (
        <Col span={24}>
          <Button
            disabled={datas.length > 0 ? false : true}
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
          {type == "process" || type == "reschedule" ? (
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
              return moment(rec?.date).format("DD MMMM YYYY");
            }}
            align="center"
            title="Tanggal Daftar"
          />
          {type == "reschedule" ? (
            <Table.Column
              render={(_, rec) => {
                return moment(rec?.due_date).format("DD MMMM YYYY");
              }}
              align="center"
              title="Tanggal Shedule"
            />
          ) : null}
          {type == "cancel" ? (
            <Table.Column
              render={(_, rec) => {
                return rec?.description;
              }}
              align="center"
              title="Alasan"
            />
          ) : null}
          {type == "process" || type == "reschedule" ? (
            <Table.Column
              render={(_, rec) => {
                return (
                  <AiFillCloseCircle
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: 10,
                    }}
                    onClick={() =>
                      setModalCancel({ status: true, dataContext: rec })
                    }
                  />
                );
              }}
              align="center"
              title="Aksi"
            />
          ) : null}
        </Table>
      </Col>

      <Modal
        title={"Batalkan Registrasi"}
        width={"80%"}
        footer={null}
        onCancel={() => {
          setModalCancel({
            status: false,
            dataContext: {},
          });
        }}
        open={modalCancel.status}
      >
        <Row gutter={[10, 10]}>
          <Col span={24}>
            <Form form={formCancel} layout="vertical">
              <Form.Item
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
                label={"Keterangan"}
              >
                <TextArea />
              </Form.Item>
              <Button
                type="primary"
                loading={loadingCancel}
                onClick={() => {
                  setLoadingCancel(true);
                  formCancel
                    .validateFields()
                    .then(async (field) => {
                      await API({
                        url: "admin/registration/cancel",
                        method: "put",
                        params: {
                          id: modalCancel?.dataContext?.id,
                        },
                        data: field,
                      })
                        .then((response) => {
                          formCancel.resetFields();
                          setModalCancel({
                            status: false,
                            dataContext: {},
                          });
                          setLoadingCancel(false);
                          getData();
                        })
                        .catch((err) => {
                          setLoadingCancel(false);
                        });
                    })
                    .catch((err) => {
                      setLoadingCancel(false);
                    });
                }}
              >
                Batalkan
              </Button>
            </Form>
          </Col>
        </Row>
      </Modal>
    </Row>
  );
};
