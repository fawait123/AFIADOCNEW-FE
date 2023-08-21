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
import _debounce from "lodash/debounce";

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
  const [paginateUser, setPaginateUser] = useState({
    loading: true,
    page: 1,
    limit: 10,
    total: 20,
  });
  const [paginateRole, setPaginateRole] = useState({
    loading: true,
    page: 1,
    limit: 10,
    total: 20,
  });

  useEffect(() => {
    getUser(paginateUser, (res) => {
      // console.log(res);
      setPaginateUser({
        ...paginateUser,
        total: res?.count,
        loading: false,
      });
      setDataUser(res);
    });

    getRole(paginateRole, (res) => {
      setPaginateRole({
        ...paginateRole,
        total: res?.count,
        loading: false,
      });
      setDataRoles(res);
    });
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
  // console.log(paginateUser);

  const handleonChange = (e) => {
    let ValueInput = e.target.value;

    console.log(ValueInput, "sjs");
    setPaginateUser({
      limit: 10,
      loading: true,
      page: 1,
      ...paginateUser,
    });
    getUser(
      {
        limit: 10,
        loading: true,
        search: ValueInput,
        page: 1,
        ...paginateUser,
      },
      (res) => {
        setPaginateUser({
          ...paginateUser,
          loading: false,
          total: res?.count,
        });
        setDataUser(res);
      }
    );
  };

  const handleonChangeRole = (e) => {
    let ValueInput = e.target.value;

    console.log(ValueInput, "sjs");
    setPaginateRole({
      limit: 10,
      loading: true,
      page: 1,
      ...paginateRole,
    });
    getRole(
      {
        limit: 10,
        loading: true,
        search: ValueInput,
        page: 1,
        ...paginateRole,
      },
      (res) => {
        setPaginateRole({
          ...paginateRole,
          loading: false,
          total: res?.count,
        });
        setDataRoles(res);
      }
    );
  };

  const debouncedOnChange = _debounce(handleonChange, 800);
  const debouncedOnChangeRole = _debounce(handleonChangeRole, 800);

  return (
    <Tabs defaultActiveKey="akses">
      <Tabs.TabPane tab="Akses" key="akses">
        <TabRole
          handleSearch={debouncedOnChangeRole}
          handlePaginationRoleLimit={(e) =>
            getRole({ limit: e, page: 1 }, (res) => {
              setPaginateRole({
                ...paginateRole,
                limit: e,
                loading: false,
              });
              setDataRoles(res);
            })
          }
          handlePaginationRolePage={(e) => {
            // console.log(e);
            getRole({ limit: paginateRole.limit, page: e }, (res) => {
              setPaginateRole({
                ...paginateRole,
                page: e,
                loading: false,
              });
              setDataRoles(res);
            });
          }}
          valuePaginate={paginateRole}
          setValuePaginate={setPaginateRole}
          dataRoles={dataRoles}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Pengguna" key="pengguna">
        <TabUser
          handleSearch={debouncedOnChange}
          handlePaginationUserLimit={(e) =>
            getUser({ limit: e, page: 1 }, (res) => {
              setPaginateUser({
                ...paginateUser,
                limit: e,
                loading: false,
              });
              setDataUser(res);
            })
          }
          handlePaginationUserPage={(e) => {
            // console.log(e);
            getUser({ limit: paginateUser.limit, page: e }, (res) => {
              setPaginateUser({
                ...paginateUser,
                page: e,
                loading: false,
              });
              setDataUser(res);
            });
          }}
          valuePaginate={paginateUser}
          setValuePaginate={setPaginateUser}
          dataUser={dataUser}
        />
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
