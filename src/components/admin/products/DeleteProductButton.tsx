"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { deleteProduct } from "@/lib/actions/products";

type Props = {
  id: string;
  onDeleted?: () => void; // optional callback after deletion
};

export default function DeleteProductButton({ id, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setLoading(true);
    setError(null);

    try {
      await deleteProduct(id); // calls server action
      onDeleted?.(); // optional callback to refresh parent table
    } catch (err) {
      console.error("Failed to delete product:", err);
      setError("Failed to delete product. Try again.");
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
