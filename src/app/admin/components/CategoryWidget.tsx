interface CategoryWidgetProps {
    categories: Array<{ category: string; product_count: number }>;
}

export default function CategoryWidget({ categories }: CategoryWidgetProps) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">Категорії</h2>
            <ul>
                {categories.map((item, index) => (
                    <li key={index} className="flex justify-between mb-2">
                        <span>{item.category}:</span>
                        <span>{item.product_count}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
