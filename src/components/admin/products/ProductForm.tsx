"use client";

import { useState, useEffect } from "react";
import { Product, ProductType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { createProduct, updateProduct } from "@/lib/actions/products";
import RichTextEditor from "@/components/editor/RichTextEditor";

// const editor
interface ProductWithRelations extends Product {
  gallery?: { id: string; url: string }[];
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
  });

  const [gallery, setGallery] = useState<string[]>(
    product?.gallery?.map((g) => g.url) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto slug generation
  useEffect(() => {
    if (!slugManuallyEdited) {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.name),
      }));
    }
  }, [form.name, slugManuallyEdited]);

<RichTextEditor
  value={form.longDescription}
  onChange={(val) =>
    setForm((prev) => ({ ...prev, longDescription: val }))
  }
/>
  

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

      {/* BASIC INFO */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <input
          required
          placeholder="Product Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => {
            setSlugManuallyEdited(true);
            setForm({ ...form, slug: e.target.value });
          }}
          className="w-full border p-3 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            required
            placeholder="Brand"
            value={form.brand}
            onChange={(e) => setForm({ ...form, brand: e.target.value })}
            className="border p-3 rounded"
          />

          <input
            placeholder="Model"
            value={form.model}
            onChange={(e) => setForm({ ...form, model: e.target.value })}
            className="border p-3 rounded"
          />
        </div>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value as ProductType })
          }
          className="border p-3 rounded"
        >
          {Object.values(ProductType).map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* IMAGES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Images</h2>

        {/* Main Image */}
        <CldUploadWidget
          uploadPreset="tosanxprofiles"
          onSuccess={(result: any) => {
            const url = result?.info?.secure_url;
            if (url) {
              setForm({ ...form, mainImageUrl: url });
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="border-dashed border-2 p-6 rounded w-full"
            >
              Upload Main Image
            </button>
          )}
        </CldUploadWidget>

        {form.mainImageUrl && (
          <img
            src={form.mainImageUrl}
            className="w-48 h-48 object-cover rounded"
          />
        )}

        {/* Gallery */}
        <CldUploadWidget
          uploadPreset="tosanxprofiles"
          options={{ multiple: true }}
          onSuccess={(result: any) => {
            const url = result?.info?.secure_url;
            if (url) {
              setGallery((prev) => [...prev, url]);
            }
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="border-dashed border-2 p-4 rounded"
            >
              Add Gallery Images
            </button>
          )}
        </CldUploadWidget>

        <div className="grid grid-cols-3 gap-3">
          {gallery.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} className="rounded h-28 w-full object-cover" />
              <button
                type="button"
                onClick={() =>
                  setGallery(gallery.filter((_, index) => index !== i))
                }
                className="absolute top-1 right-1 bg-red-500 text-white px-2 rounded text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Short Description</h2>

        <textarea
          placeholder="Short description"
          value={form.shortDescription}
          onChange={(e) =>
            setForm({ ...form, shortDescription: e.target.value })
          }
          className="w-full border p-3 rounded"
        />
        <h2 className="text-xl font-semibold">Long Description</h2>

        <RichTextEditor
          value={form.longDescription}
          onChange={(val) =>
            setForm((prev) => ({ ...prev, longDescription: val }))
          }
        />
      </div>

      {/* PRICING */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Pricing & Stock</h2>

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: Number(e.target.value) })
          }
          className="border p-3 rounded"
        />

        <p className="text-sm text-muted-foreground">
          {formatNaira(form.price)}
        </p>

        <input
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) =>
            setForm({ ...form, stock: Number(e.target.value) })
          }
          className="border p-3 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) =>
              setForm({ ...form, active: e.target.checked })
            }
          />
          Active (visible in store)
        </label>
      </div>

      <button
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded hover:cursor-pointer"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
          ? "Update Product"
          : "Create Product"}
      </button>
    </form>
  );
}