import * as React from "react";
import { getRefElement } from "~/helpers/utils";

interface UseEventListener {
  type: keyof WindowEventMap;
  listener: EventListener;
  element?: React.RefObject<Element> | Document | Window | null;
  options?: AddEventListenerOptions;
}

export const useEventListener = ({
  type,
  listener,
  element = typeof window !== "undefined" ? window : undefined,
  options,
}: UseEventListener): void => {
  const savedListener = React.useRef<EventListener>();

  React.useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  const handleEventListener = React.useCallback((event: Event) => {
    savedListener.current?.(event);
  }, []);

  React.useEffect(() => {
    const target = getRefElement(element);
    target?.addEventListener(type, handleEventListener, options);
    return () => target?.removeEventListener(type, handleEventListener);
  }, [type, element, options, handleEventListener]);
};
