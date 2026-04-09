/* eslint-disable @typescript-eslint/no-explicit-any */



import { FacilitiesDetail } from "@/src/components/client/facilities/FacilitiesDetail";

import { Header } from "@/src/components/client/layouts/Header";
import { getFacilities, getFacilityById } from "@/src/services/api/client/facilities.api";



export default async function FacilitiesDetailPage({ params }: any) {
 
const { id: FacilityId, locale } = params;
  const [facilities, facility] = await Promise.all([
      getFacilities(),
      getFacilityById(FacilityId),
    ]);
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
