'use client'
import React from 'react'
import { Accordion } from '../Accordion/Accordion'
import PriceSlider from '../PriceSlider/PriceSlider';

const colorsArr = [
    { title: 'White',   hex: '#FFFFFF' },
    { title: 'Black',   hex: '#000000' },
    { title: 'Red',     hex: '#FF0000' },
    { title: 'Green',   hex: '#00FF00' },
    { title: 'Blue',    hex: '#0000FF' },
    { title: 'Yellow',  hex: '#FFFF00' },
    { title: 'Cyan',    hex: '#00FFFF' },
    { title: 'Magenta', hex: '#FF00FF' },
    { title: 'Orange',  hex: '#FFA500' },
    { title: 'Gray',    hex: '#808080' },
];

export default function SidebarProducts() {
  return (
    <div>
        <Accordion
        allowMultipleOpen
        items={[
          { id: "1", title: "Size", children: (
              <div className="flex flex-wrap gap-2 mt-2">
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map(size => (
                  <label key={size} className="flex items-center gap-1">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      className="h-4 w-4"
                    />
                     <span className="text-xs xm:text-lg">{size}</span>
                  </label>
                ))}
              </div>
            ) },
          { id: "2", title: "Availability", children: (
              <div className="flex flex-col mt-2 space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="inStock"
                    className="h-2.5 w-2.5 xm:h-4 xm:w-4"
                  />
                   <span className="text-xs xm:text-lg">Availability</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="outOfStock"
                    className="h-2.5 w-2.5 xm:h-4 xm:w-4"
                  />
                  <span className="text-xs xm:text-lg">Out of Stock</span>
                </label>
              </div>
            ), },
          // { id: "3", title: "Category", children:
          //   <div className='flex flex-col gap-2'>{categoryArr.map((item)=>(
          //     <label key={item.title} className="flex items-center gap-2">
          //         <input
          //           type="checkbox"
          //           name={item.title}
          //           className="h-4 w-4"
          //         />
          //         <span className="text-xs xm:text-lg">{item.title}</span>
          //     </label>
          //   ))}</div>
          //  },
          { id: "4", title: "Colors", children:
            <div className='flex flex-col gap-2'>
              {colorsArr.map((item)=>(
                <div key={item.title} className='flex items-center gap-1'>
                  <span style={{backgroundColor: item.hex}} className={`w-4 h-4`} />
                  <span className='text-xs xm:text-lg' >{item.title}</span>
                </div>
              ))}
            </div>
           },
          { id: "5", title: "Price Range", children: <PriceSlider/> },
        ]}
      />
    </div>
  )
}
