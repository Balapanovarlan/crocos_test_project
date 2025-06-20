"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
// import 'swiper/css/navigation';
import "swiper/css/pagination";
import Image from "next/image";

import shirtFirst from "@/public/images/gray_shirt.png";
import shirtSecond from "@/public/images/white_shirt.png";
import shirtThird from "@/public/images/shirt_3.png";
import shirtFourth from "@/public/images/milk_shirt.png";

const SwiperSlider = () => {
  return (
    <div className="w-full max-w-[1440px] mx-auto relative">
      <button className="swiper-button-prev-custom px-4.5 py-3.75 border border-btn-gray absolute right-1/2 bottom-[-70px]  z-10 ">
        {"<"}
      </button>

      <button className="swiper-button-next-custom  px-4.5 py-3.75 border border-btn-gray absolute left-1/2 bottom-[-70px] z-10 ml-2">
        {">"}
      </button>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        
        slidesPerView={3}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 100,
          },
        }}
      >

        
        <SwiperSlide>
          <div className="flex flex-col gap-3.5 w-full max-w-[305px]">
            <Image src={shirtThird} alt=" " />
            <div className="text-[10px] xm:text-[16px]">
              <h3>V-Neck T-Shirt</h3>
              <div className="flex justify-between">
                <span>Embroidered Seersucker Shirt</span>
                <span>$99</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-3.5 w-full max-w-[305px]">
            <Image src={shirtFirst} alt=" " />
            <div  className="text-[10px] xm:text-[16px]">
              <h3>Cotton T Shirt</h3>
              <div className="flex justify-between">
                <span>Basic Slim Fit T-Shirt</span>
                <span>$99</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="flex flex-col gap-3.5 w-full max-w-[305px]">
            <Image src={shirtSecond} alt=" " />
            <div className="text-[10px] xm:text-[16px]">
              <h3>Henley T-Shirt</h3>
              <div className="flex justify-between">
                <span>Blurred Print T-Shirt</span>
                <span>$99</span>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="flex flex-col gap-3.5 w-full max-w-[305px]">
            <Image src={shirtFourth} alt=" " />
            <div className="text-[10px] xm:text-[16px]">
              <h3>Crewneck T-Shirt</h3>
              <div className="flex justify-between">
                <span>Full Sleeve Zipper</span>
                <span>$99</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default SwiperSlider;
