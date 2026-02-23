"use client";

import { useState, useEffect } from "react";
import { Project } from "@prisma/client";
import { useRouter } from "next/navigation";
import { CldUploadWidget } from "next-cloudinary";
import { createProject, updateProject } from "@/lib/actions/projects";
import RichTextEditor from "@/components/editor/RichTextEditor";

interface ProjectWithRelations extends Project {
  images?: { id: string; url: string }[];
}

interface Props {
  mode: "create" | "edit";
  project?: ProjectWithRelations;
}

function generateSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-");
}

export default function ProjectForm({ mode, project }: Props) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const [form, setForm] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    location: project?.location || "",
    description: project?.description || "",
    imageUrl: project?.imageUrl || "",
    featured: project?.featured ?? false,
  });

  const [images, setImages] = useState<string[]>(
    project?.images?.map((g) => g.url) || []
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slugManuallyEdited) {
      setForm((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [form.title, slugManuallyEdited]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEdit && project) {
        await updateProject(project.id, {
          ...form,
          images,
        });
      } else {
        await createProject({
          ...form,
          images,
        });
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {error && <p className="text-red-500">{error}</p>}

      {/* BASIC INFO */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Information</h2>

        <input
          required
          placeholder="Project Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => {
            setSlugManuallyEdited(true);
            setForm({ ...form, slug: e.target.value });
          }}
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
          className="w-full border p-3 rounded"
        />
      </div>

      {/* FEATURED */}
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            setForm({ ...form, featured: e.target.checked })
          }
        />
        Mark as Featured Project
      </label>

      {/* MAIN IMAGE */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Main Image</h2>

        {form.imageUrl && (
          <img
            src={form.imageUrl}
            alt="Main"
            className="w-40 rounded"
          />
        )}

        <CldUploadWidget
          uploadPreset="tosanxprofiles"
          onSuccess={(result: any) => {
            setForm((prev) => ({
              ...prev,
              imageUrl: result.info.secure_url,
            }));
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-gray-100 text-black px-4 py-2 rounded"
            >
              Upload Main Image
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* GALLERY */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Project Gallery</h2>

        <div className="grid grid-cols-3 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                className="rounded"
                alt="Gallery"
              />
              <button
                type="button"
                onClick={() =>
                  setImages(images.filter((_, i) => i !== index))
                }
                className="absolute top-1 right-1 bg-red-600 text-white px-2 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <CldUploadWidget
          uploadPreset="tosanxprofiles"
          onSuccess={(result: any) => {
            setImages((prev) => [
              ...prev,
              result.info.secure_url,
            ]);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="bg-gray-100 text-black px-4 py-2 rounded"
            >
              Add Gallery Images
            </button>
          )}
        </CldUploadWidget>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Project Description
        </h2>

        <RichTextEditor
          value={form.description}
          onChange={(val) =>
            setForm((prev) => ({
              ...prev,
              description: val,
            }))
          }
        />
      </div>

      <button
        disabled={loading}
        className="bg-green-600 text-white px-6 py-3 rounded hover:cursor-pointer"
      >
        {loading
          ? isEdit
            ? "Updating..."
            : "Creating..."
          : isEdit
          ? "Update Project"
          : "Create Project"}
      </button>
    </form>
  );
}