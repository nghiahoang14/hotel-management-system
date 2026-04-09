"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Users } from "lucide-react";
import { useLocale } from "next-intl";

export interface PeopleRoom {
  adults: number;
  children: number;
  childrenAges: number[];
}

export interface People {
  rooms: PeopleRoom[];
}

interface Props {
  variant?: "hero" | "page";
  isRoomDetail?: boolean;

  arrival?: string;
  departure?: string;
  people?: People;

  onApply?: (data: {
    arrival: string;
    departure: string;
    people: People;
  }) => void;
}

export default function BookingSearch({
  variant = "hero",
  isRoomDetail = false,
  arrival: initialArrival = "",
  departure: initialDeparture = "",
  people: initialPeople = {
    rooms: [{ adults: 2, children: 0, childrenAges: [] }],
  },
  onApply,
}: Props) {
  const router = useRouter();
  const locale = useLocale();

  /* ================= STATE ================= */

  const [arrival, setArrival] = useState(initialArrival);
  const [departure, setDeparture] = useState(initialDeparture);
  const [people, setPeople] = useState<People>(initialPeople);
  const [openPeople, setOpenPeople] = useState(false);

  const today = useMemo(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }, []);

  /* ================= DERIVED ================= */

  const totalAdults = useMemo(
    () => people.rooms.reduce((s, r) => s + r.adults, 0),
    [people]
  );

  const totalChildren = useMemo(
    () => people.rooms.reduce((s, r) => s + r.children, 0),
    [people]
  );

  const isValid =
    arrival &&
    departure &&
    new Date(arrival) < new Date(departure);

  /* ================= PEOPLE HANDLERS ================= */

  const updateRoom = (
    index: number,
    field: "adults" | "children",
    value: number
  ) => {
    setPeople((prev) => {
      const rooms = [...prev.rooms];
      const room = { ...rooms[index] };

      if (field === "children") {
        const diff = value - room.children;

        if (diff > 0) {
          room.childrenAges = [
            ...room.childrenAges,
            ...Array(diff).fill(1),
          ];
        } else if (diff < 0) {
          room.childrenAges = room.childrenAges.slice(0, value);
        }

        room.children = value;
      }

      if (field === "adults") {
        room.adults = value;
      }

      rooms[index] = room;
      return { rooms };
    });
  };

  const updateChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number
  ) => {
    setPeople((prev) => {
      const rooms = [...prev.rooms];
      const room = { ...rooms[roomIndex] };
      const newAges = [...room.childrenAges];

      newAges[childIndex] = age;
      room.childrenAges = newAges;
      rooms[roomIndex] = room;

      return { rooms };
    });
  };

  const addRoom = () => {
    setPeople((prev) => ({
      rooms: [
        ...prev.rooms,
        { adults: 2, children: 0, childrenAges: [] },
      ],
    }));
  };

  const removeRoom = (index: number) => {
    setPeople((prev) => ({
      rooms:
        prev.rooms.length === 1
          ? prev.rooms
          : prev.rooms.filter((_, i) => i !== index),
    }));
  };

  const summaryText = useMemo(() => {
    return `${people.rooms.length} phòng, ${totalAdults} người lớn${
      totalChildren ? `, ${totalChildren} trẻ em` : ""
    }`;
  }, [people, totalAdults, totalChildren]);

  /* ================= SEARCH ================= */

  const handleSearch = () => {
    if (!isValid) return;

    const params = new URLSearchParams({
      checkIn: arrival,
      checkOut: departure,
      adults: String(totalAdults),
      children: String(totalChildren),
    });

    router.push(`/${locale}/booking?${params.toString()}`);
  };

  /* ================= STYLE ================= */

  const wrapperClass =
    variant === "hero" && !isRoomDetail
      ? "absolute bottom-6 left-1/2 -translate-x-1/2 container mx-auto px-10 w-full"
      : "w-full";

  const containerClass =
    variant === "hero" && !isRoomDetail
      ? "backdrop-blur-md bg-white/20 border border-white/30 px-7 py-7 shadow-lg"
      : isRoomDetail
      ? "backdrop-blur-md bg-[#a18348] border border-white/30 px-7 py-7 shadow-lg"
      : "bg-white shadow-md border px-6 py-4";

  const labelClass =
    variant === "hero" || isRoomDetail
      ? "text-white text-[14px] block mb-5"
      : "text-black text-[14px] block mb-2";

  const inputClass =
    variant === "hero" || isRoomDetail
      ? "w-full bg-transparent border-b border-white text-white focus:outline-none py-3 px-2"
      : "w-full border px-3 py-2";

  const selectClass =
    "w-full border border-white text-black px-3 py-2 focus:outline-none";

  /* ================= UI ================= */

  return (
    <div className={wrapperClass}>
      <div className={containerClass}>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          {/* CHECK IN */}
          <div>
            <label className={labelClass}>Check in</label>
            <input
              type="date"
              min={today}
              value={arrival}
              onChange={(e) => setArrival(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* CHECK OUT */}
          <div>
            <label className={labelClass}>Check out</label>
            <input
              type="date"
              min={arrival || today}
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              className={inputClass}
            />
          </div>

          {/* HERO SIMPLE MODE */}
          {variant === "hero" ? (
            <>
              <div>
                <label className={labelClass}>Người lớn</label>
                <select
                  value={people.rooms[0].adults}
                  onChange={(e) =>
                    updateRoom(0, "adults", +e.target.value)
                  }
                  className={selectClass}
                >
                  {[1, 2, 3, 4].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Trẻ em</label>
                <select
                  value={people.rooms[0].children}
                  onChange={(e) =>
                    updateRoom(0, "children", +e.target.value)
                  }
                  className={selectClass}
                >
                  {[0, 1, 2, 3].map((n) => (
                    <option key={n}>{n}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            /* PAGE MULTI ROOM MODE */
            <div className="relative">
              <button
                onClick={() => setOpenPeople(!openPeople)}
                className="flex items-center gap-2 border px-4 py-2"
              >
                <Users size={18} />
                {summaryText}
              </button>

              {openPeople && (
                <div className="absolute top-full mt-2 left-0 w-[420px] bg-white border shadow-lg p-5 z-50">
                  {people.rooms.map((room, i) => (
                    <div key={i} className="border-b pb-4 mb-4">
                      <div className="flex justify-between mb-3">
                        <p>Phòng {i + 1}</p>
                        {people.rooms.length > 1 && (
                          <button
                            onClick={() => removeRoom(i)}
                            className="text-red-500 text-sm"
                          >
                            Xóa
                          </button>
                        )}
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Người lớn</span>
                        <select
                          value={room.adults}
                          onChange={(e) =>
                            updateRoom(i, "adults", +e.target.value)
                          }
                          className="border px-2 py-1"
                        >
                          {[1, 2, 3, 4].map((n) => (
                            <option key={n}>{n}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Trẻ em</span>
                        <select
                          value={room.children}
                          onChange={(e) =>
                            updateRoom(i, "children", +e.target.value)
                          }
                          className="border px-2 py-1"
                        >
                          {[0, 1, 2, 3].map((n) => (
                            <option key={n}>{n}</option>
                          ))}
                        </select>
                      </div>

                      {room.childrenAges.map((age, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between text-sm mt-1"
                        >
                          <span>Tuổi trẻ {idx + 1}</span>
                          <select
                            value={age}
                            onChange={(e) =>
                              updateChildAge(i, idx, +e.target.value)
                            }
                            className="border px-2 py-1"
                          >
                            {[1, 2, 3, 4, 5, 6].map((a) => (
                              <option key={a}>{a}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  ))}

                  <button
                    onClick={addRoom}
                    className="text-[#A18348] text-sm mb-4"
                  >
                    + Thêm phòng
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            disabled={!isValid}
            onClick={handleSearch}
            className={`uppercase px-6 py-4 ${
              isValid
                ? isRoomDetail
                  ? "bg-white text-[#a18348]"
                  : "bg-[#A18348] text-white"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Tìm phòng
          </button>
        </div>
      </div>
    </div>
  );
}