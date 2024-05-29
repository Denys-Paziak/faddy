interface StatisticsWidgetProps {
    title: string;
    data: Array<{ label: string; value: number | string }>;
}

export default function StatisticsWidget({ title, data }: StatisticsWidgetProps) {
    return (
        <div className="bg-gray-50 rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <ul>
                {data.map((item, index) => (
                    <li key={index} className="flex justify-between mb-2">
                        <span>{item.label}:</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
