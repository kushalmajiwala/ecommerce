import React, { useEffect } from 'react'
import { useState } from 'react';
import { useAdminContext } from '../context/admin_context';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Statistics = ({ navcolor, mode }) => {
    const { getTotalUsers, getTotalProducts, getTotalCarts, getTotalOrders } = useAdminContext();
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCarts, setTotalCarts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    const data = {
        labels: ['Users', 'Products', 'Carts', 'Orders'],
        datasets: [
            {
                data: [totalUsers, totalProducts, totalCarts, totalOrders],
                backgroundColor: [
                    'red',
                    'green',
                    'blue',
                    'orange'
                ],

            },
        ],
    }

    const labels = ['Laptop', 'Mobile', 'Headphone', 'Watch', 'Speaker'];

    const getTotalUserNumber = async () => {
        const userlength = await getTotalUsers();
        if (userlength > 0) {
            setTotalUsers(userlength);
        }
    }

    const bar_options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
    };

    const bar_data1 = {
        labels,
        datasets: [
            {
                label: 'Product Category based sells',
                data: [60, 40, 20, 60, 70, 80, 90, 100, 30, 10],
                backgroundColor: 'pink',
                
            },
        ],
    };
    const bar_data2 = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: [60, 40, 20, 60, 70, 80, 90, 100, 30, 10],
                backgroundColor: 'cyan',
            },
        ],
    };

    const getTotalProductNumber = async () => {
        const productlength = await getTotalProducts();
        if (productlength > 0) {
            setTotalProducts(productlength);
        }
    }

    const getTotalCartNumber = async () => {
        const cartlength = await getTotalCarts();
        if (cartlength > 0) {
            setTotalCarts(cartlength);
        }
    }
    const getTotalOrderNumber = async () => {
        const orderlength = await getTotalOrders();
        if (orderlength > 0) {
            setTotalOrders(orderlength);
        }
    }

    useEffect(() => {
        getTotalUserNumber();
        getTotalProductNumber();
        getTotalCartNumber();
        getTotalOrderNumber();
    }, [])

    return (
        <>
            <div className='w-full'>
                <div className='md:flex justify-around pb-5 pl-4 md:pl-0 w-full'>
                    <div className={`mt-4 ml-2 ${navcolor} w-11/12 md:w-[17vw] h-[165px] shadow-md rounded-md pt-4 pl-3`}>
                        <span className='py-3 ml-3 shadow-sm px-4 rounded-full bg-gray-100'><i className="bi bi-people-fill text-blue-600 text-xl"></i></span>
                        {
                            mode == "light" ?
                                <div>
                                    <p className='mt-4 text-3xl text-black font-medium ml-4'>{totalUsers}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-gray-500 flex justify-between'><span>Total Users</span><span className='text-green-500 ml-5'>0.43%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p className='mt-4 text-3xl text-white font-medium ml-4'>{totalUsers}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-white flex justify-between'><span>Total Users</span><span className='text-green-500 ml-5'>0.43%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className={`mt-4 ml-2 ${navcolor} w-11/12 md:w-[17vw] h-[165px] shadow-md rounded-md pt-4 pl-3`}>
                        <span className='py-3 ml-3 shadow-sm px-4 rounded-full bg-gray-100'><i className="bi bi-box-fill text-blue-600 text-xl"></i></span>
                        {
                            mode == "light" ?
                                <div>
                                    <p className='mt-4 text-3xl text-black font-medium ml-4'>{totalProducts}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-gray-500 flex justify-between'><span>Total Products</span><span className='text-green-500 ml-5'>1.03%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p className='mt-4 text-3xl text-white font-medium ml-4'>{totalProducts}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-white flex justify-between'><span>Total Products</span><span className='text-green-500 ml-5'>1.03%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className={`mt-4 ml-2 ${navcolor} w-11/12 md:w-[17vw] h-[165px] shadow-md rounded-md pt-4 pl-3`}>
                        <span className='py-3 ml-3 shadow-sm px-4 rounded-full bg-gray-100'><i className="bi bi-cart-fill text-blue-600 text-xl"></i></span>
                        {
                            mode == "light" ?
                                <div>
                                    <p className='mt-4 text-3xl text-black font-medium ml-4'>{totalCarts}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-gray-500 flex justify-between'><span>Total Carts</span><span className='text-red-500 ml-5'>0.33%<i className="bi bi-arrow-down-short"></i></span></p>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p className='mt-4 text-3xl text-white font-medium ml-4'>{totalCarts}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-white flex justify-between'><span>Total Carts</span><span className='text-red-500 ml-5'>0.33%<i className="bi bi-arrow-down-short"></i></span></p>
                                    </div>
                                </div>
                        }
                    </div>
                    <div className={`mt-4 ml-2 ${navcolor} w-11/12 md:w-[17vw] h-[165px] shadow-md rounded-md pt-4 pl-3`}>
                        <span className='py-3 ml-3 shadow-sm px-4 rounded-full bg-gray-100'><i className="bi bi-bag-fill text-blue-600 text-xl"></i></span>

                        {
                            mode == "light" ?
                                <div>
                                    <p className='mt-4 text-3xl text-black font-medium ml-4'>{totalOrders}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-gray-500 flex justify-between'><span>Total Orders</span><span className='text-green-500 ml-5'>1.44%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                                :
                                <div>
                                    <p className='mt-4 text-3xl text-white font-medium ml-4'>{totalOrders}</p>
                                    <div>
                                        <p className='-mt-3 ml-4 text-white flex justify-between'><span>Total Orders</span><span className='text-green-500 ml-5'>1.44%<i className="bi bi-arrow-up-short"></i></span></p>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
                <div className='hidden md:flex justify-evenly'>
                    <div className={`md:w-1/3 md:h-[45vh] pb-3 ${navcolor} p-2 shadow-md rounded-md flex justify-center`}>
                        <Pie data={data} />
                    </div>
                    <div className={`md:w-1/3 md:h-[45vh] pb-3 ${navcolor} p-2 shadow-md rounded-md flex justify-center`}>
                        <Doughnut data={data} />
                    </div>
                </div>
                <div className='md:hidden justify-around'>
                    <div className={`mx-3 pb-3 ${navcolor} p-2 shadow-md rounded-md flex justify-center`}>
                        <Pie data={data} />
                    </div>
                    <div className={`mx-3 pb-3 ${navcolor} p-2 mt-4 shadow-md rounded-md flex justify-center`}>
                        <Doughnut data={data} />
                    </div>
                </div>
                <div className='mt-5 flex justify-center'>
                    <div className={`w-11/12 ${navcolor}`}>
                        {
                            mode == "light"
                                ?
                                <Bar options={bar_options} data={bar_data1} />
                                :
                                <Bar options={bar_options} data={bar_data2} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Statistics