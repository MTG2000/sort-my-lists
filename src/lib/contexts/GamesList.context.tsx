import { Game } from "@/core/models";
import { ReactNode, createContext, useCallback, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface GamesListContextValue {
  games: Game[];
  addGame: (game: Game, position: "first" | "last" | "figure-out") => void;
  removeGame: (game: Game) => void;
  shiftGameOrder: (game: Game, upOrDown: "up" | "down") => void;
  shiftGameToNewIndex: (game: Game, newIndex: number) => void;
}

const GamesListContext = createContext<GamesListContextValue | undefined>(
  undefined
);

export const GamesListProvider: React.FC<{
  children: ReactNode;
  listKey?: string;
}> = ({ children, listKey = "default" }) => {
  const [games, setGames] = useLocalStorageState<Game[]>(`games-${listKey}`, {
    defaultValue: [],
  });

  const addGame = useCallback(
    (game: Game, position: "first" | "last" | "figure-out") => {
      setGames((prevGames) => {
        if (prevGames.find((g) => g.id === game.id)) return prevGames;

        if (position === "first") {
          return [game, ...prevGames];
        } else if (position === "last") {
          return [...prevGames, game];
        } else {
          return prevGames;
        }
      });
    },
    [setGames]
  );

  const removeGame = useCallback(
    (game: Game) => {
      setGames((prevGames) => prevGames.filter((g) => g.id !== game.id));
    },
    [setGames]
  );

  const shiftGameOrder = useCallback(
    (game: Game, upOrDown: "up" | "down") => {
      const gameIndex = games.findIndex((g) => g.id === game.id);
      if (gameIndex === -1) return;

      if (upOrDown === "up" && gameIndex === 0) return;
      if (upOrDown === "down" && gameIndex === games.length - 1) return;

      const newIndex = upOrDown === "up" ? gameIndex - 1 : gameIndex + 1;

      const newGames = [...games];

      newGames[gameIndex] = games[newIndex];
      newGames[newIndex] = game;

      setGames(newGames);
    },
    [games, setGames]
  );

  const shiftGameToNewIndex = useCallback(
    (game: Game, newIndex: number) => {
      const gameIndex = games.findIndex((g) => g.id === game.id);
      if (gameIndex === -1) return;

      newIndex = Math.max(0, Math.min(games.length - 1, newIndex));

      let newGames: Game[] = [];

      if (gameIndex < newIndex) {
        newGames = [
          ...games.slice(0, gameIndex),
          ...games.slice(gameIndex + 1, newIndex + 1),
          game,
          ...games.slice(newIndex + 1),
        ];
      } else {
        newGames = [
          ...games.slice(0, newIndex),
          game,
          ...games.slice(newIndex, gameIndex),
          ...games.slice(gameIndex + 1),
        ];
      }

      setGames(newGames);
    },
    [games, setGames]
  );

  return (
    <GamesListContext.Provider
      value={{
        games,
        addGame,
        removeGame,
        shiftGameOrder,
        shiftGameToNewIndex,
      }}
    >
      {children}
    </GamesListContext.Provider>
  );
};

export const useGamesList = () => {
  const context = useContext(GamesListContext);
  if (context === undefined) {
    throw new Error("useGamesList must be used within a GamesListProvider");
  }
  return context;
};
