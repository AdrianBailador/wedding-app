import React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import "../globals.css"; // Ajusta la ruta si es necesario

const inter = Inter({ subsets: ['latin'] });

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, locale }) => {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default ClientLayout;
