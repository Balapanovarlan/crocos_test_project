"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { Category } from "@/app/types/types";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategoryList({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [category, setCategory] = useState<number | null>(null);

  useEffect(() => {
    const category = params.get("category");
    setCategory(category ? Number(category) : null);
  }, [params]);

  const apply = (id: number) => {
    const q = new URLSearchParams();
    q.append("category", String(id));
    router.push(`/products?${q.toString()}`);
  };

  return (
    <div className=" w-full max-w-xl xm:min-w-3xs">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
      >
        {categories.map((item) => (
          <SwiperSlide>
            <button
              className="border border-btn-gray py-1.5 xm:py-3 w-full max-w-25 xm:max-w-32 flex justify-center uppercase
                      hover:bg-btn-gray/30 active:border-black transition-colors duration-200 ease-in cursor-pointer
                    "
              onClick={() => {
                apply(item.id);
              }}
            >
              <span className="text-[10px] xm:text-lg">{item.name}</span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
