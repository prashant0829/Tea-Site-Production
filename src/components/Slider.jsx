import React from "react";
import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

const settingsData = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  centerPadding: "20%",
  //   variableWidth: true
};

const SliderContainer = ({ children, config }) => {
  let settings = config ? config : settingsData;
  return <Slider {...settings}>{children}</Slider>;
};

export default SliderContainer;
