

import { dinings } from "@/src/apis/dining.data";
import { DiningDetail } from "@/src/components/client/dining/DiningDetail";
import { Header } from "@/src/components/client/layouts/Header";
import { getDining, getDiningById } from "@/src/services/api/client/dining.api";


type Props = {
  params: { id: string; locale: string };
};
export default async function DiningDetailPage({ params }: Props) {
  const resolvedParams = await params;

  const DiningId =resolvedParams.id;
  const locale = resolvedParams.locale;
   const dinings= await getDining();
  const dining = await getDiningById(DiningId);
  return (
    <>
      {/* Header */}
      <Header
        images={[dining?.image[1] ?? ""]}
        autoSlide={false}
        title={dining?.title}
      />
       <DiningDetail id={DiningId} dining={dining} dinings={dinings}/>
    </>
  );
}
