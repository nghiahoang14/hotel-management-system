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
import Image from "next/image";
import toast from "react-hot-toast";

import { Dining } from "@/types/dining";
import { getDinings, deleteDining } from "@/src/services/api/admin/dining.api";
import { DiningModal } from "./DiningModal";

export const DiningList = () => {
  const [dinings, setDinings] = useState<Dining[]>([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editingDining, setEditingDining] = useState<Dining | null>(null);

  const limit = 10;

  // ================= FETCH =================
  const fetchDinings = async () => {
    try {

      const res = await getDinings({
        page,
        limit,
        title: searchTerm || undefined,
      });

      setDinings(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dining list");
    } finally {
    }
  };

  useEffect(() => {
    const timeout = setTimeout(fetchDinings, 800);
    return () => clearTimeout(timeout);
  }, [page, searchTerm]);

  // ================= DELETE =================
  const handleDelete = async (_id: string) => {
    if (!confirm("Delete this dining item?")) return;
    try {
      await deleteDining(_id);
      toast.success("Deleted successfully");
      fetchDinings();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <motion.div
        className="bg-[#1e1e1e] rounded-xl p-6 border border-[#1f1f1f] mb-8 overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">Dining List</h2>

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              placeholder="Search by title..."
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
              setEditingDining(null);
              setIsOpen(true);
            }}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        {/* TABLE */}
        <div className="relative">
        

          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {[
                  "No",
                  "Title",
                  "Description",
                  "Images",
                  "Hotline",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-xs text-gray-400 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {dinings.map((dining, index) => (
                <motion.tr
                  key={dining._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-3 py-2 text-gray-400">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-3 py-2">
                    <p className="font-medium">{dining.title}</p>
                  </td>

                  <td className="px-3 py-2 max-w-xs">
                    <div className="max-h-20 overflow-y-auto py-2">
                      {dining.description}
                    </div>
                  </td>

                  {/* IMAGES */}
                  <td className="px-3 py-2  ">
                    <div className="flex gap-2">
                      {dining.image.map((img, idx) => (
                        <div key={idx} className="relative w-12 h-12">
                          <Image
                            src={img}
                            alt=""
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* HOTLINE */}
                  <td className="px-3 py-2">{dining.hotline ?? "-"}</td>

                  {/* ACTIONS */}
                  <td className="px-3 py-2">
                    <div className="flex gap-2 justify-center">
                      <button
                       title="Edit"
                        onClick={() => {
                          setEditingDining(dining);
                          setIsOpen(true);
                        }}
                        className="text-indigo-400"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                       title="Delete"
                        onClick={() => handleDelete(dining._id)}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
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
              disabled={page === 1 }
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
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
              disabled={page === totalPages }
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <DiningModal
        open={isOpen}
        initialData={editingDining}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          fetchDinings();
          setPage(1);
        }}
      />
    </>
  );
};
