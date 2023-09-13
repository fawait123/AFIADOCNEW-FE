import { Checkbox, Table } from "antd";
import React from "react";

export const TableComponent = ({ datas, loading, type }) => {
  return (
    <Table rowKey={"id"} dataSource={datas} loading={loading}>
      {type == "process" ? (
        <Table.Column
          render={(_, rec, index) => {
            return <Checkbox />;
          }}
          align="center"
          title={<Checkbox />}
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
  );
};
