import {HelpCircle} from "lucide-react";
import React from "react";

const NavbarHelpIcon = () => {
    return (
        <button className="p-1 rounded-full hover:app-dark-gray">
            <HelpCircle size={24}/>
        </button>
    )
}

export default NavbarHelpIcon;
