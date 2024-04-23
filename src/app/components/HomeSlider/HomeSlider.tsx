'use client'

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from "next/image";
import Link from 'next/link';

const HomeSlider = () => {
    return (
        <div className={"homeSlider h-1/2"}>
            <Swiper
                className={"h-full"}
                spaceBetween={50}
                slidesPerView={1}

            >
                <SwiperSlide>
                    <div className="container mx-auto homeSlider-item ">
                        <h1 className={"font-bold lg:text-start lg:font-normal text-6xl lg:text-8xl uppercase font-300"}>Знижки на <br /> одяг</h1>
                        <Link href="/shop/all/1" >
                            <button className={"button"}>Магазин</button>
                        </Link>

                        <Image
                            className={"absolute top-0 left-0 h-full w-[100%] opacity-50 lg:opacity-100 lg:w-[30%] z-[-1] object-cover"}
                            src="/img/homeSlider/1.jpg"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />

                        <Image
                            className={"absolute top-[10%] right-0 h-4/5 w-[30%] opacity-0 lg:opacity-100  z-[-2] lg:z-[-1] object-cover"}
                            src="/img/homeSlider/2.jpg"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="container mx-auto homeSlider-item ">
                        <h1 className={"font-bold lg:text-start lg:font-normal text-6xl lg:text-8xl uppercase font-300"}>Знижки на <br /> одяг</h1>
                        <Link href="/shop/all/1" >
                            <button className={"button"}>Магазин</button>
                        </Link>

                        <Image
                            className={"absolute top-0 left-0 h-full w-[100%] opacity-50 lg:opacity-100 lg:w-[30%] z-[-1] object-cover"}
                            src="https://images.pexels.com/photos/4066288/pexels-photo-4066288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />

                        <Image
                            className={"absolute top-[10%] right-0 h-4/5 w-[30%] opacity-0 lg:opacity-100  z-[-2] lg:z-[-1] object-cover"}
                            src="https://images.pexels.com/photos/4904525/pexels-photo-4904525.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />
                    </div>

                </SwiperSlide>
                <SwiperSlide>
                    <div className="container mx-auto homeSlider-item ">
                        <h1 className={"font-bold lg:text-start lg:font-normal text-6xl lg:text-8xl uppercase font-300"}>Знижки на <br /> одяг</h1>
                        <Link href="/shop/all/1" >
                            <button className={"button"}>Магазин</button>
                        </Link>

                        <Image
                            className={"absolute top-0 left-0 h-full w-[100%] opacity-50 lg:opacity-100 lg:w-[30%] z-[-1] object-cover"}
                            src="https://images.pexels.com/photos/9558233/pexels-photo-9558233.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />

                        <Image
                            className={"absolute top-[10%] right-0 h-4/5 w-[30%] opacity-0 lg:opacity-100  z-[-2] lg:z-[-1] object-cover"}
                            src="https://images.pexels.com/photos/6764007/pexels-photo-6764007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            width={2000}
                            height={2000}
                            alt="Picture of the author"
                        />
                    </div>

                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HomeSlider;
