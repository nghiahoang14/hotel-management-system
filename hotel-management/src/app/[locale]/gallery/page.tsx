import { gallery } from "@/src/apis/gallery.data";
import { Header } from "@/src/components/client/layouts/Header";
import { GallerySection } from "@/src/components/client/Section/GallerySection";
import { getTranslations } from "next-intl/server";

const allImages = gallery.flatMap(g => g.images);

export default async function GalleryPage({
  params,
}: {
   params: Promise<{ locale: string }>;
}) {
   const { locale } = await params;
  const t = await getTranslations({
    locale: locale,
    namespace: "gallery",
  });

  return (
    <>
      <Header
        images={[
          "https://hanoihotel.com.vn/wp-content/uploads/2025/02/1920-1280-1.png",
        ]}
        autoSlide={false}
        title={t("title")}
      />
      <GallerySection Images={allImages} />
    </>
  );
}
