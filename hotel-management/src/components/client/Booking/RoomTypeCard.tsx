"use client";
import { renderPeople } from "@/src/helper/renderPeople";
import Image from "next/image";
import { useState } from "react";

export const RoomTypeCard = ({
  roomType,
  available,
  selectedQty,
  onChangeQty,
  onSelect,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) => {

    const [activeImage, setActiveImage] = useState(0);
  // ❌ HẾT PHÒNG → KHÔNG RENDER
  if (available === 0) return null;


  return (
    <div
      className={`flex gap-6 border p-5 mb-6 cursor-pointer
        ${selectedQty > 0 ? "border-[#A18348]" : "border-gray-200"}
      `}
      onClick={onSelect}
    >
      {/* IMAGE + THUMBNAIL */}
      <div className="w-[260px]">
        <div className="relative w-full h-[180px] rounded overflow-hidden mb-2">
          <Image
            src={roomType.images[activeImage]}
            alt={roomType.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {roomType.images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setActiveImage(i);
              }}
              className={`relative w-16 h-12 rounded overflow-hidden border-2
                ${
                  activeImage === i
                    ? "border-[#A18348]"
                    : "border-transparent"
                }
              `}
            >
              <Image src={img} alt="" fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{roomType.name}</h3>

        <p className="text-sm text-gray-500 mb-2">
          Tối đa : {renderPeople(roomType)} 
        </p>

        <p className="text-sm line-clamp-2 mb-3">
          {roomType.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-[#A18348]">
              {roomType.price.toLocaleString()} ₫
            </p>
            <span className="text-xs">/ đêm</span>
          </div>

          {/* SELECT SỐ PHÒNG */}
          <select
            value={selectedQty}
            onChange={(e) => onChangeQty(+e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="border px-3 py-2"
          >
            <option value={0}>0 phòng</option>
            {Array.from(
              { length: available },
              (_, i) => i + 1
            ).map((v) => (
              <option key={v} value={v}>
                {v} phòng
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
