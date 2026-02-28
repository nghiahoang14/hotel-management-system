"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Edit,
  Trash2,
  Search,
  Plus,
} from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/types/user"; // interface User tương ứng với schema của bạn

import { UserModal } from "./UserModal";
import { deleteUser, getAllUsers } from "@/src/services/api/admin/user.api";

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const limit = 5;

  const fetchUsers = async () => {
    try {
     
      const res = await getAllUsers({
        page,
        limit,
        search: searchTerm || undefined,
      });
      setUsers(res.data);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      toast.error("Failed to load users");
    } finally {
      
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => fetchUsers(), 500);
    return () => clearTimeout(timeout);
  }, [page, searchTerm]);

  const handleDelete = async (_id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(_id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Delete failed");
    }
  };

  return (
    <>
      <motion.div
        className="bg-[#1e1e1e] rounded-xl p-4 md:p-6 border border-[#1f1f1f] mb-8 overflow-x-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold text-white">User List</h2>

          {/* SEARCH */}
          <div className="relative w-full md:w-64">
            <input
              placeholder="Search by name or email..."
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
              setEditingUser(null);
              setIsOpen(true);
            }}
            className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Plus size={18} /> Add
          </button>
        </div>

        {/* TABLE */}
        <div className="relative">
        

          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                {["No", "Name", "Email", "Role", "Status", "Actions"].map(
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

            <tbody
              className={`divide-y divide-gray-700`}
            >
              {users.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="px-3 py-2 text-gray-400">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-3 py-2">{user.name}</td>
                  <td className="px-3 py-2">{user.email}</td>
                  <td className="px-3 py-2">{user.role}</td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-3 py-2 text-xs font-semibold rounded-full
      ${
        user.isActive
          ? "bg-green-600/20 text-green-400 border border-green-600/40"
          : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
      }
    `}
                    >
                      {user.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <button
                       title="Edit"
                        onClick={() => {
                          setEditingUser(user);
                          setIsOpen(true);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        <Edit size={18} />
                      </button>

                      <button
                       title="Delete"
                        onClick={() => handleDelete(user._id)}
                        className="text-red-500 hover:text-red-400"
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
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              <ArrowLeft />
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-40"
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      <UserModal
        open={isOpen}
        initialData={editingUser}
        onClose={() => setIsOpen(false)}
        onSuccess={() => {
          fetchUsers();
          setPage(1);
        }}
      />
    </>
  );
};
