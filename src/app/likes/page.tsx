"use client"
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import DataFetcher from "../../../server/server";
import { Header } from "@/app/components/Header/Header";
import Loader from "@/app/components/Loader/Loader";

interface Product {
    id: number;
    images: string;
    name: string;
    price: string;
}

const Likes = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [userLikes, setUserLikes] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);

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
                    const likesData: { product_id: number }[] = await dataFetcher.getLikes(storedToken);
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

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            <Header />
            <div className="min-h-[80vh]">
                <div className='container mx-auto grid grid-cols-2 gap-6 py-6'>
                    {products.filter((el) => userLikes.includes(el.id)).map((el) => {
                        const images = JSON.parse(el.images);
                        return (
                            <a key={uuidv4()} href={`/${el.id}`} className="flex items-center gap-2">
                                <img className="w-[50px] h-[50px] object-cover" src={images[0]} alt={el.name} />
                                <div>
                                    <p>{el.name}</p>
                                    <p className="font-bold">{el.price}</p>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Likes;
