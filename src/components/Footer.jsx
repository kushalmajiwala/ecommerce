import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <div className='w-auto bg-gray-800 flex justify-center mt-32'>
                <div className='w-3/4 p-8 bg-gray-100 rounded-lg inline-block md:flex justify-around items-center -mt-20 md:-mt-14'>
                    <div className=''>
                        <h6 className='text-center'>Ready to get started?</h6>
                        <h6 className='text-center'>Talk to us today</h6>
                    </div>
                    <div className='mt-3 flex justify-center items-center'>
                        <NavLink to='/contact' className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4 md:-mt-3'>GET STARTED</NavLink>
                    </div>
                </div>
            </div>
            <div className='w-auto bg-gray-800 flex justify-center md:py-10'>
                <div className=' w-3/4 md:flex justify-between'>
                    <div className='text-white md:w-1/4 text-sm p-10 text-justify'>
                        <h6>Unique Stores</h6>
                        <p>Unique Store is the website to purchase any products online.</p>
                    </div>
                    <div className='text-white -mt-12 md:-mt-0 md:w-1/4 text-sm p-10'>
                        <p>Subscribe to get important updates</p>
                        <input placeholder="YOUR E-MAIl" className='p-2'></input><br /><br />
                        <NavLink to='/' className='no-underline text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4'>SUBSCRIBE</NavLink>
                    </div>
                    <div className='text-white -mt-10 md:-mt-0 md:w-1/4 text-sm p-10 text-justify'>
                        <p>follow us</p>
                        <div className=' w-2/3 md:w-4/5 flex justify-between'>
                            <i className="bi bi-linkedin px-2 py-1.5 border-2 rounded-full cursor-pointer hover:bg-gray-700"></i>
                            <i className="bi bi-instagram px-2 py-1.5 border-2 rounded-full cursor-pointer hover:bg-gray-700"></i>
                            <i className="bi bi-youtube px-2 py-1.5 border-2 rounded-full cursor-pointer hover:bg-gray-700"></i>
                        </div>
                    </div>
                    <div className='text-white -mt-12 md:-mt-0 md:w-1/4 text-sm p-10 text-justify'>
                        <p>Call us</p>
                        <p>+91 9106884674</p>
                    </div>
                </div>
            </div>
            <div className='text-white bg-gray-800 border-t-2 p-4 flex justify-center items-center'>
                <div className='h-11/12 w-11/12 md:flex justify-around'>
                    <div className='flex items-center'>
                        <p>@2023 UniqueStore. All Rights Reserved</p>
                    </div>
                    <p className='text-center'>PRIVACY POLICY<br /> TERMS & CONDITIONS</p>
                </div>
            </div>
        </>
    )
}

export default Footer