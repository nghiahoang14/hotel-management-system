"use client";
import Image from "next/image";
import { FollowSection } from "../Section/FollowSection";
import { useParams } from "next/navigation";
import { DiningViewMore } from "./DiningViewMore";
import { Dining } from "@/types/dining";
type Props = {
  id: string;
  dining: Dining;
  dinings:Dining[];
};
export const DiningDetail = ({ id ,dining,dinings}: Props) => {
     const { locale } = useParams<{ locale: string }>();
 
  const recentDining = dinings.filter((o) => o._id !== id);
  return (
    <>
      {/* content */}
      <div className="container mx-auto px-12 mt-[100px]">
        <div className="flex items-center gap-20">
          <Image
            src={dining?.image[0] ?? ""}
            width={450}
            height={600}
            alt="image"
            className="object-cover"
          />

          <div>
            <h3 className="text-[50px] font-serif-raleway mb-6">{dining?.title}</h3>
            <p className="text-[16px] leading-snug tracking-widest mb-6">
              {dining?.description}
            </p>
            <span className="uppercase font-bold block text-[16px] py-4">
              Giờ mở cửa:
            </span>
            <ul className="list-disc list-inside space-y-2 text-[16px] tracking-wide">
              {dining?.openHours.map((hour, index) => {
                const separatorIndex = hour.indexOf(":");
                const label = hour.slice(0, separatorIndex);
                const time = hour.slice(separatorIndex + 1).trim();

                return (
                  <li key={index}>
                    <span className="font-semibold">{label}:</span>
                    <span className="ml-1">{time}</span>
                  </li>
                );
              })}
            </ul>

            {dining?.menu && (
              <>
                <span className="uppercase font-bold block text-[16px] py-4">
                  Menu:
                </span>
                <ul className="list-disc list-inside space-y-2">
                  {dining?.menu.map((item, index) => (
                    <li key={index}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="
          text-blue-700
          hover:text-blue-900
         
          font-bold
          transition
        "
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {dining?.hotline && (
              <>
                {" "}
                <p className="text-[18px] tracking-wide font-semibold py-4">
                  <span className="uppercase font-bold  text-[16px] py-4">
                    Hotline:
                  </span>{" "}
                  {dining?.hotline}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
      {/* image */}
      <FollowSection isHome={false} isDiningPage />
      {/* view more */}
    <DiningViewMore data={recentDining}/>
    </>
  );
};
