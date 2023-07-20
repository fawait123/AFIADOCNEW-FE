"use client";

import React, { useEffect, useState } from "react";
import {
  Col,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Form,
  Button,
  Checkbox,
  Breadcrumb,
  Tabs,
} from "antd";
import TabUser from "@/component/user/TabUser";
import TabRole from "@/component/user/TabRole";
import { getRole, getUser } from "@/API/http";

const User = () => {
  const [dataUser, setDataUser] = useState({
    count: 0,
    limit: 0,
    page: 0,
    rows: [],
  });
  const [dataRoles, setDataRoles] = useState({
    count: 0,
    limit: 0,
    page: 0,
    rows: [],
  });
  useEffect(() => {
    getUser((res) => setDataUser(res));
    getRole((res) => setDataRoles(res));
  }, []);

  const refactoryDataRoles = (data) => {
    const dataFilter = data.map((value) => {
      return {
        key: value.id,
        name: value.name,
        displayName: value.display_name,
        children: value.roleaccesses.map((chil) => {
          return {
            key: chil.id,
            name: chil.access.name,
          };
        }),
      };
    });

    return dataFilter;
  };

  // console.log(refactoryDataRoles(dataRoles.rows), "data analityx");

  return (
    <Tabs defaultActiveKey="akses">
      <Tabs.TabPane tab="Akses" key="akses">
        <TabRole dataRoles={dataRoles} />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Pengguna" key="pengguna">
        <TabUser dataUser={dataUser} />
      </Tabs.TabPane>
    </Tabs>
    // <div>
    //   <div
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       alignItems: "center",
    //       marginBottom: 20,
    //     }}
    //   >
    //     <Breadcrumb>
    //       <Breadcrumb.Item>Halaman</Breadcrumb.Item>
    //       <Breadcrumb.Item>Pengguna</Breadcrumb.Item>
    //     </Breadcrumb>
    //     <Button
    //       type="primary"
    //       style={{ marginBottom: 10 }}
    //       onClick={() => setOpen(true)}
    //     >
    //       Tambah Pengguna
    //     </Button>
    //     <Modal
    //       title="Modal Tambah Pengguna"
    //       centered
    //       open={open}
    //       onOk={() => setOpen(false)}
    //       okText="Tambah Pengguna"
    //       cancelText="Batal"
    //       onCancel={() => setOpen(false)}
    //       width={1000}
    //     >
    //       <Form
    //         name="basic"
    //         initialValues={{
    //           remember: true,
    //         }}
    //         onFinish={onFinish}
    //         onFinishFailed={onFinishFailed}
    //         autoComplete="off"
    //         layout="vertical"
    //       >
    //         <Row>
    //           <Col flex={1} style={{ marginRight: 5 }}>
    //             <Form.Item
    //               label="Nama"
    //               name="name"
    //               rules={[
    //                 {
    //                   required: true,
    //                   message: "Nama harus di isi!",
    //                 },
    //               ]}
    //             >
    //               <Input placeholder="Nama" />
    //             </Form.Item>
    //           </Col>
    //           <Col flex={1} style={{ marginLeft: 5 }}>
    //             <Form.Item
    //               label="Email"
    //               name="email"
    //               rules={[
    //                 {
    //                   required: true,
    //                   message: "Email harus di isi!",
    //                 },
    //               ]}
    //             >
    //               <Input placeholder="Email" />
    //             </Form.Item>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col flex={1} style={{ marginRight: 5 }}>
    //             <Form.Item
    //               label="Username"
    //               name="username"
    //               rules={[
    //                 {
    //                   required: true,
    //                   message: "Username harus di isi!",
    //                 },
    //               ]}
    //             >
    //               <Input placeholder="Username" />
    //             </Form.Item>
    //           </Col>
    //           <Col flex={1} style={{ marginLeft: 5 }}>
    //             <Form.Item
    //               label="Password"
    //               name="password"
    //               rules={[
    //                 {
    //                   required: true,
    //                   message: "Password harus di isi!",
    //                 },
    //               ]}
    //             >
    //               <Input.Password placeholder="Password" />
    //             </Form.Item>
    //           </Col>
    //         </Row>
    //         <Row>
    //           <Col>
    //             <Checkbox onChange={() => console.log("oke")}>AKTIF</Checkbox>
    //           </Col>
    //         </Row>
    //       </Form>
    //     </Modal>
    //   </div>
    //   <Row
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between",
    //       marginBottom: 10,
    //     }}
    //   >
    //     <Col>
    //       <Select
    //         defaultValue="10"
    //         style={{
    //           width: 70,
    //         }}
    //         onChange={handleChange}
    //         options={[
    //           {
    //             value: "10",
    //             label: "10",
    //           },
    //           {
    //             value: "25",
    //             label: "25",
    //           },
    //           {
    //             value: "50",
    //             label: "50",
    //           },
    //           {
    //             value: "100",
    //             label: "100",
    //             disabled: true,
    //           },
    //         ]}
    //       />
    //     </Col>
    //     <Col>
    //       <Input style={{ width: 200 }} placeholder="Search..." />
    //     </Col>
    //   </Row>
    //   {/* <div style={{ overflow: "auto" }}> */}
    //   <Table
    //     dataSource={data}
    //     scroll={{
    //       x: 1500,
    //     }}
    //   >
    //     <Column
    //       title="First Name"
    //       fixed="left"
    //       dataIndex="firstName"
    //       key="firstName"
    //     />
    //     <Column title="Last Name" dataIndex="lastName" key="lastName" />

    //     <Column title="Age" dataIndex="age" key="age" />
    //     <Column title="Address" dataIndex="address" key="address" />
    //     <Column
    //       title="Tags"
    //       dataIndex="tags"
    //       key="tags"
    //       render={(tags) => (
    //         <>
    //           {tags.map((tag) => (
    //             <Tag color="blue" key={tag}>
    //               {tag}
    //             </Tag>
    //           ))}
    //         </>
    //       )}
    //     />
    //     <Column
    //       title="Action"
    //       key="action"
    //       render={(_, record) => (
    //         <Space size="middle">
    //           <a>Invite {record.lastName}</a>
    //           <a>Delete</a>
    //         </Space>
    //       )}
    //     />
    //   </Table>
    // </div>
  );
};

export default User;
