import { ReactNode, createContext, useCallback, useContext } from "react";
import useLocalStorageState from "use-local-storage-state";
import { useToast } from "../hooks/useToast";
import { List } from "@/core/models/list";
import { generateRandomId, toSlug } from "../utils/helperFunctions";

interface ListsManagerContextValue {
  lists: List[];
  createNewList: (name?: string) => void;
  deleteList: (listId: List["id"]) => void;
  updateList: (listId: List["id"], updatedData: UpdateListData) => void;
}

type UpdateListData = Partial<Pick<List, "name">>;

const ListsManagerContext = createContext<ListsManagerContextValue | undefined>(
  undefined
);

export const ListsManagerProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const toast = useToast();

  const [lists, setLists] = useLocalStorageState<List[]>("lists", {
    defaultValue: [],
  });

  const createNewList = useCallback(
    (name?: string) => {
      const id = generateRandomId();
      const newList: List = {
        id,
        name: name ?? "Untitled List",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: name ? toSlug(name) : id,
      };
      setLists((prevLists) => [...prevLists, newList]);
    },
    [setLists]
  );

  const deleteList = useCallback(
    (listId: List["id"]) => {
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    },
    [setLists]
  );

  const updateList = useCallback(
    (listId: List["id"], updatedData: UpdateListData) => {
      const listToUpdate = lists.find((list) => list.id === listId);
      if (!listToUpdate) throw new Error("List not found");

      let slug = listToUpdate.slug;

      if (updatedData.name) {
        const newSlug = toSlug(updatedData.name);
        const slugExists = lists.some(
          (list) => list.slug === newSlug && list.id !== listId
        );
        if (slugExists) {
          toast("❌ List name already exists");
          return;
        }

        slug = newSlug;
      }

      setLists((prevLists) =>
        prevLists.map((list) =>
          list.id === listId
            ? {
                ...list,
                ...updatedData,
                slug,
                updatedAt: new Date().toISOString(),
              }
            : list
        )
      );
    },
    [lists, setLists, toast]
  );

  return (
    <ListsManagerContext.Provider
      value={{
        lists,
        createNewList,
        deleteList,
        updateList,
      }}
    >
      {children}
    </ListsManagerContext.Provider>
  );
};

export const useListsManager = () => {
  const context = useContext(ListsManagerContext);
  if (context === undefined) {
    throw new Error(
      "useListsManager must be used within a ListsManagerProvider"
    );
  }
  return context;
};
