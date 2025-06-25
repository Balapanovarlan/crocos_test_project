// components/CardList.tsx
'use client'
import React from 'react'
import { Product } from '@/app/types/product'
import { CartItem } from '@/app/types/types'
import CardItem from '../CardItem/CardItem'

export type CardListProps =
  | {
      variant?: 'products'
      items: Product[]
      onRemoveItem?: never
    }
  | {
      variant: 'cart'
      items: CartItem[]
      onRemoveItem: (id: number) => void
    }

export default function CardList(props: CardListProps) {
  // дискриминируем по props.variant
  const isCart = props.variant === 'cart'

  return (
    <div className="container flex flex-wrap justify-center gap-6">
      {isCart ? (
        // режим корзины
        props.items.map(item => (
          <CardItem
            key={item.id}
            product={item.product}    
            variant="cart"
            quantity={item.quantity}
            onRemove={() => props.onRemoveItem(item.id)}
          />
        ))
      ) : (
        // режим каталога
        props.items.map(prod => (
          <CardItem
            key={prod.id}
            product={prod}
            variant="products"
          />
        ))
      )}
    </div>
  )
}
