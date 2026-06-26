"use client";

import React, { useState } from "react";
import { Landmark, Shield, ShieldAlert, BookOpen, Key, DollarSign, Scale, Globe, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import educationalContent from "@/data/educational-content.json";

// Icon mapping to resolve JSON icon names to React components
const ICON_MAP: Record<string, React.ReactNode> = {
  CheckCircle: <CheckCircle className="w-4 h-4 text-emerald-400" />,
  ShieldAlert: <ShieldAlert className="w-4 h-4 text-amber-500" />,
  Landmark: <Landmark className="w-4 h-4 text-emerald-400" />,
  Key: <Key className="w-4 h-4 text-blue-400" />,
  Globe: <Globe className="w-4 h-4 text-purple-400" />,
  DollarSign: <DollarSign className="w-4 h-4 text-amber-500" />,
};

export default function EducationalCards() {
  const [isOpenWhyMatters, setIsOpenWhyMatters] = useState(true);
  const [isOpenRailControl, setIsOpenRailControl] = useState(true);
  const [isOpenFormalInformal, setIsOpenFormalInformal] = useState(true);

  const { formalChannels, informalChannels, railControlCards, whyMattersCards, sdgNote } = educationalContent;

  return (
    <div className="bg-slate-950/65 border border-slate-800/80 rounded-2xl p-4 md:p-5 shadow-xl flex flex-col gap-4">
      {/* Title Header */}
      <div className="border-b border-slate-800/60 pb-3">
        <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-400" />
          Intelligence Sidebar
        </h3>
        <p className="text-[11px] text-slate-400 mt-1">
          Learn how the global payment infrastructure works and who controls the underlying rails.
        </p>
      </div>

      {/* Stacked Accordions */}
      <div className="space-y-4">
        {/* Accordion 1: Why This Matters */}
        <div className="border border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/10">
          <button
            onClick={() => setIsOpenWhyMatters(!isOpenWhyMatters)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors text-left cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              Why This Matters
            </h4>
            {isOpenWhyMatters ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          
          {isOpenWhyMatters && (
            <div className="p-4 space-y-4 animate-fade-in border-t border-slate-800/40">
              <div className="grid grid-cols-1 gap-3 text-[10.5px]">
                {whyMattersCards.map((card, idx) => (
                  <div key={idx} className="bg-slate-950/40 p-3.5 rounded-lg border border-slate-850 space-y-1">
                    <span className={`font-bold ${card.titleColor} text-xs block mb-1`}>{card.title}</span>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      {card.content}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="text-[10px] text-slate-400 border-t border-slate-850/80 pt-3 leading-relaxed">
                <strong>{sdgNote}</strong>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 2: Who Controls the Rail? */}
        <div className="border border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/10">
          <button
            onClick={() => setIsOpenRailControl(!isOpenRailControl)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors text-left cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              Who Controls The Rail?
            </h4>
            {isOpenRailControl ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          
          {isOpenRailControl && (
            <div className="p-4 space-y-3 animate-fade-in border-t border-slate-800/40">
              <div className="grid grid-cols-1 gap-3 text-[10.5px]">
                {railControlCards.map((card, idx) => (
                  <div key={idx} className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-2">
                        <span className={card.iconColor}>{ICON_MAP[card.iconName]}</span>
                        {card.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-850/80 space-y-1">
                      {card.details.map((detail, dIdx) => (
                        <div key={dIdx}>
                          <span className="font-semibold text-slate-300">{detail.label}:</span>{" "}
                          <span className="text-slate-400">{detail.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Accordion 3: Formal vs Informal */}
        <div className="border border-slate-800/60 rounded-xl overflow-hidden bg-slate-900/10">
          <button
            onClick={() => setIsOpenFormalInformal(!isOpenFormalInformal)}
            className="w-full flex items-center justify-between p-3.5 bg-slate-900/40 hover:bg-slate-900/60 transition-colors text-left cursor-pointer"
          >
            <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Formal vs Informal
            </h4>
            {isOpenFormalInformal ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>
          
          {isOpenFormalInformal && (
            <div className="p-4 space-y-4 animate-fade-in border-t border-slate-800/40">
              <div className="grid grid-cols-1 gap-4 text-[10.5px]">
                {/* Formal channels */}
                <div className="bg-slate-900/40 p-4.5 rounded-xl border border-slate-800/60 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    {ICON_MAP[formalChannels.iconName]}
                    {formalChannels.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {formalChannels.description}
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2 pt-1 text-[10.5px]">
                    {formalChannels.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                        <span className="font-semibold text-slate-300 block mb-0.5">{stat.label}</span>
                        <span className="text-slate-400">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-emerald-500/90 font-medium flex items-center gap-1.5 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                    <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{formalChannels.footerNote}</span>
                  </div>
                </div>

                {/* Informal channels */}
                <div className="bg-slate-900/40 p-4.5 rounded-xl border border-slate-800/60 space-y-3.5">
                  <h4 className="text-xs font-bold text-slate-200 flex items-center gap-2">
                    {ICON_MAP[informalChannels.iconName]}
                    {informalChannels.title}
                  </h4>
                  <p className="text-[10px] text-slate-400 leading-relaxed">
                    {informalChannels.description}
                  </p>

                  <div className="grid grid-cols-1 gap-2 pt-1 text-[10.5px]">
                    {informalChannels.stats.map((stat, idx) => (
                      <div key={idx} className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-850">
                        <span className="font-semibold text-slate-300 block mb-0.5">{stat.label}</span>
                        <span className="text-slate-400">{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="text-[10px] text-amber-500/90 font-medium flex items-center gap-1.5 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                    <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{informalChannels.footerNote}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

