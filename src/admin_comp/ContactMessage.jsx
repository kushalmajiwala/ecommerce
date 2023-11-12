import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAdminContext } from '../context/admin_context';

const ContactMessage = ({ navcolor, mode }) => {

  const { contact, total_contact } = useAdminContext();


  if (total_contact === 0) {
    return (
      <>
        <div className='w-full'>
          <div className='flex justify-center pt-[35vh]'>
            {
              mode == "light" ?
                <p className='font-semibold text-xl text-black'>NO CONTACT MESSAGES</p>
                :
                <p className='font-semibold text-xl text-white'>NO CONTACT MESSAGES</p>
            }
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='w-full flex justify-center'>
        <div className=''>
          {
            contact.map((curElem, index) => {
              return(
                <div className='w-[90vw] md:w-[45vw] h-[20vh] mt-5 bg-white rounded-lg shadow-md' key={index}>
                  <div className='border-b-2 w-full h-10 flex justify-between items-center pt-3'>
                    <p className='pl-5'>{curElem.username}</p>
                    <p className='text-red-500 text-xl pr-2'><i className="bi bi-trash3-fill cursor-pointer"></i></p>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}

export default ContactMessage