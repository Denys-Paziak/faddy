"use client";
import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaUser } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import Nav from '../Nav/Nav';
import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    const router = useRouter();
    const [token, setToken] = useState<string>("");

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const logOut = () => {
        localStorage.removeItem("token");
        setToken('');
        router.push('/');
    }

    return (
        <header className="container mx-auto grid grid-cols-2 md:grid-cols-3 items-center pt-5 pb-5">
            <Nav />
            <Link href="/" className="logo text-3xl font-bold  mx-auto">FAMDY</Link>
            <div className="flex items-center gap-2 ml-auto">
                {token ? (
                    <>
                        <Link href="/likes">
                            <div className='cursor-pointer p-2 rounded hover:bg-black hover:text-white'>
                                <FaRegHeart />
                            </div>

                        </Link>
                        <Link href="/basket">
                            <div className='cursor-pointer  p-2 rounded hover:bg-black hover:text-white'>
                                <SlBasket />
                            </div>
                        </Link>
                        <div className='cursor-pointer text-[20px] p-2 rounded hover:bg-black hover:text-white' onClick={logOut}>
                            <IoLogOutOutline />
                        </div>
                    </>
                ) : (
                    <div className="container flex gap-2 justify-center items-center text-center">
                        <Link href="/login">Вхід</Link>
                        /
                        <Link href="/register">Реєстрація</Link>
                    </div>
                )}
            </div>
        </header>
    );
}
