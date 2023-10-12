import React from 'react'
import { NavLink } from 'react-router-dom'
import { useOrderContext } from '../context/order_context';
import { useAuth0 } from "@auth0/auth0-react";
import OrderItem from './OrderItem';

const Orders = () => {
    const { order, total_order } = useOrderContext();
    const { isAuthenticated, user } = useAuth0();

    if (total_order === 0 || isAuthenticated === false) {
        return (
            <>
                <div className='flex justify-center'>
                    <div className='pt-14 pb-2'>
                        <figure className='flex justify-center'>
                            {/* eslint-disable-next-line */}
                            <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/no_order.jpg' alt='no-image' className=' w-36 h-36' />
                        </figure>
                        <p className=' text-gray-600 text-xl font-bold'>You Have Not Placed Any Orders!</p>
                        <div className='flex justify-center pt-2'>
                            <NavLink to="/products">
                                <button className='px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm'>SHOP NOW</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className='flex justify-center'>
                <div className='w-11/12 md:w-2/3 pt-2'>
                    {
                        order.map((curItem, index) => {
                            return <OrderItem key={index} {...curItem} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Orders