'use client'

import axios from "axios"
import { useEffect } from "react"

export default function productDetail() {


    useEffect(()=>{
        const testAPI = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product/1`
        )
        console.log('Ответ сервера:', res.data)
      } catch (error) {
        console.error('Ошибка при запросе:', error)
      }
    }

    // testAPI()
    }, [])
    
  return (
    <div></div>
  )
}
