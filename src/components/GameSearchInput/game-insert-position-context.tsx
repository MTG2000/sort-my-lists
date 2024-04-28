import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface GameInsertPositionContextValue {
  position: "first" | "figure-out" | "last";
  onUpdateInsertPosition: (position: "first" | "figure-out" | "last") => void;
}

export const GameInsertPosition = createContext<
  GameInsertPositionContextValue | undefined
>(undefined);

export const GameInsertPositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useLocalStorageState<
    "first" | "figure-out" | "last"
  >("game-insert-position", { defaultValue: "figure-out" });

  return (
    <GameInsertPosition.Provider
      value={{ position, onUpdateInsertPosition: setPosition }}
    >
      {children}
    </GameInsertPosition.Provider>
  );
};
