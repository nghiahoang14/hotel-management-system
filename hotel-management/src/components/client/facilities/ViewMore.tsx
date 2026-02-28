"use client"
import { Facilities } from "@/types/facilities";
import CardItem from "../Card/CardItem";
import BaseSwiper from "../Swiper/BaseSwiper";
import { useParams } from "next/navigation";
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  facilities?:Facilities[];
  isPage?: boolean;
};
export const ViewMore = ({ data, isPage = false,facilities }: Props) => {
  const { locale } = useParams<{ locale: string }>();
  
  const swiperData = isPage ? facilities : data;
  return (
    <>
      {/* view more */}
      <div className="container mx-auto px-10 my-[100px]">
        <h3 className="text-[48px] font-serif-raleway mb-2 tracking-wide text-center">
          Các tiện nghi
        </h3>
        <p className="text-[16px] tracking-wider text-center mb-12">
          Khám phá những tiện nghi đa dạng, nâng tầm trải nghiệm khi lưu trú tại
          khách sạn.
        </p>
        <BaseSwiper
          data={swiperData}
          slidesPerView={3}
          spaceBetween={30}
          loop
          pagination
          freeMode
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          renderSlide={(item: Facilities) => (
            <CardItem
              _id={item._id}
              image={item.image[0]}
              title={item.title}
              variant="flip"
              href={`/${locale}/facilities/${item._id}`}
            />
          )}
        />
      </div>
    </>
  );
};
