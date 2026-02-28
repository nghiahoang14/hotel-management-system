"use client"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"

export const BookingRoom = () => {
    const t=useTranslations("booking");
    const locale=useLocale();
    return(
        <>
        <Link href={`/${locale}/booking`} className=" uppercase bg-[#A18348] text-white px-3 py-2 text-[14px] hover:bg-[#1D2A61] font-[500] transition-colors border border-white ">
            {t("submit")}
        </Link>
        </>
    )
}