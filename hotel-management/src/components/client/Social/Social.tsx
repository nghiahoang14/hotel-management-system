"use client";

import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function FloatingSocial() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const changeLocale = (nextLocale: "vi" | "en") => {
    if (nextLocale === locale) return;

    const segments = pathname.split("/").filter(Boolean);

    // Thay locale đầu tiên nếu đã có, hoặc thêm mới
    if (segments[0] === "vi" || segments[0] === "en") {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const newPath = "/" + segments.join("/");
    router.replace(newPath);
  };

  const socials = [
    {
      name: "Facebook",
      icon: <FaFacebookF size={20} />,
      bg: "bg-[#1877F2]",
      href: "https://facebook.com",
    },
    {
      name: "Instagram",
      icon: <FaInstagram size={20} />,
      bg: "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600",
      href: "https://instagram.com",
    },
    {
      name: "TikTok",
      icon: <FaTiktok size={20} />,
      bg: "bg-black",
      href: "https://tiktok.com",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={20} />,
      bg: "bg-[#25D366]",
      href: "https://wa.me/84901234567",
    },
  ];

  return (
    <div className="fixed right-4 top-2/3 -translate-y-1/2 z-50">
      <div className="flex flex-col items-center gap-3">
        {/* SOCIAL ICONS */}
        {socials.map((social, idx) => (
          <a
            key={idx}
            href={social.href}
            target="_blank"
            className={`w-9 h-9 rounded-full flex items-center justify-center text-white shadow-lg ${social.bg}`}
          >
            {social.icon}
          </a>
        ))}

        {/* LOCALE SWITCH */}
        <div className="relative group">
          {/* CURRENT LOCALE */}
          <div
            className="w-9 h-9 rounded-full shadow-lg flex items-center justify-center border border-transparent hover:border-white transition cursor-pointer"
          >
            <img
              src={locale === "vi" ? "/vi.svg" : "/en.svg"}
              alt={locale === "vi" ? "Vietnam" : "English"}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* OTHER LOCALE */}
          <button
            onClick={() => changeLocale("vi")}
            className={`
              absolute right-full top-1/2 -translate-y-1/2 mr-2
              w-9 h-9 rounded-full shadow-lg transition
              ${locale === "vi" ? "hidden" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}
            `}
          >
            <img src="/vi.svg" alt="Vietnam" className="w-full h-full rounded-full object-cover" />
          </button>

          <button
            onClick={() => changeLocale("en")}
            className={`
              absolute right-full top-1/2 -translate-y-1/2 mr-2
              w-9 h-9 rounded-full shadow-lg transition
              ${locale === "en" ? "hidden" : "opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100"}
            `}
          >
            <img src="/en.svg" alt="English" className="w-full h-full rounded-full object-cover" />
          </button>
        </div>
      </div>
    </div>
  );
}
