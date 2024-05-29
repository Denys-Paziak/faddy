"use client";
import { useEffect, useState } from "react";
import DataFetcher from "../../../server/server";
import Sidebar from "./components/sidebar";
import StatisticsWidget from "./components/StatisticsWidget";
import CategoryWidget from "./components/CategoryWidget";
import { useRouter } from 'next/navigation';

interface iPriceStatistic {
    average_price: number,
    min_price: number,
    max_price: number,
    total_products: number,
    products_on_sale: number,
    average_sale: number,
    products_without_images: number,
    total_likes: number,
    most_liked_product: number,
    least_liked_product: number,
    unique_likers: number,
    average_likes_per_product: number,
    total_users: number,
    total_cart_items: number,
    total_quantity_in_cart: number,
    total_value_in_cart: number,
    unique_users_with_cart: number,
    most_popular_product_in_cart: number,
    total_orders: number,
    total_revenue: number,
    average_order_value: number,
    pending_orders: number,
    confirmed_orders: number,
    shipped_orders: number,
    delivered_orders: number,
    cancelled_orders: number
}

interface iCategoryCounts {
    category: string,
    product_count: number
}

export default function Admin() {
    const [priceStatistic, setPriceStatistic] = useState<iPriceStatistic>({
        average_price: 0,
        min_price: 0,
        max_price: 0,
        total_products: 0,
        products_on_sale: 0,
        average_sale: 0,
        products_without_images: 0,
        total_likes: 0,
        most_liked_product: 0,
        least_liked_product: 0,
        unique_likers: 0,
        average_likes_per_product: 0,
        total_users: 0,
        total_cart_items: 0,
        total_quantity_in_cart: 0,
        total_value_in_cart: 0,
        unique_users_with_cart: 0,
        most_popular_product_in_cart: 0,
        total_orders: 0,
        total_revenue: 0,
        average_order_value: 0,
        pending_orders: 0,
        confirmed_orders: 0,
        shipped_orders: 0,
        delivered_orders: 0,
        cancelled_orders: 0
    });

    const [categoryCounts, setCategoryCounts] = useState<iCategoryCounts[]>([]);

    const dataFeatcher = new DataFetcher();
    const router = useRouter();

    useEffect(() => {
        const storedToken: string | null = localStorage.getItem("token");

        if (storedToken != null) {
            dataFeatcher.admin(storedToken).then(data => {
                if (data.status == 500) {
                    router.push('/');

                } else {
                    setPriceStatistic(data.statistics);
                    setCategoryCounts(data.categoryCounts);
                }

            })
        } else {
            router.push('/');
        }
    }, []);

    const priceData = [
        { label: "Середня ціна", value: `${priceStatistic.average_price} грн` },
        { label: "Мінімальна ціна", value: `${priceStatistic.min_price} грн` },
        { label: "Максимальна ціна", value: `${priceStatistic.max_price} грн` },
        { label: "Загальна кількість продуктів", value: priceStatistic.total_products },
        { label: "Продуктів зі знижками", value: priceStatistic.products_on_sale },
        { label: "Середня знижка", value: `${priceStatistic.average_sale} грн` },
        { label: "Продуктів без зображень", value: priceStatistic.products_without_images }
    ];

    const likesData = [
        { label: "Загальна кількість лайків", value: priceStatistic.total_likes },
        { label: "Найбільш лайканий продукт (ID)", value: priceStatistic.most_liked_product },
        { label: "Найменш лайканий продукт (ID)", value: priceStatistic.least_liked_product },
        { label: "Унікальних користувачів, які лайкали", value: priceStatistic.unique_likers },
        { label: "Середня кількість лайків на продукт", value: priceStatistic.average_likes_per_product }
    ];

    const cartData = [
        { label: "Загальна кількість товарів у кошику", value: priceStatistic.total_cart_items },
        { label: "Загальна кількість всіх товарів у кошику", value: priceStatistic.total_quantity_in_cart },
        { label: "Загальна вартість товарів у кошику", value: `${priceStatistic.total_value_in_cart} грн` },
        { label: "Кількість користувачів з кошиком", value: priceStatistic.unique_users_with_cart },
        { label: "Найпопулярніший товар у кошику (ID)", value: priceStatistic.most_popular_product_in_cart }
    ];

    const orderData = [
        { label: "Загальна кількість замовлень", value: priceStatistic.total_orders },
        { label: "Загальна виручка", value: `${priceStatistic.total_revenue} грн` },
        { label: "Середня вартість замовлення", value: `${priceStatistic.average_order_value} грн` },
        { label: "Замовлень в статусі 'Очікування'", value: priceStatistic.pending_orders },
        { label: "Замовлень в статусі 'Підтверджено'", value: priceStatistic.confirmed_orders },
        { label: "Замовлень в статусі 'Відправлено'", value: priceStatistic.shipped_orders },
        { label: "Замовлень в статусі 'Доставлено'", value: priceStatistic.delivered_orders },
        { label: "Замовлень в статусі 'Скасовано'", value: priceStatistic.cancelled_orders }
    ];

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
                    <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                            <StatisticsWidget title="Цінова Статистика" data={priceData} />
                            <StatisticsWidget title="Лайки" data={likesData} />
                            <CategoryWidget categories={categoryCounts} />
                        </div>
                        <StatisticsWidget title="Кошик" data={cartData} />
                        <div className="mt-4">
                            <StatisticsWidget title="Замовлення" data={orderData} />
                        </div>
                    </div>
                </div>
            </>
        </div>
    );
}
