/* eslint-disable @typescript-eslint/no-explicit-any */

import { dinings } from "@/src/apis/dining.data";
import { DiningDetail } from "@/src/components/client/dining/DiningDetail";
import { Header } from "@/src/components/client/layouts/Header";
import { getDining, getDiningById } from "@/src/services/api/client/dining.api";

export default async function DiningDetailPage({ params }: any) {
  const { id: DiningId, locale } = params;
  const [dinings, dining] = await Promise.all([
    getDining(),
    getDiningById(DiningId),
  ]);
  return (
    <>
      {/* Header */}
      <Header
        images={[dining?.image[1] ?? ""]}
        autoSlide={false}
        title={dining?.title}
      />
      <DiningDetail id={DiningId} dining={dining} dinings={dinings} />
    </>
  );
}
