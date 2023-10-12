import React from 'react'
import { useFilterContext } from '../context/filtercontext'

const Sort = () => {

  const { filter_products, grid_view, setGridView, setListView, sorting } = useFilterContext();

  return (
    <>
      <div className='flex justify-center w-full pt-3 pb-4'>
        <div className='md:flex justify-between w-full'>
          <div className="flex justify-between w-full md:w-3/5">
            <div className='flex items-center md:w-1/3 pt-2'>
              <button onClick={setGridView} className={grid_view ? 'bg-black text-white text-xl px-2 py-1' : 'bg-gray-200 text-black text-xl px-2 py-1'}><i className="bi bi-grid"></i></button>
              <button onClick={setListView} className={grid_view ? 'bg-gray-200 ml-2 text-black text-xl px-2 py-1' : 'bg-black ml-2 text-white text-xl px-2 py-1'}><i className="bi bi-list"></i></button>
            </div>
            <div className='pt-2 md:flex justify-center items-center text-lg md:pr-5'>
              {filter_products.length} products available
            </div>
          </div>
          <div className='pt-3 md:w-1/3 md:flex justify-center items-center md:pl-10'>
            <form action='#'>
              <label htmlFor='sort'></label>
              <select name='sort' id='sort' className='px-2 py-1 border-2 border-gray-500 hover:cursor-pointer' onClick={sorting}>
                <option value="" disabled selected>Select Criteria</option>
                <option value="lowest">Price(lowest)</option>
                <option value="highest">Price(highest)</option>
                <option value="z-a">Name(z-a)</option>
                <option value="a-z">Name(a-z)</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sort