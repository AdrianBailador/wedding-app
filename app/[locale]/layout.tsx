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
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`${montserrat.className} flex flex-col min-h-screen`}>
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
