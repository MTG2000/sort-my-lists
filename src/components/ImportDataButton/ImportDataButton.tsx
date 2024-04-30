import { useRef } from "react";
import { Button } from "../Button/Button";
import { useRecoverData } from "@/lib/hooks/useRecoverData";
import { useToast } from "@/lib/hooks/useToast";
import { extractErrorMessage } from "@/lib/utils/helperFunctions";
import { useNavigate } from "@/lib/hooks/useNavigate";

interface Props {
  onCompleted?: () => void;
}

export default function ImportDataButton({ onCompleted }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const toast = useToast();
  const navigate = useNavigate();

  const { recoverDataFromFile } = useRecoverData();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return toast("No file selected", { type: "error" });

    const userConfirmation = window.confirm(
      "Are you sure you want to import this data? If there is any list that is also in the backup file, it will be overwritten by the backup data."
    );
    if (!userConfirmation) return;

    try {
      await recoverDataFromFile(file);
      toast("✅ Data imported successfully!");
      fileInputRef.current.value = "";
      navigate({ type: "homepage" });
      onCompleted?.();
    } catch (error) {
      toast(extractErrorMessage(error), { type: "error" });
    }
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        multiple={false}
        accept=".json"
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="whiteOutlined"
        fullWidth
        onClick={() => {
          fileInputRef.current.click();
        }}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M12 4L12 14M12 14L15 11M12 14L9 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>{" "}
        Import Data From Backup File
      </Button>
    </div>
  );
}
