import { type ClassValue, clsx as clsxRoot } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxRoot(inputs))
}