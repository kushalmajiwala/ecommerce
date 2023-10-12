import React from 'react'
import { NavLink } from 'react-router-dom'
import Nav from './Nav'

const Header = () => {
    return (
        <>
            <main className='bg-gray-100 flex justify-between items-center'>
                <NavLink to="/" className="md:hidden lg:block">
                    {/* eslint-disable-next-line */}
                    <img src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/unique_logo.jpg' className='w-42 h-20 p-2 rounded-3xl hidden md:block' alt='no-image'></img>
                </NavLink>
                <Nav />
            </main>
        </>
    )
}

export default Header