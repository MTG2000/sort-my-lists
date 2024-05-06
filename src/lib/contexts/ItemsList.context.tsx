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
import { Item } from "@/core/models/item";
import { useSectionApis } from "./SectionApisConfig.context";

interface ItemsListContextValue {
  items: Item[];
  addItem: (
    item: Item,
    position: "first" | "last" | "figure-out"
  ) => Promise<void>;
  removeItem: (item: Item) => void;

  // Reordering items
  setNewItemsOrder: (newOrder: Item[]) => void;
  shiftItemToNewIndex: (item: Item, newIndex: number) => void;

  // comparison flow
  comparisonFlowOpen: boolean;
  maxItemsToCompare: number;
  itemsToCompare: [Item, Item] | null;
  userComparisonChoiceHandler: ((result: -1 | 1) => void) | null;
  closeModalHandler: (() => void) | null;
}

const ItemsListContext = createContext<ItemsListContextValue | undefined>(
  undefined
);

export const ItemsListProvider: React.FC<{
  children: ReactNode;
  listKey?: string;
}> = ({ children, listKey = "default" }) => {
  const { section } = useSectionApis();

  const [items, setItems] = useLocalStorageState<Item[]>(
    `${section}:List-${listKey}`,
    {
      defaultValue: [],
    }
  );
  const toast = useToast();

  const [comparisonFlowOpen, setComparisonFlowOpen] = useState(false);
  const [maxItemsToCompare, setMaxItemsToCompare] = useState(0);
  const [itemsToCompare, setItemsToCompare] = useState<[Item, Item] | null>(
    null
  );
  const [userComparisonChoiceHandler, setUserComparisonChoiceHandler] =
    useState<((result: -1 | 1) => void) | null>(null);
  const [closeModalHandler, setCloseModalHandler] = useState<
    (() => void) | null
  >(null);

  const addItem = useCallback(
    async (item: Item, position: "first" | "last" | "figure-out") => {
      if (items.some((g) => g.id === item.id)) {
        toast("🚨 Already added!");
        return;
      }

      if (items.length === 0) {
        return setItems([item]);
      }

      if (position === "figure-out") {
        // create avl tree from items
        const tree = await createTreeFromArrayHelper(
          items,
          async (a, b) =>
            items.findIndex((g) => g.id === a.id) -
            items.findIndex((g) => g.id === b.id)
        );

        // update the compareFn to use the function
        tree.compareFn = async (a, b) => {
          // ask the user which item he likes more, a or b
          setItemsToCompare([a, b]);
          // wait for the user to choose
          const userChoice = await new Promise<-1 | 1>((resolve) => {
            setUserComparisonChoiceHandler(() => {
              return resolve;
            });
          });

          return userChoice;
        };

        setMaxItemsToCompare(tree.getTreeHeight());

        // start the compare items flow (open modal)
        setComparisonFlowOpen(true);
        // ...

        setCloseModalHandler(() => {
          return () => {
            setComparisonFlowOpen(false);
            setItemsToCompare(null);
            setUserComparisonChoiceHandler(null);
          };
        });

        // insert the new item into the tree
        await tree.insert(item);

        // inOrderTraversal to get the new order of items
        const newOrder = tree.inOrderTraversal();

        // clean up
        setTimeout(() => {
          setComparisonFlowOpen(false);
        }, 1000);
        setItemsToCompare(null);
        setUserComparisonChoiceHandler(null);

        toast("✅ Item added successfully!");

        // update the items state with the new order
        return setItems(newOrder);
      }

      setItems((prevItems) => {
        if (position === "first") {
          return [item, ...prevItems];
        } else if (position === "last") {
          return [...prevItems, item];
        } else {
          return prevItems;
        }
      });
    },
    [items, setItems, toast]
  );

  const removeItem = useCallback(
    (item: Item) => {
      setItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    },
    [setItems]
  );

  const setNewItemsOrder = useCallback(
    (newOrder: Item[]) => {
      setItems(newOrder);
    },
    [setItems]
  );

  const shiftItemToNewIndex = useCallback(
    (item: Item, newIndex: number) => {
      const itemIndex = items.findIndex((g) => g.id === item.id);
      if (itemIndex === -1) return;

      newIndex = Math.max(0, Math.min(items.length - 1, newIndex));

      let newItems: Item[] = [];

      if (itemIndex < newIndex) {
        newItems = [
          ...items.slice(0, itemIndex),
          ...items.slice(itemIndex + 1, newIndex + 1),
          item,
          ...items.slice(newIndex + 1),
        ];
      } else {
        newItems = [
          ...items.slice(0, newIndex),
          item,
          ...items.slice(newIndex, itemIndex),
          ...items.slice(itemIndex + 1),
        ];
      }

      setItems(newItems);
    },
    [items, setItems]
  );

  return (
    <ItemsListContext.Provider
      value={{
        items,
        addItem: addItem,
        removeItem: removeItem,
        setNewItemsOrder: setNewItemsOrder,
        shiftItemToNewIndex: shiftItemToNewIndex,
        comparisonFlowOpen,
        maxItemsToCompare: maxItemsToCompare,
        itemsToCompare: itemsToCompare,
        userComparisonChoiceHandler,
        closeModalHandler,
      }}
    >
      {children}
    </ItemsListContext.Provider>
  );
};

export const useItemsList = () => {
  const context = useContext(ItemsListContext);
  if (context === undefined) {
    throw new Error("useItemsList must be used within a ItemsListProvider");
  }
  return context;
};
