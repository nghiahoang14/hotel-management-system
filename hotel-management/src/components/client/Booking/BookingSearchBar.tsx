"use client";

import { useState } from "react";
import { CalendarDays, Users } from "lucide-react";

interface PeopleRoom {
  adults: number;
  children: number;
  childrenAges: number[];
}

interface People {
  rooms: PeopleRoom[];
}

interface Props {
  arrival: string;
  departure: string;
  people: People;
  onApply: (data: {
    arrival: string;
    departure: string;
    people: People;
  }) => void;
}

export const BookingSearchBar = ({
  arrival,
  departure,
  people,
  onApply,
}: Props) => {
  const [arrivalDate, setArrivalDate] = useState(arrival);
  const [departureDate, setDepartureDate] = useState(departure);
  const [peopleState, setPeopleState] = useState<People>(people);

  const [openPeople, setOpenPeople] = useState(false);

  /* ================= PEOPLE HANDLERS ================= */

  const updateRoom = (
    index: number,
    field: "adults" | "children",
    value: number
  ) => {
    const rooms = [...peopleState.rooms];
    rooms[index][field] = value;

    if (field === "children") {
      rooms[index].childrenAges = Array(value).fill(6);
    }

    setPeopleState({ rooms });
  };

  const updateChildAge = (
    roomIndex: number,
    childIndex: number,
    age: number
  ) => {
    const rooms = [...peopleState.rooms];
    rooms[roomIndex].childrenAges[childIndex] = age;
    setPeopleState({ rooms });
  };

  const addRoom = () => {
    setPeopleState({
      rooms: [
        ...peopleState.rooms,
        { adults: 1, children: 0, childrenAges: [] },
      ],
    });
  };

  const removeRoom = (index: number) => {
    if (peopleState.rooms.length === 1) return;
    setPeopleState({
      rooms: peopleState.rooms.filter((_, i) => i !== index),
    });
  };

  const summaryText = () => {
    const totalAdults = peopleState.rooms.reduce(
      (s, r) => s + r.adults,
      0
    );
    const totalChildren = peopleState.rooms.reduce(
      (s, r) => s + r.children,
      0
    );

    return `${peopleState.rooms.length} phòng, ${totalAdults} người lớn${
      totalChildren > 0 ? `, ${totalChildren} trẻ em` : ""
    }`;
  };

  /* ================= RENDER ================= */

  return (
    <div className="bg-white shadow-md border flex items-center px-6 py-4 gap-6 relative">
      {/* DATE */}
      <div className="flex items-center gap-2">
        <CalendarDays size={18} />
        <input
          type="date"
          value={arrivalDate}
          onChange={(e) => setArrivalDate(e.target.value)}
          className="outline-none border px-3 py-2"
        />
        <span>-</span>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="outline-none border px-3 py-2"
        />
      </div>

      {/* PEOPLE */}
      <div className="relative">
        <button
          onClick={() => setOpenPeople(!openPeople)}
          className="flex items-center gap-2 border px-4 py-2"
        >
          <Users size={18} />
          {summaryText()}
        </button>

        {openPeople && (
          <div className="absolute top-full mt-2 left-0 w-[420px] bg-white border shadow-lg p-5 z-50">
            {peopleState.rooms.map((room, i) => (
              <div key={i} className="border-b pb-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-medium">Phòng {i + 1}</p>
                  {peopleState.rooms.length > 1 && (
                    <button
                      onClick={() => removeRoom(i)}
                      className="text-sm text-red-500"
                    >
                      Xóa
                    </button>
                  )}
                </div>

                {/* ADULT */}
                <div className="flex justify-between items-center mb-2">
                  <span>Người lớn</span>
                  <select
                    value={room.adults}
                    onChange={(e) =>
                      updateRoom(i, "adults", +e.target.value)
                    }
                    className="border px-2 py-1"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CHILDREN */}
                <div className="flex justify-between items-center mb-2">
                  <span>Trẻ em (≤ 6 tuổi)</span>
                  <select
                    value={room.children}
                    onChange={(e) =>
                      updateRoom(i, "children", +e.target.value)
                    }
                    className="border px-2 py-1"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CHILD AGES */}
                {room.childrenAges.map((age, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center text-sm mt-1"
                  >
                    <span>Tuổi của trẻ {idx + 1}</span>
                    <select
                      value={age}
                      onChange={(e) =>
                        updateChildAge(i, idx, +e.target.value)
                      }
                      className="border px-2 py-1"
                    >
                      {[1, 2, 3, 4, 5, 6].map((a) => (
                        <option key={a} value={a}>
                          {a}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            ))}

            <button
              onClick={addRoom}
              className="text-sm text-[#A18348] mb-4"
            >
              + Thêm phòng
            </button>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenPeople(false)}
                className="text-sm"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setOpenPeople(false);
                }}
                className="bg-[#A18348] text-white px-4 py-2 text-sm"
              >
                ÁP DỤNG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* APPLY SEARCH */}
      <button
        onClick={() =>
          onApply({
            arrival: arrivalDate,
            departure: departureDate,
            people: peopleState,
          })
        }
        className="ml-auto bg-[#A18348] text-white px-6 py-3 uppercase"
      >
        Tìm phòng
      </button>
    </div>
  );
};
