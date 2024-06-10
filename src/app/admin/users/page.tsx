"use client";
import { useEffect, useState } from "react";
import DataFetcher from "../../../../server/server";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface iUsers {
    id: number;
    username: string;
}

export default function Admin() {
    const [users, setUsers] = useState<iUsers[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState([]);
    const dataFeatcher = new DataFetcher();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        dataFeatcher.getAdminUsers(storedToken).then(data => {
            setUsers(data);
            console.log(data);
        });
    }, []);

    const handleDelete = async (userId: number) => {
        const storedToken = localStorage.getItem("token");

        try {
            await dataFeatcher.deleteUser(storedToken, userId);
            setUsers(users.filter(user => user.id !== userId));
            toast.success("User deleted successfully", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (error) {
            console.error("Failed to delete user", error);
            toast.error("Failed to delete user", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleChangePassword = async (userId: number) => {
        const storedToken = localStorage.getItem("token");
        const newPassword = prompt("Enter new password");

        if (newPassword) {
            try {
                await dataFeatcher.changeUserPassword(storedToken, userId, newPassword);
                toast.success("Password changed successfully", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Failed to change password", error);
                toast.error("Failed to change password", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    };

    return (
        <div>
            <>
                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <Sidebar />

                <div className="p-4 sm:ml-64">
                    <ToastContainer />
                    <div className="flex justify-between">
                        <h1 className="text-3xl text-bold">
                            Користувачі
                        </h1>
                        <Link href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Додати нового користувача</Link>
                    </div>
                    <div className="flex flex-col gap-2 mt-6">
                        {users.map((user: iUsers) => (
                            <div key={user.id} className="flex bg-gray-100 items-center p-4 hover:bg-gray-200 rounded">
                                <p className="flex-1">{user.username}</p>
                                <button
                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Видалити
                                </button>
                                <button
                                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                                    onClick={() => handleChangePassword(user.id)}
                                >
                                    Змінити пароль
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        </div>
    );
}
