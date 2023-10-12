import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { useProductContext } from '../context/productcontext';
import PageNavigation from './PageNavigation';
import { ProgressSpinner } from 'primereact/progressspinner';
import MyImage from './MyImage';
import FormatPrice from '../helpers/FormatPrice';
import Star from './Star';
import AddToCart from './AddToCart';

// const API = "https://api.pujakaitem.com/api/products";

const API = "https://ngaxtqtjphtkyssalygr.supabase.co/rest/v1/single_product?id=eq.";

const SingleProduct = () => {

    const { getSingleProduct, isSingleLoading, singleProduct } = useProductContext();

    const { id } = useParams();

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
            <div className='text-xl bg-gray-100 p-3'>
                <PageNavigation title={name} />
            </div>
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
                            <div className='mt-3'>
                                {stock > 0 && <AddToCart product={singleProduct}/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProduct