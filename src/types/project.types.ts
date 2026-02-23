import { Project, ProjectImage } from "@prisma/client";

/////////////////////////////////////////////////
// 🧱 BASE TYPES (Direct from Prisma)
/////////////////////////////////////////////////

export type ProjectBase = Project;
export type ProjectImageBase = ProjectImage;

/////////////////////////////////////////////////
// 📦 PROJECT WITH RELATIONS
/////////////////////////////////////////////////

export type ProjectWithImages = Project & {
  images: ProjectImage[];
};

/////////////////////////////////////////////////
// 🟢 CREATE PROJECT INPUT
/////////////////////////////////////////////////

export type CreateProjectInput = {
  title: string;
  slug: string;              // required (schema requires it)
  description?: string;
  location?: string;
  imageUrl?: string;
  featured?: boolean;
  projectDate?: Date;        // optional (DB default exists)
  images?: string[];         // gallery URLs
};

/////////////////////////////////////////////////
// 🟡 UPDATE PROJECT INPUT
/////////////////////////////////////////////////

export type UpdateProjectInput = {
  title?: string;
  slug?: string;             // allow slug updates
  description?: string;
  location?: string;
  imageUrl?: string;
  featured?: boolean;
  projectDate?: Date;
  images?: string[];         // replace gallery if provided
};

/////////////////////////////////////////////////
// 🌍 PUBLIC PROJECT TYPE
/////////////////////////////////////////////////

export type PublicProject = {
  id: string;
  title: string;
  slug: string;              // needed for /projects/[slug]
  description: string | null;
  location: string | null;
  imageUrl: string | null;
  featured: boolean;
  projectDate: Date;
  images: ProjectImage[];
};

/////////////////////////////////////////////////
// 📝 PROJECT CARD TYPE (Homepage / Listings)
/////////////////////////////////////////////////

export type ProjectCard = {
  id: string;
  slug: string;              // needed for linking
  title: string;
  location: string | null;
  imageUrl: string | null;
  projectDate: Date;
  featured: boolean;
};

/////////////////////////////////////////////////
// 🔐 ADMIN PROJECT TYPE
/////////////////////////////////////////////////

export type AdminProject = ProjectWithImages;