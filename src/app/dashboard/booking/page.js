"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Card,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Table,
  Tag,
} from "antd";
import { getBooking, updateBooking } from "@/API/booking";
import { FaCalendar, FaEye } from "react-icons/fa";
import moment from "moment";
import { colorPallate } from "@/utils/colorpallate";
const { Column } = Table;
const Booking = () => {
  const [form] = Form.useForm();
  const [detailModal, setDetailModal] = useState({
    open: false,
    data: null,
  });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState(null);
  const [loadingTable, setLoadingTable] = useState(false);

  const getData = () => {
    setLoadingTable(true);
    let user = JSON.parse(window.localStorage.getItem("user"));
    let params = {
      doctorID: user.prefixID,
      page: page,
      limit: limit,
      search: search,
    };
    getBooking(params, (response) => {
      setData(response.rows);
      setCount(response.count);
      setLoadingTable(false);
    });
  };

  const reschedule = () => {
    setLoading(true);
    form
      .validateFields()
      .then(() => {
        let formValues = form.getFieldsValue();
        updateBooking(detailModal.data.id, formValues, (response) => {
          setLoading(false);
          getData();
          setDetailModal({
            open: false,
            data: null,
          });
        }).catch((e) => {
          setLoading(false);
        });
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page, limit, search]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Breadcrumb>
          <Breadcrumb.Item>Halaman</Breadcrumb.Item>
          <Breadcrumb.Item>Booking</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table
        dataSource={data}
        loading={loadingTable}
        pagination={{
          current: page,
          pageSize: limit,
          total: count,
          onChange: (page, pageSize) => {
            setPage(page);
            setLimit(pageSize);
          },
        }}
      >
        <Column
          title="Pasien"
          dataIndex="userID"
          key="userID"
          render={(_, record) => {
            return <p>{record.user.name}</p>;
          }}
        />
        <Column
          title="Tanggal"
          dataIndex="date"
          key="date"
          render={(_, record) => {
            return moment(record.date).format("dddd MMMM YYYY");
          }}
        />
        <Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(_, record) => {
            return (
              <>
                <Tag color={record.status == "proccess" ? "yellow" : "blue"}>
                  {record.status}
                </Tag>
              </>
            );
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => (
            <FaCalendar
              color={colorPallate.blue}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setDetailModal({
                  open: true,
                  data: record,
                });
                form.setFieldsValue({
                  ...record,
                });
              }}
            />
          )}
        />
      </Table>
      <Modal
        open={detailModal.open}
        okText="Reschedule"
        cancelText="Batal"
        confirmLoading={loading}
        onOk={() => reschedule()}
        onCancel={() =>
          setDetailModal({
            open: false,
            data: null,
          })
        }
      >
        <Card>
          <Form layout="vertical" form={form}>
            <Row gutter={[20]}>
              <Col span={24}>
                <Form.Item
                  name="date"
                  label="Tanggal"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="Tanggal" type="date" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="time" label="Jam" rules={[{ required: true }]}>
                  <Input placeholder="Jam" type="time" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};
export default Booking;
