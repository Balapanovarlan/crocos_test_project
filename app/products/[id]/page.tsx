"use client";

import { Product } from "@/app/types/product";
import { fetchProductDetail } from "@/app/utils/axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";


export default function productDetail() {

  const {id}= useParams()

  const productId = Number(id)

  const {data: productDetail,  isLoading , isError} = useQuery<Product>({queryKey:['product', productId], queryFn: ()=> fetchProductDetail(productId)}); 

  const [activeIndex, setActiveIndex] = useState(0);

  if (isLoading) {
    return <p>Loading</p>
  }

  if (isError) {
    return <p>is Error</p>
  }

  return (
    <div className="container m-auto font-beatrice flex flex-col gap-10 xm:gap-25 items-center xm:flex-row xm:justify-center xm:pt-10">
      <div className="flex flex-col xm:flex-row gap-4">
        <div className="w-full min-w-[400px] min-h-[400px]  max-w-[500px] relative ">
          <Image
            src={productDetail!.images[activeIndex].image}
            alt='Selected image'
            fill
            className="object-contain"
          />
        </div>

        {/* Лента миниатюр */}
        <div className="flex xm:flex-col items-center justify-center gap-2">
          {productDetail?.images.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => setActiveIndex(idx)}
              className={`
								relative
								w-20 h-20
								border
								cursor-pointer
								transition-opacity
								${
                  idx === activeIndex
                    ? "opacity-100 border-blue-500"
                    : "opacity-50 hover:opacity-75"
                }
							`}
            >
              <Image
                src={img.image}
                alt={'#'}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[306px] pt-14 px-10 pb-3 border border-light-gray">
        <div>
          <h1 className="uppercase">{productDetail?.title}</h1>
          <span>{productDetail?.price}</span>
        </div>
        <p>
          {productDetail?.description}
        </p>
        {/* <div>
          <h3 className="text-gray-300">Color</h3>
          <div className="flex gap-0.5">
            {productDetail?.color.map((item) => (
              <span
                key={item.id}
                style={{ backgroundColor: item.color }}
                className="w-9 h-9"
              />
            ))}
          </div>
        </div> */}
        <div>
          <h3 className="text-gray-300">Size</h3>
          <div className="flex items-center gap-1 max-w-3xs">
            {productDetail?.sizes.map((item, index) => (
              <span
                key={index}
                className="flex justify-center w-full py-2 border border-btn-gray"
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
        <button className="flex w-full justify-center py-3 bg-btn-gray hover:bg-btn-gray/40 transition-colors duration-150 ease-in-out">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
