"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { cookies } from "next/headers";

/////////////////////////////////////////////////
// AUTH HELPER if (typeof window !== "undefined")
/////////////////////////////////////////////////
async function getOptionalUser() {
  const session = await getServerSession(authOptions);
  return session?.user ?? null;
}

async function requireUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return session.user;
}

/////////////////////////////////////////////////
// GET USER CART
/////////////////////////////////////////////////

export async function getCart() {
  const user = await getOptionalUser();

  if (!user) {
    return null;
  }

  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
    include: {
      items: {
        include: {
          product: {
            include: {
              discount: true,
              gallery: true,
            },
          },
        },
      },
    },
  });

  return cart;
}

/////////////////////////////////////////////////
// ADD TO CART
/////////////////////////////////////////////////

export async function addToCart(
  productId: string,
  quantity: number = 1,
  options?: { safeStock?: boolean }
) {
  const user = await getOptionalUser();

  if (quantity <= 0) throw new Error("Invalid quantity");

  const product = await db.product.findUnique({
    where: { id: productId },
    select: { id: true, active: true, stock: true },
  });

  if (!product || !product.active) throw new Error("Product unavailable");

  // cap quantity if safeStock flag is true
  if (product.stock !== null && quantity > product.stock && !options?.safeStock) {
    throw new Error("Insufficient stock");
  }

  if (user) {
    let cart = await db.cart.findFirst({ where: { userId: user.id } });
    if (!cart) cart = await db.cart.create({ data: { userId: user.id } });

    const existing = await db.cartItem.findUnique({
      where: { cartId_productId: { cartId: cart.id, productId } },
    });

      // inside addToCart
      if (existing) {
        let newQty = existing.quantity + quantity;
        if (product.stock !== null && newQty > product.stock) {
          newQty = options?.safeStock ? product.stock : existing.quantity + quantity;
        }
        await db.cartItem.update({ where: { id: existing.id }, data: { quantity: newQty } });
      } else {
      const qtyToAdd = product.stock !== null && options?.safeStock && quantity > product.stock
        ? product.stock
        : quantity;

      await db.cartItem.create({ data: { cartId: cart.id, productId, quantity: qtyToAdd } });
    }

    revalidatePath("/cart");

    // after updating cart in addToCart / updateCartItemQuantity / removeCartItem
    revalidatePath("/cart");

    revalidatePath("/", "layout");
    return { success: true, action: "database" };
  } else {
    return { success: true, action: "guest", productId, quantity };
  }
}
/////////////////////////////////////////////////
// UPDATE CART ITEM QUANTITY
/////////////////////////////////////////////////

export async function updateCartItemQuantity(
  cartItemId: string,
  quantity: number
) {
  const user = await requireUser();

  if (quantity < 1) {
    throw new Error("Invalid quantity");
  }

  const cartItem = await db.cartItem.findUnique({
    where: {
      id: cartItemId,
    },
    include: {
      cart: true,
      product: true,
    },
  });

  if (!cartItem || cartItem.cart.userId !== user.id) {
    throw new Error("Cart item not found");
  }

  // inside updateCartItemQuantity
  if (cartItem.product.stock !== null && quantity > cartItem.product.stock) {
    quantity = cartItem.product.stock; // cap instead of throwing
  }
  await db.cartItem.update({ where: { id: cartItemId }, data: { quantity } });

    revalidatePath("/cart");

    // after updating cart in addToCart / updateCartItemQuantity / removeCartItem
revalidatePath("/cart");

}

/////////////////////////////////////////////////
// REMOVE ITEM FROM CART
/////////////////////////////////////////////////

export async function removeCartItem(cartItemId: string) {
  const user = await requireUser();

  const cartItem = await db.cartItem.findUnique({
    where: {
      id: cartItemId,
    },
    include: {
      cart: true,
    },
  });

  if (!cartItem || cartItem.cart.userId !== user.id) {
    throw new Error("Cart item not found");
  }

  await db.cartItem.delete({
    where: {
      id: cartItemId,
    },
  });

  revalidatePath("/cart");

  // after updating cart in addToCart / updateCartItemQuantity / removeCartItem
revalidatePath("/cart");

}

/////////////////////////////////////////////////
// CLEAR CART (USED AFTER CHECKOUT)
/////////////////////////////////////////////////

export async function clearCart() {
  const user = await requireUser();

  const cart = await db.cart.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!cart) return;

  await db.cartItem.deleteMany({
    where: {
      cartId: cart.id,
    },
  });

  revalidatePath("/cart");

  // after updating cart in addToCart / updateCartItemQuantity / removeCartItem
revalidatePath("/cart");

}


/////////////////////////////////////////////////
// CART COUNT
/////////////////////////////////////////////////

export async function getCartCount() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return 0;
  }

  const cart = await db.cart.findFirst({
    where: {
      userId: session.user.id,
    },
    include: {
      items: true,
    },
  });

  if (!cart) return 0;

  return cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
}

export async function mergeGuestCart(items: any[]) {
  const user = await requireUser();

  let cart = await db.cart.findFirst({
    where: { userId: user.id },
  });

  if (!cart) {
    cart = await db.cart.create({
      data: { userId: user.id },
    });
  }

  for (const item of items) {
    const existing = await db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: item.productId,
        },
      },
    });

    if (existing) {
      await db.cartItem.update({
        where: { id: existing.id },
        data: {
          quantity: existing.quantity + item.quantity,
        },
      });
    } else {
      await db.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
  }

  revalidatePath("/cart");

  // after updating cart in addToCart / updateCartItemQuantity / removeCartItem 
revalidatePath("/cart");

}