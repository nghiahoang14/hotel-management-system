"use client"
import Image from "next/image";
import { LinkToPage } from "../Link/LinkToPage";

import { useParams } from "next/navigation";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  room: any;
  reverse?: boolean;
}

export const AccommodationItem=({ room, reverse }: Props)=>{
     const { locale } = useParams<{ locale: string }>();
    return(
        <>
          <div
      className={`
        flex items-center gap-16 mb-24
        ${reverse ? "flex-row-reverse" : "flex-row"}
      `}
    >
      {/* IMAGE */}
      <div className="w-1/2">
        <Image
          src={room.images[0]}
          alt={room.name}
          width={800}
          height={500}
          className="w-full h-[450px] object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="w-1/2 px-6">
        <h3 className="text-[34px] font-serif-raleway tracking-wider mb-4 font-[600]">
          {room.name}
        </h3>
        <p className="text-[24px] font-[200] mb-1">
          {room.people} / {room.size}
        </p>

        <div className="w-15 h-[3px] bg-[#a18348] my-4" />
        <p className="text-[16px] tracking-wide leading-relaxed mb-6 line-clamp-2 font-[400]">
          {room.description}
        </p>

        

          <LinkToPage
              href={`/${locale}/accommodation/${room.slug}`}
              className="inline-block text-[16px] uppercase tracking-wide
                        text-[#A18348] border-y border-[#A18348]
                        px-6 py-3 hover:bg-[#A18348] hover:text-white transition-colors"
              text={"Xem phòng"}
            />
      </div>
    </div>
        </>
    )
}