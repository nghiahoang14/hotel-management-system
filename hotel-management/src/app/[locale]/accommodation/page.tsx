import { rooms } from "@/src/apis/room.data";
import { AccommodationItem } from "@/src/components/client/Accommodation/AccommodationItem";
import { Header } from "@/src/components/client/layouts/Header";
import { getRoomTypes } from "@/src/services/api/client/roomType.api";
import { RoomType } from "@/types/roomType";

export default async function AccommodationPage(){
  const roomType=await getRoomTypes();
    return(
        <>
         {/* HEADER */}
              <Header images={["https://hanoihotel.com.vn/wp-content/uploads/2024/12/room.jpg"]} autoSlide={false} title={"Đắm chìm trong không gian nghỉ dưỡng sang trọng."}/>
         <div className="container mx-auto px-10 mt-[60px]">
            <h3 className="text-[50px] font-serif-raleway mb-6 text-center ">Các hạng phòng của chúng tôi</h3>
            <p className="text-center text-[16px] tracking-wider">Phòng nghỉ rộng rãi và tinh tế của Khách sạn Hà Nội là sự lựa chọn hoàn hảo dành cho những kỳ nghỉ dưỡng hay chuyến công tác dài ngày tại thủ đô. Mỗi phòng đều được trang bị đầy đủ tiện nghi và nội thất, mang lại sự thoải mái và thư giãn tuyệt vời.</p>
         </div>
         <div className="mt-[50px]">
            {roomType.map((room:RoomType, index:number) => (
          <AccommodationItem
            key={room._id}
            room={room}
            reverse={index % 2 === 1}
          />
        ))}
         </div>
        </>
    )
}