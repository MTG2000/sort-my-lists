import { Game } from "@/core/models";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import useLocalStorageState from "use-local-storage-state";
import { createTreeFromArrayHelper } from "../data-structures/avl-tree";
import { useToast } from "../hooks/useToast";

interface GamesListContextValue {
  games: Game[];
  addGame: (
    game: Game,
    position: "first" | "last" | "figure-out"
  ) => Promise<void>;
  removeGame: (game: Game) => void;

  // Reordering games
  setNewGamesOrder: (newOrder: Game[]) => void;
  shiftGameOrder: (game: Game, upOrDown: "up" | "down") => void;
  shiftGameToNewIndex: (game: Game, newIndex: number) => void;

  // comparison flow
  comparisonFlowOpen: boolean;
  maxGamesToCompare: number;
  gamesToCompare: [Game, Game] | null;
  userComparisonChoiceHandler: ((result: -1 | 1) => void) | null;
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
  const toast = useToast();

  const [comparisonFlowOpen, setComparisonFlowOpen] = useState(false);
  const [maxGamesToCompare, setMaxGamesToCompare] = useState(0);
  const [gamesToCompare, setGamesToCompare] = useState<[Game, Game] | null>(
    null
  );
  const [userComparisonChoiceHandler, setUserComparisonChoiceHandler] =
    useState<((result: -1 | 1) => void) | null>(null);

  const addGame = useCallback(
    async (game: Game, position: "first" | "last" | "figure-out") => {
      if (games.some((g) => g.id === game.id)) {
        toast("🚨 Game already added!");
        return;
      }

      if (position === "figure-out") {
        // create avl tree from games

        const tree = await createTreeFromArrayHelper(
          games,
          async (a, b) =>
            games.findIndex((g) => g.id === a.id) -
            games.findIndex((g) => g.id === b.id)
        );

        // update the compareFn to use the function
        tree.compareFn = async (a, b) => {
          // ask the user which game he likes more, a or b
          setGamesToCompare([a, b]);
          // wait for the user to choose
          const userChoice = await new Promise<-1 | 1>((resolve) => {
            setUserComparisonChoiceHandler(() => {
              return resolve;
            });
          });

          return userChoice;
        };

        setMaxGamesToCompare(tree.getTreeHeight());

        // start the compare games flow (open modal)
        setComparisonFlowOpen(true);
        // ...

        // insert the new game into the tree
        await tree.insert(game);

        // inOrderTraversal to get the new order of games
        const newOrder = tree.inOrderTraversal();

        // clean up
        setTimeout(() => {
          setComparisonFlowOpen(false);
        }, 1000);
        setGamesToCompare(null);
        setUserComparisonChoiceHandler(null);

        toast("✅ Game added successfully!");

        // update the games state with the new order
        return setGames(newOrder);
      }

      setGames((prevGames) => {
        if (position === "first") {
          return [game, ...prevGames];
        } else if (position === "last") {
          return [...prevGames, game];
        } else {
          return prevGames;
        }
      });
    },
    [games, setGames]
  );

  const removeGame = useCallback(
    (game: Game) => {
      setGames((prevGames) => prevGames.filter((g) => g.id !== game.id));
    },
    [setGames]
  );

  const setNewGamesOrder = useCallback(
    (newOrder: Game[]) => {
      setGames(newOrder);
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
        setNewGamesOrder,
        shiftGameOrder,
        shiftGameToNewIndex,
        comparisonFlowOpen,
        maxGamesToCompare,
        gamesToCompare,
        userComparisonChoiceHandler,
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
