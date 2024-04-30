import { nanoid } from "nanoid";

export function trimText(text: string | undefined | null, length: number) {
  if (!text) return "";
  return text.slice(0, length) + (text.length > length ? "..." : "");
}

export function generateRandomId(len = 6) {
  return nanoid(len);
}

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
