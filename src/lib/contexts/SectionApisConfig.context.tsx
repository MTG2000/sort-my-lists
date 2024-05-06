import { Item } from "@/core/models";
import API from "@/services/api";
import { ReactNode, createContext, useCallback, useContext } from "react";

interface SectionsApisConfigContextValue {
  section: "games" | "movies" | "books";
  fetchSearchResults: (
    inputValue: string,
    callback: (result: Item[]) => void
  ) => void;
}

const SectionsApisConfigContext = createContext<
  SectionsApisConfigContextValue | undefined
>(undefined);

export const SectionsApisConfigProvider: React.FC<{
  children: ReactNode;
  section: "games" | "movies" | "books";
}> = ({ section, children }) => {
  const fetchSearchResults = useCallback(
    (inputValue: string, callback: (result: Item[]) => void) => {
      if (section === "games") {
        API.gamesApi
          .searchGames(inputValue)
          .then(callback)
          .catch((error) => {
            console.log("Error in fetching from API");
            console.log(error);
            callback([]);
          });
      } else if (section === "movies") {
        // fetch movies
      } else if (section === "books") {
        // fetch books
      }
    },
    [section]
  );

  return (
    <SectionsApisConfigContext.Provider
      value={{
        section,
        fetchSearchResults,
      }}
    >
      {children}
    </SectionsApisConfigContext.Provider>
  );
};

export const useSectionApis = () => {
  const context = useContext(SectionsApisConfigContext);
  if (context === undefined) {
    throw new Error(
      "useSectionApis must be used within a SectionsApisConfigProvider"
    );
  }
  return context;
};
