import React from 'react'

const Footer = () => {
  return (
    <footer className='py-10 px-5 bg-footer-gray  flex items-center  justify-center mt-auto'>
      <div className='flex w-full justify-evenly uppercase'>
        <div className='flex flex-col gap-3'>
          <h1 className='text-black/40'>info</h1>
          <div className='flex flex-col gap-1'>
            <span>pricing</span>
            <span>about</span>
            <span>contacts</span>          
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='text-black/40'>languages</h1>
          <div className='flex flex-col gap-1'>
            <span>KAZ</span>
            <span>RUS</span>
            <span>ENG</span>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='text-black/40 text-center'>technologies</h1>
          <div className='flex gap-5'>
            <div className='flex flex-col gap-1'>
              <span>React.js</span>
              <span>Next.js</span>
              <span>Tailwind.css</span> 
            </div>
            <div className='flex flex-col gap-1'>
              <span>Django</span>
              <span>SQLlite</span>
              <span>Python</span> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer