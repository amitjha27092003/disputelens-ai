"use client";

import React from "react";
import Image from "next/image";
import { 
  Activity, 
  Cpu, 
  Clock, 
  Settings, 
  Radio, 
  FileCheck2, 
  Sparkles,
  Calculator,
  Layers
} from "lucide-react";

interface HeaderProps {
  activeTab: "COMMAND_CENTER" | "DEEP_DIVE" | "PORTAL" | "CALCULATOR";
  setActiveTab: (tab: "COMMAND_CENTER" | "DEEP_DIVE" | "PORTAL" | "CALCULATOR") => void;
  openSettings: () => void;
  hasApiKey: boolean;
  activeDisputesCount: number;
}

export function Header({
  activeTab,
  setActiveTab,
  openSettings,
  hasApiKey,
  activeDisputesCount
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-950/70 bg-[#090A0F]/90 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo & Lockup */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer group select-none" 
            onClick={() => setActiveTab("COMMAND_CENTER")}
          >
            {/* Logo Image Container with strict aspect ratio, glow, and hover micro-interaction */}
            <div className="relative flex-shrink-0 w-11 h-11 rounded-xl overflow-hidden bg-[#0D0F17] p-1 border border-cyan-500/40 shadow-inner group-hover:border-cyan-400 transition-all duration-300">
              <div className="absolute inset-0 bg-cyan-500/10 rounded-xl blur-sm group-hover:bg-cyan-500/20 transition-all" />
              <Image
                src="/logo.png"
                alt="DisputeLens AI Official Logo"
                width={44}
                height={44}
                priority
                className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(56,189,248,0.35)] transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-white flex items-center">
                  DisputeLens <span className="text-cyan-400 font-extrabold ml-1">AI</span>
                </span>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-semibold tracking-wider">
                  ENTERPRISE v3.4
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 hidden sm:inline-flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  EKART GEOFENCE LIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium hidden md:block">
                Doorstep OBD Discrepancy & Courier Dwell Triage
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-[#0D0F17]/90 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            <button
              onClick={() => setActiveTab("COMMAND_CENTER")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "COMMAND_CENTER"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Radio className={`w-3.5 h-3.5 ${activeTab === "COMMAND_CENTER" ? "animate-spin" : ""}`} />
              <span>Operations Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab("DEEP_DIVE")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "DEEP_DIVE"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Forensic Deep Dive</span>
            </button>

            <button
              onClick={() => setActiveTab("PORTAL")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "PORTAL"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Customer Portal</span>
            </button>

            <button
              onClick={() => setActiveTab("CALCULATOR")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                activeTab === "CALCULATOR"
                  ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-semibold"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span className="hidden md:inline">ROI Impact</span>
            </button>
          </nav>

          {/* Action & Settings Drawer Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={openSettings}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all ${
                hasApiKey
                  ? "border-emerald-500/40 bg-emerald-950/40 text-emerald-300 hover:bg-emerald-900/40"
                  : "border-cyan-500/30 bg-cyan-950/30 text-cyan-300 hover:bg-cyan-900/40"
              }`}
              title="Configure Google Gemini Vision API"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden lg:inline">
                {hasApiKey ? "Gemini 1.5 Flash Connected" : "AI Engine Mode"}
              </span>
              <Settings className="w-3.5 h-3.5 opacity-70" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
