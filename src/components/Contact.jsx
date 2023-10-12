import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const Contact = () => {
    const { user, isAuthenticated } = useAuth0();

    return (
        <>
            <div className='flex justify-center py-10'>
                <div className='p-3 w-full'>
                    <h2 className='text-center mb-5'>Feel Free to Contact Us</h2>
                    {/* eslint-disable-next-line */}
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.606900655041!2d72.79964237445552!3d21.207769380486766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04c287031a507%3A0x7883a27798cc9de4!2sVirat%20Shakti%20Apartment!5e0!3m2!1sen!2sin!4v1687520301088!5m2!1sen!2sin" width="100%" height="470" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className='flex justify-center py-10'>
                <div className=' w-5/6 md:w-2/6'>
                    <form action='https://formspree.io/f/mjvqbvvl' method='POST'>
                        <input type='text' placeholder='Username' value={isAuthenticated ? user.name : ""} name='Username' required autoComplete='off' className=' border-1 border-blue-300 w-full h-8 pl-2'/><br/><br/>
                        <input type='email' placeholder='Email' value={isAuthenticated ? user.email : ""} name='Email' autoComplete='off' required  className=' border-1 border-blue-300 w-full h-8 pl-2'/><br/><br/>
                        <textarea name='Message' cols="30" rows="10" required autoComplete="off" placeholder="Enter your Message" className=' border-1 border-blue-300 w-full pl-2'></textarea><br/><br/>
                        <input type="submit" value="SEND" className='w-36 h-10 text-white text-lg rounded-xl bg-blue-600 hover:bg-blue-500' />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Contact