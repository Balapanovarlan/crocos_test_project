import Image from 'next/image'
import burgerMenuIcon from '@/public/icons/burger_menu.svg'
import logo from '@/public/icons/logo.svg'
import { ShoppingBagIcon, User } from 'lucide-react'

export const Header = () => {
  return (
    <header className='py-7 px-4.5 relative'>
      <div className='flex items-center justify-between'>
        <button><Image src={burgerMenuIcon} alt='Menu'/></button>
        <div className='absolute left-1/2 transform -translate-x-1/2'>
          <Image src={logo} alt='Logo' width={29} height={29} />
        </div>
        <div className='flex items-center gap-1.5'>
          <a className='border-[7px] border-black rounded-full'>
            <div className='p-2.25 rounded-full text-xs'>
               <ShoppingBagIcon width={10} height={10}/>
             </div>
          </a>
          <a href="" className='bg-black p-[15px] text-white  rounded-full '>
            <User width={10} height={10}/>
          </a>
        </div>
        
      </div>
    </header>
  )
}
