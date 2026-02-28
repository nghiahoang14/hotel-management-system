"use client";

import { Offer } from "@/types/offer";
import { createOffer, updateOffer } from "@/src/services/api/admin/offer.api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: Offer | null;
};

const emptyForm = {
  title: "",
  description: "",
  start_date: "",
  end_date: "",
};

type Errors = Partial<typeof emptyForm>;

export const OfferModal = ({
  open,
  onClose,
  onSuccess,
  initialData,
}: Props) => {
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const clearError = (field: keyof typeof form) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description,
        start_date: initialData.start_date?.slice(0, 10) || "",
        end_date: initialData.end_date?.slice(0, 10) || "",
      });
    } else {
      setForm(emptyForm);
    }

    setFile(null);
    setErrors({});
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      const formData = new FormData();
      formData.append("title", form.title.trim());
      formData.append("description", form.description.trim());
      formData.append("start_date", form.start_date);
      formData.append("end_date", form.end_date);

      if (file) {
        formData.append("image", file);
      }

      if (initialData) {
        await updateOffer(initialData._id, formData);
        toast.success("Offer updated successfully");
      } else {
        await createOffer(formData);
        toast.success("Offer created successfully");
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const apiErrors = err?.response?.data?.errors;
      if (apiErrors) setErrors(apiErrors);
      else toast.error("Save offer failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] rounded-xl w-full max-w-lg border border-gray-700 relative flex flex-col max-h-[90vh]">

        {/* HEADER */}
        <div className="p-6 border-b border-gray-700 relative">
          <h3 className="text-lg text-white font-semibold">
            {initialData ? "Update Offer" : "Create Offer"}
          </h3>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 space-y-2 overflow-y-auto">

          {/* TITLE */}
          <Field label="Title" error={errors.title}>
            <input
              className="input"
              maxLength={100}
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                clearError("title");
              }}
            />
            <div className="flex justify-end text-xs text-gray-400">
              {form.title.length}/100
            </div>
          </Field>

          {/* DESCRIPTION */}
          <Field label="Description" error={errors.description}>
            <textarea
              className="input min-h-[80px]"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value });
                clearError("description");
              }}
            />
          </Field>

          {/* IMAGE */}
          <Field label="Image">
            <input
              type="file"
              accept="image/*"
              className="input"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            {initialData?.image && !file && (
              <img
                src={initialData.image}
                className="h-24 mt-2 rounded object-cover border border-gray-600"
              />
            )}

            {file && (
              <img
                src={URL.createObjectURL(file)}
                className="h-24 mt-2 rounded object-cover border border-gray-600"
              />
            )}
          </Field>

          {/* DATES */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start date" error={errors.start_date}>
              <input
                type="date"
                className="input"
                value={form.start_date}
                onChange={(e) => {
                  setForm({ ...form, start_date: e.target.value });
                  clearError("start_date");
                }}
              />
            </Field>

            <Field label="End date" error={errors.end_date}>
              <input
                type="date"
                className="input"
                value={form.end_date}
                onChange={(e) =>
                  setForm({ ...form, end_date: e.target.value })
                }
              />
            </Field>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-gray-700 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          background: #2f2f2f;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
};

/* ===== REUSABLE FIELD ===== */
const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    {children}
    {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
  </div>
);
