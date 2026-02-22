import { ProductType } from "@prisma/client";

///////////////////////////////////////////
// DISCOUNT
///////////////////////////////////////////

export type Discount = {
  id: string;
  amount?: number | null;
  percentage?: number | null;
  active: boolean;

  createdAt: string;
  updatedAt: string;
};

export type Specification = {
  id?: string;
  key: string;
  value: string;
};

///////////////////////////////////////////
// REVIEW
///////////////////////////////////////////

export type Review = {
  id: number; // matches Prisma (Int autoincrement)
  user: string;
  content: string;
  rating: number;
  date: string;

  createdAt: string;
};

///////////////////////////////////////////
// PRODUCT IMAGE (Gallery)
///////////////////////////////////////////

export type ProductImage = {
  id: string;
  url: string;
  caption?: string | null;
  createdAt: string;
};

///////////////////////////////////////////
// PRODUCT (Fully aligned)
///////////////////////////////////////////

export type Product = {
  id: string;

  // core info
  name: string;
  slug?: string | null;
  type: ProductType;
  brand: string;
  model?: string | null;

  // descriptions
  shortDescription?: string | null;
  longDescription?: string | null;

  // media
  mainImageUrl?: string | null;
  gallery?: ProductImage[];

  // commerce
  price: number;
  stock?: number | null;
  active: boolean;
  featured: boolean;
  discount?: Discount | null;

  // solar specs
  wattage?: number | null;
  kva?: number | null;
  ah?: number | null;
  voltage?: string | null;
  specifications?: Specification[];

  // rating
  rating: number;
  reviews?: Review[];

  // timestamps
  createdAt: string;
  updatedAt: string;
};