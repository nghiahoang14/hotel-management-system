"use client"

import { useInView } from "@/src/hooks/useInView";
import { useTranslations } from "next-intl";

export const ConferenceSection = () => {
  const { ref, isVisible } = useInView(0.2);
const t=useTranslations("conference")
  return (
    <section ref={ref} className="mt-[100px]">
      
      {/* IMAGE */}
      <div
        className={`
          transition-all duration-1000 ease-out
          ${isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-20"}
        `}
      >
        <img
          src="/conference-img.jpg"
          alt=""
          className="w-full h-[520px] object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="text-center mt-[40px]">

        <h3
          className={`
            mb-8 text-[50px] font-serif-raleway leading-tight
            transition-all duration-1000 ease-out delay-300
            ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"}
          `}
        >
          {t("pageTitle")}
        </h3>

        <p
          className={`
            font-[400] leading-relaxed text-[16px] px-[190px]
            transition-all duration-1000 ease-out delay-300
            ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-16"}
          `}
        >
        {t("description")}
        </p>

      </div>
    </section>
  );
};
