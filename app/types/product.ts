export interface Category {
  id: number
  name: string
  slug: string
}

export interface ProductImage {
  id: number
  image: string
  order: number
}

export interface Size {
  id: number
  name: string
  slug: string
}

export interface Product {
  id: number
  title: string
  description: string
  price: string    
  category: Category
  main_image: string
  images: ProductImage[]
  available: boolean
  color: string
  sizes: Size[]
}