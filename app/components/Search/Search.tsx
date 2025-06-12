import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className='flex justify-between gap-3.5 pl-3.5 pr-5 pt-4 pb-3.5 w-full max-w-[367px] rounded bg-light-gray'>
        <button>
            <SearchIcon width={20}/>
        </button>
        <form >
            <input type="text" 
            placeholder='Search'
            className='text-right w-full'
            />
        </form>
    </div>
  )
}

export default Search