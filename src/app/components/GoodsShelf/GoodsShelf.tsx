import React from 'react';
import ShopItem from '../ShopItem/ShopItem';
import { Pagination } from '../Pagination/Pagination';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';

interface Product {
    id: number;
    name: string;
    category: string;
    [key: string]: any; // Інші властивості продукту
}

interface GoodsShelfProps {
    limit: number;
    numCol: number;
    page: number;
    categoryFilter: string;
    data: Product[];
    userLikes: number[];
}

export const GoodsShelf: React.FC<GoodsShelfProps> = ({ limit, numCol, page, categoryFilter, data, userLikes }) => {
    let result = [...data];

    // Apply category filter
    if (categoryFilter && categoryFilter !== "all") {
        result = result.filter(el => el.category === categoryFilter);
    }

    let numPage: number = Math.ceil(result.length / limit);
    let startItems = (page - 1) * limit;
    let endItems = startItems + limit;

    if (limit >= 0) {
        result = result.slice(startItems, endItems);
    }

    if (page > numPage) {
        return <>
            <h2 className='text-4xl'>Щось пішло не так</h2>
            <div className='my-4'>
                <Link href={`/shop/${categoryFilter}/1`} >
                    Перейти на стоірнку з товарами
                </Link>
            </div>

        </>
    }

    return (
        <>
            <div className={`shop-list grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-${numCol}`}>
                {result.map((el: any) => (
                    <ShopItem key={el.name + uuidv4()} el={el} liked={userLikes.includes(el.id)} />
                ))}
            </div>
            <Pagination numPage={numPage} activePage={page} categoryFilter={categoryFilter} />
        </>
    );
};
