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
  Tabs,
  Tag,
} from "antd";
import { getBooking, updateBooking } from "@/API/booking";
import { FaCalendar, FaEye } from "react-icons/fa";
import moment from "moment";
import { colorPallate } from "@/utils/colorpallate";
import API from "@/API";
import { TableComponent } from "./components/tablecomponent";
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

  const onChange = (key) => {
    getData([key]);
  };

  const getData = (status = null) => {
    setLoadingTable(true);
    let user = JSON.parse(window.localStorage.getItem("user"));
    let params = {
      doctorID: user.prefixID,
      page: page,
      limit: limit,
      search: search,
      status: status == null ? ["process"] : status,
    };
    API({
      url: "/admin/registration",
      method: "get",
      params: params,
    })
      .then((response) => {
        setData(response.data?.results?.data);
        setLoadingTable(false);
      })
      .catch((e) => {
        setLoadingTable(false);
      });
  };

  const items = [
    {
      key: "process",
      label: "Proses",
      children: (
        <TableComponent
          datas={data}
          getData={getData}
          loading={loadingTable}
          type="process"
        />
      ),
    },
    {
      key: "reschedule",
      label: "Reschedule",
      children: (
        <TableComponent
          datas={data}
          getData={getData}
          loading={loadingTable}
          type="reschedule"
        />
      ),
    },
    {
      key: "done",
      label: "Selesai",
      children: (
        <TableComponent
          datas={data}
          getData={getData}
          loading={loadingTable}
          type="done"
        />
      ),
    },
    {
      key: "cancel",
      label: "Cancel",
      children: (
        <TableComponent
          datas={data}
          getData={getData}
          loading={loadingTable}
          type="cancel"
        />
      ),
    },
  ];
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
      <Tabs defaultActiveKey="process" items={items} onChange={onChange} />
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
