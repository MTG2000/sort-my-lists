import ExportDataButton from "../ExportDataButton/ExportDataButton";
import ImportDataButton from "../ImportDataButton/ImportDataButton";

export default function AppDrawer() {
  return (
    <nav className="sticky top-0 inset-x-0 bg-black w-full py-5 px-5 flex gap-4 justify-between items-center z-10">
      <p className="text-2xl font-bold">Smart-ass Games Rater</p>

      <div className="flex gap-3">
        <ImportDataButton />
        <ExportDataButton />
      </div>
    </nav>
  );
}
