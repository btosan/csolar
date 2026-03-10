"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/products";
import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteProductButton({ id }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);

    try {
      await deleteProduct(id);

      // redirect after deletion
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 rounded bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 flex items-center gap-1"
      title="Delete"
    >
      <Trash2 size={16} />
      {loading && <span>Deleting...</span>}
    </button>
  );
}