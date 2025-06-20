// components/CardList.tsx
import React from 'react'
import { Product } from '@/app/types/product'
import CardItem from '../CardItem/CardItem'


type CardListProps = {
  items: Product[]
  variant?: 'products' | 'cart'
  onRemoveItem?: (id: number) => void
}

export default function CardList({ items, variant = 'products', onRemoveItem }: CardListProps) {
  return (
    <div
      className={`
        container flex flex-wrap justify-center gap-6
        ${variant === 'products' ? '' : ''}
      `}
    >
      {items.map(item => (
        <CardItem
          key={item.id}
          product={item}
          variant={variant}
          onRemove={variant === 'cart' ? onRemoveItem : undefined}
        />
      ))}
    </div>
  )
}
