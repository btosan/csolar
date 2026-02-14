import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()                     // Convert to lowercase
    .replace(/[^\w\s-]/g, '')         // Remove special characters except whitespace and hyphens
    .replace(/\s+/g, '-')             // Replace spaces with hyphens
    .replace(/-+/g, '-')              // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '')               // Remove hyphens from start
    .replace(/-+$/, '')               // Remove hyphens from end
    .trim()                           // Trim whitespace
}