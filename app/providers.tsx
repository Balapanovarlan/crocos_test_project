'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/app/utils/queryClient'
import { AuthProvider } from './context/AuthContext'

type Props = { children: ReactNode }

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryClientProvider>
  )
}