import React, { useState } from 'react';
import { CheckIcon } from 'lucide-react';

const ColorSelector = () => {
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const colors = [
        { id: 'pink', class: 'bg-pink-400' },
        { id: 'green', class: 'bg-green-400' },
        { id: 'blue', class: 'bg-blue-400' },
        { id: 'yellow', class: 'bg-yellow-400' },
        { id: 'cyan', class: 'bg-cyan-400' }
    ];

    return (
        <div className="p-4">
            <h2 className="text-lg text-gray-600 mb-3">Graph color</h2>
            <div className="flex gap-3">
                {colors.map((color) => (
                    <button
                        key={color.id}
                        onClick={() => setSelectedColor(color.id)}
                        className={`
              w-8 h-8 rounded-full ${color.class}
              flex items-center justify-center
              transition-transform hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300
            `}
                        aria-label={`Select ${color.id} color`}
                    >
                        {selectedColor === color.id && (
                            <CheckIcon
                                className="w-5 h-5 text-white"
                                strokeWidth={3}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ColorSelector;