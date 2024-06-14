"use client"

import Image from "next/image";
import React, { useState } from 'react';
import DataFetcher from "../../../../server/server";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmailSection = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const formHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const dataFetcher = new DataFetcher();

        try {
            const res = await dataFetcher.sendMail(`Новий підписник: ${email}`, "Підписка");
            if (res.status === 200) {
                toast.success("Спасибі за підписку", {
                    position: "bottom-right",
                    hideProgressBar: true,
                    theme: "dark",
                });
                setEmail('');
            } else {
                toast.error("Сталася помилка, перевірте дані", {
                    position: "bottom-right",
                    hideProgressBar: true,
                    theme: "dark",
                });
            }
        } catch (error) {
            console.error('Помилка відправлення пошти:', error);
            toast.error('Виникла помилка під час відправлення пошти.', {
                position: "bottom-right",
                theme: "dark",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex gap-10 container mx-auto pt-20 flex-col lg:flex-row">
            <div className="bg-gray-300 h-1/2">
                <Image className={"h-full"} src={"/img/email.jpg"} width={1000} height={1000} alt={"Image"} />
            </div>
            <div className="flex flex-col gap-4 justify-center items-center text-center bg-gray-100 p-10">
                <h2 className="text-3xl font-300">Приєднуйтесь до наших новин зараз</h2>
                <p className="text-gray-500">Клієнт, який незадоволений з певної причини, є проблемою, а клієнт, який незадоволений, але не може бути незадоволеним, не є проблемою.</p>
                <form onSubmit={formHandler} className="flex gap-2 w-full">
                    <input
                        className="bg-white w-full border-2 py-2 px-5"
                        type="email"
                        name="recipient"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        className="bg-black text-white border-2 py-2 px-5 cursor-pointer hover:bg-gray-800 hover:rounded-[10px] ease-in duration-300"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Завантаження...' : 'Підписатися'}
                    </button>
                </form>
                <p className="text-gray-400">Буде використано відповідно до нашої Політики конфіденційності</p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmailSection;
