"use client";

import { useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

import { LinkToPage } from "../Link/LinkToPage";

import BaseSwiper from "../Swiper/BaseSwiper";
import { RoomType } from "@/types/roomType";
import { getRoomTypes } from "@/src/services/api/client/roomType.api";
import { useLocale } from "next-intl";

export const RoomSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
    const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const locale=useLocale();

  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const data = await getRoomTypes(); 
        setRoomTypes(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch room types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoomTypes();
  }, []);
  const room = roomTypes[activeIndex];

  return (
    <div className=" ">
      <div className="flex items-stretch ">
        {/* LEFT INFO */}
        <div
          className={`
     bg-[#112c50] text-white p-[60px] w-[450px]
    flex flex-col justify-center gap-4
    transition-all duration-600 ease-out h-[600px]
   
  `}
        >
          <p className={`text-[50px] font-serif-raleway mb-4 min-h-[150px]   `}>
            {room?.name}
          </p>

          <ul className={`text-[16px]   `}>
            <li className="my-2 flex items-center  gap-4">
              {" "}
              <img src="/bed.svg" className="w-[32px] invert brightness-0" />
              {room?.bed}
            </li>
            <li className="my-3 flex items-center  gap-4">
              <img src="/people.svg" className="w-[32px] invert brightness-0" />{" "}
              {room?.people}
            </li>
            <li className="my-3 flex items-center  gap-4">
              <img src="/area.svg" className="w-[32px] invert brightness-0" />{" "}
              {room?.size}
            </li>
            <li className="my-3 flex items-center  gap-4">
              <img src="/view.svg" className="w-[32px] invert brightness-0" />{" "}
              {room?.view}
            </li>
          </ul>
          <LinkToPage
            href={`/${locale}/accommodation/${room?.slug}`}
            className="relative inline-block text-[16px] 
            text-white
            border-y border-white hover:border-[#A18348] max-w-[170px]  hover:bg-[#A18348] px-[35px] py-[12px] transition-colors duration-3"
            text="Xem phòng"
          />
        </div>

        {/* RIGHT SLIDER */}
        <div className="flex-1 overflow-hidden relative">
          <BaseSwiper
            data={roomTypes}
            slidesPerView={1}
            speed={700}
            navigation={{
              prevClass: "prevBtnSpecialEvent",
              nextClass: "nextBtnSpecialEvent",
            }}
            onActiveChange={(index) => setActiveIndex(index)}
            renderSlide={(room) => (
              <img
                src={room.images[0]}
                alt={room.name}
                className="w-full h-[600px] object-cover"
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
