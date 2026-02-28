"use client";

import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
interface Props{
    isRoomDetail?:boolean
}
export default function BookingForm({isRoomDetail}:Props) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleSubmit = () => {
    console.log({
      checkIn,
      checkOut,
      adults,
      children,
    });
  };
const t=useTranslations("bookingForm");
  return (
    <div className={` ${isRoomDetail?"":"absolute bottom-6 left-1/2 -translate-x-1/2  container mx-auto px-10"}  w-[100%]   `}>
      <div className={`backdrop-blur-md ${isRoomDetail?"bg-[#a18348]":"bg-white/20"} border border-white/30  px-7 py-7 shadow-lg`}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* Check in */}
          <div>
            <label className="text-white text-[14px] block mb-5">
             {t("checkIn")}
            </label>
            <input
              type="date"
              
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full bg-transparent border-b border-white text-white focus:outline-none  py-3 px-2"
            />
          </div>

          {/* Check out */}
          <div>
            <label className="text-white text-[14px] block mb-5"> {t("checkOut")}</label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
          
              className="w-full bg-transparent border-b border-white text-white focus:outline-none  py-3 px-2"
            />
          </div>

          {/* Adults */}
          <div>
            <label className="text-white text-[14px] block mb-5"> {t("adults")}</label>
            <div className="relative">
            <select
              value={adults}
              onChange={(e) => setAdults(Number(e.target.value))}
              className="w-full bg-transparent border border-white text-white focus:outline-none py-3 px-2 appearance-none"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n} className="text-black">
                  {n}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-md">
                <ChevronDown/>
            </span>
            </div>
          </div>

          {/* Children */}
          <div>
            <label className="text-white text-[14px] block mb-5"> {t("children")}</label>
            <div className="relative">
            <select
              value={children}
              onChange={(e) => setChildren(Number(e.target.value))}
              className="w-full bg-transparent border border-white text-white focus:outline-none py-3 px-2 appearance-none"
            >
              {[0, 1, 2, 3].map((n) => (
                <option key={n} value={n} className="text-black">
                  {n}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white text-md">
              <ChevronDown/>
            </span>
          </div>
          </div>

          {/* Button */}
          <button
            onClick={handleSubmit}
            className={`bg-white ${isRoomDetail?"text-[#a18348]":"text-gray-800"}  uppercase text-[14px] border border-transparent font-medium px-6 py-4 hover:bg-[#A18348] hover:text-white transition hover:border-white`}
          >
             {t("submit")}
          </button>
        </div>
      </div>
    </div>
  );
}
