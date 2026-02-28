

import { Header } from "@/src/components/client/layouts/Header";
import Image from "next/image";
import { LinkToPage } from "@/src/components/client/Link/LinkToPage";
import { DiningViewMore } from "@/src/components/client/dining/DiningViewMore";
import { getDining } from "@/src/services/api/client/dining.api";
import { Dining } from "@/types/dining";
import { getLocale } from "next-intl/server";

export default async function DiningPage() {
  // const  locale  = useLocale();
  const locale =await getLocale();
  const dinings=await getDining();
  return (
    <>
      {/* HEADER */}
      <Header
        images={[
          "https://hanoihotel.com.vn/wp-content/uploads/2024/11/M12-Cao-so-diep-nam-cuc-den.jpg",
          "https://hanoihotel.com.vn/wp-content/uploads/2024/11/M09-Banh-bao-luu-sa.jpg",
        ]}
        autoSlide
        title="Hòa mình vào chuyến hành trình ẩm thực tinh tế với những dấu ấn vị giác khó phai."
      />

      {/* CONTENT */}
      <div className="container mx-auto px-20 lg:px-16 py-20 space-y-24">
        {dinings.slice(0,3).map((item:Dining, index:number) => {
          const reverse = index % 2 !== 0;

          return (
            <div
              key={item._id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-25 items-start`}
            >
              {/* IMAGE */}
              <div className={reverse ? "lg:order-2" : ""}>
                <Image
                  src={item.image[0]}
                  alt={item.title}
                  width={450}
                  height={600}
                  className="w-full h-[600px] object-cover"
                />
              </div>

              {/* TEXT */}
              <div className="space-y-4">
                <h2 className="text-[50px] tracking-wide  font-serif-raleway">{item.title}</h2>

                {item.subtitle && (
                  <p className="text-[46px] font-[100]  font-gothic mb-4">{item.subtitle}</p>
                )}

                <p className="text-[16px] leading-relaxed font-[400] tracking-wider mb-10 ">
                  {item.description}
                </p>

                <LinkToPage
                  href={`/${locale}/dining/${item._id}`}
                  className="inline-block text-[16px] uppercase tracking-wide
                                       text-[#A18348] border-y border-[#A18348]
                                       px-6 py-3 hover:bg-[#A18348] hover:text-white transition-colors"
                  text="Xem thêm"
                />
              </div>
            </div>
          );
        })}
      </div>
       <DiningViewMore
  data={dinings}

/>
    </>
  );
}
