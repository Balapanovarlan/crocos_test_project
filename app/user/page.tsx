'use client'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

const user = () => {
    const {logout} = useAuth()
  return (
    <div >
        <button onClick={logout} className='py-2.5 px-4 border-transparent rounded-xl bg-red-600 text-white transition-opacity duration-200 ease-in hover:opacity-60'>Log Out</button>
    </div>
  )
}

export default user