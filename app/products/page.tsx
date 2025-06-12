import Search from '../components/Search/Search'
import CategoryList from '../components/CategoryList/CategoryList'
import { ArrowRight } from 'lucide-react'
import SidebarProducts from '../components/SidebarProducts/SidebarProducts'
import CardList from '../components/CardLIst/CardList'

export default function Products() {
  return (
    <section className='container m-auto flex flex-col items-center gap-3 pt-9 px-4 font-beatrice '>
      <div className='flex flex-col justify-center items-center gap-1.5'>
          <h2 className='text-xs'>Home <span className='font-bold'>/ Products</span></h2>
          <h1 className='text-xl font-bold'>Products</h1>
      </div>
			<Search/>
			<CategoryList/>
			<CardList/>
			{/* <SidebarProducts/> */}
    </section>
  )
}



