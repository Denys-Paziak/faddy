"use client";
import { useEffect, useState } from "react";
import DataFetcher from "../../../../server/server";
import Sidebar from "../components/sidebar";
import Link from "next/link";
import Image from 'next/image';

interface iProducts {
    category: string;
    description: string;
    id: number;
    images: string;
    name: string;
    price: string;
    sale: string;
}

export default function Admin() {
    const [products, setProducts] = useState<iProducts[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(2000);
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;

    const dataFeatcher = new DataFetcher();

    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        dataFeatcher.admin(storedToken).then(data => {
            console.log(data.categoryCounts);
            setAllCategory(data.categoryCounts);
            setProducts(data.products);
        });
    }, []);

    const handleDelete = async (productId: number) => {
        const storedToken = localStorage.getItem("token");

        try {
            await dataFeatcher.deleteProduct(storedToken, productId);

            await dataFeatcher.admin(storedToken).then(data => {
                console.log(data.categoryCounts);
                setAllCategory(data.categoryCounts);
                setProducts(data.products);
            });
        } catch (error) {
            console.error("Failed to delete product", error);
        }
    };

    const filteredProducts = products.filter(product => {
        const nameMatch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const priceMatch = parseInt(product.price) >= minPrice && parseInt(product.price) <= maxPrice;
        const categoryMatch = !category || product.category === category;

        return nameMatch && priceMatch && categoryMatch;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredProducts.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const maxPagesToShow = 5;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(startPage + maxPagesToShow - 1, pageNumbers.length);

    const visiblePageNumbers = pageNumbers.slice(startPage - 1, endPage);

    return (
        <div>
            <>
                <button
                    data-drawer-target="default-sidebar"
                    data-drawer-toggle="default-sidebar"
                    aria-controls="default-sidebar"
                    type="button"
                    className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                >
                    <span className="sr-only">Open sidebar</span>
                    <svg
                        className="w-6 h-6"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        ></path>
                    </svg>
                </button>

                <Sidebar />

                <div className="p-4 sm:ml-64">
                    <div className="flex justify-between">
                        <h1 className="text-3xl text-bold">Товари</h1>
                        <Link href="/admin/addProduct" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Додати новий товар
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2 mt-6">
                        <div className="flex gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Пошук"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Мінімальна ціна"
                                value={minPrice}
                                onChange={e => setMinPrice(parseInt(e.target.value))}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="number"
                                placeholder="Максимальна ціна"
                                value={maxPrice}
                                onChange={e => setMaxPrice(parseInt(e.target.value))}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            />
                            <select
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                className="flex-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="">Всі категорії</option>
                                {allCategory.map((el: any) => (
                                    <option key={el.category} value={el.category}>{el.category}</option>
                                ))}
                            </select>
                        </div>
                        {currentProducts.map((el: iProducts) => {
                            const image = JSON.parse(el.images)[0];

                            return (
                                <div key={el.id} className="flex bg-gray-100 items-center hover:bg-gray-200 rounded">
                                    <Image
                                        className="w-[100px] h-[100px] object-cover"
                                        src={image}
                                        width={200}
                                        height={200}
                                        alt="Picture of the author"
                                    />
                                    <div className="mt-4 p-4">
                                        <h2>{el.name}</h2>
                                        <p className="text-gray-600">{el.price}</p>
                                    </div>
                                    <div className="ml-auto flex gap-2">
                                        <div
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                                            onClick={() => handleDelete(el.id)}
                                        >
                                            Видалити
                                        </div>
                                        <Link
                                            href={"/admin/editProduct/" + el.id}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Редагувати
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center mt-6">
                        <nav>
                            <ul className="flex list-none">
                                <li className="mx-1">
                                    <button
                                        onClick={() => paginate(Math.max(currentPage - 1, 1))}
                                        className="py-2 px-4 rounded bg-gray-200"
                                        disabled={currentPage === 1}
                                    >
                                        Назад
                                    </button>
                                </li>
                                {visiblePageNumbers.map(number => (
                                    <li key={number} className="mx-1">
                                        <button
                                            onClick={() => paginate(number)}
                                            className={`py-2 px-4 rounded ${currentPage === number ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                        >
                                            {number}
                                        </button>
                                    </li>
                                ))}
                                <li className="mx-1">
                                    <button
                                        onClick={() => paginate(Math.min(currentPage + 1, pageNumbers.length))}
                                        className="py-2 px-4 rounded bg-gray-200"
                                        disabled={currentPage === pageNumbers.length}
                                    >
                                        Вперед
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </>
        </div>
    );
}
