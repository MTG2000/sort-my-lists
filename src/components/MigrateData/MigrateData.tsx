import React, { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import { Game, List } from "@/core/models";

interface Props {
  children: React.ReactNode;
}

export default function MigrateData({ children }: Props) {
  const [migrated, setMigrated] = useState(false);

  useEffect(() => {
    // migrate localStorage "lists" key to "games:lists"

    const existingLists = localStorage.getItem("lists");
    if (existingLists) {
      try {
        const parsedLists = JSON.parse(existingLists) as List[];

        localStorage.setItem("games:lists", JSON.stringify(parsedLists));

        for (const list of parsedLists) {
          const _oldListItems = localStorage.getItem(`List-${list.id}`);

          if (_oldListItems) {
            const oldListItems = JSON.parse(_oldListItems) as Game[];

            // update 'cover' property to 'image'
            const updatedListItems = oldListItems.map((item) => ({
              ...item,
              image: item.cover?.url || "",
            }));

            localStorage.setItem(
              `games:List-${list.id}`,
              JSON.stringify(updatedListItems)
            );
            localStorage.removeItem(`List-${list.id}`);
          }
        }

        localStorage.removeItem("lists");
      } catch (error) {
        console.error("Error migrating lists key", error);
      }
    }

    setMigrated(true);
  }, []);

  if (!migrated) return <LoadingPage />;

  return children;
}
