import { Product } from "./product";

export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Тип товара в общем каталоге */

export interface Category {
  id: number
  name: string
  slug: string
}


export interface FilterOptions {
  colors: [string, string][]        
  sizes: { slug: string; name: string }[]
  categories: { id: number; name: string }[]
}

export type CartItem = {
  id: number;
  product: Product;
  quantity: number;
};

export type Cart = {
  id: number;
  items: CartItem[];
};

export interface AddToCartRequest {
  product_id: number;
  quantity: number;
}

export interface CartItemResponse {
  product: Product;
  quantity: number;
}


export interface RegisterRequest {
  username: string
  email: string
  password: string
}