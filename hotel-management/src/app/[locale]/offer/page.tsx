import { Header } from "@/src/components/client/layouts/Header";
import OfferSection from "@/src/components/client/Section/OfferSection";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Ưu đãi - Hanoi Hotel",
};

export default async function OfferPage({
  params,
}: {
   params: Promise<{ locale: string }>;
}){
   const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "offer",
  });
    return(
        <>
        <Header images={["/offer-img-6.jpeg"]} autoSlide={false} title={t("title")} />
        <OfferSection/>
        <h1>demo 15/6/2026hhhh</h1>
        {/* test case 1 : ci/cd success 
        <p>This is a simple test case for CI/CD pipeline.</p>
        */}
        </>
    )
}