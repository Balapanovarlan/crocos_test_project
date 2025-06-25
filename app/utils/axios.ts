import axios from 'axios'
import { Cart, AddToCartRequest, Category, FilterOptions, CartItemResponse, RegisterRequest } from '../types/types';
import { Product } from '../types/product';
import { access } from 'fs';

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fetchAllCategories = async (): Promise<Category[]> => {
  const {data} = await api.get<Category[]>('/store/categories/');
  return data;
}

type Filters = {
  category?:number
  sizes?: string[]
  color?: string[]
  price_min?: number
  price_max?:number
}

export async function fetchAllProducts(filters: Filters = {}): Promise<Product[]> {
  // Собираем параметры только для тех фильтров, что не пусты
  const params = new URLSearchParams()
 
  if(filters.category) params.append('category',String(filters.category))

  if (filters.sizes) {
    filters.sizes.forEach(s => params.append('sizes', s))
  }
  if (filters.color) {
    filters.color.forEach(c => params.append('color', c))
  }
  if (filters.price_min!=null) {
    params.append('price_min',String(filters.price_min))
  }
  if (filters.price_max!=null) {
    params.append('price_max',String(filters.price_max))
  }

  // Если params пуст — URLSearchParams.toString() вернёт ''
  // Так что запрос уйдёт на `/store/products/` без query
  const query = params.toString()
  const url = query ? `/store/products/?${query}` : `/store/products/`
  const { data } = await api.get<Product[]>(url)
  return data
}

export const fetchProductDetail = async ( id : number): Promise<Product> => {
  const {data} = await api.get<Product>(`/store/products/${id}`);
  return data;
}

export const fetchSearchResult = async (q : string) : Promise<Product[]> => {
  const {data} = await api.get<Product[]>(`/store/search/?q=${q}`);
  return data;
}

export const fetchFilterOptions = async () : Promise<FilterOptions> =>{
  const {data} = await api.get<FilterOptions>(`/store/filter-options/`);
  return data;
}

export const fetchProducts = async(filters: {
  category?: string
  sizes?: string[]
  color?: string[]
}) : Promise<Product[]> => {
  const params = new URLSearchParams()
  filters.sizes?.forEach(s => params.append('sizes', s))
  filters.color?.forEach(c => params.append('color', c))
  const {data} = await api.get(`/store/products/?${params.toString()}`);
  return data;
}


export const fetchRegister = async (registerData : RegisterRequest) : Promise<any> =>
{
  const {data} = await api.post(`auth/register/`, {
    username: `${registerData.username}`,
    email: `${registerData.email}` ,
    password: `${registerData.password}`,
  })
  return data;
}


export const fetchLogin = async (loginData : {
  username: string,
  password: string,
}) => 
{
  const {data} = await api.post(`auth/login/`, {
    username : `${loginData.username}`,
    password : `${loginData.password}`,
  })
  return data;
}


export async function fetchCart(): Promise<Cart> {
  const { data } = await api.get<Cart>('/store/cart/');
  return data;
}


export const fetchAddToCart = async (
  payload: AddToCartRequest
): Promise<CartItemResponse> => {
  const { data } = await api.post<CartItemResponse>(
    '/store/cart/add/',
    payload
  )
  return data
}