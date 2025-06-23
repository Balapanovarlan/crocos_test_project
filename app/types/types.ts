export type HeaderProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type SidebarProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

/** Тип товара в общем каталоге */
export interface Product {
  id: string
  name: string
  subtitle?: string
  price: number
  imageUrl: string    
}

/** Тип позиции в корзине */
export interface CartItem extends Product {
  quantity: number
  color?: string
  size?: string
}

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