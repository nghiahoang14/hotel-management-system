"use client"

import { useInView } from "@/src/hooks/useInView";
import { LinkToPage } from "../Link/LinkToPage";
import { useLocale, useTranslations } from "next-intl";
export const AmenitiesSection = () => {
  const { ref, isVisible } = useInView(0.2);
  const t= useTranslations("facilities");
  const locale=useLocale();
  return (
    <>
      <section
        ref={ref}
        className={`container mx-auto px-6 lg:px-10 py-20
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
      `}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <div
            className={`w-full transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
          >
            <img
              src="/Tennis-img.jpg"
              alt="Tennis"
              className="w-full h-[640px] object-cover shadow-md"
            />
          </div>
          {/* TEXT */}
          <div className="transition-all duration-1000 delay-200 ">
            <h3 className="mb-8 text-[50px] font-serif-raleway leading-tight">
             {t("title")}
            </h3>

            <p className="font-[400] leading-relaxed text-[16px] mb-8">
             {t("description")}
            </p>
            <LinkToPage
              href={`/${locale}/facilities`}
              className="inline-block text-[16px] uppercase tracking-wide
                        text-[#A18348] border-y border-[#A18348]
                        px-6 py-3 hover:bg-[#A18348] hover:text-white transition-colors"
              text={t("buttonText")}
            />
          </div>
        </div>
      </section>
    </>
  );
};
