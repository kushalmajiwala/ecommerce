import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import Statistics from './Statistics';
import AddProduct from './AddProduct';
import ContactMessage from './ContactMessage';
import ViewProducts from './ViewProducts';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ViewOrders from './ViewOrders';
import EditPassword from './EditPassword';
import { Tooltip } from 'primereact/tooltip';

const AdminHome = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("light");
  const [backColor, setBackColor] = useState("bg-indigo-50");
  const [navColor, setNavColor] = useState("bg-white");


  const changeMode = () => {
    if (mode == "light") {
      setMode("dark");
      setBackColor("bg-gray-900");
      setNavColor("bg-gray-700");
    }
    else {
      setMode("light");
      setBackColor("bg-indigo-50");
      setNavColor("bg-white");
    }
  }

  const logout = () => {
    localStorage.clear();
    navigate("/admin");
  }

  const redirectStatistics = () => {
    navigate("");
    openSidebar();
  }

  const redirectAddProduct = () => {
    navigate("addproduct");
    openSidebar();
  }

  const redirectViewProducts = () => {
    navigate("viewproducts");
    openSidebar();
  }

  const redirectViewOrders = () => {
    navigate("vieworders");
    openSidebar();
  }

  const redirectEditPassword = () => {
    navigate("editpassword");
    openSidebar();
  }

  const redirectContectMessage = () => {
    navigate("contactmessage");
    openSidebar();
  }

  // big screen routing functions
  const redirectStatisticsBig = () => {
    navigate("");
  }

  const redirectAddProductBig = () => {
    navigate("addproduct");
  }

  const redirectViewProductsBig = () => {
    navigate("viewproducts");
  }

  const redirectViewOrdersBig = () => {
    navigate("vieworders");
  }

  const redirectEditPasswordBig = () => {
    navigate("editpassword");
  }

  const redirectContectMessageBig = () => {
    navigate("contactmessage");
  }

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("transformed-state");
  }

  useEffect(() => {
    const localItem = localStorage.getItem("username");
    if (localItem === null) {
      navigate("/admin");
    }
  }, [])

  return (
    <>
      {/* <h1>Admin Home</h1>
      <button onClick={logout}>Logout</button> */}
      {/* <div className='flex flex-row bg-gray-300'>
        <div className={`${showNav} sm:w-3/5 md:w-1/5 bg-gray-800 h-screen`}>
          <div className='w-full flex justify-end'>
            <i className="bi bi-x text-red-700 text-5xl md:hidden" onClick={toggleNav}></i>
          </div>
        </div>
        <div className='w-screen md:w-4/5 h-full'>
          <div className='bg-white shadow-sm h-1/6 w-full'>
            <div className={`${showNavButton} md:hidden h-full items-center pl-5`}>
              <i className="bi bi-list text-4xl cursor-pointer" onClick={toggleNav}></i>
            </div>
          </div>
        </div>
      </div> */}


      <div className={`${backColor} w-full h-full pb-[100vh]`}>
        <div>
          <span
            className="absolute text-white text-4xl top-6 left-4 cursor-pointer"
            onClick={openSidebar}
          >
            <i className="bi bi-list px-2 bg-gray-800 rounded-md"></i>
          </span>
          <div
            className="md:hidden sidebar z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-800"
          >
            <div className="text-gray-100 text-xl">
              <div className='flex justify-center'>
                <div className="p-2.5 mt-1 flex items-center">
                  <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png' alt="no-image" className='w-20 y-20 rounded-full' />
                  <h1 className="font-bold text-gray-200 text-[15px] ml-3">ADMIN</h1>
                  <i
                    className="bi bi-x-lg text-red-500 cursor-pointer ml-28 md:hidden"
                    onClick={openSidebar}
                  ></i>
                </div>
              </div>
              {/* <div class="my-2 bg-gray-600 h-[1px]"></div> */}
            </div>
            {/* <div class="my-4 bg-gray-600 h-[1px]"></div> */}
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectStatistics}>
              <div>
                <i className="bi bi-clipboard-data text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">STATISTICS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectAddProduct}>
              <div>
                <i className="bi bi-plus-lg text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">ADD PRODUCT</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectViewProducts}>
              <div>
                <i className="bi bi-eye-fill text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">VIEW PRODUCTS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectViewOrders}>
              <div>
                <i className="bi bi-eye-fill text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">VIEW ORDERS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectEditPassword}>
              <div>
                <i className="bi bi-pencil-square text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">EDIT PASSWORD</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectContectMessage}>
              <div>
                <i className="bi bi-person-rolodex text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">CONTACT MESSAGE</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={logout}>
              <div>
                <i className="bi bi-box-arrow-right text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">LOGOUT</span>
              </div>
            </div>
          </div>
          {/* big mode sidebar */}
          <div
            className="hidden md:block sidebar z-10 fixed top-0 bottom-0 lg:left-0 p-2 w-[45vh] text-center bg-gray-800"
          >
            <div className="text-gray-100 text-xl">
              <div className='flex justify-center'>
                <div className="p-2.5 mt-1 flex items-center">
                  <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png' alt="no-image" className='w-20 y-20 rounded-full' />
                  <h1 className="font-bold text-gray-200 text-[15px] ml-3">ADMIN</h1>
                  <i
                    className="bi bi-x-lg text-red-500 cursor-pointer ml-28 md:hidden"
                    onClick={openSidebar}
                  ></i>
                </div>
              </div>
              {/* <div class="my-2 bg-gray-600 h-[1px]"></div> */}
            </div>
            {/* <div class="my-4 bg-gray-600 h-[1px]"></div> */}
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectStatisticsBig}>
              <div>
                <i className="bi bi-clipboard-data text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">STATISTICS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectAddProductBig}>
              <div>
                <i className="bi bi-plus-lg text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">ADD PRODUCT</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectViewProductsBig}>
              <div>
                <i className="bi bi-eye-fill text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">VIEW PRODUCTS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectViewOrdersBig}>
              <div>
                <i className="bi bi-eye-fill text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">VIEW ORDERS</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectEditPasswordBig}>
              <div>
                <i className="bi bi-pencil-square text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">EDIT PASSWORD</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={redirectContectMessageBig}>
              <div>
                <i className="bi bi-person-rolodex text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">CONTACT MESSAGE</span>
              </div>
            </div>
            <div
              className="py-2.5 mt-3 flex px-3 rounded-md duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={logout}>
              <div>
                <i className="bi bi-box-arrow-right text-2xl"></i>
                <span className="text-lg ml-4 text-gray-200">LOGOUT</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full h-[90px] ${navColor} shadow-sm`}>
          <div className='md:flex md:justify-between'>
            <div className="mb-3 ml-[45vh] hidden md:block">
              <div className="relative mt-[23px] ml-3 flex w-[25vw] flex-wrap items-stretch">
               {
                mode === "light" ? 
                <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-black outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1" />
                :
                <input
                type="search"
                className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon1" />
               }

                <button
                  className="relative z-[2] flex items-center rounded-r bg-primary px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                  type="button"
                  id="button-addon1"
                  data-te-ripple-init
                  data-te-ripple-color="light">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-5 w-5">
                    <path
                      fillRule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className='flex justify-end h-[90px] items-center pr-5'>
              <div className='hidden md:flex items-center'>
                <button className='ml-5 bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white font-medium shadow-md rounded-xl mr-5 edit-tooltip' data-pr-tooltip="EDIT PASSWORD" data-pr-position="bottom" onClick={redirectEditPasswordBig}><i className="bi bi-pencil-square"></i></button>
                <Tooltip target=".edit-tooltip" />
              </div>
              {
                mode == "dark"
                  ? <p className='text-white w-12 flex justify-center h-10 mt-[16px] items-center cursor-pointer rounded text-lg shadow-lg bg-slate-900' onClick={changeMode}><i className="bi bi-brightness-high-fill"></i></p>
                  : <p className='text-white w-12 flex justify-center h-10 mt-[16px] items-center cursor-pointer rounded text-lg shadow-lg bg-slate-900' onClick={changeMode}><i className="bi bi-moon-fill"></i></p>
              }
              <div className='flex items-center'>
                <button className='ml-5 bg-red-500 hover:bg-red-600 px-4 py-2 text-white font-medium shadow-md rounded-xl' onClick={logout}><i className="bi bi-box-arrow-right"></i>&nbsp;&nbsp;LOGOUT</button>
              </div>
            </div>
          </div>
          {/* <div className='hidden md:block'>
            <Routes>
              <Route path='/' element={<Statistics navcolor={navColor} mode={mode} />}></Route>
              <Route path='addproduct' element={<AddProduct />}></Route>
              <Route path='viewproducts' element={<ViewProducts />}></Route>
              <Route path='vieworders' element={<ViewOrders />}></Route>
              <Route path='editpassword' element={<EditPassword />}></Route>
              <Route path='contactmessage' element={<ContactMessage />}></Route>
            </Routes>
          </div> */}
        </div>
        <div className='md:ml-[45vh]'>
          <Routes>
            <Route path='/' element={<Statistics navcolor={navColor} mode={mode} />}></Route>
            <Route path='addproduct' element={<AddProduct navcolor={navColor} mode={mode} />}></Route>
            <Route path='viewproducts' element={<ViewProducts navcolor={navColor} mode={mode} />}></Route>
            <Route path='vieworders' element={<ViewOrders navcolor={navColor} mode={mode} />}></Route>
            <Route path='editpassword' element={<EditPassword navcolor={navColor} mode={mode} />}></Route>
            <Route path='contactmessage' element={<ContactMessage navcolor={navColor} mode={mode} />}></Route>
          </Routes>
        </div>
      </div>
    </>
  )
}

export default AdminHome