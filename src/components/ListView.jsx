import React from 'react'
import Product from './Product'
import FormatPrice from '../helpers/FormatPrice'
import { NavLink } from 'react-router-dom'

const ListView = ({ products }) => {
  return (
    <>
      <div className='flex justify-center md:hidden'>
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {
            products.map((curElem) => {
              return <Product key={curElem.id} {...curElem} />
            })
          }
        </div>
      </div>
      <div className='flex justify-center'>
        <div className='w-full'>
          {
            products.map((curElem, index) => {
              const { id, name, image, price, description, category } = curElem;
              return (
                <div key={index} className='bg-white w-full p-2 hidden md:flex md:justify-between md:px-5 md:pt-5 pb-3 border-2 border-gray-100 mt-4'>
                  <figure className='relative md:w-1/2 flex items-center px-2 pt-2'>
                    <img src={image} alt={name} className='w-60 h-40' />
                  </figure>
                  <div className='md:w-1/2 pr-5 flex items-center'>
                    <div className='w-full'>
                      <p className='text-2xl -mt-1'>{name}</p>
                      <p className='text-sm -mt-2 text-gray-400'><FormatPrice price={price} /></p>
                      <p className='test-sm -mt-4 text-justify'>{description.slice(0, 90)}</p>
                      <NavLink to={`/singleproduct/${id}`}>
                        <button className='px-3 py-2.5 -mt-2 text-sm bg-blue-500 text-white hover:text-white hover:bg-blue-600'>
                          READ MORE
                        </button>
                      </NavLink>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ListView