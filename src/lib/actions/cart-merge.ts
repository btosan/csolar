// mergeGuestCart.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireUser } from "./auth-server";

interface GuestCartItem {
  productId: string;
  quantity: number;
}

export async function mergeGuestCart(items: GuestCartItem[]) {
  const user = await requireUser();
  let cart = await db.cart.findFirst({ where: { userId: user.id } });
  if (!cart) cart = await db.cart.create({ data: { userId: user.id } });

  for (const item of items) {
    const product = await db.product.findUnique({
      where: { id: item.productId },
      select: { stock: true, active: true },
    });
    if (!product || !product.active) continue;

    const existing = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId: item.productId } },
    });

    let newQuantity = item.quantity;
    if (existing) newQuantity += existing.quantity;

    // Cap at stock
    if (product.stock !== null && newQuantity > product.stock) {
      newQuantity = product.stock;
    }

    if (existing) {
      await db.cartItem.update({ where: { id: existing.id }, data: { quantity: newQuantity } });
    } else {
      await db.cartItem.create({ data: { cartId: cart.id, productId: item.productId, quantity: newQuantity } });
    }
  }

  revalidatePath("/cart");

  // Trigger header/cart count refresh
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}