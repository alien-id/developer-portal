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

export function getInitialsFromFullName(fullName: string): string {
  if (!fullName) return ''

  const words = fullName
    .trim()
    .split(/\s+/) // split by any whitespace
    .filter(Boolean)

  if (words.length === 0) return ''

  if (words.length === 1) {
    return words[0][0].toUpperCase()
  }

  const first = words[0][0].toUpperCase();
  const last = words[words.length - 1][0].toUpperCase();

  return first + last;
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
