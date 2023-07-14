"use client";
import { Spin } from "antd";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin size="large" tip="Loading...">
        <div className="content" />
      </Spin>
    </div>
  );
}
