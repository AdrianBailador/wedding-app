import type { Metadata } from 'next';
import { montserrat } from '@/styles/fonts';
import './globals.css';
import Footer from '@/components/footer';
import React from 'react';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
    title: 'Adrián y Ana',
    description: 'Bienvenidos a la boda del año, a la boda de Adrián y Ana',
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default function RootLayout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    return (
        <html lang={locale}>
            <body className={`${montserrat.className} w-full `}>
                <Navbar />
                <main className="flex-grow mt-[78px]">
                    {children}
                </main>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Footer />
            </body>
        </html>
    );
}
