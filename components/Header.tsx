"use client";

import { useRef } from "react";
import LangSwitcher from "@/components/LangSwitcher";
import Image from "next/image";

const Header = () => {
  const themeSwitcherRef = useRef<HTMLDivElement>(null);

  return (
    <header className="flex items-center justify-between py-4 shadow shadow-gray-200 bg-baseOne transition-colors duration-300 lg:px-[160px] sm:px-[40px] px-[16px]">
      <div>
       
      </div>

      <div ref={themeSwitcherRef}>
        <LangSwitcher />
      </div>
    </header>
  );
};

export default Header;