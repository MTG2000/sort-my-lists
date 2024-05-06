import { cn } from "@/lib/utils/helperFunctions";
import { LayoutGroup, motion } from "framer-motion";
import { useId } from "react";
import { NavLink } from "react-router-dom";

interface Props {
  size?: "sm" | "md";
}

export default function SectionsSwitch({ size = "md" }: Props) {
  const id = useId();

  return (
    <LayoutGroup id={id}>
      <ul
        className={cn(
          "flex flex-wrap justify-center items-center",
          size === "sm" && "gap-4 text-lg",
          size === "md" && "gap-6 text-xl"
        )}
      >
        <NavLink
          to="/games"
          replace
          className={cn(
            "rounded-[42px] isolate relative",
            size === "sm" && "px-6 py-3",
            size === "md" && "px-8 py-4"
          )}
          children={({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="switch-overlay"
                  style={{ originY: "top" }}
                  className="absolute inset-0 bg-gray-200 bg-opacity-30 rounded-[42px]"
                ></motion.div>
              )}
              Games
            </>
          )}
        ></NavLink>
        <NavLink
          to="/movies"
          replace
          className={cn(
            "rounded-[42px] isolate relative",
            size === "sm" && "px-6 py-3",
            size === "md" && "px-8 py-4"
          )}
          children={({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="switch-overlay"
                  style={{ originY: "top" }}
                  className="absolute inset-0 bg-gray-200 bg-opacity-30 rounded-[42px]"
                ></motion.div>
              )}
              Movies
            </>
          )}
        ></NavLink>
        <NavLink
          to="/books"
          replace
          className={cn(
            "rounded-[42px] isolate relative",
            size === "sm" && "px-6 py-3",
            size === "md" && "px-8 py-4"
          )}
          children={({ isActive }) => (
            <>
              {isActive && (
                <motion.div
                  layoutId="switch-overlay"
                  style={{ originY: "top" }}
                  className="absolute inset-0 bg-gray-200 bg-opacity-30 rounded-[42px]"
                ></motion.div>
              )}
              Books
            </>
          )}
        ></NavLink>
      </ul>
    </LayoutGroup>
  );
}
