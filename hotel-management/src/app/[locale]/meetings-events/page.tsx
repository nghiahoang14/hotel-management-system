
import { Header } from "@/src/components/client/layouts/Header";
import Image from "next/image";


import OfferSection from "@/src/components/client/Section/OfferSection";
import {  GallerySection } from "@/src/components/client/Section/GallerySection";
import { gallery } from "@/src/apis/gallery.data";
import { getTranslations } from "next-intl/server";

const meetingGallery =
  gallery.find((g) => g.title === "Hội nghị & sảnh")?.images || [];
export default async function MeetingEventPage({
  params,
}: {
   params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "conference",
  });
  return (
    <>
      {/* HEADER */}
      <Header
        images={[
          "https://hanoihotel.com.vn/wp-content/uploads/2024/11/Function-Room-3-1024x683.webp",
          "https://hanoihotel.com.vn/wp-content/uploads/2024/11/Function-Room-8-1024x683.webp",
        ]}
        autoSlide
        title={
         t("title")
        }
      />
      {/* CONTENT */}
      <div className="container mx-auto px-10 my-25">
        <h3 className="text-[50px] font-serif-raleway mb-6 text-center">
          {t("pageTitle")}
        </h3>
        <p className="text-[16px] leading-relaxed  text-center px-[170px] py-[16px] text-[#000000]">
          {t("description")}
        </p>
        <div className="relative w-full h-[450px] mb-[70px]">
          <Image
            src="https://hanoihotel.com.vn/wp-content/uploads/2024/12/tabel-1536x595.jpg"
            alt="tabel"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex items-center justify-start gap-25">
          <div className="relative w-[490px] h-[650px] mb-[50px]">
            <Image
              src="https://hanoihotel.com.vn/wp-content/uploads/2024/11/Function-Room-8-1024x683.webp"
              alt="room"
              fill
              className="object-cover"
            />
          </div>
          <div className="px-[10px]">
            <h3 className="text-[50px] font-serif-raleway mb-6"> {t("equipmentTitle")}</h3>
            <ul className="text-[16px] ">
                 {t.raw("equipments").map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* CONTENT */}
     <GallerySection Images={meetingGallery}/>
      <OfferSection/>
    </>
  );
}
