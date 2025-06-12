import Image from 'next/image'
import React from 'react'
import blackTshirt from '@/public/icons/black_tshirt.png'

const CardItem = () => {
  return (
    <div>
        <div className='w-[162px] xm:w-3xs aspect-square relative overflow-hidden'>
            <Image src={blackTshirt} alt='t-shirt' fill 
            className='object-cover'/>
        </div>
        <div>
            <span>T-shirt</span>
            <div className='flex justify-between text-xs'>
                <h1>Full sleeve zipper</h1>
                <span>$ 199</span>
            </div>    
        </div>
    </div>
  )
}

export default CardItem