import { CONSTS } from "@/lib/consts";
import { Game } from "@core/models";

const API_URL = CONSTS.WORKER_API_URL;

interface GamesApi {
  searchGames(query: string): Promise<Game[]>;
  getGamesByIds(ids: number[]): Promise<Game[]>;
  getGamesWithRatingHigherThan(rating: number): Promise<Game[]>;
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
    return data.map(transformGameDtoToModel);
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
    return data.map(transformGameDtoToModel);
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
    return data.map(transformGameDtoToModel);
  },
};

function transformGameDtoToModel(dto: GameDto): Game {
  return {
    id: dto.id,
    cover: dto.cover
      ? {
          url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${dto.cover.image_id}.jpeg`,
        }
      : null,
    name: dto.name,
    summary: dto.summary,
    url: dto.url,
  };
}
