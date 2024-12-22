import React, {useState} from "react";
import { Plus } from "lucide-react";
import WhiteboardModal from "./WhiteboardModal";

const MainContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const colors = ['#e74bfd','#ff5733','#f39c12','#1abc9c','#3498db','#9b59b6','#2ecc71'];

    return (
        <main className="flex-1 flex flex-col items-center p-0 min-h-0 relative">
            {/* Demo Video Section */}
            <div className="w-full max-w-md mb-2">
                <video
                    className="w-full"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="../../public/videos/func-tool-banner.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Interactive Area */}
            <div className="flex-1 flex flex-col items-center w-full max-w-md relative mt-10">
                {/* Plus Button with Faster Color Transition */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-16 h-16 rounded-full flex items-center justify-center transform active:scale-90 transition-transform focus:outline-none hover:scale-105"
                    style={{
                        animation: 'colorTransition 2s infinite',
                        background: colors[0]
                    }}
                >
                    <Plus className="w-11 h-11 text-white" strokeWidth={1}/>
                </button>

                {/* Write Equation Text */}
                <div className="mb-2 mt-2 relative">
                    <span className="text-gray-800 font-bold text-lg">
                        ✏️ Write Your Equation
                    </span>
                </div>
            </div>

            <WhiteboardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <style jsx>{`
                @keyframes colorTransition {
                    0% {
                        background-color: #e74bfd;
                    }
                    16.6% {
                        background-color: #ff5733;
                    }
                    32.32% {
                        background-color: #f39c12;
                    }
                    49.98% {
                        background-color: #1abc9c;
                    }
                    66.64% {
                        background-color: #3498db;
                    }
                    83.30% {
                        background-color: #9b59b6;
                    }
                    100% {
                        background-color: #2ecc71;
                    }
                }

                @keyframes point {
                    0%, 100% {
                        transform: translateY(0) translateX(-50%);
                    }
                    50% {
                        transform: translateY(10px) translateX(-50%);
                    }
                }

                .animate-point {
                    animation: point 1s ease-in-out infinite;
                }
            `}</style>
        </main>
    );
};

export default MainContent;