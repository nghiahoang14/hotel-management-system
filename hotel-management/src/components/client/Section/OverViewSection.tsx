"use client";

import { useInView } from "@/src/hooks/useInView";
import { useTranslations } from "next-intl";

export default function OverViewSection() {
  const { ref, isVisible } = useInView(0.2);
const t=useTranslations("overview");
  return (
    <section
      ref={ref}
      className={`container mx-auto px-6 lg:px-10 py-20
        transition-all duration-1000 ease-out
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"}
      `}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* TEXT */}
        <div className="transition-all duration-1000 delay-200">
          <h3 className="mb-8 text-[50px] font-serif-raleway leading-tight">
         {t("title")}
          </h3>

          <p className="font-[400] leading-relaxed text-[16px] ">
            {t("description")}
          </p>
        </div>

        {/* IMAGE */}
        <div
          className={`w-full transition-all duration-1000 delay-300
            ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
          `}
        >
          <img
            src="/Hanoi_Hotel-img.jpg"
            alt="Hanoi Hotel"
            className="w-full h-[640px] object-cover shadow-md"
          />
        </div>

      </div>
    </section>
  );
}
