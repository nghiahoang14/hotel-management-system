"use client";

import CardItem from "../Card/CardItem";
import "swiper/css";
import "swiper/css/pagination";
import BaseSwiper from "../Swiper/BaseSwiper";
import { useInView } from "@/src/hooks/useInView";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { getDining } from "@/src/services/api/client/dining.api";
import { Dining } from "@/types/dining";

export default function DiningSection() {
  const { locale } = useParams<{ locale: string }>();
  const t = useTranslations("dining");

  const { ref, isVisible } = useInView(0.3);

  const [dinings, setDinings] = useState<Dining[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const  fetchDining= async () =>{
      try {
        const data = await getDining();
        setDinings(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch dining", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDining();
  }, []);

  /* ============ LOADING ============ */
  if (loading) {
    return (
      <section className="container mx-auto px-10 mt-[100px] text-center">
        <p>Loading dining...</p>
      </section>
    );
  }

  if (!dinings.length) return null;

  return (
    <section className="container mx-auto px-10 mt-[100px]">
      <div className="text-center">
        <h3
          ref={ref}
          className={`mb-8 text-[50px] font-serif-raleway transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"
          }`}
        >
          {t("title")}
        </h3>

        <p className="font-[400] leading-relaxed text-[16px] px-[170px]">
          {t("description")}
        </p>
      </div>

      <div className="mt-[40px]">
        <BaseSwiper
          data={dinings}
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
    </section>
  );
}
