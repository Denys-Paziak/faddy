"use client";
import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataFetcher from "../../../server/server";
import { Header } from "@/app/components/Header/Header";
import Loader from "@/app/components/Loader/Loader"; // Якщо у вас є компонент Loader
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Product {
    id: number;
    images: string[];
    name: string;
    price: string;
}

const Likes = () => {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [userLikes, setUserLikes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        // Отримання списку товарів
        dataFetcher.fetchProducts()
            .then((productsData: any) => {
                setProducts(productsData);
            })
            .catch((error: any) => {
                console.error('Error fetching products:', error);
            });

        // Отримання списку лайків для поточного користувача
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
        }
    }, []);

    const handleRemoveLike = async (productId: number) => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        try {
            if (storedToken) {
                await dataFetcher.addToWishlist(productId, storedToken); // Викликаємо той самий метод для видалення лайка
                setUserLikes((prevLikes) => prevLikes.filter((id: any) => id !== productId));
            }
        } catch (error) {
            console.error('Error removing like:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    const likedProducts = products.filter((el: any) => userLikes.includes(el.id));

    return (
        <>
            <Header />
            <div className="min-h-[80vh]">
                {likedProducts.length > 0 ? (
                    <div className='container mx-auto grid grid-cols-2 gap-6 py-6'>
                        {
                            likedProducts.map((el: any) => {
                                const image = JSON.parse(el.images);

                                return (
                                    <div key={uuidv4()} className="flex items-center gap-2">
                                        <img className="w-[50px] h-[50px] object-cover" src={image[0]} alt="" />
                                        <div>
                                            <p>{el.name}</p>
                                            <p className="font-bold">{el.price}</p>
                                        </div>
                                        <button
                                            className="ml-auto py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
                                            onClick={() => handleRemoveLike(el.id)}
                                        >
                                            Видалити
                                        </button>
                                    </div>
                                );
                            })}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center pt-[100px]">
                        <h2 className="text-2xl font-bold mb-4">У вас немає лайків</h2>
                        <p className="text-gray-700 mb-4">Здається, ви ще не додали жоден товар до списку улюблених.</p>
                        <Link href={"/shop/all/1"}>
                            <button
                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            >
                                Перейти до магазину
                            </button>
                        </Link>

                    </div>
                )}

            </div>
        </>
    );
}

export default Likes;
