"use client";

import { Product } from "@/app/types/product";
import { AddToCartRequest } from "@/app/types/types";
import { fetchAddToCart } from "@/app/utils/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export type Variant = "products" | "cart";

export interface CardItemProps {
  product: Product;
  variant?: Variant;
  onRemove?: (id: number) => void;
  quantity?: number;
  color?: string;
  size?: string;
  onQuantityChange?: (id: number, newQty: number) => void;
}

export default function CardItem({
  product,
  variant = "products",
  onRemove,
  quantity = 1,
  color,
  size,
  onQuantityChange,
}: CardItemProps) {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  useEffect(() => {
    setLocalQuantity(quantity);
  }, [quantity]);

  const queryClient = useQueryClient();

  const addToCartMutation = useMutation({
    mutationFn: (payload: AddToCartRequest) => fetchAddToCart(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (err: Error) => {
      console.error("Add to cart failed", err);
    },
  });

  const handleIncrease = () => {
    const newQuantity = localQuantity + 1;
    setLocalQuantity(newQuantity);
    onQuantityChange && onQuantityChange(product.id, newQuantity);
  };

  const handleDecrease = () => {
    if (localQuantity > 1) {
      const newQuantity = localQuantity - 1;
      setLocalQuantity(newQuantity);
      onQuantityChange && onQuantityChange(product.id, newQuantity);
    }
  };

  const addToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCartMutation.mutate({
      product_id: product.id,
      quantity: localQuantity,
    });
  };

  return (
    <div
      className={`
          relative
          flex ${variant === "cart" ? "flex-row gap-4 " : ""}
        `}
    >
      <Link href={`/products/${product.id}`}>
        {/* Если корзина — показываем кнопку X */}
        {variant === "cart" && onRemove && (
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemove(product.id);
            }}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
          >
            ×
          </button>
        )}

        <div className="flex flex-col gap-2.5 ">
          {/* Изображение */}
          <img
            src={product.main_image}
            alt={product.title}
            className={"w-full max-w-[265px]  object-cover"}
          />
          {/* Контент */}
          <div
            className={`${
              variant === "cart" ? "flex-1" : ""
            }  flex flex-col gap-2.5`}
          >
            <div>
              <h3 className="text-[14px] text-black/66">{product.title}</h3>
              {/* {subtitle && <p className="text-lg ">{subtitle}</p>} */}
            </div>

            <div className=" flex items-center justify-between">
              <span className="font-bold">${product.price}</span>
              {/* В каталоге можно, например, добавить в корзину */}
              {variant === "products" && (
                <button
                  className="px-3 py-1 bg-black/80 text-white text-sm rounded hover:bg-gray-800"
                  onClick={(e) => {
                    e.preventDefault(); // отменяем переход
                    e.stopPropagation(); // не даём событию всплыть к Link
                    addToCart(e);
                  }}
                >
                  {addToCartMutation.isPending ? "Adding…" : "Add to Cart"}
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
      {/* Если корзина — показываем цвет/размер/кол-во */}
      {variant === "cart" && (
        <div className="flex flex-col gap-4 text-sm justify-center">
          {size && <span>{size}</span>}
          {color && (
            <span style={{ backgroundColor: color }} className={`w-6 h-6`} />
          )}
          <div className="flex flex-col border border-t-btn-gray">
            <button
              className="px-2.5 py-2 border-b-1 hover:bg-gray-300 transition-colors ease-in-out cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleIncrease();
              }}
            >
              +
            </button>
            <span className="px-2.5 py-2 border-b-1">{localQuantity}</span>
            <button
              className="px-2.5 py-2 hover:bg-gray-300 transition-colors ease-in-out cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleDecrease();
              }}
            >
              -
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
