import React from 'react'
import ProductList from './ProductList'
import Sort from './Sort'
import FilterSection from './FilterSection'

const Products = () => {
    return (
        <>
            <div className='flex justify-center'>
                <div className='w-5/6 md:flex md:w-11/12'>
                    <div className='w-2/6 md:block'>
                        <FilterSection />
                    </div>
                    <div className='w-full pt-3'>
                        <div className='md:-mt-3'>
                            <Sort />
                        </div>
                        <div className='w-full'>
                            <ProductList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Products