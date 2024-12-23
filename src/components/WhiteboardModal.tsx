import React, { useState, useRef, useEffect } from 'react';
import { X, Hand } from 'lucide-react';

const WhiteboardModal = ({ isOpen, onClose }) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [isPanning, setIsPanning] = useState(false);
    const [tool, setTool] = useState('pencil');
    const [selectedColor, setSelectedColor] = useState('#190eff');
    const [hasContent, setHasContent] = useState(false);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const [startPanPoint, setStartPanPoint] = useState({ x: 0, y: 0 });
    const [canvasContent, setCanvasContent] = useState(null);

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const colors = [
        { id: 3, color: '#190eff' },
        { id: 2, color: '#02b327' },
        { id: 1, color: '#ef2e1a' },
    ];

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

        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = 2;

        const pattern = createDottedPattern(context);
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

        contextRef.current = context;

        // Restore previous content if exists
        if (canvasContent) {
            context.putImageData(canvasContent, panOffset.x, panOffset.y);
        }
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

    const startPanning = (e) => {
        e.preventDefault();
        setIsPanning(true);
        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        setStartPanPoint({ x: clientX, y: clientY });

        if (contextRef.current) {
            const canvas = canvasRef.current;
            setCanvasContent(contextRef.current.getImageData(0, 0, canvas.width, canvas.height));
        }
    };

    const handlePanning = (e) => {
        if (!isPanning || !canvasContent) return;
        e.preventDefault();

        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        const dx = clientX - startPanPoint.x;
        const dy = clientY - startPanPoint.y;

        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);

        // Redraw background
        const pattern = createDottedPattern(contextRef.current);
        contextRef.current.fillStyle = pattern;
        contextRef.current.fillRect(0, 0, canvas.width, canvas.height);

        // Update position
        contextRef.current.putImageData(canvasContent, dx, dy);
    };

    const stopPanning = () => {
        if (isPanning && contextRef.current) {
            const canvas = canvasRef.current;
            setCanvasContent(contextRef.current.getImageData(0, 0, canvas.width, canvas.height));
        }
        setIsPanning(false);
    };

    const startDrawing = (e) => {
        if (tool === 'pan') {
            startPanning(e);
            return;
        }

        e.preventDefault();
        const { x, y } = getCoordinates(e);
        contextRef.current.beginPath();
        // contextRef.current.moveTo(x - panOffset.x, y - panOffset.y);
        contextRef.current.moveTo(x, y);
        setIsDrawing(true);
        setHasContent(true);
    };

    const draw = (e) => {
        if (tool === 'pan') {
            handlePanning(e);
            return;
        }

        if (!isDrawing) return;
        e.preventDefault();
        const { x, y } = getCoordinates(e);
        // contextRef.current.lineTo(x - panOffset.x, y - panOffset.y);
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    };

    const stopDrawing = () => {
        if (tool === 'pan') {
            stopPanning();
            return;
        }

        if (contextRef.current) {
            contextRef.current.closePath();
        }
        setIsDrawing(false);
    };

    const clearCanvas = () => {
        if (!canvasRef.current) return;

        setPanOffset({ x: 0, y: 0 });
        setCanvasContent(null);

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvas.width, canvas.height);

        context.lineCap = 'round';
        context.strokeStyle = selectedColor;
        context.lineWidth = 2;

        const pattern = createDottedPattern(context);
        context.fillStyle = pattern;
        context.fillRect(0, 0, canvas.width, canvas.height);

        contextRef.current = context;
        setHasContent(false);
    };

    const handleToolChange = (newTool) => {
        setTool(newTool);
        if (!contextRef.current) return;

        const context = contextRef.current;
        if (newTool === 'eraser') {
            context.strokeStyle = '#FFFCF8';
            context.lineWidth = 20;
        } else if (newTool === 'pencil') {
            context.strokeStyle = selectedColor;
            context.lineWidth = 2;
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 
                ${isOpen ? 'opacity-100 backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div
                className={`
    bg-white rounded-2xl shadow-xl p-1 w-full max-w-2xl mx-2 transition-all duration-700 ease-out transform
    ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
  `}

                onClick={e => e.stopPropagation()}
            >
                <div className="relative mb-2">
                    {!hasContent && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-300 pointer-events-none text-2xl">
                            Write equation here
                        </div>
                    )}

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

                <div className="flex flex-col items-center justify-center px-4 py-2 mb-2">
                    <div className="flex items-center justify-around w-full">
                        <div className="flex gap-3 bg-none p-2 rounded-3xl">
                            <button
                                onClick={() => handleToolChange('pan')}
                                className={`p-1.5 rounded-3xl transition-all duration-200 ${
                                    tool === 'pan' ? 'bg-violet-400 scale-125' : 'hover:bg-violet-300'
                                }`}
                            >
                                <Hand size={20} />
                            </button>
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

                    <div className="flex flex-col items-center justify-center px-4 py-2 mb-2">
                        <button
                            onClick={onClose}
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