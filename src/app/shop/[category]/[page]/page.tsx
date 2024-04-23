"use client";

import React, { useEffect, useState } from 'react'
import Title from '../../../components/Title/Title'
import { GoodsShelf } from "@/app/components/GoodsShelf/GoodsShelf";
import Link from 'next/link';
import DataFetcher from "../../../../../server/server";
import { Header } from "@/app/components/Header/Header";


export default function Page({ params }: { params: { category: string, page: number } }) {

    const [products, setProducts] = useState([]);
    const [userLikes, setUserLikes] = useState([]);
    const [loading, setLoading] = useState(true);

    const [col, setCol] = useState(4);
    const [limit, setSetLimit] = useState(20);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        // Получение списка товаров
        dataFetcher.fetchProducts()
            .then((productsData: any) => {
                setProducts(productsData);
            })
            .catch((error: any) => {
                console.error('Error fetching products:', error);
            });

        // Получение списка лайков для текущего пользователя
        if (storedToken) {
            dataFetcher.getLikes(storedToken).then((likesData: any) => {
                setUserLikes(likesData.map((el: any) => el.product_id));
            })
                .catch((error: any) => {
                    console.error('Error fetching user likes:', error);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);




    useEffect(() => {
        const dataFetcher = new DataFetcher();
        dataFetcher.fetchProducts()
            .then((productsData: any) => {
                setProducts(productsData);
            })
            .catch((error: any) => {
                console.error('Error fetching products:', error);
            });
    }, []);

    useEffect(() => {
        if (params.category == "new") {
            setCategory("Новинки");
        } else if (params.category == "clothes") {
            setCategory("Верхній одяг");
        } else if (params.category == "footwear") {
            setCategory("Взуття");
        } else if (params.category == "accessories") {
            setCategory("Аксесуари");
        } else {
            setCategory("all");
        }
    })

    if (loading) {
        return <div>Loading...</div>;
    }





    return (
        <>
            <Header />
            <div className='container mx-auto'>
                <Title>Магазин</Title>
                <div className='flex gap-6 py-6'>
                    <div className='flex flex-wrap gap-2'>
                        <h2 className="font-bold">Категорія:</h2>
                        <div className="flex gap-2 ">
                            <Link href={"/shop/all/1"}>Все</Link>
                            <Link href={"/shop/new/1"}>Новинки</Link>
                            <Link href={"/shop/clothes/1"}>Верхній одяг</Link>
                            <Link href={"/shop/footwear/1"}>Взуття</Link>
                            <Link href={"/shop/accessories/1"}>Аксесуари</Link>
                        </div>
                    </div>
                </div>

                <GoodsShelf data={products} limit={limit} numCol={col} categoryFilter={category} page={params.page} userLikes={userLikes} />
            </div>
        </>

    )
}
