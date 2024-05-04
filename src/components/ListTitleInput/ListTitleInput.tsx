import { cn } from "@/lib/utils/helperFunctions";
import React, { useState } from "react";

interface Props {
  value: string;
  onUpdate: (newTitle: string) => void;
}

export default function ListTitleInput({ value, onUpdate }: Props) {
  const [title, setTitle] = React.useState(value);
  const [changesSaved, setChangesSaved] = useState(true);
  const inputRef = React.useRef<HTMLInputElement>(null!);

  return (
    <div>
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className={cn(
            "text-2xl md:text-4xl font-bold w-full bg-transparent hover:bg-gray-900 hover:ring focus:ring-0 focus:bg-gray-900 p-1 md:p-3 text-ellipsis overflow-clip",

            !changesSaved && "bg-gray-400"
          )}
          value={title}
          title="Click to edit list title"
          onChange={(e) => {
            setChangesSaved(false);
            setTitle(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onUpdate(title);
              setChangesSaved(true);
              inputRef.current.blur();
            }
          }}
        />
      </div>
      {!changesSaved && (
        <p className="animate-bounce mt-3">
          Press <span className="font-bold">Enter</span> to save changes
        </p>
      )}
    </div>
  );
}
