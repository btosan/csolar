"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";

type ProjectCardProps = {
  data: {
    id: string;
    title: string;
    slug: string;
    location: string | null;
    imageUrl: string | null;
    projectDate: Date;
    featured: boolean;
  };
};

export default function ProjectCard({ data }: ProjectCardProps) {
  const {
    title,
    slug,
    location,
    imageUrl,
    projectDate,
    featured,
  } = data;

  const imageSrc =
    imageUrl && imageUrl.trim() !== ""
      ? imageUrl
      : "/assets/csolar/solar-installation.jpeg";

  const formattedDate = new Date(projectDate).toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/projects/${slug}`}
      className="group flex flex-col border border-black/5 shadow-md rounded-2xl overflow-hidden transition hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="relative w-full aspect-4/3 bg-[#F0EEED] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Featured Badge */}
        {featured && (
          <span className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-base md:text-lg text-black line-clamp-2">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {location && (
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              <span className="truncate">{location}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <CalendarDays size={14} />
            <span>{formattedDate}</span>
          </div>
        </div>

        <span className="text-sm font-medium text-primary mt-2 group-hover:underline">
          View Project →
        </span>
      </div>
    </Link>
  );
}