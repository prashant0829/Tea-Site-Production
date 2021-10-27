import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Product from "./pages/Product";
import Categories from "./pages/Categories";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthContextProvider, { AuthContext } from "./context/ContextApi";
import AdminDashboard from "./pages/AdminDashboard";
import LoadingPage from "./pages/adminComponents/LoadingComponent";

const RouterComponent = () => {
  const { loading } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);
  return (
    <div>
      {!isLoading ? (
        <>
          {" "}
          <Router>
            <Navbar />
            <div style={{ height: "80px" }}></div>
            <div>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/products">
                  <Categories />
                </Route>
                <Route path="/contact">
                  <Contact />
                </Route>
                <Route path="/admin-dashboard">
                  <AdminDashboard />
                </Route>
                <Route path="/product/:id">
                  <Product />
                </Route>
                <Route path="/*">
                  <div
                    style={{
                      height: "80vh",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}>
                    <img
                      src="/images/pnf.svg"
                      alt=""
                      style={{ width: "40%" }}
                    />
                    <h1>Page not found!</h1>
                  </div>
                </Route>
              </Switch>
            </div>
            <Footer />
          </Router>
        </>
      ) : (
        <>
          <LoadingPage />
        </>
      )}
    </div>
  );
};

export default RouterComponent;
