"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { SwiperOptions } from "swiper/types";

interface BaseSwiperProps<T> {
  data: T[];
  renderSlide: (item: T, index: number) => React.ReactNode;

  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
  loop?: boolean;
  freeMode?: boolean;
  slidesPerGroup?: number;

  autoplay?: {
    delay: number;
    disableOnInteraction?: boolean;
    pauseOnMouseEnter?: boolean;
  };

  pagination?: boolean;

  navigation?: {
    prevClass: string;
    nextClass: string;
  };

  breakpoints?: SwiperOptions["breakpoints"];
  onActiveChange?: (index: number) => void;

  /** bật lightbox */
  enableLightbox?: boolean;
 
}

export default function BaseSwiper<T>({
  data,
  renderSlide,

  slidesPerView = 1,
  spaceBetween = 0,
  speed = 600,
  loop = false,
  freeMode = false,
  slidesPerGroup,

  autoplay,
  pagination = false,
  navigation,
  breakpoints,
  onActiveChange,
  enableLightbox = false,


}: BaseSwiperProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [atBeginning, setAtBeginning] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const isLightbox = activeIndex !== null;

  /* ================= SWIPER ================= */
  return (
    <>
      <div className="">
        <Swiper
        className=""
          modules={[Navigation, Pagination, Autoplay, FreeMode]}
          slidesPerView={slidesPerView}
          spaceBetween={spaceBetween}
          slidesPerGroup={slidesPerGroup}
          speed={speed}
          loop={loop}
          freeMode={freeMode}
          autoplay={autoplay}
          pagination={pagination ? { clickable: true } : false}
          navigation={
            navigation
              ? {
                  prevEl: `.${navigation.prevClass}`,
                  nextEl: `.${navigation.nextClass}`,
                }
              : false
          }
          breakpoints={breakpoints}
          onSlideChange={(swiper) => {
            setAtBeginning(swiper.isBeginning);
            setAtEnd(swiper.isEnd);
            onActiveChange?.(swiper.realIndex);
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              onClick={() => enableLightbox && setActiveIndex(index)}
              className={enableLightbox ? "cursor-pointer" : "" }
            >
                 {renderSlide(item, index)}
            </SwiperSlide>
          ))}
        </Swiper>
</div>
        {/* ===== NAV (SWIPER BÌNH THƯỜNG) ===== */}
        {navigation && (
          <>
            <div
              className={`
                ${navigation.prevClass}
                absolute left-4 top-1/2 z-10 -translate-y-1/2
                ${atBeginning ? "opacity-30 pointer-events-none" : ""}
                cursor-pointer
              `}
            >
              <ChevronLeft size={28} />
            </div>

            <div
              className={`
                ${navigation.nextClass}
                absolute right-4 top-1/2 z-10 -translate-y-1/2
                ${atEnd ? "opacity-30 pointer-events-none" : ""}
                cursor-pointer
              `}
            >
              <ChevronRight size={28} />
            </div>
          </>
        )}
      

      {/* ================= LIGHTBOX ================= */}
      {enableLightbox && isLightbox && (
        <div
          className="
            fixed inset-0 z-[10000]
            bg-black/80
            flex items-center justify-center
            animate-fadeIn
          "
        >
          {/* CLOSE */}
          <button
            className="
              absolute top-6 right-6 z-[10002]
              text-white hover:scale-110 transition
            "
            onClick={() => setActiveIndex(null)}
          >
            <X size={36} />
          </button>

          {/* PREV (LIGHTBOX RIÊNG) */}
          <button
            className="
              fixed left-6 top-1/2 z-[10002]
              -translate-y-1/2 text-white
              hover:scale-110 transition
            "
            onClick={() =>
              setActiveIndex(
                activeIndex === 0 ? data.length - 1 : activeIndex - 1
              )
            }
          >
            <ChevronLeft size={48} />
          </button>

          {/* NEXT (LIGHTBOX RIÊNG) */}
          <button
            className="
              fixed right-6 top-1/2 z-[10002]
              -translate-y-1/2 text-white
              hover:scale-110 transition
            "
            onClick={() =>
              setActiveIndex(
                activeIndex === data.length - 1 ? 0 : activeIndex + 1
              )
            }
          >
            <ChevronRight size={48} />
          </button>

          {/* IMAGE */}
          <div
            key={activeIndex}
            className="
              relative w-[90vw] h-[85vh]
              .animate-slideUp 
            "
          >
            <Image
              src={data[activeIndex] as unknown as string}
              alt="preview"
              fill
              className="object-contain transition-opacity duration-300"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
