import { useCallback } from "react";
import { useGamesList } from "../contexts/GamesList.context";

export const useCreateShareListUrl = (listTitle?: string) => {
  const { games } = useGamesList();

  const createShareUrl = useCallback(() => {
    const idsList = games.map((game) => game.id);
    const encodedGames = encodeURIComponent(JSON.stringify(idsList));
    const title = listTitle ? `&title=${listTitle}` : "";

    // const sharingURL = `${window.location.origin}/shared?games=${encoded}`;

    return `${window.location.origin}/shared?games=${encodedGames}${title}`;
  }, [games, listTitle]);

  return createShareUrl;
};
