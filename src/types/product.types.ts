export type Discount = {
  amount?: number;
  percentage?: number;
  active?: boolean;
};

export type Review = {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
};


export type Product = {
  id: string;

  // core info
  title: string;
  slug?: string;
  type: "PANEL" | "BATTERY" | "INVERTER" | "ACCESSORY";
  brand: string;
  model?: string;

  // descriptions
  shortDescription?: string;
  longDescription?: string;

  // media
  srcUrl?: string;
  gallery?: string[];

  // commerce
  price: number;
  stock?: number;
  active: boolean;
  discount?: Discount;

  // rating + reviews
  rating: number;
  reviews?: Review[];

  // timestamps
  createdAt: string;
  updatedAt: string;
};

