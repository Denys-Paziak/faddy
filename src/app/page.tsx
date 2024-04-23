"use client"
import { useEffect, useState } from 'react';
import HomeSlider from "@/app/components/HomeSlider/HomeSlider";
import Title from "@/app/components/Title/Title";
import Image from "next/image";
import VideoSection from "@/app/components/VideoSection/VideoSection";
import EmailSection from "@/app/components/EmailSection/EmailSection";
import Link from 'next/link';
import ShopItem from './components/ShopItem/ShopItem';
import { v4 as uuidv4 } from 'uuid';
import DataFetcher from "../../server/server";
import { Header } from "@/app/components/Header/Header";


export default function Home() {

    const [products, setProducts] = useState([]);
    const [userLikes, setUserLikes] = useState<any>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <HomeSlider />
            <div className="container mx-auto">

                <div className="flex justify-between items-center">
                    <Title>Магазин</Title>
                    <Link href="/shop/all/1">Всі товари</Link>
                </div>

                <div className={`shop-list grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4`}>
                    {products.slice(0, 8).map((el: any) => {
                        if (userLikes.indexOf(el.id) != -1) {
                            return <ShopItem key={el.name + uuidv4()} el={el} liked={true} />
                        } else {
                            return <ShopItem key={el.name + uuidv4()} el={el} liked={false} />
                        }
                    })}
                </div>

                <Title>Категорії</Title>

                <div className="category-grid gap-10">
                    <Link href={"/shop/clothes/1"} className="category-grid-item1  category-item flex items-center justify-center hover:text-amber-300">
                        <h2 className={"text-3xl font-bold uppercase"}>Одяг </h2>
                        <h2 className={"category-item__hover-text text-9xl font-bold text-white"}>Одяг </h2>
                        <Image src={"/img/category/clothes.jpg"} width={1000} height={1000} alt={"category image"} />
                    </Link>
                    <Link href={"/shop/footwear/1"} className=" category-grid-item2 category-item flex items-center justify-center hover:text-amber-300">
                        <h2 className={"text-3xl font-bold uppercase"}>Взуття </h2>
                        <h2 className={"category-item__hover-text text-9xl font-bold text-white"}>Взуття </h2>
                        <Image src={"/img/category/Footwear.jpg"} width={1000} height={1000} alt={"category image"} />
                    </Link>
                    <Link href={"/shop/new/1"} className="category-grid-item3 category-item flex items-center justify-center hover:text-amber-300">
                        <h2 className={"text-3xl font-bold uppercase"}>Новинки </h2>
                        <h2 className={"category-item__hover-text text-9xl font-bold text-white"}>Новинки</h2>
                        <Image src={"/img/homeSlider/3.jpg"} width={1000} height={1000} alt={"category image"} />
                    </Link>
                    <Link href={"/shop/accessories/1"} className="category-grid-item4 category-item flex items-center justify-center hover:text-amber-300">
                        <h2 className={"text-3xl font-bold uppercase"}>Аксесуари </h2>
                        <h2 className={"category-item__hover-text text-9xl font-bold text-white"}>Аксесуари </h2>
                        <Image src={"/img/category/accessories.jpg"} width={1000} height={1000} alt={"category image"} />
                    </Link>
                </div>
            </div >

            <VideoSection />
            <EmailSection />
        </>
    )
}
