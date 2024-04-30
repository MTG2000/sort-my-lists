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
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "text-4xl font-bold w-full bg-transparent hover:bg-gray-900 hover:ring focus:ring-0 focus:bg-gray-900 p-3",

          !changesSaved && "bg-gray-400"
        )}
        value={title}
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
      {!changesSaved && (
        <p className="animate-bounce mt-3">
          Press <span className="font-bold">Enter</span> to save changes
        </p>
      )}
    </div>
  );
}
