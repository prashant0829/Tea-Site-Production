import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/ContextApi";

const Navbar = () => {
  const { companyDetails } = useContext(AuthContext);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-blur fixed-top shadow">
        <div className="container">
          <a className="navbar-brand" href="#">
            <Link to="/">
              <h3>
                <img
                  style={{ maxHeight: "50px" }}
                  src={companyDetails.logo}
                  alt=""
                />
              </h3>
            </Link>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-none d-sm-flex">
              <li className="nav-item">
                <Link to="/" className="nav-link" aria-current="page" href="#">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/products"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  Contact
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link
                  to="/admin-dashboard"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/product/123"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  Product
                </Link>
              </li> */}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-block d-sm-none">
              <li
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <Link to="/" className="nav-link" aria-current="page" href="#">
                  <div>Home</div>
                </Link>
              </li>
              <li
                className="nav-item"
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <Link
                  to="/about"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  <div>About</div>
                </Link>
              </li>
              <li
                className="nav-item"
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <Link
                  to="/products"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  <div>Products</div>
                </Link>
              </li>
              <li
                className="nav-item"
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <Link
                  to="/contact"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  <div>Contact</div>
                </Link>
              </li>
              {/* <li
                className="nav-item"
                className="nav-item"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <Link
                  to="/admin-dashboard"
                  className="nav-link "
                  aria-current="page"
                  href="#">
                  <div>Admin</div>
                </Link>
              </li> */}
            </ul>
            <form className="d-flex"></form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
