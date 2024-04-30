import { nanoid } from "nanoid";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function generateRandomId(len = 6) {
  return nanoid(len);
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function trimText(text: string | undefined | null, length: number) {
  if (!text) return "";
  return text.slice(0, length) + (text.length > length ? "..." : "");
}

export function extractErrorMessage(error: unknown) {
  if (error instanceof Error) {
    console.log(error);
    return error.message;
  }

  return "Something wrong happened...";
}
