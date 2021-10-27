import React from "react";

const ProgressBar = ({ progress }) => {
  return (
    <div style={{ width: "100%", border: "1px solid green" }}>
      <div
        style={{
          height: "5px",
          width: `${progress}%`,
          backgroundColor: "green",
        }}></div>
    </div>
  );
};

export default ProgressBar;
