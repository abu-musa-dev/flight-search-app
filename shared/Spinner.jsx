import React from "react";

const Spinner = () => (
  <div className="flex justify-center items-center py-24 bg-transparent">
    <div className="relative w-16 h-16">
      {/* বড় রিং */}
      <div
        style={{
          borderTopColor: "transparent",
          borderWidth: "6px",           // থিক বর্ডার
          borderStyle: "solid",
          borderColor: "#dc2626",      // Tailwind red-700
          borderRadius: "50%",
          width: "64px",
          height: "64px",
          animation: "spin 1s linear infinite",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      ></div>

      {/* ছোট রিং */}
      <div
        style={{
          borderBottomColor: "transparent",
          borderWidth: "6px",           // থিক বর্ডার
          borderStyle: "solid",
          borderColor: "#b91c1c",      // Tailwind red-800
          borderRadius: "50%",
          width: "48px",
          height: "48px",
          animation: "spin 1s linear infinite",
          animationDelay: "-0.5s",
          position: "absolute",
          top: "8px",
          left: "8px",
        }}
      ></div>

      {/* স্পিন keyframes */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  </div>
);

export default Spinner;
