"use client";

import { createMessage } from "@/src/services/api/client/message.api";
import { Mail, MapPin, Phone, Smartphone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";

export const Footer = () => {
  const t = useTranslations("footer");
  const locale=useLocale();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

    const data=  await createMessage(form);
 console.log(data)
      toast.success( data.message || t("form.success")); 
      setForm({ name: "", phone: "", email: "", message: "" });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiMessage = err?.response?.data?.message;
      console.log(err)
      toast.error( apiMessage||t("form.failed"));
    } finally {
      setLoading(false);
    }
  };

  /* ================= RENDER ================= */
  return (
    <section>
      {/* ================= CONSULT ================= */}
      <div className="relative bg-[url('/background.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative container mx-auto px-10 py-[100px] text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[140px] items-center">
            <div>
              <h3 className="text-[44px] font-serif-raleway mb-6">
                {t("consultTitle")}
              </h3>
              <p className="text-[20px] leading-[30px] tracking-[1.1]">
                {t("consultDescription")}
              </p>
            </div>

            <form className="space-y-10" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t("form.name")}
                  className="w-full  border-b border-white/60
                             focus:border-[#A18348] outline-none py-2
                             placeholder:text-white/90"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t("form.phone")}
                  className="w-full  border-b border-white/60
                             focus:border-[#A18348] outline-none py-2
                             placeholder:text-white/90"
                />
              </div>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder={t("form.email")}
                className="w-full  border-b border-white/60
                           focus:border-[#A18348] outline-none py-2
                           placeholder:text-white/90"
              />

              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={2}
                placeholder={t("form.message")}
                className="w-full border-b border-white/60
                           focus:border-[#A18348] outline-none py-2
                           placeholder:text-white/90"
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-4 px-9 py-2 border border-white uppercase
                           tracking-widest hover:bg-[#A18348]
                           hover:border-[#A18348] transition-all
                           disabled:opacity-50"
              >
                {loading ? t("form.sending") : t("form.submit")}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-[#0e2646] pt-[50px] text-white">
        <div className="container mx-auto px-10 grid grid-cols-1 lg:grid-cols-3 gap-14">
          <div className="text-center flex flex-col items-center">
            <img src="/logo.png" alt="Hanoi Hotel" className="w-[180px] mb-4" />
            <p className="text-[16px] py-4 opacity-80">
              Live Oriental Heritage
            </p>
          </div>

          <div>
            <h4 className="text-[22px] font-serif-raleway mb-5">
              {t("explore.title")}
            </h4>
            <div className="flex gap-[100px] text-[#ffffffad]">
              <ul className="space-y-3">
                <li><Link href={`/${locale}/`}>{t("explore.home")}</Link></li>
                <li><Link href={`/${locale}/rooms`}>{t("explore.rooms")}</Link></li>
                <li><Link href={`/${locale}/dining`}>{t("explore.dining")}</Link></li>
                <li><Link href={`/${locale}/meetings-events`}>{t("explore.meetings")}</Link></li>
              </ul>
              <ul className="space-y-3">
                <li><Link href={`/${locale}/contact`}>{t("explore.contact")}</Link></li>
                <li><Link href={`/${locale}/gallery`}>{t("explore.gallery")}</Link></li>
                <li><Link href={`/${locale}/news`}>{t("explore.news")}</Link></li>
                <li><Link href={`/${locale}/offers`}>{t("explore.offers")}</Link></li>
              </ul>
            </div>
          </div>

          <div>
            <h4 className="text-[22px] font-serif-raleway mb-5">
              {t("address.title")}
            </h4>
            <ul className="space-y-3 text-[#ffffffad]">
              <li className="flex gap-3"><MapPin size={16} />{t("address.location")}</li>
              <li className="flex gap-3"><Phone size={16} />{t("address.phone")}</li>
              <li className="flex gap-3"><Smartphone size={16} />{t("address.mobile")}</li>
              <li className="flex gap-3"><Mail size={16} />{t("address.email")}</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 mt-4" />

        <div className="container mx-auto px-10 flex flex-col lg:flex-row
                        justify-between text-[14px] opacity-80 py-4 gap-4">
          <p>{t("copyright")}</p>
          <div className="flex gap-6">
            <span>{t("terms")}</span>
            <span>{t("privacy")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
