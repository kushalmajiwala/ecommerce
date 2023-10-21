import React, { useState } from 'react'
import { InputText } from "primereact/inputtext";
import bcrypt from 'bcryptjs'
import { useAdminContext } from '../context/admin_context';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from "react-router-dom";

// var salt = bcrypt.genSaltSync(10);
var salt = "$2a$10$O2mB4NXbEIb9PgFHCEzj0e";

const AdminLogin = () => {

    const { getAdminDetailsByUsername, username, password, email } = useAdminContext();

    const [uname, setUname] = useState("");
    const [upass, setUpass] = useState("");
    const [invalidDetail, setInvalidDetail] = useState(false);
    const navigate = useNavigate();

    const performLogin = async () => {
        // var salt = bcrypt.genSaltSync(10);
        if (uname !== "" && upass !== "") {
            // var hash = bcrypt.hashSync(upass, salt);
            try {
                await getAdminDetailsByUsername(uname);
                const login_status = await bcrypt.compare(upass, password);
                if (login_status == false) {
                    setInvalidDetail(true);
                }
                else {
                    navigate("/adminhome");
                }
            }
            catch (error) {
                setInvalidDetail(true);
            }
        }
        else {
            setInvalidDetail(true);
        }
    }

    return (
        <>
            <div className='flex pt-24 justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% h-screen w-screen'>
                <div className='w-5/6 sm:w-5/12 md:w-3/12 2xl:pt-12 opacity-100 h-4/5 bg-cyan-400 rounded-2xl shadow-2xl'>
                    <div className='flex justify-center pt-4'>
                        <img src="https://ngaxtqtjphtkyssalygr.supabase.co/storage/v1/object/public/images/unique_store_logo.png" alt="no-image" className='rounded-full w-24 y-24 2xl:w-32 2xl:y-32' />
                    </div>
                    <div className='flex justify-center pt-3'>
                        <p className='text-3xl font-medium'>ADMIN LOGIN</p>
                    </div>
                    <div>
                        <div className='flex justify-center mt-3 2xl:mt-5'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText placeholder="Enter Username" value={uname} onChange={(e) => setUname(e.target.value)} />
                            </span>
                        </div>
                        <div className='flex justify-center mt-3 2xl:mt-5'>
                            <span className="p-input-icon-left">
                                <i className="pi pi-lock" />
                                <InputText type="password" placeholder="Enter Password" value={upass} onChange={(e) => setUpass(e.target.value)} />
                            </span>
                        </div>
                        <div className='flex justify-center pt-4'>
                            <button className='w-4/6 2xl:w-3/6 2xl:mt-5 rounded-2xl bg-blue-600 hover:bg-blue-700 py-2 text-white text-lg' onClick={performLogin}>LOGIN</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='dialogs'>
                <Dialog visible={invalidDetail} draggable={false} className="w-11/12 md:w-1/3" onHide={() => setInvalidDetail(false)}>
                    <div className='flex justify-center'>
                        <div className='text-center'>
                            <i className="bi bi-x-circle text-7xl text-red-500"></i>
                            <p className="font-bold text-lg mt-4">
                                Invalid Username or Password
                            </p>
                        </div>
                    </div>
                </Dialog>
            </div>
        </>
    )
}

export default AdminLogin