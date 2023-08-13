import { colorPallate } from "@/utils/colorpallate";
import React from "react";

export const ListComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 15,
        borderBottom: `2px solid #D8D9DA`,
        paddingBottom: 8,
      }}
    >
      <p style={{ fontWeight: "bold", color: "#61677A", fontSize: 16 }}>NAMA</p>
      <p style={{ fontSize: 16 }}> ACHMAD FAWAIT</p>
    </div>
  );
};
