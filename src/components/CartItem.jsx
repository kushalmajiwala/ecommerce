import React from 'react'
import { useCartContext } from '../context/cart_context'
import FormatPrice from '../helpers/FormatPrice'
import CartAmountToggle from './CartAmountToggle'
import { Button } from 'primereact/button';

const CartItem = ({ uniqueid, id, email, name, image, color, price, amount, max }) => {

    const { removeItem, setDecrease, setIncrease, shipping_fees } = useCartContext();

    return (
        <>
            <div className='flex pt-4 w-full'>
                <div className='md:flex justify-start pl-3 md:pl-10 border-b-2 w-2/3 py-3'>
                    <figure>
                        <img src={image} alt={id} className=" w-56 h-52 md:w-60 md:h-56" />
                    </figure>
                    <div className='md:pl-5 w-60 md:w-72'>
                        <div className=''>
                            <p className=' text-gray-600 text-2xl font-medium -mt-1'>{name}</p>
                            <div className='flex -mt-3 md:-mt-4'>
                                <p className=' text-gray-600 text-lg'>Color:</p>
                                <button className='w-5 h-5 rounded-full ml-2 mt-1.5' style={{ backgroundColor: color }}></button>
                            </div>
                            <div className='-mt-2 md:-mt-2 font-medium'>
                                <p className='text-sm text-green-600'>In Stock</p>
                            </div>
                            <div className='flex text-sm text-gray-500 w-full font-medium -mt-2'>
                                <span className='mr-1'>Shipping cost of the item : </span><FormatPrice price={shipping_fees} />
                            </div>
                            <div className='flex w-full justify-start items-center mt-1 md:-mt-0'>
                                <div className='flex items-center'>
                                    <span className='w-full text-lg mr-3'>QTY :-</span>
                                    <CartAmountToggle amount={amount} setDecrease={() => setDecrease(uniqueid, amount)} setIncrease={() => setIncrease(uniqueid, amount, max)} />
                                </div>
                            </div>
                            <div className='flex items-center w-full -mt-0'>
                                <span className='text-lg mr-2'>SUBTOTAL :-</span>
                                <div className='text-lg font-medium text-orange-500'>
                                    <FormatPrice price={price * amount} />
                                </div>
                            </div>
                            <div className='mt-2.5'>
                                <Button icon="bi bi-trash" className='text-white bg-red-600 px-3 py-1' onClick={() => removeItem(uniqueid)} severity="danger"><span className='pl-2'>REMOVE ITEM</span></Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='border-b-2 pr-4 w-1/3 flex justify-end'>
                    <div className='text-center text-lg font-medium mt-2'>
                        <FormatPrice price={price} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartItem