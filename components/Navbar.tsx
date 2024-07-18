'use client';

import { useState } from 'react'; // Importa useState si no está ya importado en tu archivo
import Image from 'next/image';
import LocalSwitcher from '../components/local-switcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-background border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                            <Image
                                width={50}
                                height={50}
                                src="/isotipo_transparent.svg"
                                alt="Logo de boda de Adrian y Ana"
                            />
                        </span>
                    </a>

                    {/* Botón de hamburguesa para dispositivos móviles */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="block text-gray-800 dark:text-white focus:outline-none">
                            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4 6H20M4 12H20M4 18H20"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Menú de navegación */}
                    <div className={`md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col md:flex-row md:space-x-4 md:border-0 md:dark:border-gray-700">
                            <li>
                                <a href="/" className="block py-2 px-3 font-bold" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3">Greeting</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3">About Us</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3">Gallery</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3">Locations</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3">RSVP</a>
                            </li>
                            <li className="flex items-center">
                                <LocalSwitcher />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
