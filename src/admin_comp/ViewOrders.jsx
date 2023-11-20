import React from 'react'
import { useAdminContext } from '../context/admin_context';
import OrderItem from './OrderItem';

const ViewOrders = ({ navcolor, mode }) => {

  const { order, total_order } = useAdminContext();


  if (total_order === 0) {
    return (
      <>
        <div className='w-full'>
          <div className='flex justify-center pt-[35vh]'>
            {
              mode == "light" ?
                <p className='font-semibold text-xl text-black'>NO ORDERS PLACED</p>
                :
                <p className='font-semibold text-xl text-white'>NO ORDERS PLACED</p>
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
                order.map((curItem, index) => {
                  return <OrderItem key={index} {...curItem} navcolor={navcolor} mode={mode} />
                })
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ViewOrders