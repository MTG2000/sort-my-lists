import { Item } from "@/core/models/item";
import { useListsManager } from "../contexts/ListsManager.context";
import { useSectionApis } from "../contexts/SectionApisConfig.context";
import { Game } from "@/core/models";

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
    items: Item[];
    games?: Game[]; // for backward compatibility
  }[];
};

export const useExportData = () => {
  const { lists } = useListsManager();
  const { section } = useSectionApis();

  const exportData = () => {
    // read the data of each list from local storage with key "List-{list.id}"
    const listsItems = lists.map((list) => {
      const data = localStorage.getItem(`${section}:List-${list.id}`);

      return data ? JSON.parse(data) : [];
    }) as Item[][];

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
        items: listsItems[index],
      })),
    };

    const data = JSON.stringify(objectToExport, null, 2);
    const blob = new Blob([data], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${section}-backup-data_${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return exportData;
};
