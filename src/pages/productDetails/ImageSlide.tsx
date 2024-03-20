




import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/thumbs";
import { useState } from "react";
import { Image } from "antd";
import './ImageSlide.css'

const ImageSlide = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
        }}
        modules={[Navigation, FreeMode, Thumbs]}
        spaceBetween={10}
        navigation={true}
        thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
        className="mySwiper2"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index}>
            <Image src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={3}
        watchSlidesProgress={true}
        className="mySwiper"
      >
        {images?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ImageSlide;

