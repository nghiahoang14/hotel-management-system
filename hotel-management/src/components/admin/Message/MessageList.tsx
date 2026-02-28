"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Search,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";


import {
  getMessages,
  updateMessage,
  deleteMessage,
} from "@/src/services/api/admin/message.api";
import { Message } from "@/types/message";

export const MessageList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 10;

  /* ================= FETCH ================= */
  const fetchMessages = async () => {
    try {
      
      const res = await getMessages({
        page,
        limit,
        status,
      });

      const filtered = searchTerm
        ? res.data.filter(
            (m: Message) =>
              m.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
              m.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : res.data;

      setMessages(filtered);
      setTotalPages(res.totalPages);
    } catch {
      toast.error("Failed to load messages");
    } finally {
    
    }
  };

  useEffect(() => {
    const t = setTimeout(fetchMessages, 500);
    return () => clearTimeout(t);
  }, [page, status, searchTerm]);

  /* ================= UPDATE STATUS ================= */
  const handleResolve = async (id: string) => {
    try {
      await updateMessage(id, { status: "resolved" });
      toast.success("Marked as resolved");
      fetchMessages();
    } catch {
      toast.error("Update failed");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    try {
      await deleteMessage(id);
      toast.success("Deleted successfully");
      fetchMessages();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <motion.div
      className="bg-[#1e1e1e] rounded-xl p-6 border border-[#1f1f1f]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">Message List</h2>

        <div className="flex gap-3 w-full md:w-auto">
          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              placeholder="Search phone / email..."
              className="bg-[#2f2f2f] text-white pl-10 pr-4 py-2 rounded-lg w-full"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>

          {/* STATUS FILTER */}
          <select
            value={status ?? ""}
            onChange={(e) => {
              setStatus(e.target.value || undefined);
              setPage(1);
            }}
            className="bg-[#2f2f2f] text-white px-3 py-2 rounded-lg"
          >
            <option value="">All</option>
            <option value="unresolved">Unresolved</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="relative overflow-x-auto">
       

        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              {["No","Name", "Email", "Phone", "Message", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-3 py-2 text-left text-xs text-gray-400 uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {messages.map((msg,index) => (
              <motion.tr key={msg._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                 <td className="px-3 py-2 text-gray-400">
        {(page - 1) * limit + index + 1}
      </td>
                <td className="px-3 py-2">{msg.name}</td>
                <td className="px-3 py-2">{msg.email}</td>
                <td className="px-3 py-2">{msg.phone}</td>
             
                <td className="px-3 py-2 max-w-xs">
                  <div className="max-h-20 overflow-y-auto">
                    {msg.message || "-"}
                  </div>
                </td>

                <td className="px-3 py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      msg.status === "resolved"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {msg.status}
                  </span>
                </td>

                <td className="px-3 py-2 ">
                  <div className="flex gap-3">
                    {msg.status === "unresolved" && (
                      <button
                       
                        onClick={() => handleResolve(msg._id)}
                        className="text-green-400"
                        title="Mark as resolved"
                      >
                        <CheckCircle size={18} />
                      </button>
                    )}

                    <button
                     title="Delete"
                      onClick={() => handleDelete(msg._id)}
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
            disabled={page === 1}
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
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-40"
          >
            <ArrowRight />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
