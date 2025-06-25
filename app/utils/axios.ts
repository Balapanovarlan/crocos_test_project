// src/app/utils/axios.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import {
  LoginRequest, LoginResponse,
  RefreshRequest, RefreshResponse,
  RegisterRequest,
  Cart, AddToCartRequest, CartItemResponse,
  Category, FilterOptions
} from '../types/types'
import { Product } from '../types/product'

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL!

// 1) Публичный API
export const publicApi = axios.create({ baseURL: BASE })

// 2) Приватный API — с интерцепторами для токена и автorefresh
export const privateApi = axios.create({ baseURL: BASE })

// request — приклеиваем accessToken
privateApi.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// response — при 401 пытаемся refresh + повтор запроса
privateApi.interceptors.response.use(
  r => r,
  async (error: AxiosError & { config?: InternalAxiosRequestConfig }) => {
    const orig = error.config
    if (
      error.response?.status === 401 &&
      orig &&
      !(orig as any)._retry
    ) {
      (orig as any)._retry = true
      const refresh = localStorage.getItem('refreshToken')
      if (!refresh) return Promise.reject(error)

      try {
        const { data } = await publicApi.post<RefreshResponse>(
          '/auth/refresh/',
          { refresh } as RefreshRequest
        )
        // сохраняем новые токены
        localStorage.setItem('accessToken', data.access)
        if (data.refresh) localStorage.setItem('refreshToken', data.refresh)

        // и повторяем исходный запрос уже с новым access
        orig.headers!['Authorization'] = `Bearer ${data.access}`
        return privateApi(orig)
      } catch {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

// ============ сейчас ниже все ваши fetch-функции ============

// Auth
export const fetchLogin = (data: LoginRequest): Promise<LoginResponse> =>
  publicApi.post<LoginResponse>('/auth/login/', data)
    .then(r => {
      localStorage.setItem('accessToken', r.data.access)
      localStorage.setItem('refreshToken', r.data.refresh)
      return r.data
    })

export const fetchRegister = (data: RegisterRequest): Promise<any> =>
  publicApi.post('/auth/register/', data).then(r => r.data)

export const fetchRefresh = (data: RefreshRequest): Promise<RefreshResponse> =>
  publicApi.post<RefreshResponse>('/auth/refresh/', data).then(r => r.data)

// Public data
export const fetchAllCategories = (): Promise<Category[]> =>
  publicApi.get<Category[]>('/store/categories/').then(r => r.data)

export const fetchAllProducts = (filters = {} as {
  category?: number; sizes?: string[]; color?: string[]; price_min?: number; price_max?: number
}): Promise<Product[]> => {
  const params = new URLSearchParams()
  if (filters.category)    params.append('category', String(filters.category))
  if (filters.sizes)       filters.sizes.forEach(s => params.append('sizes', s))
  if (filters.color)       filters.color.forEach(c => params.append('color', c))
  if (filters.price_min!=null) params.append('price_min', String(filters.price_min))
  if (filters.price_max!=null) params.append('price_max', String(filters.price_max))

  const q = params.toString()
  const url = q ? `/store/products/?${q}` : '/store/products/'
  return publicApi.get<Product[]>(url).then(r => r.data)
}

export const fetchProductDetail = (id: number): Promise<Product> =>
  publicApi.get<Product>(`/store/products/${id}/`).then(r => r.data)

export const fetchSearchResult = (q: string): Promise<Product[]> =>
  publicApi.get<Product[]>(`/store/search/?q=${q}`).then(r => r.data)

export const fetchFilterOptions = (): Promise<FilterOptions> =>
  publicApi.get<FilterOptions>('/store/filter-options/').then(r => r.data)

// Protected data
export function fetchCart(): Promise<Cart> {
  return privateApi.get<Cart>('/store/cart/').then(r => r.data)
}

export const fetchAddToCart = (payload: AddToCartRequest): Promise<CartItemResponse> =>
  privateApi.post<CartItemResponse>('/store/cart/add/', payload)
    .then(r => r.data)
