import { Post, User, Category } from '@prisma/client'

export type TCategory = {
  id: string;
  catName: string;
};

export type Tag = {
  id: string;
  tagName: string | null;
};

export type TPost = {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  image2Url?: string;
  publicId?: string;
  catName?: string;
  tags: null | string[];
  createdAt: string;
  authorEmail: string;
  author: {
    name?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
  };
};

export type TProjectCategory = {
  id: string;
  catName: string;
};

export type ProjectTag = {
  id: string;
  tagName: string | null;
};


export interface ProjectFormData {
  title: string;
  slug: string;
  imageUrl?: string;
  imageUrls?: string[];
  shortDescription?: string;
  description: string;
  featured?: boolean;
  type?: 'BACKEND' | 'FRONTEND' | 'FULLSTACK' | 'AI' | 'WEB_3' | 'OTHER';
  catName?: string;
  category?: {
    catName: string;
  } | null;
  projectUrl?: string;
  playStoreUrl?: string | null; 
  appStoreUrl?: string | null; 
}

export interface Project extends ProjectFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  category?: {
    id: string;
    catName: string;
  };
  tags?: Array<{
    id: string;
    tagName: string;
  }>;
  galleries?: Array<{
    id: string;
    publicId: string;
    format: string;
    version: string;
  }>;
  skills?: {  // Make skills optional
    id: string;
    name: string;
    category: string;
    proficiencyLevel: string;
    icon?: string;
  }[];
  imageCredit?: string;
  imageCreditUrls?: string[];
}

export interface ExtendedPost extends Post {
  author: {
    name?: string | null;
    email: string;
    username?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  } | null;
  category: Category | null;
  tags: Tag[];
}

export interface BlogCategoryProps {
  blog: ExtendedPost;
}