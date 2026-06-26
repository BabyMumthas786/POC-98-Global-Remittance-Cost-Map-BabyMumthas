"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink, Code2, Cpu, Layers, User, Hash, Users } from "lucide-react";

interface MetadataModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STACK_ITEMS = [
  { name: "Next.js", color: "text-slate-100" },
  { name: "TypeScript", color: "text-blue-400" },
  { name: "Tailwind CSS", color: "text-cyan-400" },
  { name: "FastAPI", color: "text-emerald-400" },
  { name: "React Leaflet", color: "text-green-400" },
  { name: "Recharts", color: "text-violet-400" },
  { name: "TanStack Table", color: "text-amber-400" },
];

export default function MetadataModal({ isOpen, onClose }: MetadataModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4 animate-backdrop-in"
      style={{ backgroundColor: "rgba(5, 5, 15, 0.80)", backdropFilter: "blur(8px)" }}
    >
      <div className="relative w-full max-w-md bg-cine-surface border border-cine-border-med rounded-2xl shadow-2xl shadow-violet-500/5 animate-modal-in overflow-hidden">
        {/* Accent gradient bar at top */}
        <div className="h-1 w-full bg-gradient-to-r from-violet-600 via-cyan-500 to-emerald-500"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-lg bg-cine-bg/80 hover:bg-red-500/20 border border-cine-border hover:border-red-500/40 flex items-center justify-center transition-all group"
          aria-label="Close metadata"
        >
          <X className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-400 transition-colors" />
        </button>

        {/* Content */}
        <div className="p-6 pt-5 space-y-5">
          {/* Title */}
          <div>
            <h2 className="text-base font-black text-slate-100 tracking-wide uppercase">
              Project Metadata
            </h2>
            <p className="text-[11px] text-slate-400 mt-1">
              Global Remittance Cost Map – POC-98
            </p>
          </div>

          {/* Metadata fields */}
          <div className="space-y-3 text-[12px]">
            <div className="flex items-center gap-3 bg-cine-bg/60 p-3 rounded-xl border border-cine-border">
              <User className="w-4 h-4 text-violet-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Architect</span>
                <span className="text-slate-200 font-bold">Baby Mumthas</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cine-bg/60 p-3 rounded-xl border border-cine-border">
              <Users className="w-4 h-4 text-cyan-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Batch</span>
                <span className="text-slate-200 font-bold">Batch 4 Interns</span>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cine-bg/60 p-3 rounded-xl border border-cine-border">
              <ExternalLink className="w-4 h-4 text-slate-300 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">GitHub</span>
                <a
                  href="https://github.com/BabyMumthas786"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:text-violet-300 font-bold transition-colors"
                >
                  BabyMumthas786
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-cine-bg/60 p-3 rounded-xl border border-cine-border">
              <Hash className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">POC ID</span>
                <span className="text-emerald-400 font-bold font-mono">POC-98</span>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-violet-400" />
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Technology Stack</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {STACK_ITEMS.map((item) => (
                <span
                  key={item.name}
                  className={`px-2.5 py-1 rounded-lg bg-cine-bg/80 border border-cine-border text-[11px] font-semibold ${item.color} flex items-center gap-1.5 hover:border-cine-border-med transition-colors`}
                >
                  <Code2 className="w-3 h-3 opacity-50" />
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-cine-bg/40 border-t border-cine-border text-[10px] text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3 h-3" />
            Infocreon Cinematic Interface v2
          </span>
          <span>© 2026</span>
        </div>
      </div>
    </div>
  );
}
