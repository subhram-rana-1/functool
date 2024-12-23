import React from "react";
import AppIcon from "./AppIcon";

const Navbar = () => {
    return (
        <nav className="app-dark-violate text-white p-4 pl-10 flex justify-between items-center h-16 min-h-[64px] flex-shrink-0">
            <AppIcon />
        </nav>
    );
};

export default Navbar;
