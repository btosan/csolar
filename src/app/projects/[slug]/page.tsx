import { notFound } from "next/navigation";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { getPublicProjectBySlug } from "@/lib/actions/projects";
import RichTextRenderer from "@/components/editor/RichTextRenderer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = await getPublicProjectBySlug(slug);

  if (!project) return notFound();

  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === "ADMIN";

  const {
    id,
    title,
    description,
    location,
    imageUrl,
    images,
    featured,
    projectDate,
  } = project;

  const imageSrc =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "/placeholder-project.png";

  return (
    <div className="container mx-auto py-12 px-4">
      
      {/* ================= GRID ================= */}
      <div className="grid lg:grid-cols-2 gap-12">

        {/* LEFT: MAIN IMAGE + GALLERY */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={title}
              width={800}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {images && images.length > 0 && (
            <div className="grid grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-gray-100 rounded-lg overflow-hidden"
                >
                  <Image
                    src={img.url}
                    alt={img.caption || "Project image"}
                    width={200}
                    height={150}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: PROJECT INFO */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {title}
            </h1>

            {isAdmin && (
              <Link
                href={`/admin/projects/${id}/edit`}
                className="inline-block my-4 bg-accent text-black px-4 py-2 rounded-md text-sm hover:bg-black/70 hover:text-white transition"
              >
                Edit Project
              </Link>
            )}

            {featured && (
              <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full bg-yellow-500/10 text-gray-600 font-medium">
                Featured Project
              </span>
            )}

            {location && (
              <p className="text-sm text-muted-foreground mt-2">
                Location: <span className="font-medium">{location}</span>
              </p>
            )}

            <p className="text-sm text-muted-foreground">
              Completed:{" "}
              {new Date(projectDate).toLocaleDateString()}
            </p>
          </div>

          {/* Description */}
          {description && (
            <div className="pt-4 border-t">
              <h2 className="text-xl font-semibold mb-4">
                Project Overview
              </h2>

              <RichTextRenderer content={description} />
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/contact"
              className="bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
            >
              Start a Similar Project
            </Link>

            <Link
              href="/contact"
              className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}