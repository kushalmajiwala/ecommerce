import React from 'react'
import { NavLink } from 'react-router-dom'
import { Badge } from 'primereact/badge';
import { useState } from 'react';
import { useCartContext } from '../context/cart_context';
import { useAuth0 } from "@auth0/auth0-react";
import supabase from "../helpers/supabase_setup";
import { useEffect } from 'react';

const Nav = () => {
    const { total_item } = useCartContext();
    const [navVisibility, setNavVisibility] = useState('hidden');
    const [showMenuBtn, setShowMenuBtn] = useState('');

    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();

    const loginWithGoogle = () => {
        loginWithRedirect();
        console.log('hello');
    }

    const logoutWithGoogle = () => {
        logout({ logoutParams: { returnTo: window.location.origin } });
        console.log("Loged out")
    }

    const updateNavVisibility = () => {
        if (navVisibility === 'hidden') {
            setNavVisibility('');
            setShowMenuBtn('hidden');
        }
        else {
            setNavVisibility('hidden');
            setShowMenuBtn('');
        }
    }

    return (
        <>
            <div className='sm:w-full lg:w-11/12'>
                <ul className='hidden md:flex justify-between items-center pr-4 md:p-3'>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2 hover:bg-gray-200 rounded-3xl'>
                        <NavLink to='/' className='no-underline text-gray-500 opacity-100'>HOME</NavLink>
                    </li>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2 hover:bg-gray-200 rounded-3xl'>
                        <NavLink to='/about' className='no-underline text-gray-500 opacity-100'>ABOUT</NavLink>
                    </li>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2 hover:bg-gray-200 rounded-3xl'>
                        <NavLink to='/products' className='no-underline text-gray-500 opacity-100'>PRODUCTS</NavLink>
                    </li>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2 hover:bg-gray-200 rounded-3xl'>
                        <NavLink to='/orders' className='no-underline text-gray-500 opacity-100'>ORDERS</NavLink>
                    </li>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2 hover:bg-gray-200 rounded-3xl'>
                        <NavLink to='/contact' className='no-underline text-gray-500 opacity-100'>CONTACT</NavLink>
                    </li>
                    {
                        isAuthenticated &&
                        <li className='p-2 text-center px-4 mt-2 text-gray-400 text-sm opacity-100'>
                            {user.name}
                        </li>
                    }
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4 mt-2'>
                        {isAuthenticated
                            ? <button className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4' onClick={logoutWithGoogle}>LOGOUT</button>
                            : <button className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4' onClick={loginWithGoogle}>LOGIN</button>
                        }
                    </li>
                    <li className='p-2 sm:w-24 lg:w-32 text-center lg:px-4'>
                        <NavLink to="/cart">
                            <i className="bi bi-cart p-overlay-badge text-3xl cursor-pointer text-gray-500 opacity-100 hover:text-black">
                                {isAuthenticated && <Badge value={total_item} severity="danger"></Badge>}
                            </i>
                        </NavLink>
                    </li>
                </ul>
                <div className=''>
                    <div className='flex w-screen justify-between items-center h-16 md:w-96 md:h-0'>
                        {/* eslint-disable-next-line */}
                        <img src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/unique_logo.jpg' className='w-42 h-20 rounded-3xl mt-4 p-2 md:hidden' alt='no-image'></img>
                        <i className={`bi bi-list cursor-pointer text-4xl mr-3 mt-4 ${showMenuBtn} md:hidden`} onClick={updateNavVisibility}></i>
                        <i className={`bi bi-x cursor-pointer text-5xl mr-2 mt-4 ${navVisibility} md:hidden`} onClick={() => updateNavVisibility()}></i>
                    </div>
                    <div className='inline-block md:flex text-center'>
                        <ul className={`${navVisibility} md:hidden pr-4 text-center text-2xl w-screen h-screen`} >
                            <li className='p-3 mt-2'>
                                <NavLink to='/' className='no-underline text-gray-500 opacity-100' onClick={updateNavVisibility}>HOME</NavLink>
                            </li>
                            <li className='p-3 mt-2'>
                                <NavLink to='/about' className='no-underline text-gray-500 opacity-100' onClick={updateNavVisibility}>ABOUT</NavLink>
                            </li>
                            <li className='p-3 mt-2'>
                                <NavLink to='/products' className='no-underline text-gray-500 opacity-100' onClick={updateNavVisibility}>PRODUCTS</NavLink>
                            </li>
                            <li className='p-3 mt-2'>
                                <NavLink to='/orders' className='no-underline text-gray-500 opacity-100' onClick={updateNavVisibility}>ORDERS</NavLink>
                            </li>
                            <li className='p-3 mt-2'>
                                <NavLink to='/contact' className='no-underline text-gray-500 opacity-100' onClick={updateNavVisibility}>CONTACT</NavLink>
                            </li>
                            {
                                isAuthenticated &&
                                <li className='p-2 text-center px-4 mt-2 text-gray-400 text-sm opacity-100'>
                                    {user.name}
                                </li>
                            }
                            <li className='p-3 mt-2'>
                                {isAuthenticated
                                    ? <button className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4' onClick={logoutWithGoogle}>LOGOUT</button>
                                    : <button className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4' onClick={loginWithGoogle}>LOGIN</button>
                                }                            </li>
                            <li className='p-3 mt-2'>
                                <NavLink to="/cart">
                                    <i className="bi bi-cart p-overlay-badge text-3xl cursor-pointer text-gray-500 opacity-100" onClick={updateNavVisibility}>
                                        {isAuthenticated && <Badge value={total_item} severity="danger"></Badge>}
                                    </i>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav