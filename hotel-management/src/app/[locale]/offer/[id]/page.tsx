/* eslint-disable @typescript-eslint/no-explicit-any */

import { Header } from "@/src/components/client/layouts/Header";
import { formatDate } from "@/src/helper/formatDate";
import { getActiveOffers, getOfferById,  } from "@/src/services/api/client/offer.api";
import { Offer } from "@/types/offer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function OfferDetailPage({ params }: any) {
  
    const { id: offerId, locale } = params;

  const offer = await getOfferById(offerId);

  if (!offer) {
    notFound();
  }
const offersActive = await getActiveOffers();
  const recentOffers:Offer[] = offersActive.filter((o:Offer) => o._id !== offer._id);
  const lines = offer.description.split("\n").filter(Boolean);
  const renderLine = (line: string, index: number) => {
    // RESTAURANT
    line = line.replace(/(Golden Dragon Restaurant)/g, `<strong>$1</strong>`);

    // PHONE
    line = line.replace(/(\d{3,4}\s?\d{3}\s?\d{3})/g, `<strong>$1</strong>`);

    // LINK
    line = line.replace(
      /(https?:\/\/[^\s]+)/g,
      `<strong><a href="$1" target="_blank" class="underline text-[#101bb4]">$1</a></strong>`
    );

    // DATE (chỉ ngày)
    line = line.replace(/(\d{2}\/\d{2}\/\d{4})/g, `<strong>$1</strong>`);

    // TIME (chỉ giờ)
    line = line.replace(
      /(\d{1,2}:\d{2}\s?[–-]\s?\d{1,2}:\d{2})/g,
      `<strong>$1</strong>`
    );

    // PRICE
    line = line.replace(/(VND\s?[\d.,]+(\+\+)?)/g, `<strong>$1</strong>`);

    return (
      <p
        key={index}
        className="text-[16px] leading-7"
        dangerouslySetInnerHTML={{ __html: line }}
      />
    );
  };

  return (
    <>
      <Header
        images={[offer.image]}
        autoSlide={false}
        title="Ưu đãi đặc biệt"
        isDetail
      />

      {/* CONTENT OVER HEADER */}
      <div className="relative z-1 -mt-[140px]">
        <div className="bg-white mx-[100px] shadow-2xl p-12">
          <div className="grid grid-cols-12 gap-12">
            {/* LEFT */}
            <div className="col-span-8">
              <h3 className="text-[40px] font-serif-raleway mb-6 leading-1.1">
                {offer.title}
              </h3>
              <span className="w-[150px] border-t border-[#A18348] block mb-8"></span>
              <div className="space-y-4">{lines.map(renderLine)}</div>
            </div>

            {/* RIGHT */}
            <aside className="col-span-4">
              <h3 className="text-[26px] font-[100] text-[#8d6c4a] mb-6">
                Bài viết mới nhất
              </h3>

              <div className="space-y-6">
                {recentOffers.map((item) => (
                  <div key={item._id} className="flex gap-4 items-start">
                    <div className="w-20 h-20 relative shrink-0">
                      <Link href={`/${locale}/offer/${item._id}`}>
                      <Image
                        src={item.image}
                        alt="bài viết mới nhất"
                        fill
                        className="object-cover "
                      />
                   </Link>
                    </div>
                    <div>
                    <h4 className="text-sm  leading-snug mb-3"><Link href={`/${locale}/offer/${item._id}`}>{item.title}</Link></h4>
                    <p className="text-[12px] text-gray-400">{formatDate(item.start_date ?? "")}</p>
                  </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
