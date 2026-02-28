"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";

import { Room } from "@/types/room";
import { getRooms, deleteRoom } from "@/src/services/api/admin/room.api";
import { RoomModal } from "./RoomModal";


export const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  const limit = 10;

  /* ================= FETCH ================= */
  const fetchRooms = async () => {
    try {
      const res = await getRooms({
        page,
        limit,
        
        roomNumber: searchTerm || undefined,
      });

      setRooms(res.data as Room[]);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load rooms");
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchRooms, 400);
    return () => clearTimeout(t);
  }, [page, searchTerm]);

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this room?")) return;
    try {
      await deleteRoom(id);
      toast.success("Deleted successfully");
      fetchRooms();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <motion.div
        className="bg-[#1e1e1e] rounded-xl p-6 border border-[#1f1f1f]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">Room List</h2>

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              placeholder="Search by room number..."
              className="bg-[#2f2f2f] text-white pl-10 pr-4 py-2 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>

          {/* ADD */}
          <button
            onClick={() => {
              setEditingRoom(null);
              setIsOpen(true);
            }}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        {/* TABLE */}
        <div className="relative overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {[
                  "No",
                  "Room Number",
                  "Room Type",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-3 py-2 text-xs text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700 ">
              {rooms?.map((room, index) => (
                <tr key={room._id}>
                  <td className="px-3 py-2 text-gray-400 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-3 py-2 font-medium text-center">
                    {room.roomNumber}
                  </td>

                  <td className="px-3 py-2 text-gray-300 text-center">
                    {typeof room.roomType === "object" && room.roomType
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      ? (room.roomType as any).name
                      : "-"}
                  </td>

                  <td className="px-3 py-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        room.status === "available"
                          ? "bg-green-600/20 text-green-400"
                          : "bg-red-600/20 text-red-400"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>

                  <td className="px-3 py-2 text-center">
                    <div className="flex gap-2 justify-center">
                      <button
                        title="Edit"
                        onClick={() => {
                          setEditingRoom(room);
                          setIsOpen(true);
                        }}
                        className="text-indigo-400"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                        title="Delete"
                        onClick={() => handleDelete(room._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {rooms?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center text-gray-500 py-6"
                  >
                    No rooms found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-400 text-sm">
            Page {page} / {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1 ? "bg-indigo-600" : "bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <RoomModal
        open={isOpen}
        initialData={editingRoom}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          fetchRooms();
          setPage(1);
        }}
      />
    </>
  );
};
