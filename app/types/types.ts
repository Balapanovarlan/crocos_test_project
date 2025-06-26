import { Product } from "./product";

export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface LoginRequest { username: string; password: string }
export interface LoginResponse { access: string; refresh: string }

export interface RefreshRequest { refresh: string }
export interface RefreshResponse { access: string; refresh?: string }

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

export interface UpdateCartRequest {
  items: Array<{
    product_id: number
    quantity: number
  }>
}

export interface UpdateCartItemRequest {
  productId: number
  quantity: number
}

export type UpdateCartItemResponse = CartItem