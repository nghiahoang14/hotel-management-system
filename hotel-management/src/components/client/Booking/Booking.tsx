"use client";

import { useEffect, useState } from "react";
import { RoomTypeCard } from "@/src/components/client/Booking/RoomTypeCard";
import { BookingSummary } from "@/src/components/client/Booking/BookingSummary";
import { searchAvailableRooms } from "@/src/services/api/client/booking.api";
import BookingSearch, { People } from "./BookingSearch";
import { useSearchParams } from "next/dist/client/components/navigation";
import { RoomType } from "@/types/roomType";

export default function Booking() {
  /* ===== STATE ===== */
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const [people, setPeople] = useState<People>({
    rooms: [{ adults: 1, children: 0, childrenAges: [] }],
  });
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableRoomTypes, setAvailableRoomTypes] = useState<RoomType[]>([]);
  const searchParams = useSearchParams();

  /* ===== HANDLERS ===== */
  async function handleSearch({
    arrival,
    departure,
    people,
    roomTypeId,
  }: {
    arrival: string;
    departure: string;
    people: People;
    roomTypeId?: string;
  }) {
    setArrival(arrival);
    setDeparture(departure);
    setPeople(people);
    setSearched(true);
    setSelected({});
    setLoading(true);

    const totalAdults = people.rooms.reduce((s, r) => s + r.adults, 0);
    const totalChildren = people.rooms.reduce((s, r) => s + r.children, 0);

    try {
      const data = await searchAvailableRooms({
        checkIn: arrival,
        checkOut: departure,
        adults: totalAdults,
        children: totalChildren,
        roomTypeId,
      });
      setAvailableRoomTypes(data);
    } catch (error) {
      console.error(error);
      setAvailableRoomTypes([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const adults = Number(searchParams.get("adults") || 1);
    const children = Number(searchParams.get("children") || 0);
    const roomTypeId = searchParams.get("roomTypeId") || undefined;

    if (!checkIn || !checkOut) return;

    handleSearch({
      arrival: checkIn,
      departure: checkOut,
      people: {
        rooms: [{ adults, children, childrenAges: Array(children).fill(1) }],
      },
      roomTypeId,
    });
  
  }, []);

  /* ===== HELPERS ===== */
  const nights =
    arrival && departure
      ? Math.max(
          1,
          (new Date(departure).getTime() - new Date(arrival).getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 1;

  const selectedRoomTypes = availableRoomTypes
    .filter((r) => selected[r._id] > 0)
    .map((r) => ({ ...r, qty: selected[r._id] }));

  const updateQty = (roomType: RoomType, qty: number) => {
    setSelected((prev) => ({ ...prev, [roomType._id]: qty }));
  };

  /* ===== RENDER ===== */
  return (
    <>
      <BookingSearch
        variant="page"
        arrival={arrival}
        departure={departure}
        people={people}
        onApply={handleSearch}
      />

      <div className="grid grid-cols-12 gap-10 mt-12">
        <div className="col-span-8">
          {!searched && (
            <p className="text-gray-500">
              Vui lòng chọn ngày và số người để xem phòng trống
            </p>
          )}
          {searched && loading && (
            <p className="text-gray-500">Đang tìm phòng...</p>
          )}
          {searched && !loading && availableRoomTypes.length === 0 && (
            <p className="text-red-500">Không còn phòng trong thời gian này</p>
          )}
          {searched &&
            !loading &&
            availableRoomTypes.map((rt) => (
              <RoomTypeCard
                key={rt._id}
                roomType={rt}
                available={rt.available}
                selectedQty={selected[rt._id] || 0}
                onChangeQty={(qty: number) => updateQty(rt, qty)}
              />
            ))}
        </div>

        <div className="col-span-4">
          <BookingSummary selections={selectedRoomTypes} nights={nights} />
        </div>
      </div>
    </>
  );
}