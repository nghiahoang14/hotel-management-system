import { Star } from "lucide-react";
import { LinkToPage } from "../Link/LinkToPage";
import Link from "next/link";

interface CardItemProps {
  _id: string;
  image?: string;
  title?: string;
  people?:string;
  size?:string;
  description?: string;
  variant?: "default" | "flip" | "feedback";
  customer?: string;
  country?: string;
  rate?: number;
    href?: string;
}

export default function CardItem({
    _id,
  image,
  title,
  description,
  variant = "default",
  customer,
  country,
    href,
  rate,
  people,
  size,
}: CardItemProps) {
  /* ===== CARD THƯỜNG ===== */
  if (variant === "default") {
    return (
      <div className="min-h-[500px] bg-white shadow-xl text-center group">
        {!customer && image && (
          <div className="overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full cursor-pointer object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}
       
        <div className="px-6 py-8">
          <h4 className="text-[22px] font-serif-raleway mb-2 font-[700] hover:text-[#A18348] cursor-pointer line-clamp-2 max-h-[66px] "><Link href={href??"/"}>{title}</Link></h4>
          {people && size &&(
<p className="  text-[16px] mb-2 font-[350]">{people}/{size}</p>
          )}
          
          <p className="text-[16px] mb-6 line-clamp-2 leading-relaxed font-[400]">
            {description}
          </p>

          <LinkToPage
             href={href ?? "/"}
            className="inline-block text-[16px] uppercase tracking-wide
              text-[#A18348] border-y border-[#A18348]
              px-6 py-3 hover:bg-[#A18348] hover:text-white transition-colors"
            text="Xem thêm"
          />
        </div>
      </div>
    );
  }

  /* ===== CARD FEEDBACK ===== */
  if (variant === "feedback") {
    return (
      <div
        className="relative bg-transparent shadow-xl p-6  min-h-[380px] "
        style={{
          backgroundImage: "url('/logo-3.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      >
        <div className="absolute inset-0 bg-white/85" />
        <div className="absolute z-10">
          <h3 className="text-[16px] mb-2 text-left font-[600]">{title}</h3>
          <div className="flex items-center  mb-4 ">
            {Array.from({ length: rate ?? 0 }).map((_, i) => (
              <span key={i}>
                <Star size={16} fill="#FACC15" stroke="none" />
              </span>
            ))}
          </div>
          <p className="text-[16px] font-[500]  mb-5 text-left tracking-[1.1] leading-relaxed pr-6">
            “{description}”
          </p>

          
        </div>
        <div className="flex items-center gap-3 absolute bottom-8 ">
            {/* GOOGLE ICON */}
            <img
              src="/google-review.png"
              alt="Google Review"
              className="w-15 h-15 object-cover"
            />

            <div>
              <p className="font-medium text-[14px]">— {customer}</p>
              <p className="text-[14px] ">{country}</p>
            </div>
          </div>
      </div>
    );
  }

  /* ===== CARD LẬT 3D ===== */
  return (
    <div className="group perspective min-h-[480px]">
      <div className="flip-card shadow-xl">
        {/* FRONT */}
        <div className="flip-face">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          <div className="flip-overlay">
            <h4 className="text-white text-[26px] font-serif-raleway drop-shadow-lg">
              {title}
            </h4>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back">
          <img src={image} alt={title} className="w-full h-full object-cover" />

          <div className="flip-overlay">
            <div className="pointer-events-auto">
            <LinkToPage
              href={href ?? "/"}
              className="
                text-[#A18348] uppercase tracking-widest
                border border-[#A18348] px-4 py-2 bg-white
                hover:bg-[#A18348] hover:text-white transition-colors
              "
              text="Xem thêm"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
