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

import { Offer } from "@/types/offer";
import { getOffers, deleteOffer } from "@/src/services/api/admin/offer.api";
import { formatDate } from "@/src/helper/formatDate";
import { OfferModal } from "./OfferModal";

export const OfferList = () => {
  const [offers, setOffers] = useState<Offer[]>([]);


  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);

  const limit = 10;

  // ✅ fetch offers
  const fetchOffers = async () => {
    try {
      const res = await getOffers({
        page,
        limit,
        title: searchTerm || undefined,
      });

      setOffers(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load offers");
    } finally {
    }
  };

  // debounce search + pagination
  useEffect(() => {
    const t = setTimeout(fetchOffers, 400);
    return () => clearTimeout(t);
  }, [page, searchTerm]);

  // delete
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this offer?")) return;
    try {
      await deleteOffer(id);
      toast.success("Offer deleted");
      fetchOffers();
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
          <h2 className="text-xl font-semibold text-white">Offers List</h2>

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
              setEditingOffer(null);
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
                  "Image",
                  "Start",
                  "End",
                  "Actions",
                ].map((h) => (
                  <th key={h} className="px-3 py-2 text-xs text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td className="px-3 py-2 text-gray-400">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-3 py-2">{offer.title}</td>

                  <td className="px-3 py-2 max-w-xs">
                    <div className="max-h-20 overflow-y-auto py-2">
                      {offer.description}
                    </div>
                  </td>

                  <td className="px-3 py-2">
                    <div className="relative w-12 h-12">
                      <Image
                        src={offer.image}
                        alt={offer.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  </td>

                  <td className="px-3 py-2">
                    {formatDate(offer.start_date ?? "")}
                  </td>

                  <td className="px-3 py-2">
                    {offer.end_date ? formatDate(offer.end_date) : "-"}
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex gap-2 justify-center">
                      <button
                       title="Edit"
                        onClick={() => {
                          setEditingOffer(offer);
                          setIsOpen(true);
                        }}
                        className="text-indigo-400"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                       title="Delete"
                        onClick={() => handleDelete(offer._id)}
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
              disabled={page === 1 }
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
              disabled={page === totalPages }
              onClick={() => setPage(page + 1)}
              className="bg-gray-700 px-3 py-1 rounded"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <OfferModal
        open={isOpen}
        initialData={editingOffer}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          fetchOffers();
          setPage(1);
        }}
      />
    </>
  );
};
