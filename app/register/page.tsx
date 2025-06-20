'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/app/context/useAuth'
import { useRouter } from 'next/navigation'

type RegisterForm = { email: string; password: string; confirm: string }

export default function RegisterPage() {
  const { login } = useAuth()  // если бек отдаёт залогиненного юзера сразу
  const router = useRouter()
  const [error, setError] = useState<string>()
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>()

  const onSubmit = async ({ email, password }: RegisterForm) => {
    try {
      // Вы можете иметь отдельный API /api/auth/register
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) throw new Error('Registration failed')
      // После регистрации сразу логиним
      await login(email, password)
      router.push('/')
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded">
      <h1 className="text-2xl mb-4">Register</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="block mb-2">
          Email
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="mt-1 w-full border rounded p-2"
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
