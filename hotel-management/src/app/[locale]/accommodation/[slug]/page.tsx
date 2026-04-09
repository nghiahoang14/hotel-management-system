/* eslint-disable @typescript-eslint/no-explicit-any */


import { rooms } from "@/src/apis/room.data";
import { AccommodationDetail } from "@/src/components/client/Accommodation/AccommodationDetail";


import { Header } from "@/src/components/client/layouts/Header";
import { getRoomTypeBySlug, getRoomTypes } from "@/src/services/api/client/roomType.api";
import { RoomType } from "@/types/roomType";




export default async function Page({ params }: any) {
  
  
const { slug: AccommodationSlug, locale } = params;
 
  
const [roomTypes, accommodation] = await Promise.all([
    getRoomTypes(),
    getRoomTypeBySlug(AccommodationSlug),
  ]);
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
