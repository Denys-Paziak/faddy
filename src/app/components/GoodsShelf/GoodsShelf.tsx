
import React from 'react';
import ShopItem from '../ShopItem/ShopItem';
import { Pagination } from '../Pagination/Pagination';
import { v4 as uuidv4 } from 'uuid';

interface iProps {
    limit: number,
    numCol: number,
    page: number,
    categoryFilter: string,
    data: any,
    userLikes: any
}


export const GoodsShelf = ({ limit, page, categoryFilter, data, userLikes }: iProps) => {

    let result = [...data];

    console.log(userLikes)


    // Apply category filter
    if (categoryFilter) {
        if (categoryFilter !== "all") {
            result = result.filter(el => el.category === categoryFilter);
        }
    }

    let numPage: number = Math.ceil(result.length / limit);

    let startItems = (page - 1) * limit;
    let endItems = startItems + limit;

    if (limit >= 0) {
        result = result.slice(startItems, endItems);
    }

    return (
        <>
            <div className={`shop-list grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
                {result.map(el => {
                    if (userLikes.indexOf(el.id) != -1) {
                        return <ShopItem key={el.name + uuidv4()} el={el} liked={true} />
                    } else {
                        return <ShopItem key={el.name + uuidv4()} el={el} liked={false} />
                    }
                })}
            </div>
            <Pagination numPage={numPage} activePage={page} categoryFilter={categoryFilter} />

        </>
    );
};
