'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

export const categoryArr = [
  {title: 'T-Shirt'},
  {title: 'Jeans'},
  {title: 'Shorts'},
  {title: 'Jackets'},
]
export default function CategoryList() {
  return (
    <div className=' w-full max-w-xl xm:min-w-3xs'>

        <Swiper
            modules={[Navigation, Pagination]}
            navigation 
            spaceBetween = {20}
            slidesPerView = {3} 
        >
            {categoryArr.map((item)=>(
                <SwiperSlide>
                    <button className='border border-btn-gray py-1.5 xm:py-3 w-full max-w-25 xm:max-w-32 flex justify-center uppercase
                      hover:bg-btn-gray/30 active:border-black transition-colors duration-200 ease-in cursor-pointer
                    '>
                        <span className='text-[10px] xm:text-lg'>
                        {item.title}
                        </span>
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>

        
    </div>
  )

}
