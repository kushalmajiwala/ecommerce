import React from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';

const AdminHome = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("light");
  const [backColor, setBackColor] = useState("bg-gray-100");
  const [navColor, setNavColor] = useState("bg-white");


  const changeMode = () => {
    if (mode == "light") {
      setMode("dark");
      setBackColor("bg-gray-900");
      setNavColor("bg-gray-700");
    }
    else {
      setMode("light");
      setBackColor("bg-gray-100");
      setNavColor("bg-white");
    }
  }

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


      <div className={`${backColor} w-screen h-screen`}>
        <div>
          <span
            className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
            onClick={openSidebar}
          >
            <i className="bi bi-list px-2 bg-gray-800 rounded-md"></i>
          </span>
          <div
            className="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px]  overflow-y-auto text-center bg-gray-800"
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
              className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
              onClick={logout}>
              <div>
                <i className="bi bi-box-arrow-in-right text-2xl"></i>
                <span className=" text-lg ml-4 text-gray-200 font-bold">LOGOUT</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`w-full h-[90px] ${navColor} shadow-sm pl-[300px]`}>
          <div>
            <div className='flex justify-end h-[90px] items-center pr-5'>
              {
                mode == "dark" 
                  ? <p className='text-white w-12 flex justify-center h-10 items-center cursor-pointer rounded text-lg shadow-lg bg-slate-900' onClick={changeMode}><i className="bi bi-brightness-high-fill"></i></p>
                  : <p className='text-white w-12 flex justify-center h-10 items-center cursor-pointer rounded text-lg shadow-lg bg-slate-900' onClick={changeMode}><i className="bi bi-moon-fill"></i></p>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminHome