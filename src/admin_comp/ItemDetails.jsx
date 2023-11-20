import React from 'react'
import { useProductContext } from '../context/productcontext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect } from 'react';
import MyImage from '../components/MyImage';
import Star from '../components/Star';
import FormatPrice from '../helpers/FormatPrice';

const API = "https://ngaxtqtjphtkyssalygr.supabase.co/rest/v1/product_details?id=eq.";

const ItemDetails = ({ id }) => {

    const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

    const {
        id: alias,
        name,
        company,
        price,
        description,
        category,
        stock,
        stars,
        reviews,
        image
    } = singleProduct;

    useEffect(() => {
        getSingleProduct(`${API}${id}&select=*`);
    }, [])

    if (isSingleLoading) {
        return (
            <>
                <div className='flex justify-center'>
                    <ProgressSpinner aria-label="Loading" />
                </div>
            </>
        )
    }

    return (
        <>
            <div className='flex justify-center pt-3'>
                <div className='p-3 md:flex md:w-5/6 md:justify-around md:p-10 md:items-center'>
                    <div className='md:w-1/2'>
                        <div>
                            <MyImage imgs={image} />
                        </div>
                    </div>
                    <div className='pt-3 md:w-1/2 md:pt-0'>
                        <p className=' text-3xl'>{name}</p>
                        <Star stars={stars} reviews={reviews} />
                        <div className='mt-3 font-semibold'>
                            MRP:
                            <del>
                                <FormatPrice price={price + 250000} />
                            </del>
                            <p className='text-blue-500 text-lg mt-3 font-semibold'>Deal of the Day: <FormatPrice price={price} /></p>
                            <p className='text-justify text-gray-500'>{description}</p>
                            <div className='flex mt-3 justify-between border-b-2'>
                                <div className=''>
                                    <div className='flex justify-center'>
                                        <i className="bi bi-truck text-black text-2xl bg-gray-200 px-2 py-1 rounded-full"></i>
                                    </div>
                                    <p className='text-center text-gray-500'>Free Delivery</p>
                                </div>
                                <div className=' '>
                                    <div className='flex justify-center'>
                                        <i className="bi bi-recycle text-black text-2xl bg-gray-200 px-2 py-1 rounded-full"></i>
                                    </div>
                                    <p className='text-center text-gray-500'>30 Days Replacement</p>
                                </div>
                                <div className=' '>
                                    <div className='flex justify-center'>
                                        <i className="bi bi-truck text-black text-2xl bg-gray-200 px-2 py-1 rounded-full"></i>
                                    </div>
                                    <p className='text-center text-gray-500'>Delivered</p>
                                </div>
                                <div className=' '>
                                    <div className='flex justify-center'>
                                        <i className="bi bi-shield-shaded text-black text-2xl bg-gray-200 px-2 py-1 rounded-full"></i>
                                    </div>
                                    <p className='text-center text-gray-500'>2 Year Warranty</p>
                                </div>
                            </div>
                            <div className='mt-4 border-b-2 pb-1'>
                                <p className=' -mt-2'><span className=' text-gray-500'>Available: </span><span className='font-semibold'> {stock > 0 ? "In Stock" : "Not Available"}</span> </p>
                                <p className=' -mt-2'><span className=' text-gray-500'>ID: </span><span className='font-semibold'> {id}</span> </p>
                                <p className=' -mt-2'><span className=' text-gray-500'>Brand: </span><span className='font-semibold'> {company} </span> </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemDetails