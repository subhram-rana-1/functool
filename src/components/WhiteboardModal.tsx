import React, { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const WhiteboardModal = ({ isOpen, onClose }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [tool, setTool] = useState('pencil');
    const [selectedColor, setSelectedColor] = useState('#190eff');
    const [hasContent, setHasContent] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const colors = [
        { id: 3, color: '#190eff' },
        { id: 2, color: '#02b327' },
        { id: 1, color: '#ef2e1a' },
    ];

    // ... [Previous helper functions remain unchanged]
    const createDottedPattern = (context) => {
        const patternCanvas = document.createElement('canvas');
        const patternContext = patternCanvas.getContext('2d');
        patternCanvas.width = 20;
        patternCanvas.height = 20;

        patternContext.fillStyle = '#FFFCF8';
        patternContext.fillRect(0, 0, 20, 20);

        patternContext.beginPath();
        patternContext.arc(10, 10, 1, 0, Math.PI * 2);
        patternContext.fillStyle = '#E5E7EB';
        patternContext.fill();

        return context.createPattern(patternCanvas, 'repeat');
    };

    const initializeCanvas = () => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width;
        canvas.height = rect.height;

        context.setTransform(1, 0, 0, 1, 0, 0);
        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = 2;

        const pattern = createDottedPattern(context);
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

        contextRef.current = context;
    };

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => {
                initializeCanvas();
            });
        }
    }, [isOpen]);

    useEffect(() => {
        const handleResize = () => {
            if (isOpen) {
                initializeCanvas();
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isOpen]);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;

        if (e.touches) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    };

    const startDrawing = (e) => {
        e.preventDefault();
        const { x, y } = getCoordinates(e);
        contextRef.current.beginPath();
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
        setHasContent(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault();
        const { x, y } = getCoordinates(e);
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    const stopDrawing = () => {
        if (contextRef.current) {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;
        initializeCanvas();
        setHasContent(false);
    };

    const handleToolChange = (newTool) => {
        setTool(newTool);
        if (!contextRef.current) return;

        const context = contextRef.current;
        context.strokeStyle = newTool === 'eraser' ? '#FFFCF8' : selectedColor;
        context.lineWidth = newTool === 'eraser' ? 20 : 2;
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className="bg-white rounded-2xl shadow-xl p-1 w-full max-w-2xl mx-2 transition-all duration-200 ease-out transform"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative mb-2">
                    {!hasContent && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none text-2xl">
                            Write equation here
                        </div>
                    )}

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5
                            transition-all duration-200 active:scale-125 shadow-sm z-10"
                    >
                        <X size={16} />
                    </button>

                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onTouchStart={startDrawing}
                        onMouseMove={draw}
                        onTouchMove={draw}
                        onMouseUp={stopDrawing}
                        onTouchEnd={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchCancel={stopDrawing}
                        className="border rounded-2xl w-full h-[300px] shadow-inner touch-none"
                        style={{ touchAction: 'none' }}
                    />
                </div>

                {/* Optimized controls layout */}
                <div className="flex flex-col items-center justify-center px-4 py-2 mb-2">
                    <div className="flex items-center justify-around w-full">
                        {/* Tools section */}
                        <div className="flex gap-3 bg-none p-2 rounded-3xl">
                            <button
                                onClick={() => handleToolChange('pencil')}
                                className={`p-1.5 rounded-3xl transition-all duration-200 ${
                                    tool === 'pencil' ? 'bg-violet-400 scale-125' : 'hover:bg-violet-300'
                                }`}
                            >
                                ✏️
                            </button>
                            <button
                                onClick={() => handleToolChange('eraser')}
                                className={`p-1.5 rounded-3xl transition-all duration-200 ${
                                    tool === 'eraser' ? 'bg-violet-400 scale-125' : 'hover:bg-violet-300'
                                }`}
                            >
                                🧹
                            </button>
                            <button
                                onClick={clearCanvas}
                                className="p-1.5 rounded-3xl transition-all duration-100 active:scale-150"
                            >
                                🗑️
                            </button>
                        </div>

                        {/* Color options */}
                        <div className="flex gap-3">
                            {colors.map((c) => (
                                <button
                                    key={c.id}
                                    onClick={() => {
                                        setSelectedColor(c.color);
                                        if (tool === 'pencil' && contextRef.current) {
                                            contextRef.current.strokeStyle = c.color;
                                        }
                                    }}
                                    className={`w-8 h-8 rounded-full transition-all duration-200
                                        ${selectedColor === c.color
                                        ? 'scale-125 ring-2 ring-offset-1 ring-gray-300'
                                        : 'hover:scale-125'
                                    }`}
                                    style={{backgroundColor: c.color}}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Done button */}
                    <div>
                        <button
                            onClick={() => {}}
                            className="px-14 py-3 bg-violet-600 text-white text-sm rounded-2xl
                            transition-all duration-200 active:scale-75 hover:bg-violet-400"
                        >
                            <b>DONE</b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhiteboardModal;