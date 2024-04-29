import { Game } from "@/core/models";
import { useGamesList } from "@/lib/contexts/GamesList.context";
import { useRef } from "react";

export default function ImportDataButton() {
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const { setNewGamesOrder } = useGamesList();

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        accept=".json"
        className="hidden"
        onChange={(e) => {
          const file = e.target?.files?.[0];
          if (!file) return;

          const reader = new FileReader();
          reader.onload = (e) => {
            const content = e.target?.result;
            if (!content) return;
            const data = JSON.parse(content as string);

            if (!data || !data.data || !Array.isArray(data.data)) {
              alert("Sorry, the file you uploaded is not valid.");
              return;
            }

            const userAgreed = window.confirm(
              "Are you sure you want to import this data? This will overwrite your current data."
            );
            if (!userAgreed) return;

            setNewGamesOrder(data.data as Game[]);

            fileInputRef.current.value = "";
          };

          reader.onerror = (e) => {
            console.error(
              "File could not be read! Code " + e.target?.error?.code
            );
            alert(
              "Sorry, there was an error reading the file. Please try again."
            );
          };

          reader.readAsText(file);
        }}
      />
      <button
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        Import Data From Backup File
      </button>
    </div>
  );
}
