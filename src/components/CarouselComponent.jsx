import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ allImages }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <section>
        <div style={{ display: "none" }}></div>
        <Carousel
          activeIndex={index}
          onSelect={handleSelect}
          interval={2500}
          pause={false}>
          {allImages[0] && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={allImages[0].url}
                // src="/images/tea.png"
                alt="First slide"
              />
            </Carousel.Item>
          )}
          {allImages[1] && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={allImages[1].url}
                // src="/images/tea.png"
                alt="Second slide"
              />
            </Carousel.Item>
          )}
          {allImages[2] && (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={allImages[2].url}
                // src="/images/tea.png"
                alt="Third slide"
              />
            </Carousel.Item>
          )}
        </Carousel>
      </section>
    </div>
  );
};

export default CarouselComponent;
