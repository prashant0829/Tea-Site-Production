import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/ContextApi";
import "./Footer.css";

const Footer = () => {
  const { companyDetails } = useContext(AuthContext);

  return (
    <>
      <footer className="footer-distributed">
        <div className="footer-left">
          <Link to="/" className="link-1">
            <img style={{ height: "50px" }} src={companyDetails.logo} alt="" />
          </Link>

          <p className="footer-links">
            <Link to="/" className="link-1">
              Home{" "}
            </Link>

            <Link to="/about" href="#">
              About{" "}
            </Link>

            <Link to="/products" href="#">
              Products{" "}
            </Link>
            <Link to="/contact" href="#">
              Contact{" "}
            </Link>
          </p>

          <Link to="/" className="footer-company-name text-white">
            {companyDetails.name} © {companyDetails.copyrightYear}
          </Link>
        </div>

        <div className="footer-center pe-3">
          <div className="d-flex align-items-center mb-2 contact-item-container">
            <div className="icon-div">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="footer-contact-text address-text">
              <div>{companyDetails.address}</div>
            </div>
          </div>

          <div className="d-flex align-items-center mb-2 contact-item-container">
            <div className="icon-div">
              <i className="fas fa-phone"></i>
            </div>

            <div className="footer-contact-text">
              +91 {companyDetails.contactNumber}
            </div>
          </div>
          <div className="d-flex align-items-center mb-2 contact-item-container">
            <div className="icon-div">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="footer-contact-text">
              <a href="mailto:support@company.com">{companyDetails.email}</a>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <p className="footer-company-about">
            <span>About the company</span>
            {companyDetails.shortAbout}
          </p>

          <div className="footer-icons">
            <a target="_blank" href={companyDetails.facebook}>
              <i className="fab fa-facebook"></i>
            </a>

            <a target="_blank" href={companyDetails.instagram}>
              <i className="fab fa-instagram"></i>
            </a>
            <a target="_blank" href={companyDetails.twitter}>
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
