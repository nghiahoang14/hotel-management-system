"use client";

import { useEffect, useState } from "react";
import { BookingRoom } from "../BookingRoom/BookingRoom";
import { Logo } from "../Logo/Logo";
import Menu from "../Menu/Menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 py-2 left-0 w-full z-1 transition-all duration-200 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-10  h-[80px] flex items-center justify-between">
        <Logo isScrolled={isScrolled} />
        <Menu isScrolled={isScrolled} />
        <BookingRoom  />
      </div>
    </header>
  );
}
