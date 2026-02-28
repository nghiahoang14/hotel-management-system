"use client";
import CardItem from "../Card/CardItem";


import "swiper/css";
import "swiper/css/pagination";
import { useInView } from "@/src/hooks/useInView";
import { usePathname } from "next/navigation";
import BaseSwiper from "../Swiper/BaseSwiper";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Offer } from "@/types/offer";
import { getActiveOffers } from "@/src/services/api/client/offer.api";


export default function OfferSection() {
  const locale=useLocale();
    const t =  useTranslations("offer");
  const pathname = usePathname();
const isHome = pathname === `/${locale}` || pathname===`/${locale}/meetings-events`;

   const { ref, isVisible } = useInView(0.3);
   const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await getActiveOffers(); // 👈 chỉ lấy offer còn hạn
        setOffers(data);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch offers", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <section className="container mx-auto px-10 mt-[100px] text-center">
        <p>Loading offers...</p>
      </section>
    );
  }

  if (!offers.length) return null;
  return (
    <>
      <section ref={ref} className="container mx-auto px-10 text-center mt-[100px]">
        <h3 className={`mb-8 text-[50px] font-serif-raleway leading-tight  transition-all duration-1000 ease-out delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}`}>
          {t("titlePage")}
        </h3>
        {pathname !=="/meetings-events" &&(
          <>
  <p
          className="mb-8 text-[46px] font-gothic font-thin 
  opacity-80 "
        >
       {t("subtitlePage")}
        </p>
        <p className="text-[16px]  max-w-[1140px]">
        {t("description")}
        </p>
        </>
        )}
      
        <div className="my-[40px]">
         {isHome ? (
          /* ================= HOME: SWIPER ================= */
          <BaseSwiper
  data={offers}
  slidesPerView={3}
  spaceBetween={30}
  freeMode
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  }}
   pagination
  
  breakpoints={{
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  }}
  renderSlide={(item) => <CardItem  {...item} href={`/${locale}/offer/${item._id}`} />}
/>

        ) : (
          /* ================= OFFER PAGE: GRID ================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
            {offers.map((item,index) => (
              <CardItem key={index} {...item} href={`/${locale}/offer/${item._id}`}/>
            ))}
          </div>
        )}
        </div>
      </section>
    </>
  );
}
