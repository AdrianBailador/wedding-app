'use client';
import { useState } from 'react';
import Image from 'next/image';
import LocalSwitcher from '../components/local-switcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-background border-b border-gray-200 dark:bg-gray-900 fixed top-0 w-full z-30">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        width={50}
                        height={50}
                        src="/isotipo_transparent.svg"
                        alt="Logo de boda de Adrian y Ana"
                    />
                </a>
                <div className="flex items-center space-x-4 md:space-x-0 md:order-2 rtl:space-x-reverse">
                    <LocalSwitcher />
                    <button
                        onClick={toggleMenu}
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-full md:hidden bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-language"
                        aria-expanded={isOpen}
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
                <div className={`w-full md:flex md:items-center md:w-auto ${isOpen ? 'block' : 'hidden'}`} id="navbar-language">
                    <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 p-4 md:p-0 border border-gray-100 md:border-0 dark:border-gray-700 tracking-[0.25em] font-normal">
                        <li>
                            <a href="/" className="block py-2 px-3 font-bold">Home</a>
                        </li>
                        <li>
                            <a href="#greeting" className="block py-2 px-3">Greeting</a>
                        </li>
                        <li>
                            <a href="#about-us" className="block py-2 px-3">About Us</a>
                        </li>
                        <li>
                            <a href="#gallery" className="block py-2 px-3">Gallery</a>
                        </li>
                        <li>
                            <a href="#localitations" className="block py-2 px-3">Locations</a>
                        </li>
                        <li>
                            <a href="#guestFormFormik" className="block py-2 px-3">RSVP</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
