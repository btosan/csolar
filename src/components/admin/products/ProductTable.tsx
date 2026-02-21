"use client";

import { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/actions/products";
import DeleteProductButton from "./DeleteProductButton";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  brand: string;
  type: string;
  price: number;
  stock: number;
  active: boolean;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const visibleProducts = products.filter((p) => p.active);

  if (loading) {
    return (
      <div className="bg-white shadow rounded-2xl p-8 text-center text-gray-500">
        Loading products...
      </div>
    );
  }

  if (visibleProducts.length === 0) {
    return (
      <div className="bg-white shadow rounded-2xl p-8 text-center text-gray-500">
        No products found.
      </div>
    );
  }

  return (
    <div className="space-y-6 container">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-600">
            <tr>
              <th className="px-6 py-4 text-left">Product</th>
              <th className="px-6 py-4 text-left">Price</th>
              <th className="px-6 py-4 text-left">Stock</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleProducts.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">
                  <div className="font-semibold text-primary">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {product.brand} • {product.type}
                  </div>
                </td>

                <td className="px-6 py-4 font-medium">
                  ₦{(product.price / 100).toLocaleString()}
                </td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.active
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.active ? "Active" : "Hidden"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-2">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="px-4 py-2 text-sm rounded-lg bg-primary text-white hover:opacity-90 transition"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="lg:hidden space-y-4">
        {visibleProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow rounded-2xl p-5 space-y-3"
          >
            <div>
              <h3 className="font-semibold text-primary">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">
                {product.brand} • {product.type}
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Price</span>
              <span className="font-medium">
                ₦{(product.price / 100).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Stock</span>
              <span>{product.stock}</span>
            </div>

            <div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  product.active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {product.active ? "Active" : "Hidden"}
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <Link
                href={`/admin/products/${product.id}`}
                className="flex-1 text-center px-4 py-2 text-sm rounded-lg bg-primary text-white"
              >
                Edit
              </Link>
              <DeleteProductButton id={product.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}