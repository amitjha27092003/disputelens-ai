"use client";

import React, { useState } from "react";
import { 
  DisputeCase, 
  RiskLevel, 
  RecommendedAction, 
  DisputeStatus 
} from "@/types/dispute";
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Filter, 
  Clock, 
  ChevronRight, 
  Eye, 
  MapPin, 
  User, 
  Fingerprint,
  RotateCcw
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

interface CommandCenterQueueProps {
  disputes: DisputeCase[];
  selectedDispute: DisputeCase | null;
  onSelectDispute: (dispute: DisputeCase) => void;
  onUpdateStatus: (id: string, action: RecommendedAction, status: DisputeStatus) => void;
  onResetToDefault: () => void;
}

export function CommandCenterQueue({
  disputes,
  selectedDispute,
  onSelectDispute,
  onUpdateStatus,
  onResetToDefault
}: CommandCenterQueueProps) {
  const [filterRisk, setFilterRisk] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDisputes = disputes.filter((item) => {
    const matchesRisk = filterRisk === "ALL" || item.riskLevel === filterRisk;
    const matchesQuery = 
      item.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRisk && matchesQuery;
  });

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case "CRITICAL":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-950/80 text-rose-300 border border-rose-500/40 flex items-center gap-1 shadow-sm shadow-rose-950">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            CRITICAL
          </span>
        );
      case "HIGH":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            HIGH
          </span>
        );
      case "MEDIUM":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-blue-950/80 text-blue-300 border border-blue-500/40">
            MEDIUM
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            LOW
          </span>
        );
    }
  };

  const getActionBadge = (action: RecommendedAction) => {
    switch (action) {
      case "INSTANT_REFUND_APPROVED":
        return (
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
            REFUND APPROVED
          </span>
        );
      case "REPLACEMENT_TRIGGERED":
        return (
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
            REPLACEMENT SENT
          </span>
        );
      case "ESCALATE_FIELD_AUDIT":
        return (
          <span className="text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">
            FIELD AUDIT QUEUED
          </span>
        );
      case "FRAUD_FLAG_REJECTED":
        return (
          <span className="text-[11px] font-mono text-rose-400 bg-rose-950/40 px-2 py-0.5 rounded border border-rose-500/30">
            FRAUD REJECTED
          </span>
        );
    }
  };

  return (
    <div className="rounded-2xl bg-[#0D0F17]/95 border border-white/10 overflow-hidden shadow-2xl">
      {/* Control Toolbar */}
      <div className="p-4 border-b border-white/10 bg-slate-950/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order ID, Product, or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-all font-mono"
            />
          </div>

          <button 
            onClick={onResetToDefault}
            title="Reset Mock Dataset"
            className="p-2 text-slate-400 hover:text-white bg-black/40 hover:bg-slate-800 border border-slate-800 rounded-xl transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Risk Filter Pills */}
        <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <span className="text-xs text-slate-400 font-mono flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-cyan-400" /> Filter:
          </span>
          {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterRisk(lvl)}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all ${
                filterRisk === lvl
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20"
                  : "bg-black/40 text-slate-400 hover:text-white border border-slate-800"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Disputes Table Queue */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#090A0F] text-slate-400 font-mono uppercase tracking-wider border-b border-white/5">
            <tr>
              <th className="py-3 px-4">Dispute ID & Order</th>
              <th className="py-3 px-4">Customer & Product</th>
              <th className="py-3 px-4">Category / Claim</th>
              <th className="py-3 px-4">Doorstep Telemetry</th>
              <th className="py-3 px-4">Forensic Recommendation</th>
              <th className="py-3 px-4 text-center">Risk Level</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-slate-300">
            {filteredDisputes.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-500 font-mono">
                  No disputes found matching current filter criteria.
                </td>
              </tr>
            ) : (
              filteredDisputes.map((caseItem) => {
                const isSelected = selectedDispute?.id === caseItem.id;
                return (
                  <tr
                    key={caseItem.id}
                    onClick={() => onSelectDispute(caseItem)}
                    className={`cursor-pointer transition-colors group ${
                      isSelected
                        ? "bg-cyan-950/30 border-l-4 border-cyan-400"
                        : "hover:bg-slate-900/60"
                    }`}
                  >
                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {caseItem.id}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {caseItem.orderId}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {caseItem.submittedAt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="font-medium text-slate-200 truncate flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span className="truncate">{caseItem.customerName}</span>
                      </div>
                      <div className="text-slate-400 text-[11px] truncate mt-0.5 font-medium">
                        {caseItem.productName}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <MapPin className="w-3 h-3 text-cyan-500/70 flex-shrink-0" />
                        <span className="truncate">{caseItem.hubLocation}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-white text-xs block font-bold">
                        {formatCurrencyINR(caseItem.claimAmountINR)}
                      </span>
                      <span className="text-[11px] text-slate-300 font-medium line-clamp-1">
                        {caseItem.categoryLabel}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-bold ${
                          caseItem.analysis.dwellAnomalyFlag ? "text-rose-400" : "text-emerald-400"
                        }`}>
                          {caseItem.analysis.courierDwellTimeSeconds}s Dwell
                        </span>
                        <span className="text-slate-400 text-[10px]">
                          / {caseItem.analysis.courierDwellBenchmarkSeconds}s rqd
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">
                        Tamper: <span className="font-semibold text-slate-200">{caseItem.analysis.tamperingProbability}%</span> | Seal: <span className="text-slate-300">{caseItem.analysis.packagingSealStatus}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div>{getActionBadge(caseItem.analysis.recommendedAction)}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        Conf: {caseItem.analysis.confidenceScore}%
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {getRiskBadge(caseItem.riskLevel)}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectDispute(caseItem);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 bg-[#090A0F] border-t border-white/5 flex items-center justify-between text-xs text-slate-400 font-mono">
        <div>
          Showing {filteredDisputes.length} of {disputes.length} active doorstep escalations
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Ekart Edge Telemetry Stream Active (0.2s poll)</span>
        </div>
      </div>
    </div>
  );
}
