import React from 'react'
import { useReturnContext } from '../context/return_context'
import ReturnItem from './ReturnItem';

const ReturnProduct = ({ navcolor, mode }) => {

  const { return_products, return_products_total_item } = useReturnContext();

  if (return_products_total_item === 0) {
    return (
      <>
        <div className='w-full'>
          <div className='flex justify-center pt-[35vh]'>
            {
              mode == "light" ?
                <p className='font-semibold text-xl text-black'>NO RETURN PRODUCTS</p>
                :
                <p className='font-semibold text-xl text-white'>NO RETURN PRODUCTS</p>
            }
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div>
        <div>
          <div className='flex justify-center'>
            <div className='w-11/12 md:w-3/4 pt-2'>
              {
                return_products.map((curItem, index) => {
                  return <ReturnItem key={index} {...curItem} navcolor={navcolor} mode={mode} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReturnProduct