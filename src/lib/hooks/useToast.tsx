import { ReactNode, useCallback } from "react";
import toast from "react-simple-toasts";
import "react-simple-toasts/dist/theme/light-edge.css";
import { toastConfig } from "react-simple-toasts";

toastConfig({
  theme: "light-edge",
  clickClosable: true,
  position: "bottom-right",
});

export const useToast = () => {
  const showToast = useCallback((msg: ReactNode) => {
    toast(msg);
  }, []);

  return showToast;
};
