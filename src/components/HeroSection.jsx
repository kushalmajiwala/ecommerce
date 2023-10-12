import React from 'react'
import { NavLink } from 'react-router-dom'

const HeroSection = ({ myData }) => {

    const { name, image_url } = myData;

    return (
        <>
            <div className='flex justify-center pt-16 mb-5 md:mb-0 md:pt-20 pb-8'>
                <div className='inline-block md:flex md:justify-between md:w-2/3'>
                    <div className='w-screen -mt-8 md:mt-2 md:w-96 mb-5 2xl:w-1/2 2xl:mt-10'>
                        <p className='pl-5 text-purple-600'>welcome to</p>
                        <p className='pl-5 text-3xl -mt-5'>{ name }</p>
                        <p className='text-justify pl-5 pr-5'>This is our Unique Store Website where people can LOGIN
                            and purchase any products which are listed on our Website
                            All the products prices are affordable for the middle class
                            people.
                        </p>
                        <NavLink to='/products' className='no-underline shadow-sm text-white bg-blue-600 hover:bg-blue-500 rounded-md py-2 px-4 ml-5'>SHOP NOW</NavLink>
                    </div>
                    <div className='ml-5 pr-5 flex justify-center'>
                        {/* eslint-disable-next-line */}
                        <img className='w-auto h-56 shadow-lg md:h-64 rounded-xl 2xl:h-80' src={image_url} alt='no-image' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroSection