"use client";

import { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Social from "../Social/Social";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import HeaderBackground from "./HeaderBackground";
import BookingSearch from "../Booking/BookingSearch";

interface HeaderProps {
  images: string[];
  title?: string;
  subtitle?: string;
  autoSlide?: boolean;
  bookingForm?:boolean
  isDetail?: boolean;
}

export const Header = ({
  images,
  title = "",
  subtitle = "",
  autoSlide = true,
  bookingForm=false,
  isDetail=false,
}: HeaderProps) => {
  const [index, setIndex] = useState(0);

useEffect(() => {
  if (!autoSlide || images.length <= 1) return;

  const timer = setInterval(() => {
    setIndex((prev) => (prev + 1) % images.length);
  }, 3000);

  return () => clearInterval(timer);
}, [autoSlide, images]);


  return (
    <div className="relative h-screen w-full overflow-hidden">
      <HeaderBackground images={images} index={index} overlay />

      <div className="relative z-10">
        <Navbar />
        
  <div className="h-screen grid place-items-center text-center text-white px-[150px]">
  <div>
    <h2  className={`font-serif-raleway ${
                isDetail ? "text-[40px]" : "text-[70px]"
              }`}>
      {title}
    </h2>
    <span className="mt-4 block text-[12px] tracking-[0.3em] uppercase">
      {subtitle}
    </span>
  </div>
</div>


        
 {bookingForm && (
          <>
        <BookingSearch variant="hero" />
        </>
        )}
        <Social />
        <ScrollToTop />
      </div>
    </div>
  );
};
