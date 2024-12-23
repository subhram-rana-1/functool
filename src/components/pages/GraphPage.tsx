import React from 'react';
import Navbar from "../Navbar";
import Ads from "../Ads";
import GraphContent from "../GraphContent";

const GraphPage = () => {
    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            <Navbar />
            <GraphContent />
            <Ads />
        </div>
    );
};

export default GraphPage;