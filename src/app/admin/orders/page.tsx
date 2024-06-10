"use client";
import { useEffect, useState } from "react";
import DataFetcher from "../../../../server/server";
import Sidebar from "../components/sidebar";

interface Order {
    id: number;
    user_id: number;
    full_name: string;
    address: string;
    city: string;
    postal_code: string;
    phone: string;
    email: string;
    payment_method: string;
    status: string;
    created_at: string;
}

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const dataFeatcher = new DataFetcher();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            throw new Error("Token is missing");
        }

        dataFeatcher.getOrders(storedToken).then(data => {
            setOrders(data);
        });
    }, []);

    const handleStatusChange = async (orderId: number, status: string) => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            throw new Error("Token is missing");
        }

        try {
            await dataFeatcher.updateOrderStatus(orderId, status, storedToken);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    const handleDelete = async (orderId: number) => {
        const storedToken = localStorage.getItem("token");

        if (!storedToken) {
            throw new Error("Token is missing");
        }

        try {
            await dataFeatcher.deleteOrder(orderId, storedToken);
            setOrders(orders.filter(order => order.id !== orderId));
        } catch (error) {
            console.error("Failed to delete order", error);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="p-4 sm:ml-64 w-full">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div className="overflow-x-auto max-h-96">
                        <table className="w-full text-sm text-left text-gray-500 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr className="text-nowrap">
                                    <th scope="col" className="px-4 py-2">ID</th>
                                    <th scope="col" className="px-4 py-2">Користувач</th>
                                    <th scope="col" className="px-4 py-2 ">Повне ім'я</th>
                                    <th scope="col" className="px-4 py-2">Адреса</th>
                                    <th scope="col" className="px-4 py-2">Місто</th>
                                    <th scope="col" className="px-4 py-2">Поштовий індекс</th>
                                    <th scope="col" className="px-4 py-2">Телефон</th>
                                    <th scope="col" className="px-4 py-2">Електронна пошта</th>
                                    <th scope="col" className="px-4 py-2">Метод оплати</th>
                                    <th scope="col" className="px-4 py-2">Статус</th>
                                    <th scope="col" className="px-4 py-2">Створено</th>
                                    <th scope="col" className="px-4 py-2">Дії</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-4 py-2">{order.id}</td>
                                        <td className="px-4 py-2">{order.user_id}</td>
                                        <td className="px-4 py-2">{order.full_name}</td>
                                        <td className="px-4 py-2">{order.address}</td>
                                        <td className="px-4 py-2">{order.city}</td>
                                        <td className="px-4 py-2">{order.postal_code}</td>
                                        <td className="px-4 py-2">{order.phone}</td>
                                        <td className="px-4 py-2">{order.email}</td>
                                        <td className="px-4 py-2">{order.payment_method}</td>
                                        <td className="px-4 py-2">
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                className="w-full p-2 border border-gray-300 rounded"
                                            >
                                                <option value="pending">Очікування</option>
                                                <option value="confirmed">Підтверджено</option>
                                                <option value="shipped">Відправлено</option>
                                                <option value="delivered">Доставлено</option>
                                                <option value="cancelled">Скасовано</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-2">
                                            <button
                                                onClick={() => handleDelete(order.id)}
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                            >
                                                Видалити
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;
