import React from 'react'
import { ListBox } from 'primereact/listbox';
import { useState } from 'react';

const AddProduct = ({ navcolor, mode }) => {

  return (
    <>
      <div className='w-full pt-4 flex justify-center'>
        <div className='bg-white w-[90vw] md:w-[70vw] pb-14 shadow-md rounded-md'>
          <div className='border-b-2 h-20 flex justify-center items-center pt-2'>
            <p className='font-medium text-xl text-black'>ADD NEW PRODUCT</p>
          </div>
          <div className='md:flex justify-around items-center md:h-20'>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Name</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Company Name</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
          </div>
          <div className='md:flex justify-around items-center md:h-20'>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Price</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
            <div className='md:w-1/2 flex justify-center'>
              <div>
                <label htmlFor="value" className='text-black'>Product Category</label><br />
                <input type="text" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' />
                {/* <input type="color" value="#ff0000" className='w-64 md:w-96 bg-gray-200 h-10 p-1 cursor-pointer rounded-md' /> */}
              </div>
            </div>
          </div>
          <div className='md:flex justify-around items-center md:h-40'>
            <div className='md:w-full flex justify-center'>
              <div className=''>
                <label htmlFor="value" className='text-black'>Product Description</label><br />
                <textarea type="text" rows="5" className='w-64 md:w-[65vw] bg-gray-200 pl-3 rounded-md' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddProduct
