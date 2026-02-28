"use client";

import { User } from "@/types/user"; // kiểu giống schema backend
import { createUser, updateUser } from "@/src/services/api/admin/user.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: User | null;
};

const emptyForm = {
  name: "",
  email: "",
  password: "",
  role: "staff" as "admin" | "staff",
  isActive: true,
};

export const UserModal = ({ open, onClose, onSuccess, initialData }: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);

  // Sync form khi mở modal
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        name: initialData.name,
        email: initialData.email,
        password: "", // Không fill password khi edit
        role: initialData.role as "admin" | "staff",
        isActive: initialData.isActive,
      });
    } else {
      setForm(emptyForm);
    }
    setLoading(false);
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      if (initialData) {
        // Update
        await updateUser(initialData._id, form);
        toast.success("User updated successfully");
      } else {
        // Create
        await createUser(form);
        toast.success("User created successfully");
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Save user failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl p-6 w-full max-w-md border border-gray-700">
        <h3 className="text-lg text-white font-semibold mb-4">
          {initialData ? "Update User" : "Create User"}
        </h3>

        <div className="space-y-3">
          {/* Name */}
          <input
            placeholder="Name"
            className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          {/* Email */}
          <input
            placeholder="Email"
            type="email"
            className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            disabled={!!initialData} // Email không sửa khi edit
          />

          {/* Password */}
          {!initialData && (
            <input
              placeholder="Password"
              type="password"
              className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          )}

          {/* Role */}
          <select
            className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value as "admin" | "staff" })
            }
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>

          {/* Active */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) =>
                setForm({ ...form, isActive: e.target.checked })
              }
            />
            <span className="text-white">Active</span>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
