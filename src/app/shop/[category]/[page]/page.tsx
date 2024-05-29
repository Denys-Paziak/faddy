"use client";

import React, { useEffect, useState } from 'react';
import Title from '../../../components/Title/Title';
import { GoodsShelf } from "@/app/components/GoodsShelf/GoodsShelf";
import Link from 'next/link';
import DataFetcher from "../../../../../server/server";
import { Header } from "@/app/components/Header/Header";
import Loader from "@/app/components/Loader/Loader";

interface Product {
    id: number;
    name: string;
    price: string;
    images: string;
    category: string;
}

interface LikesData {
    product_id: number;
}

export default function Page({ params }: { params: { category: string, page: number } }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [userLikes, setUserLikes] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

    const [col, setCol] = useState(4);
    const [limit, setLimit] = useState(20);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        const fetchProducts = async () => {
            try {
                const productsData: Product[] = await dataFetcher.fetchProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        const fetchLikes = async () => {
            if (storedToken) {
                try {
                    const likesData: LikesData[] = await dataFetcher.getLikes(storedToken);
                    setUserLikes(likesData.map((el) => el.product_id));
                } catch (error) {
                    console.error('Error fetching user likes:', error);
                }
            }
            setLoading(false);
        };

        fetchProducts();
        fetchLikes();
    }, []);

    useEffect(() => {
        switch (params.category) {
            case "new":
                setCategory("Новинки");
                break;
            case "clothes":
                setCategory("Верхній одяг");
                break;
            case "footwear":
                setCategory("Взуття");
                break;
            case "accessories":
                setCategory("Аксесуари");
                break;
            default:
                setCategory("all");
                break;
        }
    }, [params.category]);

    if (loading) {
        return <Loader />;
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
    );
}
