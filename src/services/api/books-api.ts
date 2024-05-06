import { Item } from "@core/models";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

interface BooksApi {
  searchBooks(query: string): Promise<Item[]>;
  getBooksByIds(ids: number[]): Promise<Item[]>;
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

export const booksApi: BooksApi = {
  searchBooks: async (query: string) => {
    const queryParams = new URLSearchParams({
      q: `intitle:${query}`,
      maxResults: "10",
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: "GET",
    });
    const data = await response.json();
    return data.map(transformGameDtoToItem);
  },

  getBooksByIds: async (ids: number[]) => {
    const queryParams = new URLSearchParams({
      q: `id:${ids.join(",")}`,
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: "GET",
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
