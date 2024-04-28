import React, { useEffect, useState } from "react";

/**
 * Detect current DOM focus within a given element.
 */
export default function useFocusWithin(ref: React.RefObject<HTMLElement>) {
  const [isFocused, setIsFocused] = useState<boolean | undefined>(false);

  /**
   * Check if an element has focus.
   */
  function hasFocusWithin(element: HTMLElement): boolean {
    if (!element || !document) return false;
    return element?.contains(document.activeElement);
  }

  useEffect(() => {
    /**
     * Focus handler.
     */

    let checkFocusOutTimeout: NodeJS.Timeout | null = null;

    function checkFocus() {
      if (!ref || !ref.current) return false;
      setIsFocused(hasFocusWithin(ref.current));
    }

    function handlerIn() {
      if (checkFocusOutTimeout) {
        clearTimeout(checkFocusOutTimeout);
        checkFocusOutTimeout = null;
      }

      checkFocus();
    }

    function handlerOut() {
      checkFocusOutTimeout = setTimeout(checkFocus, 0);
    }

    // Bind focusin event listener.
    document.addEventListener("focusin", handlerIn, false);
    document.addEventListener("focusout", handlerOut, false);
    return () => {
      // Dispose of event listener on unmount.
      document.removeEventListener("focusin", handlerIn, false);
      document.removeEventListener("focusout", handlerOut, false);
    };
  }, [ref, setIsFocused]);

  return isFocused;
}
