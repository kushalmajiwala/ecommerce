import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useWishlistContext } from '../context/wishlist_context';
import { NavLink } from 'react-router-dom'
import FormatPrice from '../helpers/FormatPrice';
import { useNavigate } from 'react-router-dom';
import { useCartContext } from '../context/cart_context';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { Button } from 'primereact/button';

const WishList = () => {

  const { wishlist, wishlist_total_item } = useWishlistContext();
  const { addToCartFromWishlist } = useCartContext();
  const { isAuthenticated, user } = useAuth0();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const navigate = useNavigate();
  const [deleteWishlistId, setDeleteWishlistId] = useState(0);

  const showWishlistItemDetails = (id) => {
    navigate("/singleproduct/" + id);
  }

  const addToCartOuter = async (id, color, quantity, wishlistItem) => {
    if (isAuthenticated) {
      addToCartFromWishlist(id, color, quantity, wishlistItem);
    }
    else {
      loginWithRedirect();
    }
  }

  const confirmDeleteWishlist = (id) => {
    setConfirmDelete(true);
    setDeleteWishlistId(id);
  }

  const wishlistDeleteConfirmed = () => {
    
  }

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

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='mt-3'>
          {
            wishlist.map((curElem, index) => {
              const { id, name, image, price, description, color, quantity } = curElem;
              return (
                <div className='flex justify-center'>
                  <div key={index} className='bg-white w-11/12 md:w-2/3 p-2 md:flex md:pt-5 mt-4 border-2'>
                    <div className=''>
                      <figure className='w-full md:w-[200px] flex items-center justify-center md:justify-start px-2 pt-2 mr-5'>
                        <img src={image} alt={name} className='w-5/6 md:w-[15vw] h-40' />
                      </figure>
                    </div>
                    <div className='pr-5 flex justify-start items-center'>
                      <div className='w-full -mt-2'>
                        <p className='text-2xl -mt-1'>{name}</p>
                        <p className='text-sm -mt-2 text-gray-400'><FormatPrice price={price} /></p>
                        <p className='test-sm -mt-4 text-justify'>{description.slice(0, 110)}</p>
                        <div className='md:flex'>
                          <div className='flex justify-around md:block'>
                            <button className='px-3 py-2.5 text-sm bg-blue-500 text-white hover:text-white hover:bg-blue-600' onClick={() => showWishlistItemDetails(id)}>
                              VIEW DETAILS
                            </button>
                            <NavLink to={isAuthenticated ? "/cart" : ""} className='no-underline px-3 py-2.5 ml-2 text-sm bg-green-600 text-white hover:text-white hover:bg-green-700' onClick={() => addToCartOuter(id, color, quantity, curElem)}>
                              ADD TO CART
                            </NavLink>
                          </div>
                          <div className='flex justify-center md:block mt-2 md:mt-0'>
                            <button className='px-3 py-2.5 ml-2 text-sm md:-mt-2 bg-red-500 text-white hover:text-white hover:bg-red-600' onClick={() => confirmDeleteWishlist(id)}>
                              REMOVE WISHLIST ITEM
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='dialogs'>
        <Dialog visible={confirmDelete} draggable={false} closable={false} className="w-11/12 md:w-1/2">
          <div className='flex justify-center'>
            <div className='text-center'>
              <i className="bi bi-exclamation-circle text-7xl text-yellow-500"></i>
              <p className="font-bold text-lg mt-4">
                Are you Sure you want to Remove Wishlist Item?
              </p>
            </div>
          </div>
          <div className='flex justify-end w-full'>
            <div className='flex justify-between w-56 md:w-52'>
              <Button label="YES, Remove IT" severity="danger" className='mr-2' onClick={() => wishlistDeleteConfirmed()} />
              <Button label="NO" severity="secondary" onClick={() => setConfirmDelete(false)} />
            </div>
          </div>
        </Dialog>
      </div>
    </>
  )
}

export default WishList