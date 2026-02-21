// Matches Prisma ProductType enum
export type ProductType =
  | "PANEL"
  | "BATTERY"
  | "INVERTER"
  | "ACCESSORY";

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
  name: string; // ✅ was title before — corrected
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
  discount?: Discount | null;

  // rating
  rating: number;
  reviews?: Review[];

  // timestamps
  createdAt: string;
  updatedAt: string;
};