'use client'
import Image from "next/image";
import {useTheme} from "next-themes";

const Navbar = () => {
    const { theme, setTheme } = useTheme()
    return (
        <nav className="flex justify-between bg-gray-100 text-gray-900 w-screen">
            <button
                className="mt-16 px-4 py-2 text-white dark:text-black bg-black dark:bg-white font-semibold rounded-md"
                onClick={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light')
                }}
            >
                Change Theme
            </button>
            <div className="px-5 xl:px-12 py-6 flex w-full items-center">
                <a className="text-3xl font-bold font-heading" href="#">
                    LOGO
                </a>
                {/*Nav Links*/}
                <ul className="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12">
                    <li><a className="hover:text-gray-200" href="#">Home</a></li>
                    <li><a className="hover:text-gray-200" href="#">Catagory</a></li>
                    <li><a className="hover:text-gray-200" href="#">Collections</a></li>
                    <li><a className="hover:text-gray-200" href="#">Contact Us</a></li>
                </ul>
               
            </div>
            {/*Responsive navbar*/}
            <a className="xl:hidden flex mr-6 items-center" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span className="flex absolute -mt-5 ml-4">
          <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
        </span>
            </a>
            <a className="navbar-burger self-center mr-12 xl:hidden" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none"
                     viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            </a>
        </nav>
    );
};

export default Navbar;