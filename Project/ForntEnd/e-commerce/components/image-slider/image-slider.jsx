import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import './image-slide.css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
const ImageSlider = () => {
  const images = [
    'img1.png',
    
    'img3.png',
    
    'img5.png',
    'img6.png',
    'img7.png',
    'img8.png',
    'img9.png',
    'img10.png',
    'img11.png',
  ];
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper rounded-2xl"
    >
      {images.map((src, index) => (
        <SwiperSlide key={index}>
          <img
            src={src}
            alt={`slide-${index}`}
            className="w-full h-[400px] object-cover"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
