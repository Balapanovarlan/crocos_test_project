// src/app/context/AuthContext.tsx
'use client'
import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { fetchLogin, fetchRefresh } from '../utils/axios'
import { LoginRequest, LoginResponse } from '../types/types'
import { useRouter } from 'next/navigation'

interface AuthContextType {
  access: string | null
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  initializing: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [access, setAccess] = useState<string | null>(null)
  const [refresh, setRefresh] = useState<string | null>(null)
  const [initializing, setInitializing] = useState(true)

  const router  = useRouter()

  // При старте читаем их из localStorage
  useEffect(() => {
    const savedAccess = localStorage.getItem('accessToken')
    const savedRefresh = localStorage.getItem('refreshToken')
    setAccess(savedAccess)
    setRefresh(savedRefresh)

    // Если у нас есть refresh, но нет/просрочен access — пробуем обновить
    if (!savedAccess && savedRefresh) {
      fetchRefresh({ refresh: savedRefresh })
        .then((data) => {
          setAccess(data.access)
          localStorage.setItem('accessToken', data.access)
          // если бек отдаёт новый refresh — обновите и его
          if (data.refresh) {
            setRefresh(data.refresh)
            localStorage.setItem('refreshToken', data.refresh)
          }
        })
        .catch(() => {
          // не смогли обновить — сбрасываем всё
          setAccess(null)
          setRefresh(null)
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        })
        .finally(() => {
          setInitializing(false)
        })
    } else {
      setInitializing(false)
    }
  }, [])

  const login = async (username: string, password: string) => {
    const data: LoginResponse = await fetchLogin({ username, password } as LoginRequest)
    setAccess(data.access)
    setRefresh(data.refresh)
    localStorage.setItem('accessToken', data.access)
    localStorage.setItem('refreshToken', data.refresh)
  }

  const logout = () => {
    setAccess(null)
    setRefresh(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ access, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  )
}
