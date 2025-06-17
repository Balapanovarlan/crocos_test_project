import { cartItems } from '@/mockdata'
import CardList from '../components/CardLIst/CardList'
import Link from 'next/link'

export default function cartPage() {
  return (
    <div className='flex justify-center w-full'>
      <div className='container flex flex-col items-center justify-around gap-10 xm:flex-row font-beatrice'>
          <div className='flex flex-col items-center gap-4'>
            <h1 className='uppercase pb-1 border-b-1 '>Shopping bag</h1>
            <CardList variant = 'cart' items = {cartItems}/>
          </div> 

          <div className='flex flex-col gap-6 border py-14 px-10'>
            <h1 className='uppercase font-bold text-'>order summary</h1>
            <div className='flex flex-col gap-2'>
              <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>$180</span>
              </div>
              <div className='flex justify-between'>
                <span>Shipping</span>
                <span>$10</span>
              </div>
            </div>
            <span className='w-full h-[1px]'></span>
            <div className='flex w-full justify-between gap-14'>
              <div>
                <span className='font-bold'>TOTAL</span>
                <span className='text-shadow-btn-gray'>{'(TAX INCL.)'}</span>
              </div>
              <div>$190</div>
            </div>
            <Link href={'/checkout'}> 
              <button className='uppercase bg-light-gray w-full py-3 hover:bg-gray-300 transition-colors duration-150 ease-in-out'>continue</button>
            </Link>
          </div>
      </div>
    </div>
  )
}
