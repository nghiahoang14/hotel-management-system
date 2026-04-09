import { RoomType } from "@/types/roomType";
export const renderPeople = (room?: RoomType) => {
  if (!room) return "";

  if (room.maxPeople && room.maxPeople > 0) {
    return ` ${room.maxPeople} Người`;
  }

  const adults = room.maxAdults || 0;
  const children = room.maxChildren || 0;

  if (adults || children) {
    return `${adults} Người lớn${children ? `, ${children} Trẻ em` : ""}`;
  }

  return "";
};