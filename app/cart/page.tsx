'use client'

import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '@/app/hooks/useAuth'
import { fetchCart, fetchUpdateCartItem } from '@/app/utils/axios'
import CardList from '../components/CardLIst/CardList'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import type { Cart, CartItem, CartItemResponse, UpdateCartItemRequest } from '../types/types'
import { FullScreenLoader } from '../components/FullLoader/FullLoader'

export default function CartPage() {
  const { access: token, initializing } = useAuth()
  const router = useRouter()
  const qc = useQueryClient()

  const [localItems, setLocalItems] = useState<CartItem[]>([])

  useEffect(() => {
    if (!initializing && !token) router.replace('/login')
  }, [initializing, token, router])

  const { data, isLoading, isError } = useQuery<Cart>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    enabled: !!token && !initializing,
  })

  useEffect(() => {
    if (data) {
      setLocalItems(data.items)
    }
  }, [data])

  const handleQuantityChange = (productId: number , newQuantity: number)=>{
    setLocalItems(prev=>
      prev.map(item => 
        item.product.id === productId
        ? {...item , quantity: newQuantity}
        :item
      )
    )
  } 

  const updateSingle = useMutation<CartItemResponse, Error, UpdateCartItemRequest>({
    mutationFn: ({ productId, quantity }) => fetchUpdateCartItem({ productId, quantity }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] }),
  })

  if (initializing || isLoading) return <FullScreenLoader/>
  if (isError || !data) return <p>Error loading cart</p>

  const cartItems: CartItem[] = data.items

  const subtotal = cartItems.reduce(
    (sum, { product, quantity }) => sum + Number(product.price) * quantity,
    0
  )
  const shipping = 10
  const total = subtotal + shipping

  const handleRemove = (id: number) => {
    // вызов fetchRemoveFromCart(id) и рефетч useQuery…
  }

  const handleContinue = async () => {
    try {
      await Promise.all(
        localItems.map(item =>
          updateSingle.mutateAsync({
            productId: item.product.id,
            quantity: item.quantity,
          })
        )
      )
      router.push('/checkout')
    } catch (e) {
      console.error('Не удалось обновить корзину:', e)
    }
  }

  return (
    <div className='flex justify-center w-full'>
      <div className='container flex flex-col items-center justify-around gap-10 xm:flex-row font-beatrice'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='uppercase pb-1 border-b-1'>Shopping bag</h1>
          <CardList
            variant='cart'
            items={localItems}
            onRemoveItem={handleRemove}
            onQuantityChange = {handleQuantityChange}
          />
        </div>

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
            <button
              className='uppercase bg-light-gray w-full py-3 hover:bg-gray-300 transition-colors duration-150 ease-in-out'
              onClick={handleContinue}
            >
              Continue
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}