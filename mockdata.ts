import type { Product, CartItem } from '@/app/types/types'


export const products: Product[] = [
  {
    id: '1',
    name: 'Cotton T-Shirt',
    subtitle: 'Basic Slim Fit',
    price: 40,
    imageUrl: '/images/product_1.png', 
  },
  {
    id: '2',
    name: 'Crewneck T-Shirt',
    subtitle: 'Heavy Weight',
    price: 50,
    imageUrl: '/images/product_2.png',
  },
  {
    id: '3',
    name: 'Cotton T-Shirt',
    subtitle: 'Regular Fit',
    price: 50,
    imageUrl: '/images/product_3.png',
  },
  {
    id: '4',
    name: 'Chino Shirt',
    subtitle: 'Summer Style',
    price: 60,
    imageUrl: '/images/product_4.png',
  },
  {
    id: '5',
    name: 'Polo Shirt',
    subtitle: 'Classic Collar',
    price: 65,
    imageUrl: '/images/product_5.png',
  },
]

export const cartItems: CartItem[] = [
  {
    ...products[0],
    quantity: 2,
    color: 'black',
    size: 'L',
  },
  {
    ...products[2],
    quantity: 1,
    color: '#1E90FF',
    size: 'M',
  },
  {
    ...products[3],
    quantity: 1,
    color: '#1E90FF',
    size: 'M',
  },
  {
    ...products[4],
    quantity: 1,
    color: '#1E90FF',
    size: 'M',
  },
]
