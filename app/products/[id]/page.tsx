"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImageItem = {
  id: number;
  src: string;
  alt: string;
};

export default function productDetail() {
  // useEffect(()=>{
  //     const testAPI = async () => {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.NEXT_PUBLIC_API_URL}/product/1`
  //     )
  //     console.log('Ответ сервера:', res.data)
  //   } catch (error) {
  //     console.error('Ошибка при запросе:', error)
  //   }
  // }

  // // testAPI()
  // }, [])

  const images: ImageItem[] = [
    { id: 1, src: "/images/product_1.png", alt: "Фото 1" },
    { id: 2, src: "/images/product_2.png", alt: "Фото 2" },
    { id: 3, src: "/images/product_3.png", alt: "Фото 3" },
    { id: 4, src: "/images/product_4.png", alt: "Фото 4" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const colors = [
    {
      id: "1",
      color: "#000000",
    },
    {
      id: "2",
      color: "#A9A9A9",
    },
    {
      id: "3",
      color: "#000000",
    },
    {
      id: "4",
      color: "#A6D6CA",
    },
    {
      id: "5",
      color: "#000000",
    },
    {
      id: "6",
      color: "#B9C1E8",
    },
  ];

  const sizes = ["XS", "S", "M", "L", "XL", "2X"];


  return (
			<div className="container m-auto font-beatrice flex gap-25 justify-center">
				<div className="flex gap-4">
					<div className="w-full min-w-[300px]  max-w-[500px] relative ">
						<Image
							src={images[activeIndex].src}
							alt={images[activeIndex].alt}
							fill
							className="object-contain"
						/>
					</div>

					{/* Лента миниатюр */}
					<div className="flex flex-col justify-center gap-2">
						{images.map((img, idx) => (
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
									src={img.src}
									alt={img.alt}
									fill
									className="object-cover"
								/>
							</button>
						))}
					</div>
				</div>

				<div className="flex flex-col gap-4 w-full max-w-[306px] pt-14 px-10 pb-3 border border-light-gray">
					<div>
						<h1 className="uppercase">abstract print shirt</h1>
						<span>$99</span>
					</div>
					<p>
						Relaxed-fit shirt. Camp collar and short sleeves. Button-up front.
					</p>
					<div>
						<h3 className="text-gray-300">Color</h3>
						<div className="flex gap-0.5">
							{colors.map((item) => (
								<span
									key={item.id}
									style={{ backgroundColor: item.color }}
									className="w-9 h-9"
								/>
							))}
						</div>
					</div>
					<div>
						<h3 className="text-gray-300">Size</h3>
						<div className="flex items-center gap-1 max-w-3xs">
							{sizes.map((item, index) => (
								<span
									key={index}
									className="flex justify-center w-full py-2 border border-btn-gray"
								>
									{item}
								</span>
							))}
						</div>
					</div>
					<button className="flex w-full justify-center py-3 bg-btn-gray hover:bg-btn-gray/40 transition-colors duration-150 ease-in-out">ADD</button>
				</div>
			</div>
  );
}
