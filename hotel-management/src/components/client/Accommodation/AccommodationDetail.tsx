"use client";

import { useParams } from "next/navigation";
import CardItem from "../Card/CardItem";
import BaseSwiper from "../Swiper/BaseSwiper";
import { rooms } from "@/src/apis/room.data";
import Image from "next/image";
import Link from "next/link";
import fillSlides from "@/src/helper/fillSlide";
import { RoomType } from "@/types/roomType";
import { renderPeople } from "@/src/helper/renderPeople";
import BookingSearch from "../Booking/BookingSearch";
type Props = {
  
  accommodation:RoomType | undefined;
  recentAccommodations:RoomType[];
};
export const AccommodationDetail = ({  accommodation, recentAccommodations }: Props) => {
  const { locale } = useParams<{ locale: string }>();
  
  const filledRooms = fillSlides(recentAccommodations, 3);

  return (
    <>
        <div className="grid grid-cols-1 md:grid-cols-4  divide-y md:divide-y-0 md:divide-x divide-gray-200">

        {/* BED */}
        <div className="flex items-center gap-4 my-6 justify-center ">
        <img src="/bed.svg" className="w-[32px]  text-[#a18348] " />
        <p className="text-[16px] tracking-wide">{accommodation?.bed}</p>
        </div>

        {/* PEOPLE */}
        <div className="flex items-center gap-4 my-6 justify-center">
        <img src="/people.svg" className="w-[32px]  text-[#a18348]" />{" "}
        <p className="text-[16px] tracking-wide"> {renderPeople(accommodation)}</p>
        </div>

        {/* SIZE */}
        <div className="flex items-center gap-4 my-6 justify-center">
        <img src="/area.svg" className="w-[32px]  text-[#a18348]" />{" "}
        <p className="text-[16px] tracking-wide">{accommodation?.size}</p>
        </div>

        {/* VIEW */}
        <div className="flex items-center gap-4 py-6 justify-center">
        <img src="/view.svg" className="w-[32px]  text-[#a18348]" />{" "}
        <p className="text-[16px] tracking-wide">{accommodation?.view}</p>
        </div>

    </div>
      <div className="container mx-auto px-10 mt-30 flex items-center gap-10">
        {/* IMAGE */}
        <Image
          src={accommodation?.images[1] ?? ""}
          alt={accommodation?.name ?? ""}
          width={485}
          height={650}
          className="object-cover"
        />

        {/* CONTENT */}
        <div className=" px-6">
          <h3 className="text-[50px] font-serif-raleway tracking-wider mb-4 font-[600]">
            {accommodation?.name}
          </h3>
          <p className="text-[46px] font-[200] mb-4 font-gothic">
            Nghỉ dưỡng hoàn hảo
          </p>

          <p className="text-[16px] tracking-wide leading-relaxed mb-10  font-[400]">
            {accommodation?.description}
          </p>

          <Link
            href={`/${locale}/booking?roomTypeId=${accommodation?._id.toString()}`}
            className="inline-block text-[16px] uppercase tracking-wide
                                text-[#A18348] border-y border-[#A18348]
                                px-6 py-3 hover:bg-[#A18348] hover:text-white transition-colors"
          >
            Đặt phòng
          </Link>
        </div>
      </div>
      <div>
        <div className="relative mt-25 w-full h-[580px]">
          <Image
            src={accommodation?.images[2] ?? ""}
            alt={accommodation?.name ?? "accommodation image"}
            fill
            className="object-cover "
          />
        </div>
      </div>
      <div className="container mx-auto px-10 my-[100px]">
        {/* AMENITIES */}
        <div className="container mx-auto px-10 my-[100px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* LEFT: TEXT */}
            <div>
              <h2 className="text-[50px] font-serif-raleway mb-6">
                Các tiện nghi
              </h2>

             <ul className="space-y-3 text-[16px] list-disc list-inside">
  {accommodation?.amenities.map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

            </div>

            {/* RIGHT: BIG IMAGE */}
            <div className="relative w-full h-[650px]">
              <Image
                src={accommodation?.images[3] ?? ""}
                alt={accommodation?.name ?? "accommodation image"}
                fill
                className="object-cover "
                priority
              />
            </div>
          </div>

          {/* BOTTOM IMAGE */}
          <div className="relative mt-10 max-w-[570px] h-[380px]">
            <Image
              src={accommodation?.images[4] ?? ""}
              alt={accommodation?.name ?? "accommodation image"}
              fill
              className="object-cover "
            />
          </div>
        </div>

        {/* booking */}
        <div className="mb-25 ">
          <p className="text-[50px] font-serif-raleway mb-8">
            Sẵn sàng đặt phòng?
          </p>
          <p className="text-[46px] font-gothic font-extralight leading-0.5 mb-16">
            Thời gian nhận phòng của bạn?
          </p>
          <BookingSearch isRoomDetail  variant="hero"/>
        </div>
        {/* view more */}
        <div>
          <h3 className="text-[48px] font-serif-raleway mb-10 tracking-wide text-center">
            Xem thêm các lựa chọn
          </h3>

          <BaseSwiper
            data={filledRooms}
            slidesPerView={3}
            spaceBetween={30}
            slidesPerGroup={3}
            loop
            pagination
            freeMode={false}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            renderSlide={(item) => (
              <CardItem
                _id={item._id}
                image={item.images[0]}
                title={item.name}
                description={item.description}
                people={renderPeople(item)}
                size={item.size}
                href={`/${locale}/accommodation/${item.slug}`}
              />
            )}
          />
        </div>
      </div>
    </>
  );
};
