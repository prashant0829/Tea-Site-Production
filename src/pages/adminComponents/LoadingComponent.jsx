import React, { useContext } from "react";
import { AuthContext } from "../../context/ContextApi";

const LoadingComponent = () => {
  const { companyDetails } = useContext(AuthContext);
  return (
    <div className="loading-component">
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 10,
        }}
        className="d-flex align-items-center justify-content-center bg-dark flex-column">
        <img style={{ width: "50px" }} src="/images/leaves.svg" alt="" />
        <div>
          <h4 className="mt-4 welcome-text">Welcome</h4>
        </div>
      </div>
    </div>
  );
};

export default LoadingComponent;
