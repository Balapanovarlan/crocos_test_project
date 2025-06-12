'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export default function CategoryList() {
  const arr = [
    {title: 'T-Shirt'},
    {title: 'Jeans'},
    {title: 'Shorts'},
    {title: 'jackets'},
  ]
  return (
    <div className='w-full max-w-[1400px]'>
        <Swiper
            modules={[Navigation, Pagination]}
            navigation 
            spaceBetween = {20}
            slidesPerView = {3} 
        >
            {arr.map((item)=>(
                <SwiperSlide>
                    <button className='border border-btn-gray py-1.5 w-full max-w-25 flex justify-center uppercase'>
                        <span className='text-[10px]'>
                        {item.title}
                        </span>
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>
    </div>
  )

}
