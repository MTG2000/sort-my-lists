export type Item = {
  id: number | string;
  name: string;
  image: string | null;
  summary?: string;
  url?: string;
};

export type ItemInList = Item & {
  order: number;
};
