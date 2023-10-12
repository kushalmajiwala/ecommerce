import React from 'react'
import Product from './Product'

const GridView = ({ products }) => {
    return (
        <>
            <div className='flex justify-center w-full'>
                <div className='grid grid-cols-1 md:grid-cols-3'>
                    {
                        products.map((curElem) => {
                            return <Product key={curElem.id} {...curElem} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default GridView