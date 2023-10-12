import React from 'react'
import { NavLink } from 'react-router-dom'
import FormatPrice from '../helpers/FormatPrice';

const Product = (curElem) => {

    const { id, name, image, price, category } = curElem;

    return (
        <>
            <NavLink to={`/singleproduct/${id}`} className='no-underline text-black'>
                <div className='bg-white pt-3 px-3 pb-1 md:w-11/12 shadow-md mt-4 hover:scale-110'>
                    <figure className='relative'>
                        <img src={image} alt={name} className='h-44 w-64 md:h-48 md:w-80'/>
                        <figcaption className='absolute bg-white top-2 right-2 text-gray-500 rounded-xl w-fit px-3 py-1 text-sm'>{category}</figcaption>
                    </figure>
                    <div>
                        <div className='flex justify-between items-center'>
                            <p className='text-lg'>{name}</p>
                            <p className=' text-sm text-gray-400'><FormatPrice price={price} /></p>
                        </div>
                    </div>
                </div>
            </NavLink>
        </>
    )
}

export default Product