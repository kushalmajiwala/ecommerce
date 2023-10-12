import React from 'react'

const CartAmountToggle = ({ amount, setDecrease, setIncrease }) => {
    return (
        <>
            <div className='w-full'>
                <div className='flex justify-between w-1/4'>
                    <button onClick={() => setDecrease()}><i className="bi bi-dash text-3xl"></i></button>
                    <div className='text-3xl text-purple-400'>{amount}</div>
                    <button onClick={() => setIncrease()}><i className="bi bi-plus text-3xl"></i></button>
                </div>
            </div>
        </>
    )
}

export default CartAmountToggle