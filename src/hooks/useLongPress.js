import { useCallback, useEffect, useRef } from "react";
import { LONG_PRESS_STOP_MS } from "../data/plans";

export function useLongPress(onLongPress, options = {}) {
  const { delay = LONG_PRESS_STOP_MS, enabled = true } = options;
  const timerRef = useRef(null);
  const targetRef = useRef(null);
  const callbackRef = useRef(onLongPress);

  useEffect(() => {
    callbackRef.current = onLongPress;
  }, [onLongPress]);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    targetRef.current = null;
  }, []);

  const start = useCallback(
    (event) => {
      if (!enabled) {
        return;
      }

      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      clear();
      targetRef.current = event.currentTarget;
      timerRef.current = window.setTimeout(() => {
        timerRef.current = null;
        callbackRef.current?.();
      }, delay);
    },
    [clear, delay, enabled]
  );

  const cancelWhenOutside = useCallback(
    (event) => {
      const target = targetRef.current;

      if (!target) {
        return;
      }

      const bounds = target.getBoundingClientRect();
      const isOutside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (isOutside) {
        clear();
      }
    },
    [clear]
  );

  useEffect(() => clear, [clear]);

  return {
    onPointerDown: start,
    onPointerUp: clear,
    onPointerCancel: clear,
    onPointerLeave: clear,
    onPointerMove: cancelWhenOutside
  };
}
