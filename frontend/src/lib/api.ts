import { Corridor, DashboardSummary } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const CSV_DOWNLOAD_URL = `${API_BASE_URL}/api/download/csv`;
export const JSON_DOWNLOAD_URL = `${API_BASE_URL}/api/download/json`;

export async function fetchCorridors(): Promise<Corridor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/corridors`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch corridors data");
    return await res.json();
  } catch (error) {
    console.error("fetchCorridors error:", error);
    throw error;
  }
}

export async function fetchSummary(): Promise<DashboardSummary> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/summary`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch dashboard summary data");
    return await res.json();
  } catch (error) {
    console.error("fetchSummary error:", error);
    throw error;
  }
}
