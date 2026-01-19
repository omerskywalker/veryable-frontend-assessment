import type { Op } from "@/types";

function getOpsApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_OPS_API_URL;
  if (!url) throw new Error("OPS API URL is not defined");
  return url;
}

export async function fetchOps(): Promise<Op[]> {
  const url = getOpsApiUrl();

  const response = await fetch(url, { cache: "no-store" });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Ops: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
