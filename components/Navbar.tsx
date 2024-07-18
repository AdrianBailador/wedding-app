'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import LocalSwitcher from '../components/local-switcher';

const Navbar = () => {
    return (
        <nav className="bg-background border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        <Image
                            width={50}
                            height={50}
                            src="/isotipo_transparent.svg"
                            alt={"Logo de boda de Adrian y Ana"}
                        />
                    </span>
                </a>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-language">
                    <ul className="flex flex-col tracking-[0.25em] font-normal p-4 md:p-0 mt-4 border border-gray-100 md:space-x-4 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:border-gray-700">
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
        </nav>
    );
};

export default Navbar;