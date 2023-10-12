import React from 'react'
import HeroSection from './HeroSection'

const About = () => {

    const data = {
        name: 'UNIQUE ECOMMERCE',
        image_url: 'https://ivabqohtumjadxnipnsa.supabase.co/storage/v1/object/public/images/shopping_image_about.jpg'
    }

    return (
        <>
            <HeroSection myData={data} />
        </>
    )
}

export default About