import React, { useState, useRef, useEffect } from 'react';

type DraggingState = number | null;

const DoubleRangeSlider = () => {
    const [values, setValues] = useState<[number, number]>([-10, 10]);
    const [dragging, setDragging] = useState<DraggingState>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const MIN = -50;
    const MAX = 50;
    const RANGE = MAX - MIN;

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (dragging !== null && sliderRef.current) {
                const rect = sliderRef.current.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                const newValue = Math.round(MIN + (pos * RANGE));

                setValues(prev => {
                    const newValues: [number, number] = [...prev];
                    newValues[dragging] = Math.max(MIN, Math.min(MAX, newValue));

                    if (dragging === 0 && newValues[0] > newValues[1]) {
                        newValues[0] = newValues[1];
                    } else if (dragging === 1 && newValues[1] < newValues[0]) {
                        newValues[1] = newValues[0];
                    }

                    return newValues;
                });
            }
        };

        const handleMouseUp = () => {
            setDragging(null);
        };

        if (dragging !== null) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [dragging]);

    const getLeftPercent = (value: number) => {
        return ((value - MIN) / RANGE) * 100;
    };

    // Function to format numbers consistently
    const formatNumber = (num: number) => {
        return num.toString();
    };

    return (
        <div className="w-full px-8 py-4">
            {/* Min/Max labels */}
            <div className="relative w-full mb-8">
        <span className="absolute left-0 -translate-x-1/2 text-sm font-mono">
          {formatNumber(MIN)}
        </span>
                <span className="absolute right-0 translate-x-1/2 text-sm font-mono">
          {formatNumber(MAX)}
        </span>
            </div>

            {/* Slider track */}
            <div
                ref={sliderRef}
                className="relative h-2 bg-gray-200 rounded-full cursor-pointer"
            >
                {/* Active track */}
                <div
                    className="absolute h-full bg-blue-500 rounded-full"
                    style={{
                        left: `${getLeftPercent(values[0])}%`,
                        right: `${100 - getLeftPercent(values[1])}%`
                    }}
                />

                {/* Thumbs */}
                {[0, 1].map((index) => (
                    <div
                        key={index}
                        className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 bg-white rounded-full border-2 border-blue-500 cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow"
                        style={{
                            left: `${getLeftPercent(values[index])}%`
                        }}
                        onMouseDown={(e) => {
                            e.preventDefault();
                            setDragging(index as DraggingState);
                        }}
                    >
                        {/* Value label */}
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-1 rounded font-mono whitespace-nowrap">
                            {formatNumber(values[index])}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoubleRangeSlider;