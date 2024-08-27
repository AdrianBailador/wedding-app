'use client';
import { useState } from 'react';
import Image from 'next/image';
import LocalSwitcher from '../components/local-switcher';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="flex-no-wrap fixed top-0 z-50 flex w-full items-center justify-between bg-[#FBFBFB] py-2 shadow-md shadow-black/5 dark:bg-neutral-600 dark:shadow-black/10 lg:flex-wrap lg:justify-start lg:py-4">
            <div className="md:container-full container flex flex-wrap items-center justify-between w-full">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span
                        className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
                    >
                        <Image
                            width={50}
                            height={50}
                            src="/aya-logo-w-namest.svg"
                            alt={"Logo de boda de Adrian y Ana"}
                        />
                    </span>
                </a>
                <div className="flex items-center md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse">
                    <div className="flex items-center space-x-4">
                        <LocalSwitcher/>
                    </div>

                    <button onClick={toggleMenu} data-collapse-toggle="navbar-language" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-full md:hidden bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-language" aria-expanded={isOpen}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

                <div
                    className={`h-screen md:h-auto items-center justify-between ${isOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`}
                    id="navbar-language">
                    <ul className="flex flex-col tracking-[0.25em] font-normal p-4 md:p-0 mt-4 border border-gray-100 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
                        <li>
                            <a href="/" className="block py-2 px-3 font-bold" onClick={closeMenu} aria-current="page">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#greeting" className="block py-2 px-3" onClick={closeMenu}>
                                Greeting
                            </a>
                        </li>
                        <li>
                            <a href="#about-us" className="block py-2 px-3" onClick={closeMenu}>
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#gallery" className="block py-2 px-3" onClick={closeMenu}>
                                Gallery
                            </a>
                        </li>
                        <li>
                            <a href="#localitations" className="block py-2 px-3" onClick={closeMenu}>
                                Locations
                            </a>
                        </li>
                        <li>
                            <a href="#guestFormFormik" className="block py-2 px-3" onClick={closeMenu}>
                                RSVP
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;