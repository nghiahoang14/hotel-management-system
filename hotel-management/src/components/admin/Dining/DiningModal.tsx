"use client";

import { Dining } from "@/types/dining";
import {
  createDining,
  updateDining,
} from "@/src/services/api/admin/dining.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Dining | null;
};

const emptyForm = {
  title: "",
  description: "",
  hotline: "",
};

type Errors = Partial<typeof emptyForm>;

export const DiningModal = ({
  open,
  onClose,
  onSuccess,
  initialData,
}: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [files, setFiles] = useState<File[]>([]);
  const [oldImages, setOldImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: keyof typeof form) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // ================= SYNC DATA =================
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        hotline: initialData.hotline || "",
      });
      setOldImages(initialData.image || []);
    } else {
      setForm(emptyForm);
      setOldImages([]);
    }

    setFiles([]);
    setErrors({});
  }, [open, initialData]);

  if (!open) return null;

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.hotline) formData.append("hotline", form.hotline);

      files.forEach((file) => formData.append("images", file));

      oldImages.forEach((img) => formData.append("oldImages[]", img));

      if (initialData) {
        await updateDining(initialData._id, formData);
        toast.success("Dining updated successfully");
      } else {
        await createDining(formData);
        toast.success("Dining created successfully");
      }

      onSuccess();
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors) {
        setErrors(apiErrors);
      } else {
        toast.error("Save dining failed");
      }
    } finally {
      setLoading(false);
    }
  };

  // Xoá ảnh mới đã chọn
  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Xoá ảnh cũ
  const removeOldImage = (index: number) => {
    setOldImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl p-6 w-full max-w-lg border border-gray-700 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h3 className="text-lg text-white font-semibold mb-4">
          {initialData ? "Update Dining" : "Create Dining"}
        </h3>

        <div className="space-y-3">
          {/* Title */}
          <input
            placeholder="Title"
            className={`w-full bg-[#2f2f2f] text-white px-3 py-2 rounded ${
              errors.title ? "border border-red-500" : ""
            }`}
            value={form.title}
            maxLength={100}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
              clearError("title");
            }}
          />
          <div className="flex justify-between">
            <p className="text-red-400 text-sm">{errors.title}</p>
            <span className="text-xs text-gray-400">
              {form.title.length}/100
            </span>
          </div>

          {/* Description */}
          <textarea
            placeholder="Description"
            className={`w-full bg-[#2f2f2f] text-white px-3 py-2 rounded ${
              errors.description ? "border border-red-500" : ""
            }`}
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
              clearError("description");
            }}
          />
          <p className="text-red-400 text-sm">{errors.description}</p>

          {/* Hotline */}
          <input
            placeholder="Hotline"
            className={`w-full bg-[#2f2f2f] text-white px-3 py-2 rounded ${
              errors.hotline ? "border border-red-500" : ""
            }`}
            value={form.hotline}
            onChange={(e) => {
              setForm({ ...form, hotline: e.target.value });
              clearError("hotline");
            }}
          />
          <p className="text-red-400 text-sm">{errors.hotline}</p>

          {/* Upload */}
          <input
            type="file"
            multiple
            accept="image/*"
            className="w-full bg-[#2f2f2f] text-gray-300 px-3 py-2 rounded"
            onChange={(e) =>
              setFiles((prev) => [...prev, ...Array.from(e.target.files || [])])
            }
          />

          {/* Ảnh cũ */}
          {oldImages.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {oldImages.map((img, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={img}
                    alt={`Current image ${idx}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeOldImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Ảnh mới */}
          {files.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
              {files.map((file, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New image ${idx}`}
                    className="h-20 w-20 rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    <X />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="text-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
