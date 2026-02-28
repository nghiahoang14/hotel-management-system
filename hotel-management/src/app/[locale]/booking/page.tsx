import Booking from "@/src/components/client/Booking/Booking";
import { getRoomTypes } from "@/src/services/api/client/roomType.api";

export default async function BookingPage() {
      const roomTypes = await getRoomTypes(); 
    return(
        <>
      <div className="container mx-auto px-10 mt-12">
      <Booking roomTypes={roomTypes} />
    </div>

        </>
    )
}