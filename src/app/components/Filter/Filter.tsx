"use client"
import React, { useState } from 'react';
import { TfiLayoutGrid3, TfiLayoutGrid4 } from "react-icons/tfi";
import { IoFilterSharp } from "react-icons/io5";

interface FilterProps {
    setCol: React.Dispatch<React.SetStateAction<number>>;
    setSetLimit: React.Dispatch<React.SetStateAction<number>>;
}

const Filter: React.FC<FilterProps> = ({ setCol, setSetLimit }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="flex gap-6 justify-end py-6">
            <div className="flex gap-2 items-center">
                <h2>Показати:</h2>
                <button
                    className="text-gray-500 hover:text-gray-900"
                    onClick={() => setCol(3)}
                >
                    <TfiLayoutGrid3 />
                </button>
                <button
                    className="text-gray-500 hover:text-gray-900"
                    onClick={() => setCol(4)}
                >
                    <TfiLayoutGrid4 />
                </button>
            </div>
            <div className="flex gap-2 items-center">
                <h2>Кількість товарів:</h2>
                <select
                    className="border-2 rounded py-1 px-2"
                    onChange={(e) => setSetLimit(Number(e.target.value))}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;
