"use client"
import React, { useEffect, useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { Header } from "@/app/components/Header/Header";

import DataFetcher from "../../../server/server";

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    size: string;
    quantity: number;
}

const Basket = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [userCart, setUserCart] = useState<number[]>([]);
    const [userCartFull, setUserCartFull] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                let productsData: Product[] = await dataFetcher.fetchProducts();

                setProducts(productsData);

                if (storedToken) {
                    const userCartData: any[] = await dataFetcher.getUserCart(storedToken);
                    setUserCart(userCartData.map((el: any) => el.product_id));
                    setUserCartFull(userCartData);

                }

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        let price = 0;
        userCartFull.forEach(el => {
            price += parseInt(el.price) * el.quantity;
        });
        setTotalPrice(price);
    }, [userCartFull]);



    const removeFromCart = async (productId: number) => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        try {
            if (storedToken) {
                await dataFetcher.removeFromCart(storedToken, productId);
                setUserCartFull((prevCart) => prevCart.filter((id) => id.product_id !== productId));
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Код для відправки замовлення
        } catch (error) {
            console.error('Error during form submission:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header />
            <div className="min-h-[80vh]">
                <div className="container mx-auto flex flex-col gap-6 py-6">
                    {userCartFull.length === 0 ? (
                        <p>
                            Товарів немає. <Link href="/shop/all/1">Перейти в магазин</Link>.
                        </p>
                    ) : (
                        <>
                            {userCartFull.map((el: any) => {
                                return (
                                    <div key={uuidv4()} className="flex items-center gap-2 py-2">
                                        <img className="w-[50px] h-[50px] object-cover" src={el.image} alt="" />
                                        <div>
                                            <p>{el.name}</p>
                                            <p className="font-bold">
                                                {el.price} x {el.quantity} = {parseInt(el.price) * el.quantity} грн
                                            </p>
                                            <p className="font-normal">
                                                Розмір: {el.size}, Кількість: {el.quantity}
                                            </p>
                                        </div>

                                        <div className="flex gap-2 ml-auto">
                                            <div className="rounded-[50%] hover:bg-black hover:text-white transition duration-150 ease-out cursor-pointer">
                                                <CiCircleRemove className="w-[30px] h-[30px]" onClick={() => removeFromCart(el.product_id)} />
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-2xl">Всього:</h2>
                                <p className="font-bold text-2xl">{totalPrice} грн</p>
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col items-center w-full">
                                <div className="grid grid-cols-2 gap-6 w-full">
                                    {/* Додайте поля для інформації про користувача */}
                                </div>

                                {products.map((product) => (
                                    <React.Fragment key={product.id}>
                                        <input type="hidden" name={`products[${product.id}][name]`} value={product.name} />
                                        <input type="hidden" name={`products[${product.id}][price]`} value={product.price} />
                                        <input type="hidden" name={`products[${product.id}][size]`} value={product.size} />
                                        <input type="hidden" name={`products[${product.id}][quantity]`} value={product.quantity} />
                                    </React.Fragment>
                                ))}

                                <button className="mt-6 py-2 px-4 border hover:bg-black hover:text-white duration-150 ease-in-out" type="submit">
                                    Надіслати замовлення
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </>

    );
};

export default Basket;
