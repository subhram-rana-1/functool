import React, { useState, useRef, useEffect } from 'react';

const InteractiveGraph = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [scale, setScale] = useState(1);
    const [isDragging, setIsDragging] = useState(false);
    const [startPan, setStartPan] = useState({ x: 0, y: 0 });
    const svgRef = useRef(null);

    // Touch and mouse event handlers
    const handleStart = (e) => {
        setIsDragging(true);
        const point = ('touches' in e) ? e.touches[0] : e;
        setStartPan({
            x: point.clientX - offset.x,
            y: point.clientY - offset.y
        });
    };

    const PAN_SPEED = 1; // Increase for faster panning (default is 1)
    const handleMove = (e) => {
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
        setIsDragging(false);
    };

    // Zoom parameters
    const ZOOM_FACTOR = 0.95; // Increase for less sensitive zoom (0.9->0.95)
    const MIN_ZOOM = 0.5;
    const MAX_ZOOM = 5;

    // Modified zoom handler
    const handleZoom = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? ZOOM_FACTOR : 1/ZOOM_FACTOR;
        setScale(prev => Math.min(Math.max(prev * delta, MIN_ZOOM), MAX_ZOOM));
    };

    // Modified pinch zoom
    const handlePinchZoom = (e) => {
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

        // Add background
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

        // Grid lines
        for (let i = -range; i <= range; i++) {
            const x = i * spacing;
            const y = i * spacing;

            // Vertical lines
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

            // Horizontal lines
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

            // Labels
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
    }, [isDragging, offset]);

    return (
        <div className="w-full h-full overflow-hidden touch-none border-black border-4 border-b-4">
            <svg
                ref={svgRef}
                className="w-full h-full cursor-move"
                viewBox="-400 -300 800 600"
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onWheel={handleZoom}
            >
                <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale})`}>
                    {renderGridLines()}
                </g>
            </svg>
        </div>
    );
};

export default InteractiveGraph;