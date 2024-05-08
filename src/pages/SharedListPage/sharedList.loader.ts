import API from "@/services/api";
import { LoaderFunctionArgs } from "react-router-dom";

export async function sharedListPageLoader({ request }: LoaderFunctionArgs) {
  const gamesQueryParam = new URL(request.url).searchParams.get("games");
  const listTitleParam = new URL(request.url).searchParams.get("title");

  if (!gamesQueryParam)
    throw new Error("The URL is invalid. It should contain a list of games.");

  const gamesIds = JSON.parse(gamesQueryParam) as number[];

  const games = await API.gamesApi.getGamesByIds(gamesIds);
  const sortedGames = gamesIds.map((id) =>
    games.find((game) => game.id === id)
  );

  return {
    items: sortedGames,
    title: listTitleParam,
  };
}
