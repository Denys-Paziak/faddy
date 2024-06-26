"use client"
import React, { useEffect, useState } from 'react';
import { CiCircleRemove } from 'react-icons/ci';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
import { Header } from "@/app/components/Header/Header";
import Loader from "@/app/components/Loader/Loader";
import DataFetcher from "../../../server/server";
import OrderForm from '../components/OrderForm/OrderForm';

interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    size: string;
    quantity: number,
    product_id: number
}

const Basket = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        const fetchData = async () => {
            try {
                if (storedToken) {
                    const userCartData: Product[] = await dataFetcher.getUserCart(storedToken);
                    setProducts(userCartData);
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
        const calculateTotalPrice = () => {
            const price = products.reduce((acc, product) => {
                return acc + parseFloat(product.price) * product.quantity;
            }, 0);
            setTotalPrice(price);
        };

        calculateTotalPrice();
    }, [products]);

    const removeFromCart = async (productId: number) => {
        const dataFetcher = new DataFetcher();
        const storedToken = localStorage.getItem("token");

        try {
            if (storedToken) {
                await dataFetcher.removeFromCart(storedToken, productId);
                console.log("remover")
                setProducts((prevProducts) => prevProducts.filter((product) => product.product_id !== productId));
            }
        } catch (error) {
            console.error('Error removing product from cart:', error);
        }
    };


    if (loading) {
        return <Loader />;
    }

    console.log(products)

    return (
        <>
            <Header />
            <div className="min-h-[80vh]">
                <div className="container mx-auto flex flex-col gap-6 py-6">
                    {products.length === 0 ? (
                        <p>
                            <div className="flex flex-col items-center justify-center h-full text-center pt-[100px]">
                                <h2 className="text-2xl font-bold mb-4">У вас немає товарів</h2>
                                <p className="text-gray-700 mb-4">Здається, ви ще не додали жоден товар до кошика.</p>
                                <Link href={"/shop/all/1"}>
                                    <button
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Перейти до магазину
                                    </button>
                                </Link>

                            </div>
                        </p>
                    ) : (
                        <>
                            {products.map((el) => (
                                <div key={uuidv4()} className="flex items-center gap-2 py-2">
                                    <img className="w-[50px] h-[50px] object-cover" src={el.image} alt="" />
                                    <div>
                                        <p>{el.name}</p>
                                        <p className="font-bold">
                                            {el.price} x {el.quantity} = {parseFloat(el.price) * el.quantity} грн
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
                            ))}
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-2xl">Всього:</h2>
                                <p className="font-bold text-2xl">{totalPrice} грн</p>
                            </div>
                            <OrderForm totalAmount={totalPrice} />
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Basket;
