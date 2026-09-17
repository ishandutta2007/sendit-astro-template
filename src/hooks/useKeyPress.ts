import { useEffect } from "react";

interface UseKeyPressOptions {
  event?: "keydown" | "keyup" | "keypress";
  target?: Element | Window | Document;
  eventOptions?: AddEventListenerOptions;
}

/**
 * Custom hook to handle individual key press events
 * @param key - The key to listen for (e.g., "Escape", "Enter", "ArrowUp")
 * @param callback - The callback function to execute when the key is pressed
 * @param options - Additional options for the key press event
 */
export function useKeyPress(
  key: string,
  callback: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {},
): void {
  const {
    event = "keydown",
    target = typeof window !== "undefined" ? window : undefined,
    eventOptions,
  } = options;

  useEffect(() => {
    if (!target) return;

    const handleKeyEvent = (event: KeyboardEvent): void => {
      if (event.key === key) {
        callback(event);
      }
    };

    const eventTarget = target as EventTarget;
    eventTarget.addEventListener(
      event,
      handleKeyEvent as EventListener,
      eventOptions,
    );

    return (): void => {
      eventTarget.removeEventListener(
        event,
        handleKeyEvent as EventListener,
        eventOptions,
      );
    };
  }, [key, callback, event, target, eventOptions]);
}
