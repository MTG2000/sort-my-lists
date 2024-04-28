import { Game } from "@/core/models";
import { ReactNode, createContext, useContext, useState } from "react";

interface GamesListContextValue {
  games: Game[];
  addGame: (game: Game, position: "start" | "end" | "figure-out") => void;
  removeGame: (game: Game) => void;
}

const GamesListContext = createContext<GamesListContextValue | undefined>(
  undefined
);

export const GamesListProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [games, setGames] = useState<Game[]>([]);

  const addGame = (game: Game, position: "start" | "end" | "figure-out") => {
    setGames((prevGames) => {
      if (position === "start") {
        return [game, ...prevGames];
      } else if (position === "end") {
        return [...prevGames, game];
      } else {
        return prevGames;
      }
    });
  };

  const removeGame = (game: Game) => {
    setGames((prevGames) => prevGames.filter((g) => g.id !== game.id));
  };

  return (
    <GamesListContext.Provider value={{ games, addGame, removeGame }}>
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
