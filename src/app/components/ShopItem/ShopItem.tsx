"use client"
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import DataFetcher from "../../../../server/server";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { addToWishlist, addToCart } = new DataFetcher();

import "./shopItem.css";

interface Props {
    el: any;
    liked: boolean
}

const ShopItem = ({ el, liked }: Props) => {
    const [likeBut, setLikeBut] = useState<string>("");
    const [basket, setBasket] = useState<string>("");
    const [logined, setLogined] = useState<boolean>(false);

    const images = JSON.parse(el.images);

    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            setLogined(true);
        }
    }, []);

    useEffect(() => {
        if (liked) {
            setLikeBut("widget-active");
        } else {
            setLikeBut("");
        }
    }, []);


    const addToWishlistHandler = (id: any, token: any) => {
        if (likeBut === "widget-active") {
            setLikeBut("");
        } else {
            setLikeBut("widget-active");
        }
        addToWishlist(id, token);
    }

    const addToCartHandler = (el: any, token: any) => {
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
        addToCart(el.id, 1, "s", parseFloat(el.price.split(" ")[0]), parseFloat(el.sale.split(" ")[0]), JSON.parse(el.images)[0], token);
    }


    return (

        <div className="shop-item">
            <ToastContainer />
            <div className="shop-item__image">
                <Image src={images[0]} width={430} height={522} alt="shop" />

                {logined ? <div className="shop-list__widget">
                    <div className={`${likeBut} bg-white cursor-pointer`} onClick={() => addToWishlistHandler(el.id, token)}>
                        <FaHeart />
                    </div>
                    <div className={`${basket} bg-white cursor-pointer`} onClick={() => addToCartHandler(el, token)}>
                        <SlBasket />
                    </div>
                </div> : ''}


            </div>
            <div className="shop-item__text pt-5">
                <h2>{el.name}</h2>
                <h2 className="text-gray-500">{el.category}</h2>
                <div className="price flex-col gap-2 mt-2">
                    <div className="flex gap-2">
                        <p className="font-bold">{el.price}</p>
                        <p className="text-gray-500 line-through">{el.sale}</p>
                    </div>
                    <div><a href={`/${el.id}`}>детальніше</a></div>
                </div>
            </div>
        </div>
    );
};

export default ShopItem;
