"use client"
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataFetcher from "../../../server/server";
import { Header } from "@/app/components/Header/Header";



interface Product {
    id: number;
    images: string[];
    name: string;
    price: string;
    // Add other properties of your 'el' object here
}

const Likes = () => {
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
            <div className="min-h-[80vh]">
                <div className='container mx-auto grid grid-cols-2 gap-6 py-6'>
                    {products.filter((el: any) => {
                        if (userLikes && userLikes.indexOf(el.id) !== -1) {
                            return el;
                        }
                    }).map((el: any) => {
                        const image = JSON.parse(el.images);

                        return <a key={uuidv4()} href={`/${el.id}`} className="flex items-center gap-2">
                            <img className="w-[50px] h-[50px] object-cover" src={image[0]} alt="" />
                            <div>
                                <p>{el.name}</p>
                                <p className="font-bold">{el.price}</p>
                            </div>
                        </a>

                    })}
                </div>
            </div>
        </>

    );
}

export default Likes;
