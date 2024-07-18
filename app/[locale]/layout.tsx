import type {Metadata} from 'next';
import {Inter, Montserrat} from 'next/font/google';

import './globals.css';
import Footer from '@/components/footer';
import React from "react";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat({subsets: ['latin']});

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
                                       params: {locale},
                                   }: Readonly<RootLayoutProps>) {
    return (
        <html lang={locale}>
        <body className={montserrat.className}>
        <Navbar/>
        <main>
            {children}
        </main>
        <Footer />
        </body>
        </html>
    );
}