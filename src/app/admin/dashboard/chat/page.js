"use client";
import { getChatt, getUserList, storeChatt } from "@/API/chatt";
import ChatField from "@/component/chatdashboard/ChatField";
import ListContact from "@/component/chatdashboard/ListContact";
import { colorPallate } from "@/utils/colorpallate";
import { Col, Image, Row } from "antd";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Chats = () => {
  const [userList, setUserList] = useState([]);
  const [dataChatt, setDataChatt] = useState([]);
  const [param, setParam] = useState(null);

  const getListUser = () => {
    getUserList((response) => {
      setUserList(response);
    });
  };

  const getDataChatt = (id) => {
    getChatt(
      {
        receiverID: id,
        page: 1,
        limit: 40,
      },
      (response) => {
        setDataChatt(response.rows);
      }
    );
  };

  const sendChatt = (payload) => {
    console.log(payload);
    storeChatt(
      {
        receiverID: payload.params.id,
        message: payload.message,
      },
      (response) => {
        console.log(response);
      }
    );
  };

  useEffect(() => {
    getListUser();
  }, []);
  return (
    <div
      style={{
        height: "90vh",
        display: "flex",
        overflow: "hidden",
        borderRadius: 5,
        // boxShadow: "-3px 2px 2px 0px rgba(0,0,0,0.)",
      }}
    >
      <div style={{ width: "30%", marginRight: 1 }}>
        <div
          style={{
            height: 60,
            backgroundColor: colorPallate.gray,
            display: "flex",
            alignItems: "center",
            padding: "0px 10px",
            position: "sticky",
          }}
        >
          <p style={{ color: "black", fontWeight: 500, fontSize: 18 }}>Chats</p>
        </div>
        <div style={{ overflow: "auto", height: "100%" }}>
          {userList.map((val) => {
            return (
              <ListContact
                key={val}
                item={val}
                onClick={() => {
                  getDataChatt(val.id);
                  setParam(val);
                }}
              />
            );
          })}
        </div>
      </div>
      <div style={{ width: "100%" }}>
        {dataChatt.length > 0 ? (
          <ChatField
            datas={dataChatt}
            params={param}
            send={(e) => sendChatt(e)}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Image src="/assets/Oops.svg" preview={false} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
