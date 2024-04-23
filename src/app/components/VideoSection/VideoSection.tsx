import React from 'react';
import Image from "next/image";
import Link from 'next/link';

const VideoSection = () => {
    return (
        <div className={"videoSection container mx-auto flex items-center gap-10 pt-20 flex-col lg:flex-row"}>
            <div className="videoSection__text">
                <p className={"text-gray-400"}>Ефект, якщо у верхній частині не залежить</p>
                <h2 className={"text-6xl font-bold my-4"}>Власний  стиль за порадами</h2>
                <p>Короткі речення, багато заголовків, зображення занадто великі для запропонованого дизайну, або занадто маленькі, або вони вписуються, але це викликає сумніви у присутніх, що зустріч виглядає не зовсім вдало.</p>
                <Link href="/shop/all/1">
                    <button className={"button mt-4"}>Магазин</button>
                </Link>

            </div>
            <div className="videoSection__Image">
                <Image src={"/img/style.jpg"} width={1000} height={1000} alt={"Image"} />
            </div>
        </div>
    );
};

export default VideoSection;
