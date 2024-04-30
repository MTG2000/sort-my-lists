import { useListsManager } from "../contexts/ListsManager.context";
import { Game } from "@/core/models";

// export default function ExportDataButton() {
//   const { games } = useGamesList();

//   const exportData = () => {
//     const objectToExport = {
//       date: new Date().toISOString(),
//       data: games,
//     };

//     const data = JSON.stringify(objectToExport, null, 2);
//     const blob = new Blob([data], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = `games-backup-data_${
//       new Date().toISOString().split("T")[0]
//     }.json`;
//     document.body.appendChild(a);
//     a.click();
//     a.remove();
//   };

//   return (
//     <button
//       onClick={exportData}
//       className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//     >
//       Export Data to a Backup File
//     </button>
//   );
// }

export type ExportedData = {
  createdAt: string;
  data: {
    listMetadata: {
      id: string;
      name: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
    };
    games: Game[];
  }[];
};

export const useExportData = () => {
  const { lists } = useListsManager();

  const exportData = () => {
    // read the data of each list from local storage with key "List-{list.id}"
    const listsGames = lists.map((list) => {
      const data = localStorage.getItem(`List-${list.id}`);

      return data ? JSON.parse(data) : [];
    }) as Game[][];

    const objectToExport: ExportedData = {
      createdAt: new Date().toISOString(),
      data: lists.map((list, index) => ({
        listMetadata: {
          id: list.id,
          name: list.name,
          slug: list.slug,
          createdAt: list.createdAt,
          updatedAt: list.updatedAt,
        },
        games: listsGames[index],
      })),
    };

    const data = JSON.stringify(objectToExport, null, 2);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `games-backup-data_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return exportData;
};
