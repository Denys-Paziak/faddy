"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import { Header } from "@/app/components/Header/Header";
import Loader from "@/app/components/Loader/Loader";
import DataFetcher from "../../../server/server";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';

const { addToCart, fetchProductById } = new DataFetcher();

const sizes = ['s', 'm', 'l'];

interface Product {
    id: string;
    name: string;
    price: string;
    sale: string;
    images: string;
    description: string;
}

export default function Page({ params }: { params: any }) {
    const [count, setCount] = useState<number>(1);
    const [sizeActive, setSizeActive] = useState<number>(0);
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [storedToken, setToken] = useState<string | null>("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
            setToken(storedToken);
        }

        const fetchProduct = async () => {
            setLoading(true);
            try {
                const fetchedProduct = await fetchProductById(params.name);
                setProduct(fetchedProduct);
            } catch (error) {
                console.error('Помилка при отриманні даних товару:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.name]);

    const handleSizeClick = (index: number) => {
        setSizeActive(index);
    };

    const handleAddToCart = async () => {
        try {
            if (product && product.id && storedToken) {
                const productId: number = parseInt(product.id, 10); // Конвертація productId до числа
                const size = sizes[sizeActive];

                await addToCart(
                    productId,
                    count,
                    size,
                    parseFloat(product.price.split(" ")[0]),
                    parseFloat(product.sale.split(" ")[0]),
                    JSON.parse(product.images)[0],
                    storedToken
                );

                toast.success('Товар додано в кошик', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } else {
                throw new Error("Token is missing or product ID is invalid");
            }
        } catch (error) {
            console.error('Помилка при додаванні товару в кошик:', error);
        }
    };

    if (loading) {
        return <Loader />;
    }

    let images: string[] = [];
    if (product?.images) {
        try {
            images = JSON.parse(product.images);
        } catch (error) {
            console.error("Error parsing images JSON:", error);
        }
    }

    let description: string[] = [];
    if (product?.description) {
        try {
            description = JSON.parse(product.description);
        } catch (error) {
            console.error("Error parsing description JSON:", error);
        }
    }

    return (
        <>
            <Header />
            <div className="container mx-auto py-10">
                <ToastContainer />
                <div className="flex gap-10 flex-col lg:flex-row">
                    <Swiper
                        navigation={true}
                        modules={[Navigation]}
                        slidesPerView={2}
                        spaceBetween={10}
                        className="mySwiper h-[100%] w-[100%] lg:w-[50%]"
                    >
                        {images.map((el: string) => (
                            <SwiperSlide key={uuidv4()}>
                                <Image width={1000} height={1000} src={el} alt="" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="text w-[100%] lg:w-[50%]">
                        <div className="name">
                            <h2 className="text-4xl font-bold ">{product?.name}</h2>
                            <div className="flex gap-4 ">
                                <p className="font-bold py-4 text-2xl">{product?.price}</p>
                                <p className="line-through py-4 text-2xl">{product?.sale}</p>
                            </div>

                            <div className="flex gap-10">
                                <div>
                                    <p className="py-4 font-bold">Розмір</p>
                                    <div className="flex gap-2">
                                        {sizes.map((el, index) => (
                                            <button
                                                key={uuidv4()}
                                                className={`py-2 px-4 border ${index === sizeActive
                                                    ? 'bg-black text-white'
                                                    : 'hover:bg-black hover:text-white'
                                                    } duration-150 ease-in-out`}
                                                onClick={() => handleSizeClick(index)}
                                            >
                                                {el}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="py-4 font-bold">Кількість</p>
                                    <div className="counter flex gap-2 items-center">
                                        <button
                                            className="py-2 px-4 border bg-black text-white duration-150 ease-in-out"
                                            onClick={() => setCount((prevCount) => Math.max(prevCount - 1, 1))}
                                        >
                                            -
                                        </button>
                                        <p>{count}</p>
                                        <button
                                            className="py-2 px-4 border bg-black text-white duration-150 ease-in-out"
                                            onClick={() => setCount((prevCount) => prevCount + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {storedToken ? (
                                <button
                                    className="mt-6 py-2 px-4 border hover:bg-black hover:text-white duration-150 ease-in-out"
                                    onClick={handleAddToCart}
                                >
                                    Додати в кошик
                                </button>
                            ) : (
                                <>
                                    <p className='mt-12 mb-6'> Щоб додати товар в кошик ви маєте бути зареєстрованими</p>

                                    <div className="flex">
                                        <Link href="/login">Лоігін</Link>/
                                        <Link href="/register">Реєстрація</Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <h2 className="py-6 font-bold text-4xl">Характеристики</h2>
                <ul className="grid grid-cols-1 lg:grid-cols-4 gap-x-12 gap-y-4 py-6">
                    {description.map((el: any) => {
                        const elData = el.split(':');
                        return (
                            <li key={uuidv4()}>
                                <h2 className="font-bold">{elData[0]}</h2>
                                <p>{elData[1]}</p>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
