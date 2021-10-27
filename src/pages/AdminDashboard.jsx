import React, { useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../context/ContextApi";
import AddCarousels from "./adminComponents/AddCarousels";
import AddCompanyDetails from "./adminComponents/AddCompanyDetails";
import AddPost from "./adminComponents/AddPost";
import AddClients from "./adminComponents/AddClients";
import AddStats from "./adminComponents/AddStats";
import AddTestimonial from "./adminComponents/AddTestimonials";
import AboutInfo from "./adminComponents/AboutInfo";
import MissionInfo from "./adminComponents/MissionInfo";
import QualityInfo from "./adminComponents/QualityInfo";

const AdminDashboard = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const { logout, signIn, currentUser, resetPassword } =
    useContext(AuthContext);

  if (currentUser)
    return (
      <div>
        <div className="container d-flex justify-content-between mt-4 bg-dark text-white">
          <h4>Admin Panel</h4>
          <button onClick={logout}>Logout</button>
        </div>

        <AddCompanyDetails />
        <AddCarousels />
        <AddPost />
        <AddClients />
        <AddStats />
        <AddTestimonial />
        <AboutInfo />
        <MissionInfo />
        <QualityInfo />
      </div>
    );
  else
    return (
      <>
        <div className="container ">
          <form
            style={{ maxWidth: "500px", margin: "auto" }}
            className="mt-5 mb-5 ">
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                autoComplete="off"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <p
              style={{
                color: "#4285F4",
                cursor: "pointer",
                textAlign: "right",
                fontWeight: "600",
              }}
              onClick={() => resetPassword(auth, email)}>
              Forget Password
            </p>
            <button
              type="button"
              onClick={() => signIn(auth, email, password)}
              className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </>
    );
};

export default AdminDashboard;
