'use client'
import React, { useEffect, useState } from 'react'
import { Accordion } from '../Accordion/Accordion'
import PriceSlider from '../PriceSlider/PriceSlider';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { FilterOptions } from '@/app/types/types';
import { fetchFilterOptions } from '@/app/utils/axios';

export default function SidebarProducts() {

  const router = useRouter()
  const params = useSearchParams()

  const [selectedCategories , setSelectedCategories] = useState<string[]>([])
  const [selectedSizes , setSelectedSizes] = useState<string[]>([])
  const [selectedColor , setSelectedColor] = useState<string|null>(null)
  const [priceMin, setPriceMin] = useState<number>(0)
  const [priceMax, setPriceMax] = useState<number>(500)

  const {data: options, isLoading} = useQuery<FilterOptions>({queryKey: ['filterOptions'], queryFn: fetchFilterOptions})

  useEffect(() => {
    setSelectedCategories(params.getAll('category'))
    setSelectedSizes(params.getAll('sizes'))
    setSelectedColor(params.get('color'))
    const min = params.get('price_min')
    const max = params.get('price_max')
    setPriceMin(min ? Number(min) : 0)
    setPriceMax(max ? Number(max): 500)
  }, [params])
  
  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>{
    set(arr.includes(val)
      ? arr.filter(x => x !== val)
      : [...arr, val])
  }

  const apply = () => {
    const q = new URLSearchParams()
    selectedCategories.forEach(c => q.append('category', c))
    selectedSizes     .forEach(s => q.append('sizes',    s))
    if(selectedColor) q.append('color', selectedColor)
    if(priceMin!=null) q.append('price_min', String(priceMin))
    if(priceMax!=null) q.append('price_max', String(priceMax))
    router.push(`/products/?${q.toString()}`)
  }

  if (isLoading) return <p>Loading filters...</p>
  
  return (
    <div>
        <Accordion
        allowMultipleOpen
        items={[
          { id: "1", title: "Size", children: (
              <div className="flex flex-wrap gap-2 mt-2">
                {options?.sizes.map(size => (
                  <label key={size.slug} className="flex items-center gap-1">
                    <input
                      type="checkbox"
                      name="size"
                      checked = {selectedSizes.includes(size.slug)}
                      value={size.name}
                      className="h-4 w-4"
                      onChange={()=>toggle(selectedSizes, setSelectedSizes, size.slug)}
                    />
                     <span className="text-xs xm:text-lg">{size.name}</span>
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
          { id: "3", title: "Colors", children:
            (
              <div className=" flex flex-wrap gap-2 mt-2 ">
                <button className='w-20 text-sm border-transparent rounded hover:ring-2 active:ring-gray-700'
                  onClick={()=> setSelectedColor(null)}
                >All</button>
                {options?.colors.map(([slug, label]) => (
                  <label
                    key={slug}
                    className={`flex items-center justify-center w-20 cursor-pointer p-1 border-transparent rounded ${
                      selectedColor === slug ? 'ring-2 ring-gray-700' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      className="hidden"
                      value={slug}
                      checked={selectedColor === slug}
                      onChange={() => setSelectedColor(slug)}
                    />
                    <span
                      className="inline-block w-4 h-4"
                      style={{ backgroundColor: slug }}
                    />
                    <span className="ml-1">{label}</span>
                  </label>
                ))}
              </div>
            )
           },
          { id: "4", title: "Price Range", children:
             <PriceSlider
              min={0}
              max={500}
              step={10}
              value={[priceMin, priceMax]}
              onValueChange={([min, max])=>{
                setPriceMin(min)
                setPriceMax(max)
              }}
             />
            
          },
        ]}
      />
      <div className='pl-4 mt-4'>
        <button onClick={apply}
        className='text-lg py-2 px-4 bg-btn-gray hover:bg-btn-gray/40 transition-colors '>Apply Filter</button>
      </div>
    </div>
  )
}
