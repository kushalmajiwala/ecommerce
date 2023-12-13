import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useReturnContext } from '../context/return_context';

const ReturnItem = ({ returnid, id, email, returned_date, item_image, item_price, name, return_reason, mode, navcolor }) => {

    const { deleteReturnData } = useReturnContext();
    const [returnRemove, setReturnRemove] = useState(false);
    const [returnRemoved, setReturnRemoved] = useState(false);

    const confirmRemoveRecord = () => {
        setReturnRemove(true);
    }

    const removeReturnRecord = async () => {
        await deleteReturnData(returnid);
        setReturnRemove(false);
        setReturnRemoved(true);
    }

    const closeReturnRemoveDialog = () => {
        setReturnRemove(false);
    }

    if (mode === "light") {
        return (
            <>
                <div className='mt-10 border-2 rounded-lg h-58 border-gray-200 shadow-sm'>
                    <div className='h-18 flex border-b-2 bg-gray-200 border-gray-200'>
                        <div className='w-full flex justify-around items-center pt-3 pb-0.5'>
                            <div className=''>
                                <p className='text-sm'><span className='text-orange-600'>RETURNED DATE</span> <br />{returned_date}</p>
                            </div>
                            <div>
                                <p className='text-sm'>TOTAL <br /><FormatPrice price={item_price} /></p>
                            </div>
                            <div>
                                <p className='text-sm hidden md:block'>RETURNED BY <br /><span className=' text-sky-600'>{email}</span></p>
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
                            <p className='-mt-4'>{return_reason.substr(0, 45)}...</p>
                            <button className='bg-red-600 py-2 px-3 -mt-4 text-white hover:bg-red-500 rounded-lg' onClick={confirmRemoveRecord}>REMOVE RECORD</button>
                        </div>
                    </div>
                    <div className='md:flex w-full hidden'>
                        <div className='w-1/4'>
                            <figure className='flex pt-3 md:pl-5 items-center'>
                                {/* eslint-disable-next-line */}
                                <img src={item_image} alt='no-image' className='w-36 h-28' />
                            </figure>
                        </div>
                        <div className='w-3/4 pt-3'>
                            <p className='text-lg font-medium'>{name}</p>
                            <p className='-mt-4'>{return_reason.substr(0, 140)}...</p>
                            <button className='bg-red-600 py-2 px-3 text-white hover:bg-red-500 rounded-lg' onClick={confirmRemoveRecord}>REMOVE RECORD</button>
                        </div>
                    </div>
                </div>
                <div className='dialogs'>
                    <Dialog visible={returnRemove} closable={false} draggable={false} className="w-11/12 md:w-[37vw]" onHide={() => setReturnRemove(false)}>
                        <div className='flex justify-center'>
                            <div className='text-center'>
                                <i className="bi bi-exclamation-circle text-7xl text-orange-400"></i>
                                <p className="font-bold text-lg mt-4">
                                    Are you sure you want to delete this record?
                                </p>
                                <div className='flex justify-end'>
                                    <span><Button label="YES" severity="danger" onClick={removeReturnRecord} /></span>
                                    <span className='ml-3'><Button label="NO" onClick={closeReturnRemoveDialog} /></span>
                                </div>
                            </div>
                        </div>
                    </Dialog>
                    <Dialog visible={returnRemoved} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setReturnRemoved(false)}>
                        <div className='flex justify-center'>
                            <div className='text-center'>
                                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                                <p className="font-bold text-lg mt-4">
                                    Record Removed Successfully
                                </p>
                            </div>
                        </div>
                    </Dialog>
                </div>
            </>
        )
    }
    return (
        <>
            <div className={`mt-10 border-2 rounded-lg h-58 ${navcolor} border-gray-200 shadow-sm`}>
                <div className={`h-18 flex border-b-2 ${navcolor} border-gray-200`}>
                    <div className='w-full flex justify-around items-center pt-3 pb-0.5'>
                        <div className=''>
                            <p className='text-sm'><span className='text-orange-600'>RETURNED DATE</span> <br /><span className='text-white'>{returned_date}</span></p>
                        </div>
                        <div>
                            <p className='text-sm text-white'>TOTAL <br /><FormatPrice price={item_price} /></p>
                        </div>
                        <div>
                            <p className='text-sm hidden md:block'><span className='text-white'>RETURNED BY</span> <br /><span className=' text-sky-400'>{email}</span></p>
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
                        <p className='-mt-4 text-white'>{return_reason.substr(0, 45)}...</p>
                        <button className='bg-red-600 py-2 px-3 -mt-4 text-white hover:bg-red-500 rounded-lg' onClick={confirmRemoveRecord}>REMOVE RECORD</button>
                    </div>
                </div>
                <div className='md:flex w-full hidden bg-gray-500'>
                    <div className='w-1/4'>
                        <figure className='flex pt-3 md:pl-5 items-center'>
                            {/* eslint-disable-next-line */}
                            <img src={item_image} alt='no-image' className='w-36 h-28' />
                        </figure>
                    </div>
                    <div className='w-3/4 pt-3'>
                        <p className='text-lg font-medium text-white'>{name}</p>
                        <p className='-mt-4 text-white'>{return_reason.substr(0, 140)}...</p>
                        <button className='bg-red-600 py-2 px-3 text-white hover:bg-red-500 rounded-lg' onClick={confirmRemoveRecord}>REMOVE RECORD</button>
                    </div>
                </div>
            </div>
            <div className='dialogs'>
                <Dialog visible={returnRemove} closable={false} draggable={false} className="w-11/12 md:w-[37vw]" onHide={() => setReturnRemove(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-exclamation-circle text-7xl text-orange-400"></i>
                            <p className="font-bold text-lg mt-4">
                                Are you sure you want to delete this record?
                            </p>
                            <div className='flex justify-end'>
                                <span><Button label="YES" severity="danger" onClick={removeReturnRecord} /></span>
                                <span className='ml-3'><Button label="NO" onClick={closeReturnRemoveDialog} /></span>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Dialog visible={returnRemoved} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setReturnRemoved(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-check-circle text-7xl text-green-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Record Removed Successfully
                            </p>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default ReturnItem