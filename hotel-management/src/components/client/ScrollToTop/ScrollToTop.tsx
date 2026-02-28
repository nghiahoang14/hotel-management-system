"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // khi scroll quá 1 chiều cao màn hình
      setActive(window.scrollY > window.innerHeight);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTop = () => {
    if (!active) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={handleScrollTop}
      className={`
        fixed bottom-6 right-4 z-30
        w-11 h-11 rounded-full
        flex items-center justify-center
        transition-all duration-300
        ${
          active
            ? "bg-white/80 backdrop-blur-md text-black cursor-pointer opacity-100"
            : "bg-white/30 text-gray-400 opacity-40 pointer-events-none"
        }
        hover:bg-[#A18348] hover:text-white
        shadow-lg
      `}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
