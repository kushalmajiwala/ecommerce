import React from 'react'
import FormatPrice from '../helpers/FormatPrice'
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from 'react-router-dom';
import { Button } from 'primereact/button';
import { useOrderContext } from '../context/order_context';
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import { useContactContext } from '../context/contact_context';

const OrderItem = ({ orderid, id, placed_date, placed_address, item_image, item_price, quantity, name, description, order_status, returned }) => {
    const { isAuthenticated, user } = useAuth0();
    const { cancelOrder, returnProduct } = useOrderContext();
    const { addFeedback } = useContactContext();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [starColor1, setStarColor1] = useState("text-gray-300");
    const [starColor2, setStarColor2] = useState("text-gray-300");
    const [starColor3, setStarColor3] = useState("text-gray-300");
    const [starColor4, setStarColor4] = useState("text-gray-300");
    const [starColor5, setStarColor5] = useState("text-gray-300");
    const [rating, setRating] = useState(0);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [successFeedback, setSuccessFeedback] = useState(false);
    const [errorFeedback, setErrorFeedback] = useState(false);
    const [returnDialog, setReturnDialog] = useState(false);
    const [returnReason, setReturnReason] = useState("");
    const [returnOtherReason, setReturnOtherReason] = useState("");
    const [emptyReturnField, setEmptyReturnField] = useState(false);
    const [productReturned, setProductReturned] = useState(false);

    var dt = new Date(placed_date);
    dt.setDate(dt.getDate() + 5);
    var delivery_date = dt.toLocaleDateString();

    const openFeedback = () => {
        setShowFeedback(true);
    }

    const deleteConfirm = () => {
        setConfirmDelete(true);
    }

    const completeCancellation = () => {
        cancelOrder(orderid);
        setConfirmDelete(false);
    }

    const submitFeedback = () => {
        if (feedbackMessage == "" || rating == 0) {
            setErrorFeedback(true);
        }
        else {
            addFeedback(id, feedbackMessage, rating, user.email);
            setSuccessFeedback(true);
            setFeedbackMessage("");
            setRating(0);
            changeColor(0);
        }
    }

    const closeFeedbackSubmit = () => {
        setFeedbackMessage("");
        setShowFeedback(false);
        setRating(0);
        setStarColor1("text-gray-300");
        setStarColor2("text-gray-300");
        setStarColor3("text-gray-300");
        setStarColor4("text-gray-300");
        setStarColor5("text-gray-300");
    }

    const openReturnDialog = () => {
        setReturnDialog(true);
    }

    const closeReturnDialog = () => {
        setReturnDialog(false);
        setReturnReason("");
        setReturnOtherReason("");
    }

    const confirmReturnProduct = async () => {
        if (returnReason === "") {
            setEmptyReturnField(true);
        }
        else if(returnReason === "Other reason" && returnOtherReason === "")
        {
            setEmptyReturnField(true);
        }
        else if(returnReason === "Other reason" && returnOtherReason !== "")
        {
            await returnProduct(orderid, id, user.email, new Date().toLocaleDateString(), item_image, item_price, name, returnOtherReason);
            setProductReturned(true);
            closeReturnDialog();
        }
        else {
            await returnProduct(orderid, id, user.email, new Date().toLocaleDateString(), item_image, item_price, name, returnReason);
            setProductReturned(true);
            closeReturnDialog();
        }
    }

    const changeColor = (num) => {
        if (num == 0) {
            setStarColor1("text-gray-300");
            setStarColor2("text-gray-300");
            setStarColor3("text-gray-300");
            setStarColor4("text-gray-300");
            setStarColor5("text-gray-300");
            setRating(num);
        }
        if (num == 1) {
            setStarColor1("text-blue-400");
            setStarColor2("text-gray-300");
            setStarColor3("text-gray-300");
            setStarColor4("text-gray-300");
            setStarColor5("text-gray-300");
            setRating(num);
        }
        else if (num == 2) {
            setStarColor1("text-blue-400");
            setStarColor2("text-blue-400");
            setStarColor3("text-gray-300");
            setStarColor4("text-gray-300");
            setStarColor5("text-gray-300");
            setRating(num);
        }
        else if (num == 3) {
            setStarColor1("text-blue-400");
            setStarColor2("text-blue-400");
            setStarColor3("text-blue-400");
            setStarColor4("text-gray-300");
            setStarColor5("text-gray-300");
            setRating(num);
        }
        else if (num == 4) {
            setStarColor1("text-blue-400");
            setStarColor2("text-blue-400");
            setStarColor3("text-blue-400");
            setStarColor4("text-blue-400");
            setStarColor5("text-gray-300");
            setRating(num);
        }
        else if (num == 5) {
            setStarColor1("text-blue-400");
            setStarColor2("text-blue-400");
            setStarColor3("text-blue-400");
            setStarColor4("text-blue-400");
            setStarColor5("text-blue-400");
            setRating(num);
        }
    }
    const footerContent = (
        <div className='flex justify-end h-16 items-center'>
            <div className='text-right pt-4 flex'>
                <button className='md:font-medium whitespace-nowrap text-white px-3 md:px-3 py-2 bg-blue-600 hover:bg-blue-500' onClick={submitFeedback}>SUBMIT FEEDBACK</button>
                <button className='md:font-medium text-white hidden md:block px-3 py-2 bg-red-600 whitespace-nowrap hover:bg-red-500' onClick={closeFeedbackSubmit}>CLOSE</button>
            </div>
        </div>
    );

    return (
        <>
            <div className='mt-10 border-2 rounded-lg h-58 border-gray-200 shadow-sm'>
                <div className='h-18 flex border-b-2 bg-gray-200 border-gray-200'>
                    <div className='w-2/3 flex justify-around items-center pt-3 pb-0.5'>
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
                            <p className='text-sm hidden md:block'>SHIP TO <br /><span className=' text-sky-600'>{user.name}</span></p>
                        </div>
                    </div>
                    <div className='w-1/3 flex justify-end items-center'>
                        <div className='w-full flex text-center justify-end items-center'>
                            {order_status == "remaining" ?
                                <p className='pt-3 pr-4 hidden md:block'>
                                    <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order Details</NavLink><br />
                                    <span className='text-red-600 hover:text-red-800 hover:underline cursor-pointer' onClick={() => deleteConfirm()}>Cancel Booking</span>
                                </p>
                                : (returned)
                                    ?
                                    <p className='pt-3 pr-4 hidden md:block'>
                                        <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order Details</NavLink><br />
                                        <span className='text-orange-400 cursor-pointer'>Returned</span>
                                    </p>
                                    :
                                    <p className='pt-3 pr-4 hidden md:block'>
                                        <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order Details</NavLink><br />
                                        <span className='text-green-500 cursor-pointer'>Delivered</span>
                                    </p>
                            }
                            {order_status == "remaining" ?
                                <p className='pt-3 pr-4 md:hidden'>
                                    <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order</NavLink><br />
                                    <span className='text-red-600 hover:text-red-800 hover:underline cursor-pointer' onClick={() => deleteConfirm()}>Cancel Order</span>
                                </p>
                                : (returned)
                                    ?
                                    <p className='pt-3 pr-4 md:hidden'>
                                        <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order</NavLink><br />
                                        <span className='text-orange-400 cursor-pointer'>Returned</span>
                                    </p>
                                    :
                                    <p className='pt-3 pr-4 md:hidden'>
                                        <NavLink to={`../singleproduct/${id}`} className="no-underline text-sky-600 hover:text-sky-800 hover:underline">View Order</NavLink><br />
                                        <span className='text-green-500 cursor-pointer'>Delivered</span>
                                    </p>
                            }
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
                        <p className='-mt-4'>{description.substr(0, 45)}...</p>
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
                        {order_status == "remaining"
                            ? ""
                            : (returned === false)
                                ?
                                <button className='border-2 ml-4 px-3 py-1 -mt-4 border-orange-400 bg-orange-100 hover:bg-orange-400 text-black hover:text-white rounded-lg' onClick={openReturnDialog}>Return Product</button>
                                : ""
                        }
                        {order_status == "remaining"
                            ? ""
                            :
                            <button className='border-2 ml-4 px-3 py-1 -mt-4 border-red-400 bg-red-100 hover:bg-red-400 text-black hover:text-white rounded-lg' onClick={openFeedback}>Give Feedback</button>
                        }
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
                <Dialog header="GIVE FEEDBACK" draggable={false} visible={showFeedback} onHide={closeFeedbackSubmit}
                    className="w-11/12 md:w-2/3" footer={footerContent}>
                    <div className=' border-t-2 pt-3'>
                        <p className='font-bold text-lg text-orange-700'>1. Give Rating</p>
                        <div className='flex justify-center'>
                            <i className={`bi bi-star-fill text-6xl ml-3 cursor-pointer ${starColor1}`} onClick={() => changeColor(1)}></i>
                            <i className={`bi bi-star-fill text-6xl ml-3 cursor-pointer ${starColor2}`} onClick={() => changeColor(2)}></i>
                            <i className={`bi bi-star-fill text-6xl ml-3 cursor-pointer ${starColor3}`} onClick={() => changeColor(3)}></i>
                            <i className={`bi bi-star-fill text-6xl ml-3 cursor-pointer ${starColor4}`} onClick={() => changeColor(4)}></i>
                            <i className={`bi bi-star-fill text-6xl ml-3 cursor-pointer ${starColor5}`} onClick={() => changeColor(5)}></i>
                        </div>
                    </div>
                    <div className='mt-5'>
                        <p className='font-bold text-lg text-orange-700'>2. Write Message</p>
                        <textarea className='border-2 ml-5 w-5/6 md:w-11/12 h-36 pl-2' value={feedbackMessage} placeholder="Give Message Here" onChange={(e) => setFeedbackMessage(e.target.value)}></textarea>
                    </div>
                </Dialog>
                <Dialog visible={errorFeedback} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setErrorFeedback(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-x-circle text-7xl text-red-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Please Fill Required Details
                            </p>
                        </div>
                    </div>
                </Dialog>
                <Dialog visible={successFeedback} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setSuccessFeedback(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-check-circle text-7xl text-green-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Feedback Submitted Successfully
                            </p>
                        </div>
                    </div>
                </Dialog>
                <Dialog header="RETURN PRODUCT" draggable={false} visible={returnDialog} onHide={closeReturnDialog}
                    className="w-11/12 md:w-2/3">
                    <div className='pl-5'>
                        <div className='mt-3 flex'>
                            <input type="radio" name="reason" className='w-4 h-4 cursor-pointer' value="Recieved a broken/damanged item" checked={returnReason === "Recieved a broken/damanged item"} onChange={(e) => setReturnReason(e.target.value)} /><span className='text-lg -mt-[9px] ml-3'>Recieved a broken/damanged item</span>
                        </div>
                        <div className='mt-3'>
                            <input type="radio" name="reason" className='w-4 h-4 cursor-pointer' value="The product received is defective" checked={returnReason === "The product received is defective"} onChange={(e) => setReturnReason(e.target.value)} /><span className='text-lg -mt-[5px] ml-3'>The product received is defective</span>
                        </div>
                        <div className='mt-3'>
                            <input type="radio" name="reason" className='w-4 h-4 cursor-pointer' value="Item didn't on arrival/installation" checked={returnReason === "Item didn't on arrival/installation"} onChange={(e) => setReturnReason(e.target.value)} /><span className='text-lg -mt-[5px] ml-3'>Item didn't on arrival/installation</span>
                        </div>
                        <div className='mt-3'>
                            <input type="radio" name="reason" className='w-4 h-4 cursor-pointer' value="Received wrong item" checked={returnReason === "Received wrong item"} onChange={(e) => setReturnReason(e.target.value)} /><span className='text-lg -mt-[5px] ml-3'>Received wrong item</span>
                        </div>
                        <div className='mt-3'>
                            <input type="radio" name="reason" className='w-4 h-4 cursor-pointer' value="Other reason" checked={returnReason === "Other reason"} onChange={(e) => setReturnReason(e.target.value)} /><span className='text-lg -mt-[5px] ml-3'>Other reason</span>
                        </div>
                    </div>
                    {
                        returnReason === "Other reason"
                            ?
                            <div className='pl-5 pt-3'>
                                <div className=''>
                                    <p className='text-lg font-medium'>Enter Your Reason :- </p>
                                    <InputTextarea value={returnOtherReason} onChange={(e) => setReturnOtherReason(e.target.value)} rows={5} cols={50} />
                                </div>
                            </div>
                            :
                            ""
                    }
                    <div className='flex justify-end w-full mt-4'>
                        <div className='flex justify-end w-56 md:w-full'>
                            <button className=' px-3 py-2 text-white bg-red-600 mr-5 hover:bg-red-500' onClick={confirmReturnProduct} >RETURN PRODUCT</button>
                            <button className=" px-3 py-2 text-white bg-green-600 hover:bg-green-500" severity="secondary" onClick={closeReturnDialog} >CLOSE</button>
                        </div>
                    </div>
                </Dialog>
                <Dialog visible={emptyReturnField} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setEmptyReturnField(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-x-circle text-7xl text-red-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Please Give Reason to return
                            </p>
                        </div>
                    </div>
                </Dialog>
                <Dialog visible={productReturned} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setProductReturned(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-check-circle text-7xl text-green-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Product Returned Successfully<br />
                                Refund will be provided in 48 hours
                            </p>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default OrderItem