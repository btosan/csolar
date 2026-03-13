"use client";

import { useState, useEffect } from "react";
import { Product, ProductType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/lib/actions/products";
import RichTextEditor from "@/components/editor/RichTextEditor";

interface ProductWithRelations extends Product {
  gallery?: { id: string; url: string }[];
  specifications?: { id: string; key: string; value: string }[];
}

interface Props {
  mode: "create" | "edit";
  product?: ProductWithRelations;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(value || 0);
}

export default function ProductForm({ mode, product }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [form, setForm] = useState({
    name: product?.name || "",
    slug: product?.slug || "",
    type: product?.type || ProductType.PANEL,
    brand: product?.brand || "",
    model: product?.model || "",
    shortDescription: product?.shortDescription || "",
    longDescription: product?.longDescription || "",
    mainImageUrl: product?.mainImageUrl || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    active: product?.active ?? true,
    featured: product?.featured ?? false,
    wattage: product?.wattage ?? undefined,
    kva: product?.kva ?? undefined,
    ah: product?.ah ?? undefined,
    voltage: product?.voltage || "",
    specifications: product?.specifications ?? [],
  });

  const [gallery, setGallery] = useState<string[]>(
    product?.gallery?.map((g) => g.url) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugManuallyEdited) {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.name),
      }));
    }
  }, [form.name, slugManuallyEdited]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (form.stock < 0) {
      setError("Stock cannot be negative.");
      return;
    }

    setLoading(true);

    try {
      if (isEdit && product) {
        await updateProduct(product.id, {
          ...form,
          specifications: form.specifications || null,
          gallery,
        });
      } else {
        await createProduct({
          ...form,
          gallery,
        });
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && <p className="text-red-500">{error}</p>}

      {/* MAIN IMAGE */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Product Image</h2>

        {form.mainImageUrl && (
          <img
            src={form.mainImageUrl}
            alt="Main"
            className="w-40 h-40 object-cover rounded"
          />
        )}

        <CldUploadWidget
          uploadPreset="your_upload_preset"
          onSuccess={(result: any) => {
            const url = result.info.secure_url;
            setForm({ ...form, mainImageUrl: url });
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Upload Main Image
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* GALLERY */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Gallery Images</h2>

        <div className="flex gap-4 flex-wrap">
          {gallery.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt="Gallery"
                className="w-32 h-32 object-cover rounded"
              />
              <button
                type="button"
                onClick={() =>
                  setGallery(gallery.filter((_, i) => i !== index))
                }
                className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <CldUploadWidget
          uploadPreset="your_upload_preset"
          onSuccess={(result: any) => {
            const url = result.info.secure_url;
            setGallery((prev) => [...prev, url]);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-gray-200 px-4 py-2 rounded"
            >
              Upload Gallery Images
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* Rest of form continues exactly as previously provided... */}
    </form>
  );
}