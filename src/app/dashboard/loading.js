"use client";
import { colorPallate } from "@/utils/colorpallate";
import { Spin } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      style={{
        width: "100%",
        // position: "absolute",
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin style={{ color: colorPallate.blue }} size="large">
        <p style={{ marginTop: 70, color: colorPallate.blue }}>Loading...</p>
      </Spin>
    </div>
  );
}
