import React from 'react'
import { useFilterContext } from '../context/filtercontext';
import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
    const { filter_products, grid_view } = useFilterContext();

    if (filter_products.length === 0) {
        return (
            <>
                <div className='flex justify-center items-center  w-full h-96'>
                    <div className=''>
                        <p className=' text-gray-700 text-xl'>No Products Available!!!</p>
                    </div>
                </div>
            </>
        )
    }

    if (grid_view === true) {
        return <GridView products={filter_products} />
    }
    if (grid_view === false) {
        return <ListView products={filter_products} />
    }
}

export default ProductList