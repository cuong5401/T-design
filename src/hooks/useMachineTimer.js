import { useEffect } from "react";

export function useMachineTimer(dispatch) {
  useEffect(() => {
    const intervalId = window.setInterval(() => {
      dispatch({ type: "TICK_MACHINES" });
    }, 60000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [dispatch]);
}
