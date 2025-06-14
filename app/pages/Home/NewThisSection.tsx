import React from 'react'
import SwiperSlider from '@/app/components/SwiperSlider/SwiperSlider'

const NewThisSection = () => {
  return (
    <section id='new' className='font-beatrice flex flex-col gap-7 '>
        <div className='flex items-center '>
          <h1 className='text-5xl font-extrabold max-w-2xs uppercase'>New this week</h1>
          <span className='text-[20px] text-violet-600 '>{'(50)'}</span>
        </div>
        <SwiperSlider/>
    </section>
  )
}

export default NewThisSection