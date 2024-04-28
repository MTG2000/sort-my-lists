export type Game = {
  id: number;
  cover: {
    url: string;
  };
  name: string;
  summary: string;
  url: string;
};

export type GameInList = Game & {
  order: number;
};
