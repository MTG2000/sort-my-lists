import { Game } from "@/core/models";
import { ExportedData } from "./useExportData";
import { useListsManager } from "../contexts/ListsManager.context";

export const useRecoverData = () => {
  const { lists, createNewList } = useListsManager();

  const updateListGames = (listId: string, games: Game[]) => {
    localStorage.setItem(`List-${listId}`, JSON.stringify(games));
  };

  const recoverDataFromFile = async (file: File) => {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (e) => {
        const content = e.target?.result;
        if (!content) return;
        const data = JSON.parse(content as string) as ExportedData;

        if (!data || !data.data || !Array.isArray(data.data)) {
          alert("Sorry, the file you uploaded is not valid.");
          return;
        }

        // const userAgreed = window.confirm(
        //   "Are you sure you want to import this data? This will overwrite your current data."
        // );
        // if (!userAgreed) return;

        // for each list in the file, if it doesn't already exist, create it. Then put its games in it.
        // if the list do exist, just overwrite its games.

        data.data.forEach((list) => {
          const existingList = lists.find((l) => l.id === list.listMetadata.id);
          if (!existingList) {
            const newList = createNewList(list.listMetadata.name, {
              id: list.listMetadata.id,
            });

            updateListGames(newList.id, list.games);
          } else {
            updateListGames(existingList.id, list.games);
          }
        });

        resolve(true);
      };

      reader.onerror = (e) => {
        console.error("File could not be read! Error: " + e.target?.error);
        reject(e.target?.error);
      };

      reader.readAsText(file);
    });
  };

  return { recoverDataFromFile };
};
