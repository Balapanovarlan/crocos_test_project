import React from 'react'
import Image from "next/image";
import Search from "@/app/components/Search/Search";
import CardItem from "../../components/CardItem/CardItem";
import { ArrowRight } from "lucide-react";
import whiteShirt from '@/public/icons/black_tshirt.png'
import blackShirt from '@/public/images/white_slim.png'

const HeroSection = () => {
  return (
    <>
        <div className=" flex flex-col w-full gap-3.5">
        <div className="flex flex-col gap-1">
          <span className="font-beatrice">MEN</span>
          <span>WOMEN</span>
          <span>KIDS</span>
        </div>
        <Search/>
      </div>
      <section className="flex flex-col items-center gap-14 font-beatrice xm:w-full xm:flex-row xm:justify-between">
        <div className="xm:flex xm:flex-col xm:gap-50 ">
          
          <div className="container ">
            <h1 className="uppercase text-5xl font-extrabold">New Collection</h1>
            <div>Summer</div>
            <div>2024</div>
          </div>

          <div className="flex flex-col gap-5 xm:flex-row xm:justify-between">
            <div className="flex gap-2.5 xm:hidden">
              <CardItem />
              <CardItem/>
            </div>

            <a href='/products' className="flex gap-2.5 pl-2.5 pr-5 py-2.5 bg-light-gray">
              <span className="capitalize">Go to shop</span>
              <ArrowRight/>
            </a>
            <div className="hidden xm:flex xm:gap-2 ">
              <button className="px-3.5 py-2 border">{'<'}</button>
              <button className="px-3.5 py-2 border">{'>'}</button>
            </div>
          </div>
          </div>

          <div className="flex gap-10">
            <Image src={whiteShirt} alt="white" width={366}/>
            <Image src={blackShirt} alt="black" width={366}/>
          </div>
      </section>
       
    </>
  )
}

export default HeroSection