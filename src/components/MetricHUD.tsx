"use client";

import React from "react";
import { 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  Boxes,
  ArrowUpRight,
  TrendingDown
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

interface MetricHUDProps {
  totalDisputes: number;
  criticalDisputes: number;
}

export function MetricHUD({ totalDisputes, criticalDisputes }: MetricHUDProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      {/* Metric 1: Triage Latency */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#0D0F17]/90 border border-cyan-500/20 p-4 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-950/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Average Triage Latency
          </span>
          <div className="p-1.5 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            1.8s
          </span>
          <span className="text-xs text-emerald-400 flex items-center font-medium">
            <TrendingDown className="w-3 h-3 mr-0.5" /> -98.2% vs Manual
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          Ekart Ingest Telemetry Synchronized
        </p>
      </div>

      {/* Metric 2: False Claim Prevention */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#0D0F17]/90 border border-blue-500/20 p-4 transition-all duration-300 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-950/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            False Claim Prevention Rate
          </span>
          <div className="p-1.5 rounded-lg bg-blue-950 border border-blue-500/30 text-blue-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            84.2%
          </span>
          <span className="text-xs text-emerald-400 flex items-center font-medium">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +14.6% QoQ
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          Detects soap/brick swaps & pre-entered OTP collusion
        </p>
      </div>

      {/* Metric 3: Instant Settlement Ratio */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#0D0F17]/90 border border-emerald-500/20 p-4 transition-all duration-300 hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-950/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Instant Settlement Ratio
          </span>
          <div className="p-1.5 rounded-lg bg-emerald-950 border border-emerald-500/30 text-emerald-400">
            <Boxes className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            62.4%
          </span>
          <span className="text-xs text-cyan-400 flex items-center font-medium">
            <ArrowUpRight className="w-3 h-3 mr-0.5" /> Instant Refund / Reorder
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          Genuine transit damage resolved without customer support wait
        </p>
      </div>

      {/* Metric 4: Monthly Escalation Cost Saved */}
      <div className="relative group overflow-hidden rounded-2xl bg-[#0D0F17]/90 border border-amber-500/20 p-4 transition-all duration-300 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-950/40">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Monthly Cost Saved (Flipkart)
          </span>
          <div className="p-1.5 rounded-lg bg-amber-950 border border-amber-500/30 text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono tracking-tight text-white">
            ₹1.42 Cr
          </span>
          <span className="text-xs text-emerald-400 flex items-center font-medium">
            +32.8% ROI
          </span>
        </div>
        <p className="text-[11px] text-slate-400 mt-2">
          {criticalDisputes} Critical high-value disputes active in queue
        </p>
      </div>

    </div>
  );
}
