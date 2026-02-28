"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Room} from "@/types/room";
import {
  createRoom,
  updateRoom,
} from "@/src/services/api/admin/room.api";
import { getRoomTypes } from "@/src/services/api/admin/roomType.api";
import { RoomType } from "@/types/roomType";

type Props = {
  open: boolean;
  initialData?: Room | null;
  onClose: () => void;
  onSuccess: () => void;
};

export const RoomModal = ({
  open,
  initialData,
  onClose,
  onSuccess,
}: Props) => {
  const [roomNumber, setRoomNumber] = useState("");
  const [roomType, setRoomType] = useState("");
  const [status, setStatus] = useState<"available" | "unavailable">(
    "available"
  );
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(false);

  /* ================= INIT ================= */
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setRoomNumber(initialData.roomNumber);
      setStatus(initialData.status);
      setRoomType(
        typeof initialData.roomType === "object"
          ? (initialData.roomType as RoomType)._id
          : initialData.roomType
      );
    } else {
      setRoomNumber("");
      setRoomType("");
      setStatus("available");
    }
  }, [open, initialData]);

  /* ================= LOAD ROOM TYPES ================= */
  useEffect(() => {
    if (!open) return;

    getRoomTypes({ page: 1, limit: 100 })
      .then((res) => setRoomTypes(res.data))
      .catch(() => toast.error("Failed to load room types"));
  }, [open]);

  if (!open) return null;

  /* ================= SUBMIT ================= */
  const handleSubmit = async () => {
    if (!roomNumber || !roomType) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        roomNumber,
        roomType,
        status,
      };

      if (initialData) {
        await updateRoom(initialData._id, payload);
        toast.success("Updated successfully");
      } else {
        await createRoom(payload);
        toast.success("Created successfully");
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Action failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] w-full max-w-md rounded-xl p-6 relative text-white">
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Update Room" : "Create Room"}
        </h2>

        {/* ROOM NUMBER */}
        <div className="mb-3">
          <label className="text-sm text-gray-400">Room Number</label>
          <input
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full mt-1 bg-[#2f2f2f] px-3 py-2 rounded"
            placeholder="Ex: 101"
          />
        </div>

        {/* ROOM TYPE */}
        <div className="mb-3">
          <label className="text-sm text-gray-400">Room Type</label>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="w-full mt-1 bg-[#2f2f2f] px-3 py-2 rounded"
          >
            <option value="">Select room type</option>
            {roomTypes.map((rt) => (
              <option key={rt._id} value={rt._id}>
                {rt.name}
              </option>
            ))}
          </select>
        </div>

        {/* STATUS */}
        <div className="mb-4">
          <label className="text-sm text-gray-400">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value as "available" | "unavailable")
            }
            className="w-full mt-1 bg-[#2f2f2f] px-3 py-2 rounded"
          >
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700"
          >
            Cancel
          </button>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
