// React imports
import React, { useEffect, useRef } from "react";

// Third party imports
import Swiper from "swiper";
import "swiper/swiper-bundle.css";

const Carousel = ({ children }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    new Swiper(swiperRef.current, {
      spaceBetween: 30,
      slidesPerView: 1,
      direction: "horizontal",
    //   freeMode: true,
	  breakpoints: {
		800: {
			slidesPerView: 3,
			spaceBetween: 50
		}
	  }
    });
  }, []);

  return (
    <div style={{ width: "100%" }}>
      <div className="swiper-container" ref={swiperRef}>
        <div className="swiper-wrapper">
          {children.map((child, index) => (
            <div className="swiper-slide" key={index}>
              {child}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
