"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { RoomType } from "@/types/roomType";
import {useState} from "react";


type Props = {
  open: boolean;
  data: RoomType | null;
  onClose: () => void;
};

export const RoomTypeViewModal = ({ open, data, onClose }: Props) => {
    const [activeImage, setActiveImage] = useState(0);

  if (!open || !data) return null;


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
     <div className="bg-[#1e1e1e] w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl p-6 relative text-white">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Room Type Detail
        </h2>

      

        {/* INFO */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Name" value={data.name} />
          <Info label="Price" value={`${data.price}đ`} />
          <Info label="Size" value={data.size} />
          <Info label="Bed" value={data.bed} />
          <Info label="View" value={data.view} />
          <Info label="People" value={data.people} />
        </div>

        {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="text-gray-400 mb-1">Description</p>
          <p className="text-sm leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* AMENITIES */}
        <div className="mt-4">
          <p className="text-gray-400 mb-2">Amenities</p>
          <div className="flex flex-wrap gap-2">
            {data.amenities.map((a, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-700 rounded text-xs"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
         {/* IMAGES */}
<div className="mt-4">
  <p className="text-gray-400 mb-2">Images</p>

  {/* MAIN IMAGE */}
  <div className="relative w-full h-56 rounded-lg overflow-hidden mb-3">
    <Image
      src={data.images[activeImage]}
      alt={data.name}
      fill
      className="object-cover"
    />
  </div>

  {/* THUMBNAILS */}
  <div className="flex gap-2 overflow-x-auto">
    {data.images.map((img, i) => (
      <button
        key={i}
        onClick={() => setActiveImage(i)}
        className={`relative w-20 h-16 rounded overflow-hidden border-2 ${
          activeImage === i
            ? "border-indigo-500"
            : "border-transparent"
        }`}
      >
        <Image
          src={img}
          alt=""
          fill
          className="object-cover"
        />
      </button>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

const Info = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);
