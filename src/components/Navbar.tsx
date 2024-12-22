import React from "react";
import AppIcon from "./AppIcon";
import NavbarHelpIcon from "./NavbarHelpIcon";

const Navbar = () => {
    return (
        <nav className="app-dark-gray text-white p-4 flex justify-between items-center">
            <AppIcon />
            <NavbarHelpIcon />
        </nav>
    )
}

export default Navbar;
