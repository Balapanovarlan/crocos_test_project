import React from 'react'
import firstImage from '@/public/images/about/Rectangle 1.png'
import secondImage from '@/public/images/about/Rectangle 2.png'
import thirdImage from '@/public/images/about/Rectangle 3.png'
import fourthImage from '@/public/images/about/rectangle 4.png'
import Image from 'next/image'

export default function AboutSection() {
  return (
    <section id='about' className="flex flex-col gap-5 pt-10">
      <div className="flex flex-col items-center gap-3 font-beatrice">
        <h1 className="text-center text-5xl">Our Approach to fashion design</h1>
        <p className="w-full max-w-[685px] text-center">
          at elegant vogue , we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quelity exqulsite finish
        </p>
      </div>
      <div className="
        w-full
        max-w-[1200px]
        mx-auto
        flex flex-col items-center gap-6
        sm:flex-row sm:justify-center sm:items-end sm:gap-9
        sm:h-[500px]
        relative
      ">
        <div className="h-[220px] flex items-end sm:pb-16 sm:h-[340px]">
          <Image src={firstImage} alt="" className="object-cover h-full w-auto" />
        </div>
        <div className="h-[220px] flex items-end sm:pt-20 sm:items-start sm:h-[380px]">
          <Image src={secondImage} alt="" className="object-cover h-full w-auto" />
        </div>
        <div className="h-[220px] flex items-end sm:pb-20 sm:h-[370px]">
          <Image src={thirdImage} alt="" className="object-cover h-full w-auto" />
        </div>
        <div className="h-[220px] flex items-end sm:pt-10 sm:items-start sm:h-[320px]">
          <Image src={fourthImage} alt="" className="object-cover h-full w-auto" />
        </div>
      </div>
    </section>
  )
}