import { createContext, useState } from "react";

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
  const [position, setPosition] = useState<"first" | "figure-out" | "last">(
    "figure-out"
  );

  return (
    <GameInsertPosition.Provider
      value={{ position, onUpdateInsertPosition: setPosition }}
    >
      {children}
    </GameInsertPosition.Provider>
  );
};
