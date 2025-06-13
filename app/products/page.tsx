'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

import Search from '../components/Search/Search'
import CategoryList from '../components/CategoryList/CategoryList'
import SidebarProducts from '../components/SidebarProducts/SidebarProducts'
import CardList from '../components/CardLIst/CardList'

export default function Products() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="flex flex-col xm:flex-row font-beatrice">
        <main className="flex-1 flex flex-col">
        {/* ——— MOBILE HEADER: заголовок + поиск ——— */}
        <div className=" flex flex-col items-center gap-1.5 ">
          <h2 className="text-xs">
            Home <span className="font-bold">/ Products</span>
          </h2>
          <h1 className="text-xl font-bold">Products</h1>
          <div className='xm:hidden'>
            <Search  />
          </div>
        </div>

        {/* ——— CONTROLS: поиск, категории и кнопка (mobile & desktop) ——— */}
        <div className="flex flex-col xm:items-center xm:flex-row xm:justify-evenly gap-4 px-4 py-3">
          <button
            onClick={() => setFiltersOpen(prev => !prev)}
            className="
              flex items-center gap-0.5 xm:gap-2
              px-3 py-1.5
              text-xs font-medium xm:text-lg
              transition-colors duration-200
              hover:bg-gray-100
              focus:outline-none focus:ring-2 focus:ring-offset-1
            "
          >
            <ArrowRight
              className={`
                h-4 w-4 transform transition-transform duration-200
                ${filtersOpen ? 'rotate-180' : 'rotate-0'}
              `}
            />
            <span>{filtersOpen ? 'Close filter' : 'Open filter'}</span>
          </button>
          <div className='flex justify-center xm:hidden'>
            <CategoryList />
          </div>     
          <div className='hidden xm:block'>
            <Search />
          </div>    
          <div className="hidden xm:block">
            <CategoryList />
          </div>  
          {/* Кнопка открытия/закрытия */}
        </div>

        <div className='flex justify-center'>
          {/* ——— MOBILE FILTER PANEL (сразу под кнопкой) ——— */}
          {filtersOpen && (
            <aside className="xm:w-1/3 w-1/2 pt-6 ">
              <SidebarProducts />
            </aside>
          )}

          {/* ——— CARD LIST ——— */}
          {filtersOpen&& (
            <section className="w-1/2 xm:px-4 py-6 xm:w-auto">
              <CardList />
            </section>
          )}
          {
            !filtersOpen&&(
            <section className="xm:px-4 py-6 ">
              <CardList />
            </section>
            )
          }
        </div>
      </main>
    </div>
  )
}
