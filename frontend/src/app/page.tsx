"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Corridor, DashboardSummary } from "@/types";
import { fetchCorridors, fetchSummary } from "@/lib/api";
import DashboardHero from "@/components/DashboardHero";
import MapWrapper from "@/components/MapWrapper";
import FeeCompare from "@/components/FeeCompare";
import SpeedLadder from "@/components/SpeedLadder";
import AccessPoints from "@/components/AccessPoints";
import CorridorTable from "@/components/CorridorTable";
import DownloadCenter from "@/components/DownloadCenter";
import CinematicHeader from "@/components/CinematicHeader";
import MetadataModal from "@/components/MetadataModal";
import IntelligencePanel from "@/components/IntelligencePanel";
import { Loader2, ServerCrash, RefreshCw, BookOpen } from "lucide-react";

export default function Home() {
  const [corridors, setCorridors] = useState<Corridor[]>([]);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [selectedCorridor, setSelectedCorridor] = useState<Corridor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // New Phase 2 state
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isMetadataOpen, setIsMetadataOpen] = useState(false);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [corridorsData, summaryData] = await Promise.all([
          fetchCorridors(),
          fetchSummary(),
        ]);
        if (active) {
          setCorridors(corridorsData);
          setSummary(summaryData);
          setError(null);
        }
      } catch (err: unknown) {
        if (active) {
          console.error("Dashboard data load failure:", err);
          setError(
            "Could not establish connection to the FastAPI intelligence service on http://localhost:8000. Please ensure the backend server is running."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    };

    loadData();
    return () => {
      active = false;
    };
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshing(true);
    setError(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleClosePanel = useCallback(() => setIsPanelOpen(false), []);
  const handleCloseMetadata = useCallback(() => setIsMetadataOpen(false), []);

  if (loading) {
    return (
      <div className="min-h-screen bg-cine-bg flex flex-col items-center justify-center gap-4 text-slate-200">
        <div className="relative">
          <div className="absolute inset-0 w-12 h-12 rounded-full bg-violet-500/20 animate-ping"></div>
          <Loader2 className="w-12 h-12 text-violet-500 animate-spin relative z-10" />
        </div>
        <div className="text-center">
          <h2 className="text-sm font-bold tracking-wider uppercase">Loading Intelligence Portal</h2>
          <p className="text-[11px] text-slate-400 mt-1">Ingesting remittance records from the ETL node...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-cine-bg flex flex-col items-center justify-center p-6 text-slate-200">
        <div className="max-w-md w-full bg-cine-surface border border-red-500/20 p-6 rounded-2xl shadow-2xl space-y-4 text-center">
          <ServerCrash className="w-12 h-12 text-red-500 mx-auto" />
          <h2 className="text-base font-bold uppercase tracking-wider text-slate-100">Service Disconnected</h2>
          <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
          <div className="bg-cine-bg p-4 rounded-xl border border-cine-border text-[11px] text-left space-y-2">
            <span className="font-bold text-slate-300 block mb-1">To start the backend service:</span>
            <code className="block text-emerald-400 bg-cine-surface p-2 rounded font-mono">
              cd backend<br />
              .venv\\Scripts\\activate<br />
              python run.py
            </code>
          </div>
          <button
            onClick={handleRefresh}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cine-bg text-slate-200 selection:bg-violet-500 selection:text-white font-sans">
      {/* Cinematic Header */}
      <CinematicHeader
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onOpenMetadata={() => setIsMetadataOpen(true)}
      />

      {/* Metadata Modal */}
      <MetadataModal
        isOpen={isMetadataOpen}
        onClose={handleCloseMetadata}
      />

      {/* Intelligence Panel (slide-over) */}
      <IntelligencePanel
        isOpen={isPanelOpen}
        onClose={handleClosePanel}
      />

      {/* Main Content – Full Width Cinematic Layout */}
      <main className="pt-16 px-4 md:px-8 pb-16">
        <div className="space-y-6 max-w-[1800px] mx-auto">
          {/* Section 1: Dashboard Hero KPIs */}
          {summary && <DashboardHero summary={summary} />}

          {/* Section 2a: Interactive Corridor Map – Full Width */}
          <MapWrapper
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            onSelectCorridor={setSelectedCorridor}
          />

          {/* Section 2b: Fee & Exchange Rate Breakdown */}
          <FeeCompare selectedCorridor={selectedCorridor} allCorridors={corridors} />

          {/* Section 3: Speed Ladder & Access Points */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SpeedLadder selectedCorridor={selectedCorridor} allCorridors={corridors} />
            <AccessPoints selectedCorridor={selectedCorridor} allCorridors={corridors} />
          </div>

          {/* Section 4: Full-width Corridor Explorer Table */}
          <CorridorTable
            corridors={corridors}
            selectedCorridor={selectedCorridor}
            onSelectCorridor={setSelectedCorridor}
          />

          {/* Section 5: Ingestion Metadata & Downloads */}
          <DownloadCenter />
        </div>
      </main>

      {/* Floating Intelligence Panel trigger */}
      <button
        onClick={() => setIsPanelOpen(true)}
        className="fixed bottom-6 right-6 z-[1000] bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-bold px-5 py-3 rounded-2xl shadow-xl shadow-violet-500/25 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-violet-500/40 group"
        aria-label="Open Intelligence Panel"
      >
        <BookOpen className="w-4 h-4 group-hover:rotate-6 transition-transform" />
        <span className="text-xs tracking-wider uppercase">Intelligence</span>
      </button>

      {/* Footer */}
      <footer className="text-center text-[10px] text-slate-500 mt-10 pb-6 px-6 font-semibold uppercase tracking-widest leading-relaxed">
        Infocreon Internship – Global Remittance Cost Map © 2026. All rights reserved.<br />
        This application uses realistically modeled synthetic reference data.
      </footer>
    </div>
  );
}
