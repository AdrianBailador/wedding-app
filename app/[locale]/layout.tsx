// app/[locale]/layout.tsx
import React from 'react';
import ClientLayout from './ClientLayout'; // Import the ClientLayout component

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

const Layout: React.FC<LayoutProps> = ({ children, locale }) => {
  return (
    <ClientLayout locale={locale}>
      {children}
    </ClientLayout>
  );
};

export default Layout;