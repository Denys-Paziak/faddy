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

        dataFeatcher.getOrders(storedToken).then(data => {
            setOrders(data);
        });
    }, []);

    const handleStatusChange = async (orderId: number, status: string) => {
        const storedToken = localStorage.getItem("token");
        try {
            await dataFeatcher.updateOrderStatus(orderId, status, storedToken);
            setOrders(orders.map(order => order.id === orderId ? { ...order, status } : order));
        } catch (error) {
            console.error("Failed to update order status", error);
        }
    };

    const handleDelete = async (orderId: number) => {
        const storedToken = localStorage.getItem("token");
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
                    <div className="flex items-center justify-between flex-col md:flex-row space-y-4 md:space-y-0 py-4 bg-white">
                        <div>
                            <button id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5" type="button">
                                <span className="sr-only">Action button</span>
                                Дії
                                <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div id="dropdownAction" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                                <ul className="py-1 text-sm text-gray-700" aria-labelledby="dropdownActionButton">
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Reward</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Promote</a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100">Activate account</a>
                                    </li>
                                </ul>
                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Delete User</a>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input type="text" id="table-search-orders" className="block pt-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for orders" />
                        </div>
                    </div>
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
