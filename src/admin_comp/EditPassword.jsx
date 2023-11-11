import React from 'react'
import { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import bcrypt from 'bcryptjs'
import { useAdminContext } from '../context/admin_context';

var salt = "$2a$10$O2mB4NXbEIb9PgFHCEzj0e";

const EditPassword = ({ navcolor, mode }) => {

  const { getAdminDetailsByUsername, updatePassword } = useAdminContext();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [emptyField, setEmptyField] = useState(false);
  const [invalidOldPassword, setInvalidOldPassword] = useState(false);
  const [changesSaved, setChangesSaved] = useState(false);
  const [differentConfirmPassword, setDifferentConfirmPassword] = useState(false);
  const [minLength, setMinLength] = useState(false);
  const [sameNewPassword, setSameNewPassword] = useState(false);

  const savePassword = async () => {
    if (oldPassword === "" || newPassword === "" || confirmNewPassword === "") {
      setEmptyField(true);
    }
    else if (oldPassword !== "") {
      const data_fetched = await getAdminDetailsByUsername(localStorage.getItem("username"));
      const login_status = await bcrypt.compare(oldPassword, data_fetched[0].password);
      if (login_status === false) {
        setInvalidOldPassword(true);
      }
      else if(newPassword.length < 8)
      {
        setMinLength(true); 
      }
      else if(newPassword !== confirmNewPassword)
      { 
        setDifferentConfirmPassword(true);
      }
      else if(newPassword === oldPassword)
      {
        setSameNewPassword(true);
      }
      else {
        const incrypt_password = bcrypt.hashSync(newPassword, salt);
        await updatePassword(localStorage.getItem("username"), incrypt_password);
        setChangesSaved(true);
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    }
  }

  return (
    <>
      <div className='flex justify-center md:justify-start w-full h-full pt-4 md:pl-4'>
        <div className={`w-[90vw] h-[70vh] md:w-[40vw] md:h-[500px] ${navcolor} shadow-md rounded-lg`}>
          <div className='md:pl-7 border-b-2 flex items-center justify-center md:justify-start h-20 pt-3'>
            {
              mode == "light" ?
                <p className='font-medium text-xl text-black'>CHANGE PASSWORD</p>
                :
                <p className='font-medium text-xl text-white'>CHANGE PASSWORD</p>
            }
          </div>
          {
            mode == "light" ?
              <div className='flex justify-center items-center md:justify-start pt-4 md:pl-6'>
                <div>
                  <label htmlFor="value" className='text-black'>Old Passwrord</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /><br /><br />

                  <label htmlFor="value" className='text-black'>New Password</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br /><br />

                  <label htmlFor="value" className='text-black'>Confirm New Password</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /><br /><br />
                </div>
              </div>
              :
              <div className='flex justify-center items-center md:justify-start pt-4 md:pl-6'>
                <div>
                  <label htmlFor="value" className='text-white'>Old Passwrord</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} /><br /><br />

                  <label htmlFor="value" className='text-white'>New Password</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} /><br /><br />

                  <label htmlFor="value" className='text-white'>Confirm New Password</label><br />
                  <input type="password" className='w-64 md:w-96 h-10 bg-gray-200 pl-3 rounded-md' value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} /><br /><br />
                </div>
              </div>
          }
          <div className='flex justify-center mt-4'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-700' onClick={savePassword}>Save Changes</button>
          </div>
        </div>
        <div>
          <Dialog visible={emptyField} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setEmptyField(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                <p className="font-bold text-lg mt-4">
                  Any of the field should not be empty
                </p>
              </div>
            </div>
          </Dialog>
          <Dialog visible={invalidOldPassword} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setInvalidOldPassword(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                <p className="font-bold text-lg mt-4">
                  Invalid Old Password
                </p>
              </div>
            </div>
          </Dialog>
          <Dialog visible={differentConfirmPassword} draggable={false} className="w-11/12 md:w-1/2" onHide={() => setDifferentConfirmPassword(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                <p className="font-bold text-lg mt-4">
                  New Password and Confirm Password does not match
                </p>
              </div>
            </div>
          </Dialog>
          <Dialog visible={minLength} draggable={false} className="w-11/12 md:w-1/2" onHide={() => setMinLength(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                <p className="font-bold text-lg mt-4">
                  New Password should be atleast 8 character long
                </p>
              </div>
            </div>
          </Dialog>
          <Dialog visible={sameNewPassword} draggable={false} className="w-11/12 md:w-1/2" onHide={() => setSameNewPassword(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-x-circle text-7xl text-red-500"></i>
                <p className="font-bold text-lg mt-4">
                  New Password should not be the same as old password
                </p>
              </div>
            </div>
          </Dialog>
          <Dialog visible={changesSaved} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setChangesSaved(false)}>
            <div className='flex justify-center'>
              <div className='text-center'>
                <i className="bi bi-check-circle text-7xl text-green-500"></i>
                <p className="font-bold text-lg mt-4">
                  Password Updated Successfully
                </p>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </>
  )
}

export default EditPassword