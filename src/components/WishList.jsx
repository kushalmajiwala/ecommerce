import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useWishlistContext } from '../context/wishlist_context';
import { NavLink } from 'react-router-dom'

const WishList = () => {

  const { wishlist, wishlist_total_item } = useWishlistContext();
  const { isAuthenticated, user } = useAuth0();

  if (wishlist_total_item === 0 || isAuthenticated === false) {
    return (
      <div className='flex justify-center'>
        <div className='pt-14 pb-2'>
          <figure className='flex justify-center'>
            {/* eslint-disable-next-line */}
            <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/no_wishlist.png' alt='no-image' className=' w-36 h-36' />
          </figure>
          <p className=' text-gray-600 text-xl font-bold'>Your Wishlist Is Empty</p>
          <div className='flex justify-center pt-2'>
            <NavLink to="/products">
              <button className='px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm'>ADD WISHLIST</button>
            </NavLink>
          </div>
        </div>
      </div>
    )
  }
}

export default WishList