// app/[locale]/layout.tsx
import React from 'react';
import ClientLayout from './ClientLayout'; // Import the ClientLayout component

interface LayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  const { locale } = params;
  return (
    <ClientLayout locale={locale}>
      {children}
    </ClientLayout>
  );
};

export default Layout;
