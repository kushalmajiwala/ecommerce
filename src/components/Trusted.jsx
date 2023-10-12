import React from 'react'

const Trusted = () => {
    return (
        <>
            <div className='w-auto bg-gray-100 md:mt-10 p-12 md:pt-16 pb-20'>
                <div className='w-auto inline'>
                    <div className='text-center'>
                        <p>Trusted By 1000+ Companies</p>
                    </div>
                    <div className='flex justify-center'>
                        <div className='py-3 md:w-screen md:flex md:justify-evenly'>
                            {/* eslint-disable-next-line */}
                            <img className='w-40 mt-4 rounded-xl shadow md:mt-3 md:w-24 h-24' src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/first_company.png' alt="no-image" />
                            {/* eslint-disable-next-line */}
                            <img className='w-40 mt-4 rounded-xl shadow md:mt-3 md:w-24 h-24' src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/my_second_company.png' alt="no-image" />
                            {/* eslint-disable-next-line */}
                            <img className='w-40 mt-4 rounded-xl shadow md:mt-3 md:w-24 h-24' src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/third_company.png' alt="no-image" />
                            {/* eslint-disable-next-line */}
                            <img className='w-40 mt-4 rounded-xl shadow md:mt-3 md:w-24 h-24' src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/forth_company.png' alt="no-image" />
                            {/* eslint-disable-next-line */}
                            <img className='w-40 mt-4 rounded-xl shadow md:mt-3 md:w-24 h-24' src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/fifth_company.png' alt="no-image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Trusted