"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ProductType, Role } from "@prisma/client";

/////////////////////////////////////////////////
// 🔐 ADMIN GUARD
/////////////////////////////////////////////////

async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session?.user) throw new Error("Not authenticated");
  if (session.user.role !== Role.ADMIN)
    throw new Error("Not authorized");

  return session.user;
}

/////////////////////////////////////////////////
// 🧠 SLUG CHECK HELPER
/////////////////////////////////////////////////

async function ensureUniqueSlug(
  slug: string | undefined,
  ignoreProductId?: string
) {
  if (!slug) return;

  const existing = await db.product.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== ignoreProductId) {
    throw new Error("Slug already exists. Please choose another.");
  }
}

/////////////////////////////////////////////////
// ⭐ RATING RECALCULATION
/////////////////////////////////////////////////

async function recalculateProductRating(productId: string) {
  const reviews = await db.review.findMany({
    where: { productId },
    select: { rating: true },
  });

  if (reviews.length === 0) {
    await db.product.update({
      where: { id: productId },
      data: { rating: 0 },
    });
    return;
  }

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) /
    reviews.length;

  await db.product.update({
    where: { id: productId },
    data: {
      rating: parseFloat(avg.toFixed(1)),
    },
  });
}

/////////////////////////////////////////////////
// 🟢 CREATE PRODUCT tx
/////////////////////////////////////////////////

export async function createProduct(data: {
  name: string;
  slug?: string;
  type: ProductType;
  brand: string;
  model?: string;
  shortDescription?: string;
  longDescription?: string;
  mainImageUrl?: string;
  price: number;
  stock?: number;
  active?: boolean;
  featured?: boolean;

  wattage?: number;
  kva?: number;
  ah?: number;
  voltage?: string;
  specifications?: any;

  gallery?: string[];
}) {
  await requireAdmin();

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error("Stock cannot be negative.");
  }

  await ensureUniqueSlug(data.slug);

  const product = await db.$transaction(async (tx) => {
    const created = await tx.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        type: data.type,
        brand: data.brand,
        model: data.model,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        mainImageUrl: data.mainImageUrl,
        price: data.price,
        stock: data.stock ?? 0,
        active: data.active ?? true,
        featured: data.featured ?? false,

        wattage: data.wattage,
        kva: data.kva,
        ah: data.ah,
        voltage: data.voltage,
        specifications: data.specifications,
      },
    });

    if (data.gallery && data.gallery.length > 0) {
      await tx.productImage.createMany({
        data: data.gallery.map((url) => ({
          url,
          productId: created.id,
        })),
      });
    }

    return created;
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");

  return product;
}

/////////////////////////////////////////////////
// 🟡 UPDATE PRODUCT
/////////////////////////////////////////////////

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    slug?: string;
    type?: ProductType;
    brand?: string;
    model?: string;
    shortDescription?: string;
    longDescription?: string;
    mainImageUrl?: string;
    price?: number;
    stock?: number;
    active?: boolean;
    featured?: boolean;

    wattage?: number;
    kva?: number;
    ah?: number;
    voltage?: string;
    specifications?: any;

    gallery?: string[];
  }
) {
  await requireAdmin();

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error("Stock cannot be negative.");
  }

  await ensureUniqueSlug(data.slug, id);

  const product = await db.$transaction(async (tx) => {
    const updated = await tx.product.update({
      where: { id },
      data: {
        name: data.name,
        slug: data.slug,
        type: data.type,
        brand: data.brand,
        model: data.model,
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        mainImageUrl: data.mainImageUrl,
        price: data.price,
        stock: data.stock,
        active: data.active,

        featured: data.featured,
        wattage: data.wattage,
        kva: data.kva,
        ah: data.ah,
        voltage: data.voltage,
        specifications: data.specifications,
      },
    });

    if (data.gallery) {
      await tx.productImage.deleteMany({
        where: { productId: id },
      });

      if (data.gallery.length > 0) {
        await tx.productImage.createMany({
          data: data.gallery.map((url) => ({
            url,
            productId: id,
          })),
        });
      }
    }

    return updated;
  });

  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  revalidatePath("/products");

  if (product.slug) {
    revalidatePath(`/products/${product.slug}`);
  }

  return product;
}

/////////////////////////////////////////////////
// 🔵 ADMIN: GET ALL PRODUCTS
/////////////////////////////////////////////////

export async function getAllProducts() {
  await requireAdmin();

  return db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      gallery: true,
      discount: true,
      _count: {
        select: { reviews: true },
      },
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET ACTIVE PRODUCTS
/////////////////////////////////////////////////

export async function getActiveProducts() {
  return db.product.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
    include: {
      gallery: true,
      discount: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PRODUCT BY SLUG
/////////////////////////////////////////////////

export async function getPublicProductBySlug(slug: string) {
  return db.product.findFirst({
    where: {
      slug,
      active: true,
    },
    include: {
      gallery: true,
      discount: true,
      reviews: true,
    },
  });
}

/////////////////////////////////////////////////
// 🔴 SOFT DELETE
/////////////////////////////////////////////////

export async function deleteProduct(id: string) {
  await requireAdmin();

  const product = await db.product.update({
    where: { id },
    data: { active: false },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");

  if (product.slug) {
    revalidatePath(`/products/${product.slug}`);
  }

  return product;
}

/////////////////////////////////////////////////
// 📝 REVIEW ACTIONS
/////////////////////////////////////////////////

export async function createReview(data: {
  productId: string;
  user: string;
  content: string;
  rating: number;
}) {
  const review = await db.review.create({
    data,
  });

  await recalculateProductRating(data.productId);

  const product = await db.product.findUnique({
    where: { id: data.productId },
    select: { slug: true },
  });

  if (product?.slug) {
    revalidatePath(`/products/${product.slug}`);
  }

  return review;
}

export async function deleteReview(reviewId: number) {
  const review = await db.review.delete({
    where: { id: reviewId },
  });

  await recalculateProductRating(review.productId);

  const product = await db.product.findUnique({
    where: { id: review.productId },
    select: { slug: true },
  });

  if (product?.slug) {
    revalidatePath(`/products/${product.slug}`);
  }

  return review;
}