import React from 'react'
import { useProductContext } from '../context/productcontext';
import Product from './Product';
import { ProgressSpinner } from 'primereact/progressspinner';

const FeatureProduct = () => {

    const { isLoading, featureProducts } = useProductContext();

    if (isLoading) {
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
            <div className='bg-gray-100 flex justify-center p-14 md:py-24'>
                <div className='md:pl-12 md:w-5/6'>
                    <div className=''>
                        <div>
                            <p className='text-sm text-purple-500'>CHECK NOW!</p>
                            <p className='-mt-5 text-2xl md:text-3xl'>Our Feature Services</p>
                        </div>
                    </div>
                    <div className='md:flex md:justify-between'>
                        {
                            featureProducts.map((curElem) => {
                                return <Product key={curElem.id} {...curElem} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default FeatureProduct