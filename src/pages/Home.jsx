import React, { useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "../components/Slider";
import CountUp from "react-countup";
import { collection, getDocs, query } from "@firebase/firestore";
import { db } from "../config";
import { Carousel } from "react-bootstrap";

import { ImageList } from "@mui/material";
import { AuthContext } from "../context/ContextApi";
import { useHistory } from "react-router-dom";
import CarouselComponent from "../components/CarouselComponent";
import Testimonials from "../components/Testimonials";

const Home = () => {
  AOS.init();
  const history = useHistory();
  const {
    allPosts,
    allClients,
    stats,
    allTestimonials,
    companyDetails,
    allImages,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  useEffect(() => {}, []);

  return (
    <div>
      <div style={{ display: "none" }}>
        {allImages[0] && (
          <>
            <img src={allImages[0].url} alt="" />
          </>
        )}
        {allImages[1] && (
          <>
            <img src={allImages[1].url} alt="" />
          </>
        )}
        {allImages[2] && (
          <>
            <img src={allImages[2].url} alt="" />
          </>
        )}
      </div>
      <section>
        <CarouselComponent allImages={allImages} />
      </section>
      {/* <section className="bg-light">
        <div
          className="container text-center big-texts"
          style={{
            padding: "80px 0px",
          }}>
          {companyDetails.bigheading1}
        </div>
      </section> */}

      <section>
        <div
          className="parallax"
          style={{ backgroundImage: `url("${stats.url}")` }}>
          <div className="parallax-box">
            <div className="text-center container pb-4">
              <p className="section-heading">
                Welcome to the {companyDetails.name}
              </p>

              <div className="heading-bottom-border"></div>
              <p className="text-center mt-2 mb-2">{stats.content}</p>
              <div className="row mt-4 mb-2">
                <div className="col-sm-12 col-md-6 col-lg-3 p-4 quality-section">
                  <div
                    data-aos="fade-up"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img src="/images/leaves.svg" alt="" />
                    <p className="mb-1">
                      <CountUp
                        end={stats.count1}
                        duration={2}
                        style={{
                          fontSize: "32px",
                          fontWeight: "600",
                        }}></CountUp>
                    </p>
                    <h5 className="parallax-heading">{stats.heading1}</h5>
                    <p>{stats.description1}</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-4 quality-section">
                  {" "}
                  <div
                    data-aos="fade-up"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img src="/images/cup.svg" alt="" />
                    <p className="mb-1">
                      <CountUp
                        end={stats.count2}
                        duration={2}
                        style={{
                          fontSize: "32px",
                          fontWeight: "600",
                        }}></CountUp>
                    </p>
                    <h5 className="parallax-heading">{stats.heading2}</h5>

                    <p>{stats.description2}</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-4 quality-section">
                  {" "}
                  <div
                    data-aos="fade-up"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img src="/images/sun.svg" alt="" />
                    <p className="mb-1">
                      <CountUp
                        end={stats.count3}
                        duration={2}
                        style={{
                          fontSize: "32px",
                          fontWeight: "600",
                        }}></CountUp>
                    </p>
                    <h5 className="parallax-heading">{stats.heading3}</h5>

                    <p>{stats.description3}</p>
                  </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 p-4 quality-section">
                  {" "}
                  <div
                    data-aos="fade-up"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img src="/images/hand.svg" alt="" />
                    <p className="mb-1">
                      <CountUp
                        end={stats.count4}
                        duration={2}
                        style={{
                          fontSize: "32px",
                          fontWeight: "600",
                        }}></CountUp>
                    </p>
                    <h5 className="parallax-heading">{stats.heading4}</h5>
                    <p>{stats.description4}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-light pb-5">
        <div className="text-center">
          <p className="section-heading">Featured Products</p>
          <div className="heading-bottom-border"></div>
        </div>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="featured-product-section row">
            {allPosts.length > 0 &&
              allPosts
                .filter((post) => {
                  return post.featured;
                })
                .map((item, i) => {
                  return (
                    <div
                      className="col-xs-12 col-sm-6 col-md-6 col-lg-4"
                      key={i}
                      data-aos="fade-up"
                      data-aos-offset="-200"
                      data-aos-duration="800"
                      data-aos-easing="ease-in-out"
                      data-aos-mirror="true"
                      data-aos-once="false"
                      data-aos-anchor-placement="top-center">
                      <div
                        onClick={() => {
                          history.push(`/product/${item.id}`, item);
                        }}
                        className="featured-product"
                        style={{
                          backgroundImage: `url("${item.url}")`,
                          cursor: "pointer",
                        }}></div>
                      <div className="mb-4 featured-product-info">
                        <h4
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            history.push(`/product/${item.id}`, item);
                          }}>
                          {item.title}
                        </h4>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
      {/* <section className="" style={{ backgroundColor: "rgb(252 255 221)" }}>
        <div
          className="container  text-center big-texts"
          style={{
            padding: "80px 0px",
            color: "#59981A",
          }}>
          {companyDetails.bigheading2}
        </div>
      </section> */}
      <section className="pb-2">
        <div className="text-center">
          <p className="section-heading">Testimonials</p>
          <div className="heading-bottom-border"></div>
          <h5>What People Say!</h5>
        </div>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <Testimonials allTestimonials={allTestimonials} />
        </div>
      </section>
      <section className="clients mt-2 mb-2">
        <div className="text-center">
          <p className="section-heading">Clients</p>
          <div className="heading-bottom-border"></div>
        </div>
        <div className="container" style={{ maxWidth: "1200px" }}>
          {" "}
          <div className="row client-container">
            {allClients.length > 0 &&
              allClients.map((a, i) => {
                return (
                  <div
                    key={i}
                    className="col-lg-2 col-md-4 col-sm-6 col-xs-12 client-box"
                    data-aos="fade-in"
                    data-aos-offset="-200"
                    data-aos-duration="800"
                    data-aos-easing="ease-in-out"
                    data-aos-mirror="true"
                    data-aos-once="false"
                    data-aos-anchor-placement="top-center">
                    <img
                      src={a.url}
                      alt=""
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
      {/* <section className="clients mt-2 mb-2">
        <div className="text-center">
          <p className="section-heading">Quality</p>
          <div className="heading-bottom-border"></div>
        </div>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="row quality-box">
            <div className="col-lg-6 col-md-6 col-xs-12 ">
              <p
                className="pt-2"
                style={{
                  textAlign: "justify",
                  fontWeight: "400",
                  fontSize: "16px",
                  fontStyle: "italic",
                }}>
                {companyDetails.qualityContent}
              </p>
            </div>
            <div
              className="col-lg-6 col-md-6 col-xs-12 p-2"
              style={{
                textAlign: "center",
              }}>
              <img
                src={companyDetails.qualityImage}
                style={{ maxWidth: "450px", width: "100%" }}
                alt=""
              />
            </div>
          </div>
        </div>
      </section> */}
      <section></section>
    </div>
  );
};

export default Home;
