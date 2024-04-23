import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

interface iProps {
    numPage: number,
    activePage: number,
    categoryFilter: string
}

export const Pagination = ({ numPage, activePage, categoryFilter }: iProps) => {

    let category: string;
    if (categoryFilter == "Новинки") {
        category = "new";
    } else if (categoryFilter == "Верхній одяг") {
        category = "clothes";
    } else if (categoryFilter == "Взуття") {
        category = "footwear";
    } else if (categoryFilter == "Аксесуари") {
        category = "footwear";
    } else {
        category = "all";
    }

    // Створіть порожній масив
    let numbers = [];

    for (let i = 1; i <= numPage; i++) {
        numbers.push(i);
    }

    return (
        <nav className={"flex justify-center flex-wrap py-10"}>
            <ul className="flex items-center -space-x-px h-10 text-base flex-wrap ">
                <li>
                    {activePage == 1 ? "" : <Link href={"/shop/" + category + "/" + (activePage - 1)}
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700  ">
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="M5 1 1 5l4 4" />
                        </svg>
                    </Link>}
                </li>

                {
                    numbers.map(el => {
                        if (el == activePage) {
                            return <li key={uuidv4() + el}>
                                <a href={"/shop/" + category + "/" + el}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-white bg-black border border-gray-300 ">{el}</a>
                            </li>
                        } else {
                            return <li key={uuidv4() + el}>
                                <a href={"/shop/" + category + "/" + el}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700  ">{el}</a>
                            </li>
                        }
                    })
                }

                <li>
                    {activePage < numPage ? <Link href={"/shop/" + category + "/" + (activePage + 1)}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700   ">
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                strokeWidth="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </Link> : ""}
                </li>
            </ul>
        </nav >
    )
}
