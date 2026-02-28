"use client"

import Image from "next/image"
import BaseSwiper from "../Swiper/BaseSwiper"

import { useTranslations } from "next-intl";

type GallerySectionProps = {
  Images: string[];
};

export const GallerySection=({ Images }: GallerySectionProps)=>{
  const t = useTranslations("gallery");
    return(
        <>
             
        {/* CONTENT */}
           <div className="container mx-auto px-4 my-[100px]">
            <h3 className="text-[50px] font-serif-raleway mb-6 text-center">{t("gallery")}</h3>
            <div className="relative h-[350px]">
                  <BaseSwiper<string>
                data={Images}
                slidesPerView={3}
                spaceBetween={30}
                
              slidesPerGroup={3}
                navigation={{
                  prevClass: "prevBtnSpecialEvent",
                  nextClass: "nextBtnSpecialEvent",
                }}
               enableLightbox 
                breakpoints={{
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 3 },
                }}
            renderSlide={(image) => (
          <div className="relative w-full h-[300px]">
            <Image
              src={image}
              alt="Hanoi Hotel Gallery"
            fill
            
              className="object-cover"
            />
          </div>
        )}
        
              />
            </div>
            </div>
             
        </>
    )
}