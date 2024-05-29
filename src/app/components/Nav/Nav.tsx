import React from 'react';
import Link from "next/link";

const Nav: React.FC = () => {
    return (
        <nav className="flex items-center gap-4">
            <Link href="/" className="relative">
                Головна
            </Link>
            <Link href="/shop/all/1" className="relative">
                Магазин
            </Link>
            <Link href="/contact" className="relative">
                Контакти
            </Link>
        </nav>
    );
};

export default Nav;
