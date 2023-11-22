import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useAdminContext } from '../context/admin_context';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const ContactMessage = ({ navcolor, mode }) => {

  const { contact, total_contact, removeContactMessage } = useAdminContext();
  const [contactRemove, setContactRemove] = useState(false);
  const [contactRemoved, setContactRemoved] = useState(false);
  const [removeContactId, setRemoveContactId] = useState(0);

  const openRemoveMessageDialog = (contactid) => {
    setContactRemove(true);
    setRemoveContactId(contactid);
  }

  const closeContactRemoveDialog = () => {
    setContactRemove(false);
    setRemoveContactId(0);
  }

  const removeMessage = async (contactid) => {
    await removeContactMessage(contactid);
    setRemoveContactId(0);
    setContactRemove(false);
    setContactRemoved(true);
  }

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
              return (
                mode === "light" ?
                  <div className='w-[90vw] md:w-[50vw] h-[20vh] mt-5 bg-white rounded-lg shadow-md' key={index}>
                    <div className='border-b-2 w-full h-10 flex justify-between items-center pt-3'>
                      <p className='pl-5 text-xl font-bold'>{curElem.username}</p>
                      <p className='text-red-500 hover:text-red-600 text-xl pr-2'><i className="bi bi-trash3-fill cursor-pointer delete_message" data-pr-tooltip="DELETE MESSAGE" data-pr-position="right" onClick={() => openRemoveMessageDialog(curElem.contact_id)}></i></p>
                      <Tooltip target=".delete_message" className='hidden md:block' />
                    </div>
                    <div className='flex items-center pl-5'>
                      <div className='pt-2'>
                        <p className='mt-1 font-medium text-lg'>{curElem.email}</p>
                        <p className='whitespace-nowrap overflow-hidden w-[80vw] md:w-[42vw] -mt-2'>{curElem.message}</p>
                      </div>
                    </div>
                  </div>
                  :
                  <div className={`w-[90vw] md:w-[50vw] h-[20vh] mt-5 ${navcolor} rounded-lg shadow-md`} key={index}>
                    <div className='border-b-2 w-full h-10 flex justify-between items-center pt-3'>
                      <p className='pl-5 text-xl font-bold text-white'>{curElem.username}</p>
                      <p className='text-red-500 hover:text-red-600 text-xl pr-2'><i className="bi bi-trash3-fill cursor-pointer delete_message" data-pr-tooltip="DELETE MESSAGE" data-pr-position="right" onClick={() => openRemoveMessageDialog(curElem.contact_id)}></i></p>
                      <Tooltip target=".delete_message" className='hidden md:block' />
                    </div>
                    <div className='flex items-center pl-5'>
                      <div className='pt-2'>
                        <p className='mt-1 font-medium text-lg text-white'>{curElem.email}</p>
                        <p className='whitespace-nowrap overflow-hidden w-[80vw] md:w-[42vw] -mt-2 text-white'>{curElem.message}</p>
                      </div>
                    </div>
                  </div>
              )
            })
          }
        </div>
        <div>
          <Dialog visible={contactRemove} closable={false} draggable={false} className="w-11/12 md:w-[37vw]" onHide={() => setContactRemove(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-exclamation-circle text-7xl text-orange-400"></i>
                <p className="font-bold text-lg mt-4">
                  Are you sure you want to delete this message?
                </p>
                <div className='flex justify-end'>
                  <span><Button label="YES" severity="danger" onClick={() => removeMessage(removeContactId)} /></span>
                  <span className='ml-3'><Button label="NO" onClick={closeContactRemoveDialog} /></span>
                </div>
              </div>
            </div>
          </Dialog>
          <Dialog visible={contactRemoved} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setContactRemoved(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                <p className="font-bold text-lg mt-4">
                  Contact Removed Successfully
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default ContactMessage