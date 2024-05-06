import { Item } from "@core/models";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

interface BooksApi {
  searchBooks(query: string): Promise<Item[]>;
  getBooksByIds(ids: number[]): Promise<Item[]>;
}

type BooksDto = {
  id: string;
  volumeInfo: {
    imageLinks?: {
      thumbnail: string;
    };
    title: string;
    description?: string;
    infoLink?: string;
  };
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
    return data.items.map(transformBookDTOtoItem);
  },

  getBooksByIds: async (ids: number[]) => {
    const queryParams = new URLSearchParams({
      q: `id:${ids.join(",")}`,
    }).toString();

    const response = await fetch(`${API_URL}?${queryParams}`, {
      method: "GET",
    });

    const data = await response.json();
    return data.items.map(transformBookDTOtoItem);
  },
};

function transformBookDTOtoItem(dto: BooksDto): Item {
  return {
    id: dto.id,
    image: dto.volumeInfo.imageLinks?.thumbnail ?? "",
    name: dto.volumeInfo.title,
    summary: dto.volumeInfo.description,
    url: dto.volumeInfo.infoLink,
  };
}
