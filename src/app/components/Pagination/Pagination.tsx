import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import Link from "next/link";

interface PaginationProps {
    numPage: number;
    activePage: number;
    categoryFilter: string;
}

export const Pagination: React.FC<PaginationProps> = ({ numPage, activePage, categoryFilter }) => {
    let category: string;
    switch (categoryFilter) {
        case "Новинки":
            category = "new";
            break;
        case "Верхній одяг":
            category = "clothes";
            break;
        case "Взуття":
            category = "footwear";
            break;
        case "Аксесуари":
            category = "accessories";
            break;
        default:
            category = "all";
            break;
    }

    const pageNumbers = [];

    for (let i = 1; i <= numPage; i++) {
        pageNumbers.push(i);
    }

    const maxPagesToShow = 5;
    const startPage = Math.max(1, activePage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
        <nav className="flex justify-center flex-wrap py-10">
            <ul className="flex items-center -space-x-px h-10 text-base">
                <li>
                    {activePage > 1 && (
                        <Link href={`/shop/${category}/${activePage - 1}`} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Попередня</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                            </svg>
                        </Link>
                    )}
                </li>

                {visiblePageNumbers.map((el) => {
                    if (el == activePage) {
                        return <li key={uuidv4() + el} >
                            <Link href={`/shop/${category}/${el}`} className={`flex bg-sky-700 text-white items-center justify-center px-4 h-10 leading-tight border ${el === activePage ? 'text-white bg-black' : 'text-gray-500 bg-white '} border-gray-300`}>
                                {el}
                            </Link>
                        </li>
                    } else {
                        return <li key={uuidv4() + el}>
                            <Link href={`/shop/${category}/${el}`} className={`flex items-center justify-center px-4 h-10 leading-tight border ${el === activePage ? 'text-white bg-black' : 'text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700'} border-gray-300`}>
                                {el}
                            </Link>
                        </li>
                    }
                })}

                <li>
                    {activePage < numPage && (
                        <Link href={`/shop/${category}/${Number(activePage) + 1}`} className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
                            <span className="sr-only">Наступна</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                        </Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};