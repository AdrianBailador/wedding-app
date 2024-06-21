// app/[locale]/ClientLayout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import "../globals.css";

interface ClientLayoutProps {
  children: React.ReactNode;
  locale: string;
}

const inter = Inter({ subsets: ['latin'] });

const ClientLayout: React.FC<ClientLayoutProps> = ({ children, locale }) => {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
};

export default ClientLayout;