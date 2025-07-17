import { type ClassValue, clsx as clsxRoot } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsxRoot(inputs))
}

export function formatSecret(
  text: string,
  showXFromStart: number = 10,
  showYFromEnd: number = 4,
  separator: string = '...'
) {
  return `${text.slice(0, showXFromStart)}${separator}${text.slice(-showYFromEnd)}`;
}