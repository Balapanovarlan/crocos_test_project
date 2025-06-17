'use client'

import React, { useMemo } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import {allCountries} from 'country-region-data'
import MaskedInput from '@/app/components/FormInputTest/FormInputTest'
import { formatPhoneRu } from '@/app/utils/formatPhone'

type FormValues = {
  email: string
  phone: string
  firstName: string
  lastName: string
  country: { value: string; label: string }
  region: { value: string; label: string }
  address: string
  city: string
  postalCode: string
	agree: boolean
}

export default function CheckoutPage() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { country: null, region: null , agree: false} as any,
  })

  const selectedCountry = watch('country')?.value
	const agree = watch('agree')
  // const countries = useMemo(() => countryList().getData(), [])
	 const countries = useMemo(() => {
    // allCountries.map(([name, slug]) => ({ value: slug, label: name }))
    return allCountries.map(([countryName, countrySlug]) => ({
      value: countrySlug,
      label: countryName,
    }))
  }, [])
 
	const regions = useMemo(() => {
    if (!selectedCountry) return []

    const entry = allCountries.find(tuple => tuple[1] === selectedCountry)
    if (!entry) return []

    return entry[2].map(([regionName, regionSlug]) => ({
      value: regionSlug,
      label: regionName,
    }))
  }, [selectedCountry])

  const onSubmit = (data: FormValues) => {
    console.log(' form data: ', data)
  }

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="text-3xl font-bold uppercase mb-6">checkout</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* CONTACT INFO */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              {...register('email', {
                required: 'Email required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Неверный формат email',
                },
              })}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">Phone</label>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: 'Number is required',
                minLength: { value: 10, message: 'Too short number' },
              }}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <MaskedInput
                  format={formatPhoneRu}
                  value={value || ''}
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1 block w-full border rounded p-2"
                />
              )}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* SHIPPING ADDRESS */}
        <div className="mt-8 space-y-4">
          {/* First / Last Name */}
          <div className="grid grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                {...register('firstName', { required: 'Required' })}
                className="mt-1 block w-full border rounded p-2"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                {...register('lastName', { required: 'Required' })}
                className="mt-1 block w-full border rounded p-2"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium">Country</label>
            <Controller
              name="country"
              control={control}
              rules={{ required: 'Select country' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={countries}
                  placeholder="Select country..."
                  instanceId="country-select"
                  className="mt-1"
                />
              )}
            />
            {errors.country && (
              <p className="text-red-500 text-sm">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium">State / Region</label>
            <Controller
              name="region"
              control={control}
              rules={{ required: 'Select Region' }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={regions}
                  isDisabled={!selectedCountry}
                  placeholder={
                    selectedCountry
                      ? 'Select Region...'
                      : 'Country first'
                  }
                  instanceId="region-select"
                  className="mt-1"
                />
              )}
            />
            {errors.region && (
              <p className="text-red-500 text-sm">
                {errors.region.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              {...register('address', { required: 'Обязательно' })}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City / Postal Code */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                {...register('city', { required: 'Обязательно' })}
                className="mt-1 block w-full border rounded p-2"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">
                Postal Code
              </label>
              <input
                {...register('postalCode', { required: 'Обязательно' })}
                className="mt-1 block w-full border rounded p-2"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </p>
              )}
            </div>
          </div>
        </div>

       <div className="mt-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              {...register('agree', { required: 'Need permission' })}
              className="h-4 w-4 text-black border rounded"
            />
            <span className="ml-2 text-sm">
              I agree to the {' '}
              <a href="/terms" className="underline">
                Terms Of Service
              </a>
            </span>
          </label>
          {errors.agree && (
            <p className="text-red-500 text-sm mt-1">
              {errors.agree.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!agree}
          className={`mt-6 w-full py-3 rounded text-white transition-colors ${
            agree ? 'bg-black hover:bg-gray-800' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Shipping →
        </button>
      </form>
    </section>
  )
}
