"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchOps } from "@/lib/api";
import type { Op } from "@/types";

export function useOpsQuery() {
  return useQuery<Op[], Error>({
    queryKey: ["ops"],
    queryFn: fetchOps,
  });
}
