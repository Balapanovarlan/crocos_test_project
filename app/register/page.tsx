'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/app/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { fetchRegister } from '@/app/utils/axios'
import { RegisterRequest } from '../types/types'

type RegisterForm = {
  username: string
  password: string
  confirm: string
}

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()
  const [error, setError] = useState<string>()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<RegisterForm>()

  const onSubmit = async ({ username, password }: RegisterForm) => {
    try {
      await fetchRegister({ username, password } as RegisterRequest)

      await login(username, password)

      router.push('/')
    } catch (e: any) {
      setError(e.message || 'Registration failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2">
          Username
          <input
            type="text"
            {...register('username', { required: 'Username is required' })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.username && <p className="text-red-500">{errors.username.message}</p>}
        </label>

        <label className="block mb-2">
          Password
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </label>

        <label className="block mb-4">
          Confirm Password
          <input
            type="password"
            {...register('confirm', {
              required: 'Please confirm',
              validate: val => val === watch('password') || 'Passwords do not match'
            })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.confirm && <p className="text-red-500">{errors.confirm.message}</p>}
        </label>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded"
        >
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Уже есть аккаунт? <a href="/login" className="underline">Login</a>
      </p>
    </div>
  )
}
