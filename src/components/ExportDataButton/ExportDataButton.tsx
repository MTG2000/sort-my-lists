import { useExportData } from "@/lib/hooks/useExportData";
import { useToast } from "@/lib/hooks/useToast";
import { Button } from "../Button/Button";

interface Props {
  section: string;
  onCompleted?: () => void;
}

export default function ExportDataButton({ section, onCompleted }: Props) {
  const toast = useToast();
  const exportData = useExportData();

  return (
    <Button
      onClick={() => {
        exportData();
        toast("✅ Data exported successfully!");
        onCompleted?.();
      }}
      fullWidth
      variant="whiteOutlined"
      className="capitalize"
    >
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.4697 7.53033C14.7626 7.82322 15.2374 7.82322 15.5303 7.53033C15.8232 7.23744 15.8232 6.76256 15.5303 6.46967L12.5303 3.46967C12.2374 3.17678 11.7626 3.17678 11.4697 3.46967L8.46967 6.46967C8.17678 6.76256 8.17678 7.23744 8.46967 7.53033C8.76256 7.82322 9.23744 7.82322 9.53033 7.53033L11.25 5.81066V14C11.25 14.4142 11.5858 14.75 12 14.75C12.4142 14.75 12.75 14.4142 12.75 14V5.81066L14.4697 7.53033Z"
          fill="currentColor"
        />
        <path
          d="M20.75 12C20.75 11.5858 20.4142 11.25 20 11.25C19.5858 11.25 19.25 11.5858 19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99593 19.25 4.75 16.0041 4.75 12C4.75 11.5858 4.41421 11.25 4 11.25C3.58579 11.25 3.25 11.5858 3.25 12C3.25 16.8325 7.16751 20.75 12 20.75C16.8325 20.75 20.75 16.8325 20.75 12Z"
          fill="currentColor"
        />
      </svg>{" "}
      Export {section} Data to a Backup File
    </Button>
  );
}
