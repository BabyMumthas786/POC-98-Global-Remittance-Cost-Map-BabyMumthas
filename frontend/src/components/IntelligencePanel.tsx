"use client";

import React, { useEffect } from "react";
import { X, BookOpen } from "lucide-react";
import EducationalCards from "./EducationalCards";

interface IntelligencePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntelligencePanel({ isOpen, onClose }: IntelligencePanelProps) {
  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scrolling when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-[1050] bg-black/50 backdrop-blur-sm animate-backdrop-in"
        />
      )}

      {/* Slide-over panel */}
      <div
        className={`fixed top-0 right-0 z-[1100] h-full w-full sm:w-[420px] md:w-[460px] bg-cine-surface/95 backdrop-blur-xl border-l border-cine-border-med shadow-2xl shadow-black/40 transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-cine-border bg-cine-bg/40">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-violet-500/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-violet-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-100 tracking-wide">
                Intelligence Panel
              </h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Educational context & rail analysis
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-cine-bg/80 hover:bg-red-500/20 border border-cine-border hover:border-red-500/40 flex items-center justify-center transition-all group"
            aria-label="Close intelligence panel"
          >
            <X className="w-4 h-4 text-slate-400 group-hover:text-red-400 transition-colors" />
          </button>
        </div>

        {/* Panel content – scrollable */}
        <div className="h-[calc(100%-65px)] overflow-y-auto p-5 cinematic-scrollbar">
          <EducationalCards />
        </div>
      </div>
    </>
  );
}
