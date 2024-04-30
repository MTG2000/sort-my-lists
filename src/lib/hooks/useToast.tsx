import { ReactNode, useCallback } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/light-edge.css";
import "react-simple-toasts/dist/theme/failure.css";
import { toastConfig } from "react-simple-toasts";

toastConfig({
  theme: "light-edge",
  clickClosable: true,
  position: "bottom-right",
});

export const useToast = () => {
  const showToast = useCallback(
    (
      msg: ReactNode,
      options?: {
        type: "info" | "error";
      }
    ) => {
      const theme = options?.type === "error" ? "failure" : "light-edge";

      toast(msg, {
        theme: theme,
      });
    },
    []
  );

  return showToast;
};
