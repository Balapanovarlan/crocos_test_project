import axios from 'axios'
import { Category } from '../types/types';
import { Product } from '../types/product';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchAllCategories = async (): Promise<Category[]> => {
  const {data} = await api.get<Category[]>('/store/categories/');
  return data;
}

export const fetchAllProducts = async (): Promise<Product[]> => {
  const {data} = await api.get<Product[]>('/store/products/');
  return data;
}

export const fetchProductDetail = async ( id : number): Promise<Product> => {
  const {data} = await api.get<Product>(`/store/products/${id}`);
  return data;
}

export const fetchSearchResult = async (q : string) : Promise<Product[]> => {
  const {data} = await api.get<Product[]>(`/store/search/?q=${q}`);
  return data;
}

