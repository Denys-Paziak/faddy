
import type { Metadata } from 'next'
import { Hanken_Grotesk } from 'next/font/google'
import './globals.css'
import Footer from "@/app/components/Footer/Footer";

const font = Hanken_Grotesk({ weight: ["300", '400', '700'], subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Famdy',
    description: 'Shop',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={font.className}>
                {children}
                <Footer />
            </body>
        </html>
    )
}
