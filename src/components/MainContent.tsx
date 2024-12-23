import React, {useState} from "react";
import { Plus } from "lucide-react";
import WhiteboardModal from "./WhiteboardModal";
import '../assets/css/App.css'

const MainContent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="flex-1 flex flex-col justify-between items-center p-0 min-h-0 relative">
            {/*heading*/}
            <h1 className="mb-2 relative mt-5 text-violet-900 font-bold text-2xl">
                Write Equation 👉 See plot
            </h1>

            {/* Demo Image Section */}
            <div className="w-full max-w-md mb-2 mt-5">
                <img
                    className="w-full"
                    src="../../public/images/func-tool-banner.png" // Replace with your image path
                    alt="Functional Tool Banner"
                />
            </div>


            {/* Interactive Area */}
            <div className="flex-1 flex flex-col items-center justify-between w-full max-w-md relative mt-2">
                {/*dsicription*/}
                <div
                    className="flex mb-2 mt-2 text-center relative italic text-gray-500 w-full pl-16 pr-16 text-sm pb-10">
                    Enhance your math learning by writing equations with your hand and instantly generating plots,
                    helping you improve spatial reasoning skills
                </div>

                {/* Write Equation Text */}
                {/*<div className="mb-2 mt-2 relative">*/}
                {/*    <span className="text-violet-700 font-bold text-xl heading-font">*/}
                {/*        Generate plot*/}
                {/*    </span>*/}
                {/*</div>*/}

                {/* Plus Button with Faster Color Transition */}
                {/* Flame Button Container */}
                <div className="relative inline-flex items-center justify-center">
                    {/* Flame effects - perfectly centered */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="flame-ring flame-1"></div>
                        <div className="flame-ring flame-2"></div>
                        <div className="flame-ring flame-3"></div>
                    </div>

                    {/* Plus Button */}
                    <button
                        onClick={() => setIsModalOpen(!isModalOpen)}
                        className="w-16 h-16 rounded-full flex items-center justify-center
                                 transform active:scale-90 transition-transform
                                 focus:outline-none hover:scale-105 bg-violet-600 z-10
                                 relative"
                    >
                        <Plus className="w-11 h-11 text-white" strokeWidth={1}/>
                    </button>
                </div>
            </div>

            <WhiteboardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <style jsx>{`
                .flame-ring {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    border-radius: 50%;
                    mix-blend-mode: screen;
                    pointer-events: none;
                }

                .flame-1 {
                    width: 80px;
                    height: 80px;
                    background: radial-gradient(circle at center,
                    rgba(255, 140, 0, 0.8) 0%,
                    rgba(255, 69, 0, 0.4) 45%,
                    transparent 70%);
                    animation: flicker1 2s infinite;
                }

                .flame-2 {
                    width: 90px;
                    height: 90px;
                    background: radial-gradient(circle at center,
                    rgba(255, 215, 0, 0.8) 0%,
                    rgba(255, 140, 0, 0.4) 45%,
                    transparent 70%);
                    animation: flicker2 3s infinite;
                }

                .flame-3 {
                    width: 100px;
                    height: 100px;
                    background: radial-gradient(circle at center,
                    rgba(255, 255, 0, 0.8) 0%,
                    rgba(255, 215, 0, 0.4) 45%,
                    transparent 70%);
                    animation: flicker3 4s infinite;
                }

                @keyframes flicker1 {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1) rotate(0deg);
                        opacity: 0.8;
                    }
                    25% {
                        transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
                        opacity: 0.7;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
                        opacity: 0.9;
                    }
                    75% {
                        transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
                        opacity: 0.6;
                    }
                }

                @keyframes flicker2 {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1.1) rotate(-5deg);
                        opacity: 0.7;
                    }
                    25% {
                        transform: translate(-50%, -50%) scale(0.9) rotate(5deg);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.2) rotate(-5deg);
                        opacity: 0.6;
                    }
                    75% {
                        transform: translate(-50%, -50%) scale(1) rotate(5deg);
                        opacity: 0.9;
                    }
                }

                @keyframes flicker3 {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1.2) rotate(5deg);
                        opacity: 0.6;
                    }
                    25% {
                        transform: translate(-50%, -50%) scale(1) rotate(-5deg);
                        opacity: 0.9;
                    }
                    50% {
                        transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
                        opacity: 0.7;
                    }
                    75% {
                        transform: translate(-50%, -50%) scale(0.9) rotate(-5deg);
                        opacity: 0.8;
                    }
                }
            `}</style>
        </main>
    );
};

export default MainContent;