import { useGamesList } from "@/lib/contexts/GamesList.context";

export default function ExportDataButton() {
  const { games } = useGamesList();

  const exportData = () => {
    const objectToExport = {
      date: new Date().toISOString(),
      data: games,
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

  return (
    <button
      onClick={exportData}
      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
    >
      Export Data to a Backup File
    </button>
  );
}
