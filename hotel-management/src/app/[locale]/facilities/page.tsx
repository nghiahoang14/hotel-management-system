


import { ViewMore } from "@/src/components/client/facilities/ViewMore";
import { Header } from "@/src/components/client/layouts/Header";
import { getFacilities } from "@/src/services/api/client/facilities.api";


export default async function FacilitiesPage() {
const facilities= await getFacilities();
console.log(facilities);
  return (
    <>
      {/* Header */}
      <Header
        images={[
          "https://hanoihotel.com.vn/wp-content/uploads/2025/02/1200-800.png",
        ]}
        autoSlide={false}
        title="Trải nghiệm hệ thống tiện ích cao cấp và hiện đại vượt ngoài sự mong đợi."
      />
     <ViewMore isPage={true} facilities={facilities}/>
    </>
  );
}
