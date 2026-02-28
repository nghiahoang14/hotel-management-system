"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Edit,
  Plus,
  Trash2,
  Search,
  ArrowLeft,
  ArrowRight,
  Eye,
} from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

import { RoomType } from "@/types/roomType";
import {
  getRoomTypes,
  deleteRoomType,
} from "@/src/services/api/admin/roomType.api";
import { RoomTypeViewModal } from "./RoomTypeViewModal";
import { RoomTypeModal } from "./RoomTypeModal";

export const RoomTypeList = () => {
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [viewing, setViewing] = useState<RoomType | null>(null);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<RoomType | null>(null);

  const limit = 10;

  const fetchRoomTypes = async () => {
    try {
      const res = await getRoomTypes({
        page,
        limit,
        title: searchTerm || undefined,
      });

      setRoomTypes(res.data);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Failed to load room types");
    } finally {
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchRoomTypes, 600);
    return () => clearTimeout(t);
  }, [page, searchTerm]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this room type?")) return;
    try {
      await deleteRoomType(id);
      toast.success("Deleted successfully");
      fetchRoomTypes();
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
          <h2 className="text-xl font-semibold text-white">Room Type List</h2>

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              placeholder="Search by name..."
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
              setEditing(null);
              setOpen(true);
            }}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        <div className="relative">
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {[
                  "No",
                  "Name",
                  "Image",
                  "Price",
                  "People",
                  "Bed",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-xs text-gray-400 text-center"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {roomTypes.map((rt, index) => (
                <tr key={rt._id}>
                  <td className="px-3 py-2 text-gray-400 text-center">
                    {(page - 1) * limit + index + 1}
                  </td>

                  <td className="px-3 py-2 text-center font-medium">
                    {rt.name}
                  </td>

                  <td className="px-3 py-2">
                    <div className="relative w-12 h-12 mx-auto">
                      <Image
                        src={rt.images?.[0] || "/placeholder.jpg"}
                        alt={rt.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>

                  <td className="px-3 py-2 text-center">{rt.price}đ</td>

                  <td className="px-3 py-2 text-center">{rt.people}</td>

                  <td className="px-3 py-2 text-center">{rt.bed}</td>

                  <td className="px-3 py-2">
                    <div className="flex gap-3 justify-center">
                      {/* VIEW */}
                      <button
                        onClick={() => setViewing(rt)}
                        className="text-emerald-400"
                        title="View detail"
                      >
                        <Eye size={18} />
                      </button>

                      {/* EDIT */}
                      <button
                      title="Edit"
                        onClick={() => {
                          setEditing(rt);
                          setOpen(true);
                        }}
                        className="text-indigo-400"
                      >
                        <Edit size={18} />
                      </button>

                      {/* DELETE */}
                      <button
                      title="Delete"
                        onClick={() => handleDelete(rt._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
              className="bg-gray-700 px-3 py-1 rounded"
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
              className="bg-gray-700 px-3 py-1 rounded"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>

      <RoomTypeModal
        open={open}
        initialData={editing}
        onClose={() => setOpen(false)}
        onSuccess={fetchRoomTypes}
      />
      <RoomTypeViewModal
      key={viewing?._id}
  open={!!viewing}
  data={viewing}
  onClose={() => setViewing(null)}
/>

    </>
  );
};
