import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useOrderContext } from '../context/order_context';
import { useEffect } from 'react';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';

const OrderItem = ({ uniqueid, id, placed_date, placed_address, item_image, item_price, quantity, name, description }) => {
    const { isAuthenticated, user } = useAuth0();
    const { cancelOrder } = useOrderContext();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const deleteConfirm = () => {
        setConfirmDelete(true);
    }

    const completeCancellation = () => {
        cancelOrder(uniqueid);
        setConfirmDelete(false);
    }

    return (
        <>
            <div className='mt-10 border-2 rounded-lg h-58 border-gray-200 shadow-sm'>
                <div className='h-18 flex border-b-2 bg-gray-200 border-gray-200'>
                    <div className='w-2/3 flex justify-around items-center pt-3 pb-0.5'>
                        <div className=''>
                            <p className='text-sm'>ORDER PLACED <br />{placed_date}</p>
                        </div>
                        <div>
                            <p className='text-sm'>TOTAL <br /><FormatPrice price={item_price} /></p>
                        </div>
                        <div>
                            <p className='text-sm hidden md:block'>SHIP TO <br /><span className=' text-sky-600'>{user.name}</span></p>
                        </div>
                    </div>
                    <div className='w-1/3 flex justify-end items-center'>
                        <div className='w-full flex text-center justify-end items-center'>
                            <p className='pt-3 pr-4 hidden md:block'>
                                <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order Details</NavLink><br />
                                <span className='text-red-600 hover:text-red-800 hover:underline cursor-pointer' onClick={() => deleteConfirm()}>Cancel Booking</span>
                            </p>
                            <p className='pt-3 pr-4 md:hidden'>
                                <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order</NavLink><br />
                                <span className='text-red-600 hover:text-red-800 hover:underline cursor-pointer' onClick={() => deleteConfirm()}>Cancel Order</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className='flex w-full md:hidden'>
                    <div className='w-1/3'>
                        <figure className='flex pt-3 md:pl-5 items-center'>
                            {/* eslint-disable-next-line */}
                            <img src={item_image} alt='no-image' className='w-36 h-28' />
                        </figure>
                    </div>
                    <div className='w-2/3 pt-2 ml-2'>
                        <p className='text-lg font-medium'>{name}</p>
                        <p className='-mt-4'>{description.substr(0, 50)}...</p>
                        <NavLink to={`../singleproduct/${id}`} className="no-underline"><button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg'>View Your Item</button></NavLink>
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
                        <NavLink to={`../singleproduct/${id}`} className="no-underline"><button className='border-2 px-3 py-1 -mt-4 border-blue-500 bg-blue-100 hover:bg-blue-500 text-black hover:text-white rounded-lg'>View Your Item</button></NavLink>
                    </div>
                </div>
                <Dialog visible={confirmDelete} draggable={false} closable={false} className="w-11/12 md:w-1/3">
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-exclamation-circle text-7xl text-yellow-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Are you Sure you want to Cancel ?
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-end w-full'>
                        <div className='flex justify-between w-56 md:w-52'>
                            <Button label="YES, CANCEL IT" severity="danger" className='mr-2' onClick={() => completeCancellation()} />
                            <Button label="NO" severity="secondary" onClick={() => setConfirmDelete(false)} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default OrderItem