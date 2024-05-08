import { useCallback } from "react";
import { useItemsList } from "../contexts/ItemsList.context";
import { useSectionApis } from "../contexts/SectionApisConfig.context";

export const useCreateShareListUrl = (listTitle?: string) => {
  const { items } = useItemsList();
  const { section } = useSectionApis();

  const createShareUrl = useCallback(() => {
    const idsList = items.map((item) => item.id);
    const encodedItems = encodeURIComponent(JSON.stringify(idsList));
    const title = listTitle ? `&title=${encodeURIComponent(listTitle)}` : "";

    // const sharingURL = `${window.location.origin}/shared?games=${encoded}`;

    return `${window.location.origin}/${section}/shared?${section}=${encodedItems}${title}`;
  }, [items, listTitle, section]);

  return createShareUrl;
};
