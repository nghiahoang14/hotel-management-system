


import { FacilitiesDetail } from "@/src/components/client/facilities/FacilitiesDetail";

import { Header } from "@/src/components/client/layouts/Header";
import { getFacilities, getFacilityById } from "@/src/services/api/client/facilities.api";


type Props = {
  params: { id: string; locale: string };
};
export default async function FacilitiesDetailPage({ params }: Props) {
  const resolvedParams = await params;

  const FacilityId = resolvedParams.id;
  const locale = resolvedParams.locale;
  const facility= await getFacilityById(FacilityId);
  const facilities= await getFacilities();
console.log(facilities);
  return (
    <>
      {/* Header */}
      <Header
        images={[facility?.image[1] ?? ""]}
        autoSlide={false}
        title="Trải nghiệm trọn vẹn hệ thống tiện nghi đa dạng và hiện đại."
      />
    <FacilitiesDetail facility={facility} id={FacilityId} facilities={facilities}/>
    </>
  );
}
