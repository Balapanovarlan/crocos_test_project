// components/CardList.tsx
import React from 'react'
import CardItem, { CardProps } from '../CardItem/CardItem'


type CardListProps = {
  items: CardProps[]
  variant?: 'products' | 'cart'
  onRemoveItem?: (id: string) => void
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
          {...item}
          variant={variant}
          onRemove={variant === 'cart' ? onRemoveItem : undefined}
        />
      ))}
    </div>
  )
}
