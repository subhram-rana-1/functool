import React, { useState, useRef, useEffect } from 'react';
import { Plus, Pencil, Eye, MoreVertical } from "lucide-react";
import WhiteboardModal from './WhiteboardModal';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./Dropdown";

const InteractiveGraph = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const [currentPath, setCurrentPath] = useState(null);
    const [paths, setPaths] = useState([]);

    // Drawing functionality
    const startDrawing = (e) => {
        if (!isDrawingMode) return;

        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        const rect = svg.getBoundingClientRect();
        const eventPoint = 'touches' in e ? e.touches[0] : e;

        point.x = (eventPoint.clientX - rect.left) / scale - offset.x;
        point.y = (eventPoint.clientY - rect.top) / scale - offset.y;

        setCurrentPath(`M ${point.x} ${point.y}`);
    };

    const draw = (e) => {
        if (!isDrawingMode || !currentPath) return;

        const svg = svgRef.current;
        const point = svg.createSVGPoint();
        const rect = svg.getBoundingClientRect();
        const eventPoint = 'touches' in e ? e.touches[0] : e;

        point.x = (eventPoint.clientX - rect.left) / scale - offset.x;
        point.y = (eventPoint.clientY - rect.top) / scale - offset.y;

        setCurrentPath(prev => `${prev} L ${point.x} ${point.y}`);
    };

    const endDrawing = () => {
        if (!isDrawingMode || !currentPath) return;

        setPaths(prev => [...prev, currentPath]);
        setCurrentPath(null);
    };

    // Touch and mouse event handlers
    const handleStart = (e) => {
        if (isDrawingMode) {
            startDrawing(e);
            return;
        }

        setIsDragging(true);
        const point = ('touches' in e) ? e.touches[0] : e;
        setStartPan({
            x: point.clientX - offset.x,
            y: point.clientY - offset.y
        });
    };

    const PAN_SPEED = 1;
    const handleMove = (e) => {
        if (isDrawingMode) {
            draw(e);
            return;
        }

        if (isDragging) {
            e.preventDefault();
            const point = ('touches' in e) ? e.touches[0] : e;
            setOffset({
                x: (point.clientX - startPan.x) * PAN_SPEED,
                y: (point.clientY - startPan.y) * PAN_SPEED
            });
        }
    };

    const handleEnd = () => {
        if (isDrawingMode) {
            endDrawing();
            return;
        }
        setIsDragging(false);
    };

    const ZOOM_FACTOR = 0.95;
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 5;

    const handleZoom = (e) => {
        if (isDrawingMode) return;

        e.preventDefault();
        const delta = e.deltaY > 0 ? ZOOM_FACTOR : 1/ZOOM_FACTOR;
        setScale(prev => Math.min(Math.max(prev * delta, MIN_ZOOM), MAX_ZOOM));
    };

    const handlePinchZoom = (e) => {
        if (isDrawingMode) return;

        if (e.touches.length === 2) {
            e.preventDefault();
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const dist = Math.hypot(
                touch1.clientX - touch2.clientX,
                touch1.clientY - touch2.clientY
            );

            if (!svgRef.current.lastDist) {
                svgRef.current.lastDist = dist;
                return;
            }

            const delta = dist > svgRef.current.lastDist ? 1/ZOOM_FACTOR : ZOOM_FACTOR;
            setScale(prev => Math.min(Math.max(prev * delta, MIN_ZOOM), MAX_ZOOM));
            svgRef.current.lastDist = dist;
        }
    };

    const renderGridLines = () => {
        const lines = [];
        const spacing = 50;
        const range = 50;

        lines.push(
            <rect
                key="background"
                x={-range * spacing}
                y={-range * spacing}
                width={range * spacing * 2}
                height={range * spacing * 2}
                fill="#fff6e3"
            />
        );

        for (let i = -range; i <= range; i++) {
            const x = i * spacing;
            const y = i * spacing;

            lines.push(
                <line
                    key={`v${i}`}
                    x1={x}
                    y1={-range * spacing}
                    x2={x}
                    y2={range * spacing}
                    stroke={i === 0 ? "#999" : "#ddd"}
                    strokeWidth={i === 0 ? 1.5 : 0.5}
                />
            );

            lines.push(
                <line
                    key={`h${i}`}
                    x1={-range * spacing}
                    y1={y}
                    x2={range * spacing}
                    y2={y}
                    stroke={i === 0 ? "#999" : "#ddd"}
                    strokeWidth={i === 0 ? 1.5 : 0.5}
                />
            );

            if (i !== 0 && i % 1 === 0) {
                lines.push(
                    <text
                        key={`vt${i}`}
                        x={x}
                        y={20}
                        textAnchor="middle"
                        fontSize="16"
                    >
                        {i}
                    </text>
                );

                lines.push(
                    <text
                        key={`ht${i}`}
                        x={-20}
                        y={-y + 6}
                        textAnchor="end"
                        fontSize="16"
                    >
                        {i}
                    </text>
                );
            }
        }

        return lines;
    };

    useEffect(() => {
        const svg = svgRef.current;
        svg.addEventListener('touchstart', handleStart, { passive: false });
        svg.addEventListener('touchmove', handleMove, { passive: false });
        svg.addEventListener('touchend', handleEnd);
        svg.addEventListener('touchmove', handlePinchZoom, { passive: false });

        return () => {
            svg.removeEventListener('touchstart', handleStart);
            svg.removeEventListener('touchmove', handleMove);
            svg.removeEventListener('touchend', handleEnd);
            svg.removeEventListener('touchmove', handlePinchZoom);
        };
    }, [isDragging, offset, isDrawingMode]);

    return (
        <div className="relative w-full h-full">
            <div className="w-full h-full overflow-hidden touch-none border-violet-700 border-4 border-b-4">
                <svg
                    ref={svgRef}
                    className={`w-full h-full ${isDrawingMode ? 'cursor-crosshair' : 'cursor-move'}`}
                    viewBox="-400 -300 800 600"
                    onMouseDown={handleStart}
                    onMouseMove={handleMove}
                    onMouseUp={handleEnd}
                    onMouseLeave={handleEnd}
                    onWheel={handleZoom}
                >
                    <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
                        {renderGridLines()}
                        {paths.map((path, index) => (
                            <path
                                key={index}
                                d={path}
                                stroke="black"
                                strokeWidth="2"
                                fill="none"
                            />
                        ))}
                        {currentPath && (
                            <path
                                d={currentPath}
                                stroke="black"
                                strokeWidth="2"
                                fill="none"
                            />
                        )}
                    </g>
                </svg>
            </div>

            {/* Control buttons */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                    onClick={() => setIsDrawingMode(!isDrawingMode)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center
                    transform active:scale-75 duration-200
                    focus:outline-none hover:scale-105 
                    ${isDrawingMode ? 'bg-violet-800' : 'bg-violet-600'} z-10`}
                >
                    <Pencil className="w-6 h-6 text-white" strokeWidth={1.5} />
                </button>

                <button
                    className="w-12 h-12 rounded-full flex items-center justify-center
                    transform active:scale-75 duration-200
                    focus:outline-none hover:scale-105 bg-violet-600 z-10"
                >
                    <Eye className="w-6 h-6 text-white" strokeWidth={1.5} />
                </button>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-12 h-12 rounded-full flex items-center justify-center
                    transform active:scale-75 duration-200
                    focus:outline-none hover:scale-105 bg-violet-600 z-10"
                >
                    <Plus className="w-8 h-8 text-white" strokeWidth={1} />
                </button>
            </div>

            {/* Three-dot menu */}
            <div className="absolute top-4 right-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            className="w-10 h-10 rounded-full flex items-center justify-center
                            transform active:scale-75 duration-200
                            focus:outline-none hover:scale-105 bg-violet-600"
                        >
                            <MoreVertical className="w-6 h-6 text-white" />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Hide / Unhide</DropdownMenuItem>
                        <DropdownMenuItem>Differentiation</DropdownMenuItem>
                        <DropdownMenuItem>Integration</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <WhiteboardModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default InteractiveGraph;