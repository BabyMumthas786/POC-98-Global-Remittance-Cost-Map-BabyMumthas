"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Corridor } from "@/types";
import { Loader2 } from "lucide-react";

// Dynamic import with SSR disabled to prevent Leaflet window issues
const LazyCorridorMap = dynamic(() => import("./CorridorMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] flex flex-col items-center justify-center bg-slate-950 rounded-2xl border border-slate-900 gap-3">
      <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
      <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
        Initializing Geospatial Canvas...
      </span>
    </div>
  ),
});

interface MapWrapperProps {
  corridors: Corridor[];
  selectedCorridor: Corridor | null;
  onSelectCorridor: (corridor: Corridor | null) => void;
}

export default function MapWrapper({
  corridors,
  selectedCorridor,
  onSelectCorridor,
}: MapWrapperProps) {
  return (
    <LazyCorridorMap
      corridors={corridors}
      selectedCorridor={selectedCorridor}
      onSelectCorridor={onSelectCorridor}
    />
  );
}
