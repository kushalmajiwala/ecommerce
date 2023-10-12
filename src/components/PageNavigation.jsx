import React from 'react'
import { NavLink } from 'react-router-dom'

const PageNavigation = ({ title }) => {
    return (
        <>
            <div>
                <NavLink to="/" className="no-underline">HOME</NavLink> / {title}
            </div>
        </>
    )
}

export default PageNavigation