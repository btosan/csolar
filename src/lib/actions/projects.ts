"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";

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
  slug: string,
  ignoreProjectId?: string
) {
  const existing = await db.project.findUnique({
    where: { slug },
  });

  if (existing && existing.id !== ignoreProjectId) {
    throw new Error("Slug already exists. Please choose another.");
  }
}

/////////////////////////////////////////////////
// 🟢 CREATE PROJECT
/////////////////////////////////////////////////

export async function createProject(data: {
  title: string;
  slug: string;
  description?: string;
  location?: string;
  imageUrl?: string;
  featured?: boolean;
  projectDate?: Date;
  images?: string[];
}) {
  await requireAdmin();

  await ensureUniqueSlug(data.slug);

  const project = await db.$transaction(async (tx) => {
    const created = await tx.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        location: data.location,
        imageUrl: data.imageUrl,
        featured: data.featured ?? false,
        projectDate: data.projectDate ?? new Date(),
      },
    });

    if (data.images?.length) {
      await tx.projectImage.createMany({
        data: data.images.map((url) => ({
          url,
          projectId: created.id,
        })),
      });
    }

    return created;
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.slug}`);

  return project;
}

/////////////////////////////////////////////////
// 🟡 UPDATE PROJECT
/////////////////////////////////////////////////

export async function updateProject(
  id: string,
  data: {
    title?: string;
    slug?: string;
    description?: string;
    location?: string;
    imageUrl?: string;
    featured?: boolean;
    projectDate?: Date;
    images?: string[];
  }
) {
  await requireAdmin();

  // Get existing project (needed for slug revalidation)
  const existingProject = await db.project.findUnique({
    where: { id },
    select: { slug: true },
  });

  if (!existingProject) {
    throw new Error("Project not found");
  }

  if (data.slug) {
    await ensureUniqueSlug(data.slug, id);
  }

  const project = await db.$transaction(async (tx) => {
    const updated = await tx.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        location: data.location,
        imageUrl: data.imageUrl,
        featured: data.featured,
        projectDate: data.projectDate,
      },
    });

    if (data.images !== undefined) {
      await tx.projectImage.deleteMany({
        where: { projectId: id },
      });

      if (data.images.length > 0) {
        await tx.projectImage.createMany({
          data: data.images.map((url) => ({
            url,
            projectId: id,
          })),
        });
      }
    }

    return updated;
  });

  revalidatePath("/admin/projects");
  revalidatePath(`/admin/projects/${id}`);
  revalidatePath("/projects");

  // Revalidate old slug if changed
  if (
    existingProject.slug &&
    existingProject.slug !== project.slug
  ) {
    revalidatePath(`/projects/${existingProject.slug}`);
  }

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return project;
}

/////////////////////////////////////////////////
// 🔴 SOFT DELETE PROJECT
/////////////////////////////////////////////////

export async function deleteProject(id: string) {
  await requireAdmin();

  const project = await db.project.update({
    where: { id },
    data: { deleted: true },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return project;
}

/////////////////////////////////////////////////
// ♻️ RESTORE PROJECT (NEW)
/////////////////////////////////////////////////

export async function restoreProject(id: string) {
  await requireAdmin();

  const project = await db.project.update({
    where: { id },
    data: { deleted: false },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  if (project.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }

  return project;
}

/////////////////////////////////////////////////
// 💣 PERMANENT DELETE (OPTIONAL BUT SAFE)
/////////////////////////////////////////////////

export async function permanentlyDeleteProject(id: string) {
  await requireAdmin();

  const project = await db.project.findUnique({
    where: { id },
    select: { slug: true },
  });

  await db.project.delete({
    where: { id },
  });

  revalidatePath("/admin/projects");
  revalidatePath("/projects");

  if (project?.slug) {
    revalidatePath(`/projects/${project.slug}`);
  }
}

/////////////////////////////////////////////////
// 🔵 ADMIN: GET ALL PROJECTS
/////////////////////////////////////////////////

export async function getAllProjects(includeDeleted = false) {
  await requireAdmin();

  return db.project.findMany({
    where: includeDeleted ? {} : { deleted: false },
    orderBy: [
      { featured: "desc" },
      { projectDate: "desc" },
    ],
    include: {
      images: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET ALL PROJECTS
/////////////////////////////////////////////////

export async function getPublicProjects() {
  return db.project.findMany({
    where: { deleted: false },
    orderBy: [
      { featured: "desc" },
      { projectDate: "desc" },
    ],
    include: {
      images: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌟 PUBLIC: GET FEATURED PROJECTS
/////////////////////////////////////////////////

export async function getFeaturedProjects() {
  return db.project.findMany({
    where: {
      featured: true,
      deleted: false,
    },
    orderBy: { projectDate: "desc" },
    include: {
      images: true,
    },
  });
}

/////////////////////////////////////////////////
// 🌍 PUBLIC: GET PROJECT BY SLUG
/////////////////////////////////////////////////

export async function getPublicProjectBySlug(slug: string) {
  return db.project.findFirst({
    where: {
      slug,
      deleted: false,
    },
    include: {
      images: true,
    },
  });
}

/////////////////////////////////////////////////
// 🔎 ADMIN: GET PROJECT BY ID
/////////////////////////////////////////////////

export async function getProjectById(id: string) {
  await requireAdmin();

  return db.project.findUnique({
    where: { id },
    include: {
      images: true,
    },
  });
}