import React, { useContext } from "react";
import { AuthContext } from "../context/ContextApi";

const About = () => {
  const { companyDetails } = useContext(AuthContext);
  return (
    <div style={{ minHeight: "80vh" }}>
      <div className="text-center mb-2">
        <p className="section-heading">About Us</p>
        <div className="heading-bottom-border"></div>
      </div>
      <div className="container mt-3" style={{ maxWidth: "1100px" }}>
        <div className="row quality-box">
          <div className="col-lg-7 col-md-6 col-xs-12 p-4 d-flex align-items-center">
            <p
              className="pt-2 "
              style={{
                textAlign: "justify",
                fontWeight: "400",
                fontSize: "16px",
                fontStyle: "italic",
              }}>
              {companyDetails.aboutContent}
            </p>
          </div>
          <div
            className="col-lg-5 col-md-6 col-xs-12 p-4"
            style={{
              textAlign: "center",
            }}>
            <img
              src={companyDetails.aboutImage}
              style={{
                maxWidth: "450px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className="section-heading mb-2">Our Mission</p>
        <div className="heading-bottom-border"></div>
      </div>
      <div className="container mt-3" style={{ maxWidth: "1100px" }}>
        <div className="row quality-box mission-box">
          <div
            className="col-lg-5 col-md-6 col-xs-12 p-4"
            style={{
              textAlign: "center",
            }}>
            <img
              src={companyDetails.missionImage}
              style={{
                maxWidth: "450px",
                width: "100%",
                objectFit: "cover",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              alt=""
            />
          </div>
          <div className="col-lg-7 col-md-6 col-xs-12 p-4 d-flex align-items-center">
            <p
              className=""
              style={{
                textAlign: "justify",
                textAlign: "justify",
                fontWeight: "400",
                fontSize: "16px",
                fontStyle: "italic",
              }}>
              {companyDetails.missionContent}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
