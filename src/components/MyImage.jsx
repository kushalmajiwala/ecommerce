import React from 'react'
import { useState } from 'react'

const MyImage = ({ imgs = [{ url: ""}] }) => {

    const [mainImage, setMainImage] = useState(imgs[0]);

    return (
        <>
            <div className='flex justify-center item border-b-2 md:border-none pb-3 md:pb-0'>
                <div className='pr-4'>
                    {
                        imgs.map((currElem, index) => {
                            return (
                                <figure key={index}>
                                    <img src={currElem.url} alt={currElem.filename} key={index} className="w-32 h-24 cursor-pointer shadow-md" onClick={() => setMainImage(currElem)} />
                                </figure>
                            )
                        })
                    }
                </div>
                <div className='flex justify-center items-center md:pr-14'>
                    <img src={mainImage.url} alt={mainImage.filename} className="w-72 h-48 cursor-pointer shadow-md" />
                </div>
            </div>
        </>
    )
}

export default MyImage