'use client'
import Link from "next/link";
import { useState } from "react";
import LangSwitcher from './LangSwitcher'; // Import the LangSwitcher component
import { useTranslations } from "next-intl";
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Navbar"); // Use translations for Navbar

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F6F4EC] border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center">
          <Image
            src=""
            className="h-8 mr-3"
            alt={t("companyLogoAlt")}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
            A&A
          </span>
        </a>
        <div className="flex items-center md:order-2">
          <div className="relative">
            <LangSwitcher /> {/* Language switcher */}
          </div>
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
            id="user-menu-button"
            aria-expanded={isOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">{t("openUserMenu")}</span>
          </button>
          <div
            className={`z-50 ${isOpen ? "block" : "hidden"} my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow`}
            id="user-dropdown"
          >
            <ul className="py-1" aria-labelledby="user-menu-button">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t("dashboard")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t("settings")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {t("signOut")}
                </a>
              </li>
            </ul>
          </div>
          <div className="ml-4 border border-[#DE967D] text-[#DE967D] px-3 py-2 rounded-lg">
            {t("rsvp")}
          </div>
        </div>
        <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-search"
          aria-expanded={isOpen}
          onClick={toggleMenu}
        >
          <span className="sr-only">{t("openMainMenu")}</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? "block" : "hidden"}`}
          id="navbar-search"
        >
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500"
              placeholder={t("searchPlaceholder")}
            />
          </div>
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-[#F6F4EC] md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-black bg-primary-700 rounded md:bg-transparent md:text-primary-700 md:p-0">
                {t("nav.boda")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">
                {t("nav.greeting")}
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">
                {t("nav.aboutUs")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 pl-3 pr-4 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary-700 md:p-0">
                {t("nav.gallery")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
