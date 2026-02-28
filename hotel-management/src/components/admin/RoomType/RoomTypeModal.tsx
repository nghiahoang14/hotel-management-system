"use client";

import { RoomType } from "@/types/roomType";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { X } from "lucide-react";
import {
  createRoomType,
  updateRoomType,
} from "@/src/services/api/admin/roomType.api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: RoomType | null;
};

const emptyForm = {
  name: "",
  description: "",
  price: "",
  size: "",
  bed: "",
  view: "",
  people: "",
};

type Errors = Partial<typeof emptyForm>;

export const RoomTypeModal = ({
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
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenityInput, setAmenityInput] = useState("");

  const clearError = (field: keyof typeof form) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setForm({
        name: initialData.name,
        description: initialData.description,
        price: String(initialData.price),
        size: initialData.size,
        bed: initialData.bed,
        view: initialData.view,
        people: initialData.people,
      });
      setAmenities(initialData.amenities || []);
      setOldImages(initialData.images || []);
    } else {
      setForm(emptyForm);
      setAmenities([]);
      setOldImages([]);
    }

    setFiles([]);
    setErrors({});
  }, [open, initialData]);

  if (!open) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setErrors({});

      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) =>
        formData.append(k, v.trim())
      );

      amenities.forEach((a) => formData.append("amenities[]", a));
      files.forEach((f) => formData.append("images", f));
      oldImages.forEach((img) => formData.append("oldImages[]", img));

      if (initialData) {
        await updateRoomType(initialData._id, formData);
        toast.success("Room type updated successfully");
      } else {
        await createRoomType(formData);
        toast.success("Room type created successfully");
      }

      onSuccess();
      onClose();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error("Save room type failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-[#1e1e1e] w-full max-w-4xl max-h-[90vh] rounded-xl border border-gray-700 flex flex-col relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">
            {initialData ? "Update Room Type" : "Create Room Type"}
          </h3>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* LEFT */}
            <Field label="Name" error={errors.name}>
              <input
                className="input"
                value={form.name}
                onChange={(e) => {
                  setForm({ ...form, name: e.target.value });
                  clearError("name");
                }}
              />
            </Field>

            <Field label="Price" error={errors.price}>
              <input
                className="input"
                value={form.price}
                onChange={(e) => {setForm({ ...form, price: e.target.value }),clearError
                  ("price");}}
              />
            </Field>

            <Field label="Size">
              <input
                className="input"
                value={form.size}
                onChange={(e) => setForm({ ...form, size: e.target.value })}
              />
            </Field>

            <Field label="Bed">
              <input
                className="input"
                value={form.bed}
                onChange={(e) => setForm({ ...form, bed: e.target.value })}
              />
            </Field>

            <Field label="View">
              <input
                className="input"
                value={form.view}
                onChange={(e) => setForm({ ...form, view: e.target.value })}
              />
            </Field>

            <Field label="People">
              <input
                className="input"
                value={form.people}
                onChange={(e) => setForm({ ...form, people: e.target.value })}
              />
            </Field>
          </div>

          <Field label="Description">
            <textarea
              className="input"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </Field>

          {/* AMENITIES */}
          <Field label="Amenities" error="errors.amenities">
            <input
              className="input"
              placeholder="Type and press Enter"
              value={amenityInput}
              onChange={(e) => {setAmenityInput(e.target.value)}}
              onKeyDown={(e) => {
                if (e.key === "Enter" && amenityInput.trim()) {
                  e.preventDefault();
                  setAmenities((prev) => [...prev, amenityInput.trim()]);
                  setAmenityInput("");
                }
              }}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {amenities.map((a, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-gray-700 rounded text-xs flex items-center gap-1"
                >
                  {a}
                  <X
                    size={12}
                    className="cursor-pointer text-red-400"
                    onClick={() =>
                      setAmenities((prev) =>
                        prev.filter((_, idx) => idx !== i)
                      )
                    }
                  />
                </span>
              ))}
            </div>
          </Field>

        {/* IMAGES */}
<Field label="Images">
  <input
    type="file"
    multiple
    accept="image/*"
    className="input"
    onChange={(e) =>
      setFiles((prev) => [
        ...prev,
        ...Array.from(e.target.files || []),
      ])
    }
  />

  <div className="flex flex-wrap gap-2 mt-3">
    {/* OLD IMAGES */}
    {oldImages.map((img, i) => (
      <div key={`old-${i}`} className="relative">
        <img
          src={img}
          className="h-20 w-20 rounded object-cover border border-gray-600"
        />
        <button
          type="button"
          onClick={() =>
            setOldImages((prev) =>
              prev.filter((_, idx) => idx !== i)
            )
          }
          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
        >
          <X size={12} className="text-white" />
        </button>
      </div>
    ))}

    {/* NEW IMAGES */}
    {files.map((file, i) => (
      <div key={`new-${i}`} className="relative">
        <img
          src={URL.createObjectURL(file)}
          className="h-20 w-20 rounded object-cover border border-gray-600"
        />
        <button
          type="button"
          onClick={() =>
            setFiles((prev) =>
              prev.filter((_, idx) => idx !== i)
            )
          }
          className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 flex items-center justify-center"
        >
          <X size={12} className="text-white" />
        </button>
      </div>
    ))}
  </div>
</Field>

        </div>

        {/* FOOTER */}
        <div className="px-6 py-4 border-t border-gray-700 flex justify-end gap-2">
          <button onClick={onClose} className="text-gray-400">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 px-4 py-2 rounded text-white"
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
