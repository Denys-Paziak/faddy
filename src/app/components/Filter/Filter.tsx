"use client"
import React, { useState } from 'react';
import { TfiLayoutGrid3, TfiLayoutGrid4 } from "react-icons/tfi";
import { IoFilterSharp } from "react-icons/io5";

interface iProps {
    setCol: React.Dispatch<React.SetStateAction<number>>,
    setSetLimit: React.Dispatch<React.SetStateAction<number>>,
}

const Filter = ({ setCol, setSetLimit }: iProps) => {
    const [active, setActive] = useState(false);

    return (
        <>
            <div className={"flex gap-6 justify-end py-6"}>
                <div className="flex gap-2">
                    <h2>Показати:</h2>
                    <button
                        className={"text-gray-500 hover:text-gray-900"}
                        onClick={() => { setCol(3) }}
                    >
                        <TfiLayoutGrid3 />
                    </button>
                    <button
                        className={"text-gray-500 hover:text-gray-900"}
                        onClick={() => { setCol(4) }}>
                        <TfiLayoutGrid4 />
                    </button>
                </div>
            </div>
        </>
    );
};

export default Filter;
