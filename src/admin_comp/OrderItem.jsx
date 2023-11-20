import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useOrderContext } from '../context/order_context';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { useContactContext } from '../context/contact_context';
import ItemDetails from './ItemDetails';

const OrderItem = ({ orderid, id, placed_date, email, placed_address, item_image, item_price, quantity, name, description, order_status, navcolor, mode }) => {

    var dt = new Date(placed_date);
    dt.setDate(dt.getDate() + 5);
    var delivery_date = dt.toLocaleDateString();

    const [viewDetails, setViewDetails] = useState(false);

    const openViewDetailsDialog = () => {
        setViewDetails(true);
    }

    if (mode === "light") {
        return (
            <>
                <div className='mt-10 border-2 rounded-lg h-58 border-gray-200 shadow-sm'>
                    <div className='h-18 flex border-b-2 bg-gray-200 border-gray-200'>
                        <div className='w-full flex justify-around items-center pt-3 pb-0.5'>
                            <div className=''>
                                <p className='text-sm'>ORDER PLACED <br />{placed_date}</p>
                            </div>
                            {
                                order_status == "remaining" ?
                                    <div className='hidden md:block'>
                                        <p><span className=' text-orange-600'>Expected Delivery</span> <br />{delivery_date}</p>
                                    </div>
                                    :
                                    <div className='hidden md:block'>
                                        <p><span className='text-green-600'>Delivered On</span> <br />{delivery_date}</p>
                                    </div>
                            }
                            <div>
                                <p className='text-sm'>TOTAL <br /><FormatPrice price={item_price} /></p>
                            </div>
                            <div>
                                <p className='text-sm hidden md:block'>SHIP TO <br /><span className=' text-sky-600'>{email}</span></p>
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full md:hidden'>
                        <div className='w-1/3 pl-2'>
                            <figure className='flex pt-3 md:pl-5 items-center'>
                                {/* eslint-disable-next-line */}
                                <img src={item_image} alt='no-image' className='w-36 h-28' />
                            </figure>
                        </div>
                        <div className='w-2/3 pt-2 ml-2'>
                            <p className='text-lg font-medium'>{name}</p>
                            <p className='-mt-4'>{description.substr(0, 45)}...</p>
                            <button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg' onClick={openViewDetailsDialog}>View Item Details</button>
                        </div>
                    </div>
                    <div className='md:flex w-full hidden'>
                        <div className='w-1/4'>
                            <figure className='flex pt-3 md:pl-5 items-center'>
                                {/* eslint-disable-next-line */}
                                <img src={item_image} alt='no-image' className='w-36 h-28' />
                            </figure>
                        </div>
                        <div className='w-3/4 pt-2'>
                            <p className='text-lg font-medium'>{name}</p>
                            <p className='-mt-4'>{description.substr(0, 140)}...</p>
                            <button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg' onClick={openViewDetailsDialog}>View Item Details</button>
                        </div>
                    </div>
                </div>
                <div className='dialogs'>
                    <Dialog visible={viewDetails} draggable={false} className="w-11/12" onHide={() => setViewDetails(false)}>
                        <ItemDetails id={id} />
                    </Dialog>
                </div>
            </>
        )
    }

    return (
        <>
            <div className={`mt-10 border-2 rounded-lg h-58 ${navcolor} shadow-sm`}>
                <div className={`h-18 flex border-b-2 ${navcolor} border-gray-200`}>
                    <div className='w-full flex justify-around items-center pt-3 pb-0.5'>
                        <div className=''>
                            <p className='text-sm text-white'>ORDER PLACED <br />{placed_date}</p>
                        </div>
                        {
                            order_status == "remaining" ?
                                <div className='hidden md:block'>
                                    <p><span className=' text-orange-600'>Expected Delivery</span> <br /><span className='text-white'>{delivery_date}</span></p>
                                </div>
                                :
                                <div className='hidden md:block'>
                                    <p><span className='text-green-600'>Delivered On</span> <br /><span className='text-white'>{delivery_date}</span></p>
                                </div>
                        }
                        <div>
                            <p className='text-sm text-white'>TOTAL <br /><FormatPrice price={item_price} /></p>
                        </div>
                        <div>
                            <p className='text-sm hidden md:block text-white'>SHIP TO <br /><span className=' text-sky-400'>{email}</span></p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full md:hidden bg-gray-500'>
                    <div className='w-1/3 pl-2'>
                        <figure className='flex pt-3 md:pl-5 items-center'>
                            {/* eslint-disable-next-line */}
                            <img src={item_image} alt='no-image' className='w-36 h-28' />
                        </figure>
                    </div>
                    <div className='w-2/3 pt-2 ml-2'>
                        <p className='text-lg font-medium text-white'>{name}</p>
                        <p className='-mt-4 text-white'>{description.substr(0, 45)}...</p>
                        <button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg' onClick={openViewDetailsDialog}>View Item Details</button>
                    </div>
                </div>
                <div className='md:flex w-full hidden bg-gray-500'>
                    <div className='w-1/4'>
                        <figure className='flex pt-3 md:pl-5 items-center'>
                            {/* eslint-disable-next-line */}
                            <img src={item_image} alt='no-image' className='w-36 h-28' />
                        </figure>
                    </div>
                    <div className='w-3/4 pt-2'>
                        <p className='text-lg font-medium text-white'>{name}</p>
                        <p className='-mt-4 text-white'>{description.substr(0, 140)}...</p>
                        <button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg' onClick={openViewDetailsDialog}>View Item Details</button>
                    </div>
                </div>
            </div>
            <div className='dialogs'>
                <Dialog visible={viewDetails} draggable={false} className="w-11/12" onHide={() => setViewDetails(false)}>
                    <div className='flex justify-center'>
                        <ItemDetails id={id} />
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default OrderItem