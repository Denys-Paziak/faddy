import React from 'react';
import Nav from "@/app/components/Nav/Nav";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="container mx-auto bg-white py-8">
            <div className="w-full max-w-screen-xl mx-auto md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <Link href="/" className="text-3xl font-bold">
                        FAMDY
                    </Link>
                    <Nav />
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center">
                    © 2023 FAMDY. All Rights Reserved.
                </span>
            </div>
        </footer>
    );
};

export default Footer;
