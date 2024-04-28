export type Game = {
  id: number;
  name: string;
  cover: {
    url: string;
  } | null;
  summary?: string;
  url?: string;
};

export type GameInList = Game & {
  order: number;
};
