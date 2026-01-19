"use client";

import { useState, useEffect, useCallback, useMemo } from "react";

export type CheckStatus = "in" | "out";

export type OperatorCheckState = {
  status: CheckStatus;
  checkedInAt?: string;
  checkedOutAt?: string;
};

type UseOperatorCheckStateReturn = {
  state: OperatorCheckState;
  isCheckedIn: boolean;
  toggle: () => void;
  checkIn: () => void;
  checkOut: () => void;
  clear: () => void;
  hydrated: boolean;
};

export function useOperatorCheckState(
  opId: number | string,
  operatorId: number | string,
): UseOperatorCheckStateReturn {
  const key = useMemo(
    () => `veryable:check:v1:${opId}:${operatorId}`,
    [opId, operatorId],
  );

  const [hydrated, setHydrated] = useState(false);

  // default to "out" for stability
  const [state, setState] = useState<OperatorCheckState>({ status: "out" });

  // load from localStorage after mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw) as OperatorCheckState;
        if (parsed && (parsed.status === "in" || parsed.status === "out")) {
          setState(parsed);
        }
      }
    } catch {
      // ignore
    } finally {
      setHydrated(true);
    }
  }, [key]);

  // persist on changes (after initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [key, state, hydrated]);

  const checkIn = useCallback(() => {
    setState({
      status: "in",
      checkedInAt: new Date().toISOString(),
      checkedOutAt: undefined,
    });
  }, []);

  const checkOut = useCallback(() => {
    setState((prev) => ({
      status: "out",
      checkedInAt: prev.checkedInAt,
      checkedOutAt: new Date().toISOString(),
    }));
  }, []);

  const toggle = useCallback(() => {
    setState((prev) => {
      const now = new Date().toISOString();
      if (prev.status === "out") {
        return { status: "in", checkedInAt: now, checkedOutAt: undefined };
      }
      return { ...prev, status: "out", checkedOutAt: now };
    });
  }, []);

  const clear = useCallback(() => {
    setState({ status: "out" });
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  }, [key]);

  return {
    state,
    isCheckedIn: state.status === "in",
    toggle,
    checkIn,
    checkOut,
    clear,
    hydrated,
  };
}
