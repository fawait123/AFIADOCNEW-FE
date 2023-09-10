"use client";

import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
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

  const handleonChange = (e) => {
    let ValueInput = e.target.value;
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
  );
};

export default User;
