import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ allTestimonials }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="">
      <section>
        <div style={{ display: "none" }}></div>
        <Carousel
          controls={false}
          variant="dark"
          activeIndex={index}
          onSelect={handleSelect}
          interval={4000}
          pause={false}>
          {allTestimonials.length > 0 &&
            allTestimonials.map((item, i) => {
              return (
                <Carousel.Item className=" testimonial-box">
                  <div className="testimonial p-3 rounded ">
                    <div className="testimonial-body">
                      <p
                        style={{
                          padding: "0",
                          margin: "0",
                          fontSize: "80px",
                          lineHeight: "40px",
                          paddingTop: "10px",
                        }}>
                        &#8220;
                      </p>
                      <p
                        className="text-center p-2"
                        style={{
                          maxHeight: "150px",
                          overflow: "auto",
                          fontWeight: "400",
                          fontSize: "15px",
                          fontStyle: "italic",
                        }}>
                        {item.content}
                      </p>
                      <p
                        style={{
                          padding: "0",
                          margin: "0",
                          fontSize: "80px",
                          textAlign: "right",
                          lineHeight: "40px",
                          paddingTop: "10px",
                        }}>
                        &#8221;
                      </p>
                    </div>
                    <hr />

                    <div className="testimonial-top-bar ">
                      <div className="text-center">
                        <p
                          style={{
                            padding: "0",
                            margin: "0",
                            fontWeight: "500",
                          }}>
                          {item.name}
                        </p>
                        <p
                          className=""
                          style={{
                            padding: "0",
                            margin: "0",
                            fontSize: "12px",
                          }}>
                          {item.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </Carousel.Item>
              );
            })}
        </Carousel>
      </section>
    </div>
  );
};

export default CarouselComponent;
