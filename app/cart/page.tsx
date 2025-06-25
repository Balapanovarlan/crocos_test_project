'use client'

import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/app/hooks/useAuth'
import { fetchCart } from '@/app/utils/axios'
import CardList from '../components/CardLIst/CardList'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Cart, CartItem } from '../types/types'

export default function CartPage() {
  const { token } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!token) router.replace('/login')
  }, [token, router])

  const { data, isLoading, isError } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!token,
  })

  if (isLoading) return <p>Loading…</p>
  if (isError || !data) return <p>Error loading cart</p>

  // Получаем массив CartItem[]
  const cartItems: CartItem[] = data.items

  // Считаем subtotal
  const subtotal = cartItems.reduce(
    (sum, { product, quantity }) => sum + Number(product.price) * quantity,
    0
  )
  const shipping = 10
  const total = subtotal + shipping

  // Обработчик удаления (например)
  const handleRemove = (id: number) => {
    // вызов fetchRemoveFromCart(id) и рефетч useQuery…
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='container flex flex-col items-center justify-around gap-10 xm:flex-row font-beatrice'>
        {/* Список товаров */}
        <div className='flex flex-col items-center gap-4'>
          <h1 className='uppercase pb-1 border-b-1'>Shopping bag</h1>
          <CardList
            variant='cart'
            items={cartItems}           // вот он — CartItem[]
            onRemoveItem={handleRemove} // обязателен для variant="cart"
          />
        </div>

        {/* Order summary */}
        <div className='flex flex-col gap-6 border py-14 px-10'>
          <h1 className='uppercase font-bold'>Order summary</h1>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping</span>
              <span>${shipping}</span>
            </div>
          </div>
          <span className='w-full h-[1px] bg-gray-200'></span>
          <div className='flex w-full justify-between gap-14'>
            <div>
              <span className='font-bold'>TOTAL</span>
              <span className='text-shadow-btn-gray'>(TAX INCL.)</span>
            </div>
            <div>${total}</div>
          </div>
          <Link href='/checkout'>
            <button className='uppercase bg-light-gray w-full py-3 hover:bg-gray-300 transition-colors duration-150 ease-in-out'>
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
