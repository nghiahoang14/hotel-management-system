"use client";

import { Facilities } from "@/types/facilities";
import {
  createFacility,
  updateFacility,
} from "@/src/services/api/admin/facilities.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Facilities | null;
};

const emptyForm = {
  title: "",
  description: "",
  openHours: "",
};

type Errors = Partial<typeof emptyForm>;

export const FacilityModal = ({
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
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  // Sync form khi mở modal
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        openHours: initialData.openHours || "",
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

  const handleSubmit = async () => {
    try {
      setErrors({});
      setLoading(true);
      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("openHours", form.openHours.trim());

      // append tất cả ảnh mới
      files.forEach((file) => formData.append("images", file));

      // append các ảnh cũ còn giữ lại
      oldImages.forEach((img) => formData.append("oldImages[]", img));

      if (initialData) {
        await updateFacility(initialData._id, formData);
        toast.success("Facility updated successfully");
      } else {
        await createFacility(formData);
        toast.success("Facility created successfully");
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiErrors = err?.response?.data?.errors;

      if (apiErrors) {
        setErrors(apiErrors); // 👈 map thẳng
      } else {
        toast.error("Save facility failed");
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
          {initialData ? "Update Facility" : "Create Facility"}
        </h3>

        <div className="space-y-3">
          {/* Title */}
          <div>
            <input
              placeholder="Title"
              maxLength={100}
              className={`w-full bg-[#2f2f2f] text-white px-3 py-2 rounded ${
                errors.title ? "border border-red-500" : ""
              }`}
              value={form.title}
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
          </div>

          {/* Description */}
          <div>
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
          </div>

          {/* Open Hours */}
          <div>
            <input
              placeholder="Open Hours (e.g., 09:00 – 22:00)"
              className="w-full bg-[#2f2f2f] text-white px-3 py-2 rounded"
              value={form.openHours}
              onChange={(e) => setForm({ ...form, openHours: e.target.value })}
            />
          </div>

          {/* Images */}
          <div className="space-y-1">
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full text-gray-300 bg-[#2f2f2f] px-3 py-2 rounded"
              onChange={(e) =>
                setFiles((prev) => [
                  ...prev,
                  ...Array.from(e.target.files || []),
                ])
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
