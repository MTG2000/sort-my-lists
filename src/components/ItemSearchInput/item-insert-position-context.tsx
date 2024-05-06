import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

interface ItemInsertPositionContextValue {
  position: "first" | "figure-out" | "last";
  onUpdateInsertPosition: (position: "first" | "figure-out" | "last") => void;
}

export const ItemInsertPosition = createContext<
  ItemInsertPositionContextValue | undefined
>(undefined);

export const ItemInsertPositionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [position, setPosition] = useLocalStorageState<
    "first" | "figure-out" | "last"
  >("item-insert-position", { defaultValue: "figure-out" });

  return (
    <ItemInsertPosition.Provider
      value={{ position, onUpdateInsertPosition: setPosition }}
    >
      {children}
    </ItemInsertPosition.Provider>
  );
};
