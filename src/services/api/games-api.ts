import { CONSTS } from "@/lib/consts";
import { Item } from "@core/models";

const API_URL = CONSTS.WORKER_API_URL;

interface GamesApi {
  searchGames(query: string): Promise<Item[]>;
  getGamesByIds(ids: number[]): Promise<Item[]>;
  getGamesWithRatingHigherThan(rating: number): Promise<Item[]>;
}

type GameDto = {
  id: number;
  cover?: {
    image_id: number;
  };
  name: string;
  summary?: string;
  url?: string;
};

export const gamesApi: GamesApi = {
  searchGames: async (query: string) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: `fields name, summary, url, cover.*;
            search "${query}";`,
    });
    const data = await response.json();
    return data.map(transformGameDtoToItem);
  },

  getGamesByIds: async (ids: number[]) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: `fields name, summary, url, cover.*;
            where id = (${ids.join(",")});
            limit ${ids.length};
            `,
    });
    const data = await response.json();
    return data.map(transformGameDtoToItem);
  },

  getGamesWithRatingHigherThan: async (rating: number) => {
    const response = await fetch(API_URL, {
      method: "POST",
      body: `fields name, summary, url, cover.*;
            where rating > ${rating};
            limit 100;
            `,
    });
    const data = await response.json();
    return data.map(transformGameDtoToItem);
  },
};

function transformGameDtoToItem(dto: GameDto): Item {
  return {
    id: dto.id,
    image: dto.cover
      ? `https://images.igdb.com/igdb/image/upload/t_cover_big/${dto.cover.image_id}.jpeg`
      : null,
    name: dto.name,
    summary: dto.summary,
    url: dto.url,
  };
}
