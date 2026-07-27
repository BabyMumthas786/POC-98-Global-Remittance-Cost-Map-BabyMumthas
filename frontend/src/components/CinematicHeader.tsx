"use client";

import React from "react";
import { RefreshCw, Info, Layers, BookOpen } from "lucide-react";

interface CinematicHeaderProps {
  refreshing: boolean;
  onRefresh: () => void;
  onOpenMetadata: () => void;
  onTogglePanel?: () => void;
}

export default function CinematicHeader({
  refreshing,
  onRefresh,
  onOpenMetadata,
  onTogglePanel,
}: CinematicHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-cine-bg/60 backdrop-blur-xl border-b border-cine-border/40 shadow-lg shadow-black/20">
      <div className="px-4 md:px-8 py-3 flex justify-between items-center">
        {/* Left: Branding */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-violet-500/20 animate-glow-pulse">
            G
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-black tracking-wider uppercase text-slate-100 flex items-center gap-2">
              <span className="text-slate-400 font-medium">Infocreon Internship –</span>
              Global Remittance Cost Map
              <span className="bg-cine-surface border border-cine-border text-[8px] px-1.5 py-0.5 rounded text-violet-400 font-mono font-normal hidden md:inline">
                POC-98
              </span>
            </h1>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 text-[10px]">
          {/* ETL Status – hidden on small screens */}
          <div className="hidden md:flex items-center gap-4 text-slate-400 font-semibold uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              ETL: Active
            </span>
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              Rail: Financial
            </span>
          </div>

          {/* Intelligence Panel Button */}
          {onTogglePanel && (
            <button
              onClick={onTogglePanel}
              className="bg-cine-surface hover:bg-violet-600/20 text-violet-300 hover:text-violet-200 font-bold px-3 py-1.5 rounded-lg border border-cine-border hover:border-violet-500/40 transition-all duration-200 flex items-center gap-1.5 text-xs"
              title="Open Intelligence Panel"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden sm:inline">Intelligence Panel</span>
            </button>
          )}

          {/* Refresh button */}
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="bg-cine-surface hover:bg-cine-border text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-cine-border hover:border-cine-border-med transition-all duration-200 flex items-center gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          {/* Info / Metadata button */}
          <button
            onClick={onOpenMetadata}
            className="w-8 h-8 rounded-lg bg-cine-surface hover:bg-violet-600/20 border border-cine-border hover:border-violet-500/40 flex items-center justify-center transition-all duration-200 group"
            aria-label="Project Metadata"
            title="Developer Signature & Metadata"
          >
            <Info className="w-4 h-4 text-slate-400 group-hover:text-violet-400 transition-colors" />
          </button>
        </div>
      </div>
    </header>
  );
}
