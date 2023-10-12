import React from 'react'

const Services = () => {
    return (
        <>
            <div className='w-auto flex justify-center -mt-16 pt-12 md:-mt-10 md:pt-20 md:pb-7'>
                <div className='inline-block md:w-screen md:flex md:justify-evenly p-10'>
                    <div className='w-60 h-48 mt-4 shadow-md bg-gray-100 flex justify-center items-center rounded-lg '>
                        <div className='w-auto inline-block items-center'>
                            <div className='text-center text-blue-600 text-2xl mt-4'>
                                <i className="bi bi-truck bg-white px-3 py-2.5 rounded-full shadow-sm"></i>
                            </div>
                            <p className='mt-3 text-gray-500 text-sm'>Super fast and free delivery</p>
                        </div>
                    </div>
                    <div className='w-60 h-48 mt-4 shadow-md bg-gray-100 flex justify-center items-center rounded-lg '>
                        <div>
                            <div className='text-center text-blue-600 text-2xl mt-4'>
                                <i className="bi bi-shield-shaded bg-white px-3 py-2.5 rounded-full shadow-sm"></i>
                            </div>
                            <p className='mt-3 text-gray-500 text-sm'>Non-contact shipping</p>
                        </div>
                    </div>
                    <div className='w-60 h-48 mt-4 shadow-md bg-gray-100 flex justify-center items-center rounded-lg '>
                        <div>
                            <div className='text-center text-blue-600 text-2xl mt-4'>
                                <i className="bi bi-cash-coin bg-white px-3 py-2.5 rounded-full shadow-sm"></i>
                            </div>
                            <p className='mt-3 text-gray-500 text-sm'>Money-back guaranteed</p>
                        </div>
                    </div>
                    <div className='w-60 h-48 mt-4 shadow-md bg-gray-100 flex justify-center items-center rounded-lg '>
                        <div>
                            <div className='text-center text-blue-600 text-2xl mt-4'>
                                <i className="bi bi-file-earmark-lock bg-white px-3 py-2.5 rounded-full shadow-sm"></i>
                            </div>
                            <p className='mt-3 text-gray-500 text-sm'>Super secure payment method</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Services