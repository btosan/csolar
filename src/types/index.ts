// types/index.ts

import type { Prisma } from '@prisma/client';

// ────────────────────────────────────────────────
// Re-export Prisma generated types
// ────────────────────────────────────────────────

export type {
  User,
  Customer,
  SolarSystem,
  PanelArray,
  Battery,
  Inverter,
  MonitoringSnapshot,
  HealthScore,
  Alert,
  ServiceRequest,
  ServiceVisit,
  Product,
  Order,
  OrderItem,
  Payment,
  Project,
  ProjectImage,
  Role,
  SystemType,
  SystemStatus,
  BatteryType,
  AlertSeverity,
  AlertStatus,
  MonitoringSource,
  ServiceStatus,
  ProductType,
  OrderStatus,
  PaymentStatus,
} from '@prisma/client';

// ────────────────────────────────────────────────
// Prisma input helpers
// ────────────────────────────────────────────────

export type UserCreateInput = Prisma.UserCreateInput;
export type UserUpdateInput = Prisma.UserUpdateInput;

// ────────────────────────────────────────────────
// Customer helpers
// ────────────────────────────────────────────────

export type CustomerWithoutUser = Omit<
  Prisma.CustomerGetPayload<{}>,
  'user'
>;

export type CustomerWithUser =
  Prisma.CustomerGetPayload<{
    include: { user: true };
  }>;

// ────────────────────────────────────────────────
// Project helpers (UPDATED for gallery + featured)
// ────────────────────────────────────────────────

export type ProjectEssential = Pick<
  Prisma.ProjectGetPayload<{}>,
  | 'id'
  | 'title'
  | 'description'
  | 'imageUrl'
  | 'location'
  | 'featured'
  | 'projectDate'
  | 'createdAt'
  | 'updatedAt'
>;

export type ProjectWithImages =
  Prisma.ProjectGetPayload<{
    include: { images: true };
  }>;

export type FeaturedProject =
  Prisma.ProjectGetPayload<{
    where: { featured: true };
    include: { images: true };
  }>;

// ────────────────────────────────────────────────
// Solar system helpers
// ────────────────────────────────────────────────

export type SolarSystemWithAssets =
  Prisma.SolarSystemGetPayload<{
    include: {
      panelArray: true;
      battery: true;
      inverter: true;
    };
  }>;

export type SolarSystemCard =
  Prisma.SolarSystemGetPayload<{
    select: {
      id: true;
      name: true;
      location: true;
      systemType: true;
      status: true;
      installationDate: true;
      customer: {
        select: { name: true };
      };
    };
  }>;

// ────────────────────────────────────────────────
// Product helpers
// ────────────────────────────────────────────────

export type ProductCatalogItem = Pick<
  Prisma.ProductGetPayload<{}>,
  | 'id'
  | 'name'
  | 'slug'
  | 'type'
  | 'brand'
  | 'model'
  | 'shortDescription'
  | 'mainImageUrl'
  | 'price'
  | 'stock'
  | 'active'
>;

// ────────────────────────────────────────────────
// Order helpers
// ────────────────────────────────────────────────

export type OrderWithItemsAndCustomer =
  Prisma.OrderGetPayload<{
    include: {
      customer: {
        select: {
          id: true;
          name: true;
          phone: true;
        };
      };
      items: {
        include: {
          product: {
            select: {
              id: true;
              name: true;
              mainImageUrl: true;
              price: true;
            };
          };
        };
      };
      payment: true;
    };
  }>;

// ────────────────────────────────────────────────
// Service helpers
// ────────────────────────────────────────────────

export type ServiceRequestWithSystem =
  Prisma.ServiceRequestGetPayload<{
    include: {
      system: {
        select: {
          id: true;
          name: true;
          location: true;
          customer: {
            select: { name: true };
          };
        };
      };
      visits: true;
    };
  }>;

// ────────────────────────────────────────────────
// Utility helpers
// ────────────────────────────────────────────────

export type PartialBy<T, K extends keyof T> =
  Omit<T, K> & Partial<Pick<T, K>>;

export type CreateWithoutAutoFields<T> = Omit<
  T,
  'id' | 'createdAt' | 'updatedAt'
>;
