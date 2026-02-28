"use client";

import { useState } from "react";
import { BookingSearchBar } from "@/src/components/client/Booking/BookingSearchBar";
import { RoomTypeCard } from "@/src/components/client/Booking/RoomTypeCard";
import { BookingSummary } from "@/src/components/client/Booking/BookingSummary";

interface RoomType {
  _id: string;
  name: string;
  price: number;
  images: string[];
  people: number;
}

interface PeopleRoom {
  adults: number;
  children: number;
  childrenAges: number[];
}

interface People {
  rooms: PeopleRoom[];
}

export default function Booking({
  roomTypes,
}: {
  roomTypes: RoomType[];
}) {
  /* ===== STATE ===== */

  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");

  const [people, setPeople] = useState<People>({
    rooms: [{ adults: 1, children: 0, childrenAges: [] }],
  });

  const [selected, setSelected] = useState<Record<string, number>>({});
  const [searched, setSearched] = useState(false);

  /* ===== HELPERS ===== */

  const nights =
    arrival && departure
      ? Math.max(
          1,
          (new Date(departure).getTime() -
            new Date(arrival).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 1;

  const selectedRoomTypes = roomTypes
    .filter((r) => selected[r._id] > 0)
    .map((r) => ({
      ...r,
      qty: selected[r._id],
    }));

  /* ===== HANDLERS ===== */

  const handleSearch = ({
    arrival,
    departure,
    people,
  }: {
    arrival: string;
    departure: string;
    people: People;
  }) => {
    setArrival(arrival);
    setDeparture(departure);
    setPeople(people);
    setSearched(true);

    // reset selection mỗi lần search
    setSelected({});
  };

  const updateQty = (roomType: RoomType, qty: number) => {
    setSelected((prev) => ({
      ...prev,
      [roomType._id]: qty,
    }));
  };

  /* ===== RENDER ===== */

  return (
    <>
      {/* SEARCH BAR */}
      <BookingSearchBar
        arrival={arrival}
        departure={departure}
        people={people}
        onApply={handleSearch}
      />

      <div className="grid grid-cols-12 gap-10 mt-12">
        {/* LEFT */}
        <div className="col-span-8">
          {!searched && (
            <p className="text-gray-500">
              Vui lòng chọn ngày và số người để xem phòng trống
            </p>
          )}

          {searched &&
            roomTypes.map((rt) => (
              <RoomTypeCard
                key={rt._id}
                roomType={rt}
                available={rt.people} 
                // 👆 tạm dùng people làm mock availability
                selectedQty={selected[rt._id] || 0}
                onChangeQty={(qty: number) =>
                  updateQty(rt, qty)
                }
              />
            ))}
        </div>

        {/* RIGHT */}
        <div className="col-span-4">
          <BookingSummary
            selections={selectedRoomTypes}
            nights={nights}
          />
        </div>
      </div>
    </>
  );
}
