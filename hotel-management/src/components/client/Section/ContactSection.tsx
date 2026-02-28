"use client";
import { createMessage } from "@/src/services/api/client/message.api";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";


export const ContactSection = () => {
  const t = useTranslations("contact");

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
   
    accepted: false,
  });

  const [loading, setLoading] = useState(false);

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.accepted) {
     
      return;
    }

    const payload = {
      name: `${form.lastName} ${form.firstName}`.trim(),
      phone: form.phone,
      email: form.email,
     
    };

    try {
      setLoading(true);
      const data = await createMessage(payload);

      toast.success(data?.message || t("form.success"));

      setForm({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
      
        accepted: false,
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || t("form.failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ===== CONTACT FORM ===== */}
      <section className="bg-white py-[60px]">
        <div className="container mx-auto max-w-[1100px] px-[130px]">
          {/* TITLE */}
          <div className="text-center mb-16">
            <h2 className="text-[50px] font-serif-raleway">
              {t("formTitle")}
            </h2>
            <p className="text-[16px] text-[#54595f] py-2">{t("formDesc1")}</p>
            <p className="text-[16px] text-[#54595f] py-2">{t("formDesc2")}</p>
          </div>

          {/* FORM */}
          <form className="space-y-10" onSubmit={handleSubmit}>
            {/* ROW 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder={t("lastName")}
                className="border-b border-gray-400 outline-none py-2 focus:border-[#a18348]"
                required
              />

              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder={t("firstName")}
                className="border-b border-gray-400 outline-none py-2 focus:border-[#a18348]"
                required
              />
            </div>

            {/* ROW 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder={t("phone")}
                className="border-b border-gray-400 outline-none py-2 focus:border-[#a18348]"
                required
              />

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                className="border-b border-gray-400 outline-none py-2 focus:border-[#a18348]"
                required
              />
            </div>

          

            {/* CHECKBOX */}
            <div className="flex items-start gap-3 text-[14px]">
              <input
                type="checkbox"
                name="accepted"
                checked={form.accepted}
                onChange={handleChange}
                className="mt-1"
              />
              <p>{t("privacyText")}</p>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="
                border border-[#A18348]
                text-[#A18348]
                px-10 py-2
                hover:bg-[#A18348]
                hover:text-white
                transition-all
                disabled:opacity-50
              "
            >
              {loading ? t("sending") : t("submit")}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
