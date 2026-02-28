"use client"

import { Dining } from "@/types/dining";
import CardItem from "../Card/CardItem";
import BaseSwiper from "../Swiper/BaseSwiper";
import { useLocale } from "next-intl";

type DiningViewMoreProps = {
  data: Dining[];

};

export const DiningViewMore = ({
  data,
 
}: DiningViewMoreProps) => {
    const locale=useLocale();
  return (
    <div className="container mx-auto px-10 my-[100px]">
      <p className="text-[16px] tracking-wider text-center mb-4 whitespace-pre-line">
        Chạm tới đỉnh cao của ẩm thực<br />
        Thưởng thức mỹ vị và đồ uống tuyệt hảo
      </p>

      <h3 className="text-[48px] font-serif-raleway mb-10 tracking-wide text-center">
        Nhà Hàng & Bar
      </h3>

      <BaseSwiper
        data={data}
        slidesPerView={3}
        spaceBetween={30}
        loop
        pagination
        freeMode
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        renderSlide={(item) => (
          <CardItem
            _id={item._id}
            image={item.image[0]}
            title={item.title}
            variant="flip"
            href={`/${locale}/dining/${item._id}`}
          />
        )}
      />
    </div>
  );
};
