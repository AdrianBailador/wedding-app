import type {Metadata} from 'next';
import {Inter, Montserrat} from 'next/font/google';

import './globals.css';
import Footer from '@/components/footer';
import React from "react";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Adian y Ana',
    description: 'Bienvenidos a la boda de Adian y Ana',
};

interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    };
}

export default function RootLayout({
                                       children,
                                       params: {locale},
                                   }: Readonly<RootLayoutProps>) {
    return (
        <html lang={locale}>
        <body className={montserrat.className}>
        <Navbar/>
        <div className='flex flex-col min-h-screen max-w-4xl mx-auto'>
            <div className='flex-grow mt-20'>{children}</div>
        </div>
        <Footer />
        </body>
        </html>
    );
}