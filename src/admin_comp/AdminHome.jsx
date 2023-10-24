import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

const AdminHome = () => {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/admin");
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
      

      <div className=' bg-gray-300 w-screen h-screen'>
        <div>
          <span
            className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
            onClick={openSidebar}
          >
            <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
          </span>
          <div
            className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
          >
            <div className="text-gray-100 text-xl">
              <div className="p-2.5 mt-1 flex items-center">
                <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png' alt="no-image" className='w-20 y-20 rounded-full' />
                <h1 className="font-bold text-gray-200 text-[15px] ml-3">ADMIN</h1>
                <i
                  className="bi bi-x-lg text-red-500 cursor-pointer ml-28"
                  onClick={openSidebar}
                ></i>
              </div>
              <div class="my-2 bg-gray-600 h-[1px]"></div>
            </div>
            {/* <div class="my-4 bg-gray-600 h-[1px]"></div> */}
            <div
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={logout}>
              <i className="bi bi-box-arrow-in-right text-2xl"></i>
              <span className=" text-lg  ml-4 text-gray-200 font-bold">LOGOUT</span>
            </div>
          </div>
        </div>
        <div className='w-full h-20 bg-white shadow-sm'>
          
        </div>
      </div>
    </>
  )
}

export default AdminHome