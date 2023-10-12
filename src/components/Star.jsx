import React from 'react'

const Star = ({ stars, reviews }) => {

    const ratingStar = Array.from({length:5}, (elem, index) => {
        let number = index + 0.5;

        return(
            <span key={index}>
                {stars >= index + 1 ? <i className="bi bi-star-fill text-yellow-400"></i> : stars >= number ? <i className="bi bi-star-half text-yellow-400"></i> : <i className="bi bi-star text-yellow-400"></i>} 
            </span>
        )
    });
    return (
        <>
            <div>
                <div>
                    {ratingStar}
                    <span className='ml-2'>({reviews} customer reviews)</span>
                </div>
            </div>
        </>
    )
}

export default Star