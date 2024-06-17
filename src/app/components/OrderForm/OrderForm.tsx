"use client";
import { useState } from "react";
import DataFetcher from "../../../../server/server";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = ({ totalAmount }: any) => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("fondy");
    const dataFetcher = new DataFetcher();

    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    const validatePhone = (phone: string) => {
        const phoneRegex = /^\+?\d{10,15}$/; // Проста перевірка для телефонів
        return phoneRegex.test(phone);
    };

    const validatePostalCode = (postalCode: string) => {
        const postalCodeRegex = /^\d{5}(?:[-\s]\d{4})?$/; // Перевірка для поштових індексів
        return postalCodeRegex.test(postalCode);
    };

    const validateName = (name: string) => {
        return name.length > 0;
    };

    const validateAddress = (address: string) => {
        return address.length > 0;
    };

    const validateCity = (city: string) => {
        return city.length > 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!validateName(fullName)) {
            toast.error("Некоректне ім'я", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!validateAddress(address)) {
            toast.error("Некоректна адреса", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!validateCity(city)) {
            toast.error("Некоректне місто", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!validatePostalCode(postalCode)) {
            toast.error("Некоректний поштовий індекс", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!validatePhone(phone)) {
            toast.error("Некоректний телефон", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Некоректна адреса електронної пошти', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }

        const orderData = {
            fullName,
            address,
            city,
            postalCode,
            phone,
            email,
            paymentMethod,
            totalAmount
        };

        try {
            const response = await dataFetcher.placeOrder(orderData);

            if (response.paymentUrl) {
                toast.success('Замовлення в обробці', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }

        } catch (error) {
            console.error("Failed to place order", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Оформлення замовлення</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Повне ім'я</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Адреса</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Місто</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Поштовий індекс</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Телефон</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Електронна пошта</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Метод оплати</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="fondy">Післяоплата</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Оформити замовлення
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderForm;
