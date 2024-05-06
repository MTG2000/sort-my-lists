import { CONSTS } from "@/lib/consts";
import { Item } from "@core/models";

const API_URL = CONSTS.WORKER_API_URL;

interface MoviesApi {
  searchMovies(query: string): Promise<Item[]>;
  getMoviesByIds(ids: number[]): Promise<Item[]>;
}

type MovieDto = {
  Title: string;
  imdbID: string;
  Poster: string;
};

export const moviesApi: MoviesApi = {
  searchMovies: async (query: string) => {
    const response = await fetch(
      API_URL + `?apiurl=https://www.omdbapi.com&search=${query}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    return data.Search.map(transformMovieDtoToItem);
  },

  getMoviesByIds: async (ids: number[]) => {
    const response = await fetch(API_URL, {
      method: "GET",
      body: `fields name, summary, url, cover.*;
            where id = (${ids.join(",")});
            limit ${ids.length};
            `,
    });
    const data = await response.json();
    return data.map(transformMovieDtoToItem);
  },
};

function transformMovieDtoToItem(dto: MovieDto): Item {
  return {
    id: dto.imdbID,
    image: dto.Poster,
    name: dto.Title,
  };
}
