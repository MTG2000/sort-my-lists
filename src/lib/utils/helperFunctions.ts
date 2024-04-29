export function trimText(text: string | undefined | null, length: number) {
  if (!text) return "";
  return text.slice(0, length) + (text.length > length ? "..." : "");
}
