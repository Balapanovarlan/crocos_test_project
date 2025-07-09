'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { queryClient } from '@/app/utils/queryClient'
import { AuthProvider } from './context/AuthContext'
import NextTopLoader from 'nextjs-toploader'

type Props = { children: ReactNode }

export function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
         <NextTopLoader
          color="#171717"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={200}
          shadow="0 0 10px #2299DD,0 0 5px #2299DD"
        />
        {children}
        <ReactQueryDevtools initialIsOpen= {false}/>
      </AuthProvider>
    </QueryClientProvider>
  )
}