import React from 'react';
import Navbar from "../Navbar";
import Ads from "../Ads";
import MainContent from "../MainContent";

const MobileLayout = () => {
    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            <Navbar />
            <MainContent />
            <Ads />
        </div>
    );
};

export default MobileLayout;