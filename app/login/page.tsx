'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'

type LoginForm = {
  username: string
  password: string
}

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string>()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginForm>()

  const onSubmit = async ({ username, password }: LoginForm) => {
    try {
      // вызываем login именно с username
      await login(username, password)
      router.push('/')          // или router.replace(nextFrom)
    } catch (e: any) {
      setError(e.message || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2">
          Username
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.username && (
            <p className="text-red-500">{errors.username.message}</p>
          )}
        </label>

        <label className="block mb-2">
          Password
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </label>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="mt-4 w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        No account?{' '}
        <a href="/register" className="underline">
          Register
        </a>
      </p>
    </div>
  )
}
