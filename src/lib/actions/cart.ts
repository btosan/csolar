"use server";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function addToCart(productId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  let cart = await db.cart.findFirst({
    where: { userId: session.user.id },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: { userId: session.user.id },
    });
  }

  const existingItem = await db.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId,
      },
    },
  });

  if (existingItem) {
    await db.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + 1 },
    });
  } else {
    await db.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
      },
    });
  }
}