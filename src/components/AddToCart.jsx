import React from 'react'
import { useState } from 'react';
import CartAmountToggle from './CartAmountToggle';
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../context/cart_context';
import { useAuth0 } from "@auth0/auth0-react";

const AddToCart = ({ product }) => {
    const { addToCart } = useCartContext();
    const { isAuthenticated, loginWithRedirect, user } = useAuth0();

    const { id, colors, stock } = product;
    const [color, setColor] = useState(colors[0]);
    const [quantity, setQuantity] = useState(1);

    const setDecrease = () => {
        quantity > 1 ? setQuantity(quantity - 1) : setQuantity(1);
    }
    const setIncrease = () => {
        quantity < stock ? setQuantity(quantity + 1) : setQuantity(stock);
    }

    const addToCartOuter = async () => {
        if (isAuthenticated) {
            addToCart(id, color, quantity, product);
        }
        else {
            loginWithRedirect();
        }
    }

    return (
        <>
            <div>
                <div className='flex'>
                    <p>Colors:</p>
                    <div className='flex'>
                        {
                            colors.map((curColor, index) => {
                                return (
                                    <button key={index} className='cursor-pointer w-7 h-7 rounded-full ml-2 hover:opacity-60' onClick={() => setColor(colors[index])} style={{ backgroundColor: curColor }}>
                                        {color === curColor ? <i className="bi bi-check text-white"></i> : null}
                                    </button>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='mt-2'>
                <CartAmountToggle quantity={quantity} setDecrease={setDecrease} setIncrease={setIncrease} />
            </div>
            <div className='mt-4'>
                <NavLink to={isAuthenticated ? "/cart" : ""} onClick={addToCartOuter} className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4'>ADD TO CART</NavLink>
            </div>
        </>
    )
}

export default AddToCart