

import { rooms } from "@/src/apis/room.data";
import { AccommodationDetail } from "@/src/components/client/Accommodation/AccommodationDetail";


import { Header } from "@/src/components/client/layouts/Header";
import { getRoomTypeBySlug, getRoomTypes } from "@/src/services/api/client/roomType.api";
import { RoomType } from "@/types/roomType";



type Props = {
  params: { slug:string; locale: string };
};
export default async function Page({ params }: Props) {
  
  const resolvedParams = await params;

 
  const AccommodationSlug = resolvedParams.slug;

  const locale = resolvedParams.locale;
  const roomTypes = await getRoomTypes();
  const accommodation = await getRoomTypeBySlug(AccommodationSlug);
  const recentAccommodations=roomTypes.filter((o:RoomType) => o._id !== accommodation?._id);
  return (
    <>
      {/* Header */}
      <Header
        images={[accommodation?.images[0] ?? ""]}
        autoSlide={false}
        title={accommodation?.name}
      />
    <AccommodationDetail  accommodation={accommodation} recentAccommodations={recentAccommodations}/>
    </>
  );
}
