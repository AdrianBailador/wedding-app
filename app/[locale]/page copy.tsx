// app/[locale]/page.tsx
'use client'
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';

const Home = () => {
  const [daysLeft, setDaysLeft] = useState(20); // Inicialmente quedan 20 días

  // Actualiza el contador cada día
  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(prevDays => prevDays - 1);
    }, 1000 * 60 * 60 * 24); // Cada 24 horas (1 día)

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Sitio en Mantenimiento</h1>
          <p className="text-xl mb-8">El sitio estará disponible en {daysLeft} días.</p>
          <p className="text-lg">Gracias por tu paciencia.</p>
        </div>
      </main>
    </div>
  );
};

export default Home;
