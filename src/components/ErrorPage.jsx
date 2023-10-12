import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <>
      <div className='flex justify-center pt-16 pb-3 px-8'>
        <div>
          <div>
            <p className='text-6xl text-center font-semibold font-sans'>404</p>
            <p className='text-center font-light text-2xl'>OH OH! You're lost</p>
            <p className='text-center font-extralight text-sm'>The page you are looking for does not exist. How you got here is a mystery. But you can click the button below to go back to the home page.</p>
            <p className='text-center mt-4'>
              <NavLink to='/' className='no-underline text-white bg-blue-500 rounded-md py-2 px-4'>GO BACK TO HOME</NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorPage