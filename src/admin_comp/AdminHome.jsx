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

  const dropdown = () => {
    document.querySelector("#submenu").classList.toggle("hidden");
    document.querySelector("#arrow").classList.toggle("rotate-0");
  }

  const openSidebar = () => {
    document.querySelector(".sidebar").classList.toggle("hidden");
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

      <span
        class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={openSidebar}
      >
        <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
      </span>
      <div
        class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
      >
        <div class="text-gray-100 text-xl">
          <div class="p-2.5 mt-1 flex items-center">
            <img src='https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png' alt="no-image" className='w-20 y-20 rounded-full' />
            <h1 class="font-bold text-gray-200 text-[15px] ml-3">ADMIN</h1>
            <i
              class="bi bi-x-lg text-red-500 cursor-pointer ml-28 lg:hidden"
              onClick={openSidebar}
            ></i>
          </div>
          <div class="my-2 bg-gray-600 h-[1px]"></div>
        </div>

       
        {/* <div class="my-4 bg-gray-600 h-[1px]"></div> */}
       
       
        <div
          class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={logout}>
          <i class="bi bi-box-arrow-in-right"></i>
          <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
        </div>
      </div>

    </>
  )
}

export default AdminHome