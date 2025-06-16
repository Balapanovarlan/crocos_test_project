'use client'

import Link from "next/link";
import React, { useState } from "react";

export type CardProps = {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  imageUrl: string;
  variant?: "products" | "cart";
  onRemove?: (id: string) => void;
  quantity?: number;
  color?: string;
  size?: string;
};

export default function CardItem({
  id,
  name,
  subtitle,
  price,
  imageUrl,
  variant = "products",
  onRemove,
  quantity = 1,
  color,
  size,
  onQuantityChange,
}: CardProps & { onQuantityChange?: (id: string, newQuantity: number) => void }) {

  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleIncrease = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    onQuantityChange && onQuantityChange(id, newQuantity);
  };

  const handleDecrease = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      onQuantityChange && onQuantityChange(id, newQuantity);
    }
  };

  const addToCart = (id : string) => {
    console.log(id);
    
  }

  return (
    <Link href={`/products/${id}`}>
    
      <div
        className={`
          relative
          flex ${variant === "cart" ? "flex-row gap-4 " : ""}
        `}
      >
        {/* Если корзина — показываем кнопку X */}
        {variant === "cart" && onRemove && (
          <button
            onClick={() => onRemove(id)}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        )}

        <div className="flex flex-col gap-2.5 ">
          {/* Изображение */}
          <img
            src={imageUrl}
            alt={name}
            className={
              "w-full max-w-[265px]  object-cover"
            }
          />
          {/* Контент */}
          <div
            className={`${
              variant === "cart" ? "flex-1" : ""
            }  flex flex-col gap-2.5`}
          >
            <div>
              <h3 className="text-[14px] text-black/66">{name}</h3>
              {subtitle && <p className="text-lg ">{subtitle}</p>}
            </div>

            <div className=" flex items-center justify-between">
              <span className="font-bold">${price}</span>
              {/* В каталоге можно, например, добавить в корзину */}
              {variant === "products" && (
                <button className="px-3 py-1 bg-black/80 text-white text-sm rounded hover:bg-gray-800"
                  onClick={e => {
                    e.preventDefault()      // отменяем переход
                    e.stopPropagation()     // не даём событию всплыть к Link
                    addToCart(id) 
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Если корзина — показываем цвет/размер/кол-во */}
        {variant === "cart" && (
          <div className="flex flex-col gap-4 text-sm justify-center">
            {size && <span>{size}</span>}
            {color && <span style={{backgroundColor: color,}} className={`w-6 h-6`}/>} 
            <div className="flex flex-col border border-t-btn-gray">
              <button className="px-2.5 py-2 border-b-1 hover:bg-gray-300 transition-colors ease-in-out" onClick={handleIncrease}>+</button>
              <span className="px-2.5 py-2 border-b-1">{localQuantity}</span>
              <button className="px-2.5 py-2 hover:bg-gray-300 transition-colors ease-in-out" onClick={handleDecrease}>-</button>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
