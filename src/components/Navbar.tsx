import React from "react";
import AppIcon from "./AppIcon";
import NavbarHelpIcon from "./NavbarHelpIcon";

const Navbar = () => {
    return (
        <nav className="app-dark-violate text-white p-4 flex justify-between items-center h-16 min-h-[64px] flex-shrink-0">
            <AppIcon />
            <NavbarHelpIcon />
        </nav>
    );
};

export default Navbar;
