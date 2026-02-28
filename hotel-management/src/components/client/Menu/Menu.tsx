"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import DropdownMenu from "../DropdownMenu/DropdownMenu";
import { useEffect, useState } from "react";
import { getFacilities } from "@/src/services/api/client/facilities.api";
import { Facilities } from "@/types/facilities";
import { Dining } from "@/types/dining";
import { getDining } from "@/src/services/api/client/dining.api";
import { RoomType } from "@/types/roomType";
import { getRoomTypes } from "@/src/services/api/client/roomType.api";
interface NavbarLinkProps {
  href: string;
  isScrolled?: boolean;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}
const NavbarLink = ({
  href,
  label,
  hasDropdown,
  dropdownItems,
  isScrolled,
}: NavbarLinkProps) => {
  const pathname = usePathname();
const isHome = href === `/${pathname.split("/")[1]}`;


const isActive = isHome
  ? pathname === href
  : pathname === href || pathname.startsWith(`${href}/`);

  const textColor = isActive
    ? "text-[#FFD074]"
    : isScrolled
    ? "text-gray-900"
    : "text-white";
  return (
    <div className="relative group">
      <Link href={href} className="w-full">
        <div
          className={`relative flex cursor-pointer  items-center gap-3 transition-colors hover:text-[#FFD074] 
          
         justify-center py-3 ml-3  `}
        >
          <div className="flex items-center gap-1">
            <span
              className={`text-[16px] font-[500] hover:text-[#FFD074]   whitespace-nowrap tracking-[0.5px] uppercase 
      ${textColor}`}
            >
              {label}
            </span>
            {hasDropdown && (
              <ChevronDown
                size={18}
                className={` transition-transform group-hover:rotate-180 ${textColor}`}
              />
            )}
          </div>
        </div>
      </Link>
      {hasDropdown && dropdownItems && <DropdownMenu items={dropdownItems} />}
    </div>
  );
};
export default function Menu({ isScrolled }: { isScrolled?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("menu");
const [facilities, setFacilities] = useState<Facilities[]>([]);
const [dinings, setDinings] = useState<Dining[]>([]);
const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);


  // ✅ Fetch facilities from API
  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        const data = await getFacilities();
        setFacilities(data);
      } catch (err) {
        console.error("Failed to fetch facilities:", err);
      }
    };
const fetchDining = async () => {
    try {
      const diningData = await getDining();
      setDinings(diningData);
    } catch (err) {
      console.error("Failed to fetch dining:", err);
    }
  };
  const fetchRoomType = async () => {
    try {
      const roomTypesData = await getRoomTypes();
      setRoomTypes(roomTypesData);
    } catch (err) {
      console.error("Failed to fetch room types:", err);
    }
  };

  fetchDining();
    fetchFacilities();
    fetchRoomType()
  }, []);
  return (
    <>
      <nav className="flex items-center justify-center gap-1">
        <NavbarLink
          href={`/${locale}`}
          label={t("home")}
          isScrolled={isScrolled}
        />
        <NavbarLink
          href={`/${locale}/accommodation`}
          label={t("accommodations")}
          hasDropdown
          isScrolled={isScrolled}
          dropdownItems={roomTypes.map((room) => ({
            label: `${room.name} `,
            href: `/${locale}/accommodation/${room.slug}`,
          }))}
        />
        <NavbarLink
          href={`/${locale}/dining`}
          label={t("dining")}
          hasDropdown
          isScrolled={isScrolled}
          dropdownItems={dinings.map((dining) => ({
            label: `${dining.title} `,
            href: `/${locale}/dining/${dining._id}`,
          }))}
        />
        <NavbarLink
          href={`/${locale}/offer`}
          label={t("offer")}
          isScrolled={isScrolled}
        />
        <NavbarLink
          href="#"
          label={t("facilities")}
          hasDropdown
          isScrolled={isScrolled}
          dropdownItems={facilities.map((facility) => ({
            label: `${facility.title} `,
            href: `/${locale}/facilities/${facility._id}`,
          }))}
        />
        <NavbarLink
          href={`/${locale}/meetings-events`}
          label={t("meetings")}
          isScrolled={isScrolled}
        />
        <NavbarLink
          href={`/${locale}/gallery`}
          label={t("gallery")}
          isScrolled={isScrolled}
        />
        <NavbarLink
          href={`/${locale}/contact`}
          label={t("contact")}
          isScrolled={isScrolled}
        />
      </nav>
    </>
  );
}
