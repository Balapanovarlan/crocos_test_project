'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { fetchAllCategories } from '@/app/utils/axios';
import { Category } from '@/app/types/types';



export default function CategoryList({categories}: {categories:Category[]}) {
  
  // const {data:categories = [], isLoading , isError } = useQuery<Category[], Error>( { queryKey:['categories'], queryFn: fetchAllCategories});
  
  // if (isLoading) return <p>Loading…</p>
  // if (isError)   return <p>Error loading categories</p>
  

  return (
    <div className=' w-full max-w-xl xm:min-w-3xs'>

        <Swiper
            modules={[Navigation, Pagination]}
            navigation 
            spaceBetween = {20}
            slidesPerView = {3} 
        >
            {categories.map((item)=>(
                <SwiperSlide>
                    <button className='border border-btn-gray py-1.5 xm:py-3 w-full max-w-25 xm:max-w-32 flex justify-center uppercase
                      hover:bg-btn-gray/30 active:border-black transition-colors duration-200 ease-in cursor-pointer
                    '>
                        <span className='text-[10px] xm:text-lg'>
                        {item.name}
                        </span>
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>

        
    </div>
  )

}
