import React from 'react';
import NavbarStyle from "./Navbar.module.css";
import logo from "./image/swiftmd logo-01.png";


const Navbar = () => {
    return (
        <>
            <nav className={NavbarStyle.container}>
                <img src={logo} alt="logo" />
            </nav>

        </>
    )
}

export default Navbar
