import React, { useEffect, useState } from 'react'
import { useCartContext } from '../context/cart_context'
import { useOrderContext } from '../context/order_context';
import CartItem from './CartItem';
import { NavLink } from 'react-router-dom'
import FormatPrice from '../helpers/FormatPrice';
import { useAuth0 } from "@auth0/auth0-react";
import { Dialog } from 'primereact/dialog';
import { RadioButton } from 'primereact/radiobutton';
import useRazorpay from "react-razorpay";

const Cart = () => {
    const { cart, total_item, clearCart, total_price, shipping_fees, addUserDetails, addr, pay_method, getUserDetails } = useCartContext();
    const { isAuthenticated, user } = useAuth0();
    const [visible, setVisible] = useState(false);
    const [payment_method, setPayment_method] = useState("cash");
    const [address, setAddress] = useState("");
    const [details, setDetails] = useState(false);
    const [emptyAddress, setEmptyAddress] = useState(false);
    const [orderPlace, setOrderPlace] = useState(false);
    const { addOrderData } = useOrderContext();

    var options = {
        "key": "rzp_test_ZneboMX8f8lDSh", 
        "amount": total_price + shipping_fees, 
        "currency": "INR",
        "name": "Unique Store", 
        "description": "Product Purchase",
        "image": "https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png",
        "handler": () => {
            paymentSuccessful();
        },
        "prefill": { 
            "name": "Kushal Majiwala", 
            "email": "kushalmajiwala@gmail.com", 
            "contact": "9106884674"
        },
        "notes": {
            "address": "Surat, Gujarat"
        },
        "theme": {
            "color": "#5c148c"
        }
    };

    const Razorpay = useRazorpay();

    const saveDetails = () => {
        addUserDetails(user.email, address, payment_method);
        setDetails(true);
    }

    const openDetailsDialog = () => {
        console.log(addr);
        console.log(pay_method);
        setAddress(addr);
        setPayment_method(pay_method);
        setVisible(true);
    }

    const validateAddress = () => {
        if(address === "")
        {
            setEmptyAddress(true);
        }
        else if(payment_method === "cash")
        {
            cart.map((curElem) => {
                addOrderData(curElem.id, user.email, new Date().toLocaleDateString(), address, curElem.image, curElem.price, curElem.amount, curElem.name, curElem.description);
            })
            setOrderPlace(true);
        }
        else if(payment_method === "online")
        {
            var rzp1 = new Razorpay(options);
            rzp1.open();
        }
    }

    const paymentSuccessful = () => {
        cart.map((curElem) => {
            addOrderData(curElem.id, user.email, new Date().toLocaleDateString(), address, curElem.image, curElem.price, curElem.amount, curElem.name, curElem.description);
        })
        setOrderPlace(true);
    }

    useEffect(() => {
        getUserDetails();
    }, [visible])

    const footerContent = (
        <div className='flex justify-between h-16 items-center'>
            <div className='pt-4'>
                <button className='md:font-medium text-white whitespace-nowrap px-3 py-2 bg-green-600 hover:bg-green-500' onClick={() => saveDetails()}>SAVE DETAILS</button>
            </div>
            <div className='text-right pt-4 flex'>
                <button className={payment_method === "cash" ? `md:font-medium whitespace-nowrap text-white px-3 md:px-3 py-2 bg-blue-600 hover:bg-blue-500` : `hidden`} onClick={() => validateAddress()}>PLACE ORDER</button>
                <button className={payment_method === "online" ? `md:font-medium whitespace-nowrap text-white px-3 md:px-3 py-2 bg-blue-600 hover:bg-blue-500` : `hidden`} onClick={() => validateAddress()}>PAY NOW</button>
                <button className='md:font-medium text-white hidden md:block px-3 py-2 bg-red-600 whitespace-nowrap hover:bg-red-500' onClick={() => setVisible(false)}>CLOSE</button>
            </div>
        </div>
    );

    if (total_item === 0 || isAuthenticated === false) {
        return (
            <div className='flex justify-center'>
                <div className='pt-14 pb-2'>
                    <figure className='flex justify-center'>
                        {/* eslint-disable-next-line */}
                        <img src='https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/empty_cart.png' alt='no-image' className=' w-36 h-36' />
                    </figure>
                    <p className=' text-gray-600 text-xl font-bold'>Your Cart Is Currently Empty!</p>
                    <div className='flex justify-center pt-2'>
                        <NavLink to="/products">
                            <button className='px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm'>SHOP NOW</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div>
                <div className='flex justify-center h-full'>
                    <div className='w-full md:w-full md:flex justify-evenly'>
                        <div className='border-b-2 pb-3 pt-2 shadow-sm w-full md:w-8/12  mt-12 bg-gray-100'>
                            <div className='p-3 flex justify-between items-center border-b-2'>
                                <p className='text-3xl font-medium'>Shopping Cart</p>
                                <div className='flex items-start py-2 h-12'>
                                    <p className='text-xl'>Price</p>
                                </div>
                            </div>
                            {
                                cart.map((currElem, index) => {
                                    return <CartItem key={index} {...currElem} />
                                })
                            }
                            <div className='md:flex md:pl-8'>
                                <div className='md:w-2/3 md:justify-between flex justify-around mt-3 px-2'>
                                    <NavLink to="/products">
                                        <button className='px-3 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm'>CONTINUE SHOPPING</button>
                                    </NavLink>
                                    <div>
                                        <button className='px-3 py-2.5 bg-orange-600 hover:bg-orange-500 text-white text-sm' onClick={clearCart}>CLEAR CART</button>
                                    </div>
                                </div>
                                <div className='flex w-full items-center h-16 justify-center md:justify-end pr-4'>
                                    <span className='mr-2 text-xl'>Subtotal ({total_item} items) :- </span><span className='font-medium text-xl text-orange-500'><FormatPrice price={total_price} /></span>
                                </div>
                            </div>
                        </div>
                        <div className='px-2 items-center w-72 mt-5'>
                            <div className='bg-gray-100 shadow-md px-4 py-3'>
                                <div className='flex mt-3'>
                                    <p className='w-32'>Subtotal:</p>
                                    <p className='font-bold w-24 text-right'>
                                        <FormatPrice price={total_price} />
                                    </p>
                                </div>
                                <div className='flex border-b-2 border-gray-300 pb-1'>
                                    <p className='w-32'>Shipping Fee:</p>
                                    <p className='font-bold w-24 text-right'>
                                        <FormatPrice price={shipping_fees} />
                                    </p>
                                </div>
                                <div className='flex'>
                                    <p className='w-32 mt-3'>Order Total:</p>
                                    <p className='mt-3 font-bold w-24 text-right text-orange-500'>
                                        <FormatPrice price={shipping_fees + total_price} />
                                    </p>
                                </div>
                                <div className='flex justify-center'>
                                    <div className='py-2 px-2 w-full'>
                                        <button className='bg-yellow-300 w-full py-2 font-bold rounded-lg hover:bg-yellow-400 hover:scale-105' onClick={() => openDetailsDialog()}>PROCEED TO BUY</button>
                                    </div>
                                </div>
                                <div className="">
                                    <Dialog header="CHECKOUT STEPS" draggable={false} visible={visible} onHide={() => setVisible(false)}
                                        className="w-11/12 md:w-2/3" footer={footerContent}>
                                        <div>
                                            <div>
                                                <p className='font-bold text-lg text-orange-500'><span className='mr-3 text-black'>Order Total:</span> <FormatPrice price={total_price + shipping_fees} /></p>
                                            </div>
                                            <p className='font-bold text-lg text-orange-700'>1. Add a Delivery Address</p>
                                            <textarea className='border-2 ml-5 w-5/6 md:w-11/12 h-36 pl-2' value={address} onChange={(e) => setAddress(e.target.value)}></textarea>

                                            <p className='font-bold text-lg text-orange-700 mt-2'>2. Select a Payment Method</p>
                                            <div className='pl-5 md:flex'>
                                                <div>
                                                    <RadioButton name="pizza" value="cash" onChange={(e) => setPayment_method(e.value)} checked={payment_method === 'cash'} />
                                                    <label htmlFor="ingredient3" className="ml-2">Cash on Delivery</label>
                                                </div>
                                                <div>
                                                    <RadioButton name="pizza" value="online" onChange={(e) => setPayment_method(e.value)} checked={payment_method === 'online'} className='md:ml-10' />
                                                    <label htmlFor="ingredient3" className="ml-2">Pay Online</label>
                                                </div>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <Dialog visible={details} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setDetails(false)}>
                                        <div className='flex justify-center'>
                                            <div className='text-center'>
                                                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                                                <p className="font-bold text-lg mt-4">
                                                    Details Saved Successfully
                                                </p>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <Dialog visible={emptyAddress} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setEmptyAddress(false)}>
                                        <div className='flex justify-center'>
                                            <div className='text-center'>
                                                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                                                <p className="font-bold text-lg mt-4">
                                                    Please Enter Your Address
                                                </p>
                                            </div>
                                        </div>
                                    </Dialog>
                                    <Dialog visible={orderPlace} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setOrderPlace(false)}>
                                        <div className='flex justify-center'>
                                            <div className='text-center'>
                                                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                                                <p className="font-bold text-lg mt-4">
                                                    Order Placed Successfully
                                                </p>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart