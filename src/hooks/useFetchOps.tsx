"use client";

import { useEffect, useState } from "react";
import { fetchOps } from "@/lib/api";
import type { Op } from "@/types";

export function useFetchOps() {
  const [ops, setOps] = useState<Op[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;

    fetchOps()
      .then((data) => {
        if (!alive) return;
        setOps(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!alive) return;
        setError(err?.message ?? "Failed to load ops");
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return { ops, loading, error };
}
