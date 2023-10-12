import React from 'react'
import { useFilterContext } from '../context/filtercontext'
import FormatPrice from '../helpers/FormatPrice'

const FilterSection = () => {

  const { filters: { text, color, price, maxPrice, minPrice }, all_products, updateFilterValue, clearFilters, active_category } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((currElem) => {
      return currElem[property];
    });
    if (property === "colors") {
      return (newVal = ["All", ...new Set([].concat(...newVal))]);
      // newVal = newVal.flat(); 
    }
    else {
      return (newVal = ["All", ...new Set(newVal)]);
    }
  };

  const categoryOnlyData = getUniqueData(all_products, "category");
  const companyOnlyData = getUniqueData(all_products, "company");
  const colorsData = getUniqueData(all_products, "colors");

  console.log(colorsData);

  return (
    <>
      <div className='flex justify-start'>
        <div>
          <div className='pt-4'>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" name="text" value={text} placeholder="SEARCH" onChange={updateFilterValue} className="border-2 border-black py-1 px-2 mt-1" />
            </form>
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-5'>
        <div>
          <h4>Category</h4>
          <div className='grid grid-cols-1 text-left'>
            {
              categoryOnlyData.map((currElem, index) => {
                return <button key={index} name="category" value={currElem} onClick={updateFilterValue} className={active_category === currElem ? "text-left mt-2 text-lg text-blue-700 hover:text-blue-700 underline" : "text-left mt-2 text-lg text-gray-700 hover:text-blue-700"}>{currElem}</button>
              })
            }
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-5'>
        <div>
          <h4>Company</h4>
          <div className='pt-2'>
            <select name='company' id='company' className='px-2 py-1 border-2 border-gray-500 hover:cursor-pointer' onClick={updateFilterValue}>
              {
                companyOnlyData.map((currElem, index) => {
                  return <option key={index} name="company" value={currElem}>{currElem}</option>
                })
              }
            </select>
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-5'>
        <div>
          <h4>Colors</h4>
          <div className='mt-4 flex'>
            {
              colorsData.map((curColor, index) => {
                if (curColor === "All") {
                  return <button key={index} name="color" value={curColor} type='button' className='cursor-pointer w-7 h-7 rounded-full hover:opacity-60' onClick={updateFilterValue}>
                    All
                  </button>
                }
                return <button key={index} name="color" value={curColor} type='button' className='cursor-pointer w-7 h-7 rounded-full ml-2 hover:opacity-60' style={{ backgroundColor: curColor }} onClick={updateFilterValue}>
                  {color === curColor ? <i className="bi bi-check text-white"></i> : null}
                </button>
              })
            }
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-5'>
        <div>
          <h4>Price</h4>
          <div className='mt-4'>
            <p className='block'>
              <FormatPrice price={price} /><br/>
              <input type="range" name="price" min={minPrice} max={maxPrice} className="cursor-pointer" value={price} onChange={updateFilterValue}/>
            </p>
          </div>
        </div>
      </div>
      <div className='flex justify-start mt-4'>
        <div>
          <button className='text-center w-44 bg-orange-600 p-3 text-md text-white hover:bg-orange-500' onClick={clearFilters}>CLEAR FILTERS</button>
        </div>
      </div>
    </>
  )
}

export default FilterSection