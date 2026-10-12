"use client";

import React, { useState } from "react";
import { 
  DisputeCase, 
  RecommendedAction, 
  DisputeStatus 
} from "@/types/dispute";
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  FileText, 
  Clock, 
  QrCode, 
  Camera, 
  Activity, 
  User, 
  MapPin, 
  Boxes, 
  Layers, 
  Share2, 
  ArrowRight, 
  Flame,
  Check,
  Ban,
  SearchCode
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";
import confetti from "canvas-confetti";

interface ForensicDeepDiveProps {
  dispute: DisputeCase | null;
  onUpdateStatus: (id: string, action: RecommendedAction, status: DisputeStatus) => void;
  onGoToPortal: () => void;
}

export function ForensicDeepDive({
  dispute,
  onUpdateStatus,
  onGoToPortal
}: ForensicDeepDiveProps) {
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  if (!dispute) {
    return (
      <div className="rounded-2xl bg-[#0D0F17] border border-white/10 p-12 text-center text-slate-400">
        <ShieldAlert className="w-12 h-12 text-cyan-400/50 mx-auto mb-3" />
        <h3 className="text-lg font-semibold text-white">No Dispute Case Selected</h3>
        <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
          Select any case from the Live Operations Command Center or submit a fresh case via Customer Portal to inspect forensic breakdown.
        </p>
        <button
          onClick={onGoToPortal}
          className="mt-6 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl text-xs font-semibold"
        >
          Open Customer Portal Intake
        </button>
      </div>
    );
  }

  const { analysis } = dispute;

  const triggerDecision = (action: RecommendedAction, status: DisputeStatus, label: string) => {
    onUpdateStatus(dispute.id, action, status);
    setDecisionFeedback(`Decision applied: ${label}`);
    
    if (action === "INSTANT_REFUND_APPROVED" || action === "REPLACEMENT_TRIGGERED") {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    setTimeout(() => {
      setDecisionFeedback(null);
    }, 3500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner Alert / Decision Feedback */}
      {decisionFeedback && (
        <div className="p-4 rounded-xl bg-cyan-950/80 border border-cyan-400/60 text-cyan-200 text-sm flex items-center justify-between animate-fadeIn shadow-lg shadow-cyan-950">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-cyan-400" />
            <span className="font-semibold font-mono">{decisionFeedback}</span>
          </div>
          <span className="text-xs text-slate-400 font-mono">ERP State Updated</span>
        </div>
      )}

      {/* Primary Header Card */}
      <div className="rounded-2xl bg-[#0D0F17] border border-cyan-500/20 p-6 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold font-mono text-white tracking-wide">
                {dispute.id}
              </span>
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                {dispute.orderId}
              </span>
              <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {dispute.trackingId}
              </span>
            </div>

            <h2 className="text-xl font-bold text-white mt-2">
              {dispute.productName}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1 text-slate-300">
                <User className="w-3.5 h-3.5 text-cyan-400" /> {dispute.customerName}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" /> {dispute.hubLocation}
              </span>
              <span className="flex items-center gap-1 text-slate-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Filed: {dispute.submittedAt}
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs uppercase font-mono text-slate-400">Claim Valuation</div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight text-cyan-400">
              {formatCurrencyINR(dispute.claimAmountINR)}
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              Category: <span className="text-white font-medium">{dispute.categoryLabel}</span>
            </div>
          </div>
        </div>

        {/* 1-Click Operations Trigger Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-black/40 p-3.5 rounded-xl border border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-slate-400">AI Recommended Handoff:</span>
            <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
              analysis.recommendedAction === "FRAUD_FLAG_REJECTED"
                ? "bg-rose-950 text-rose-300 border-rose-500/40"
                : analysis.recommendedAction === "INSTANT_REFUND_APPROVED"
                ? "bg-emerald-950 text-emerald-300 border-emerald-500/40"
                : analysis.recommendedAction === "REPLACEMENT_TRIGGERED"
                ? "bg-cyan-950 text-cyan-300 border-cyan-500/40"
                : "bg-amber-950 text-amber-300 border-amber-500/40"
            }`}>
              {analysis.recommendedAction} (Confidence: {analysis.confidenceScore}%)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => triggerDecision("INSTANT_REFUND_APPROVED", "AUTO_RESOLVED", "Instant Refund Initiated")}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-emerald-900/30 flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Approve Refund
            </button>
            <button
              onClick={() => triggerDecision("REPLACEMENT_TRIGGERED", "AUTO_RESOLVED", "Priority Replacement Dispatched")}
              className="px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-cyan-900/30 flex items-center gap-1"
            >
              <Boxes className="w-3.5 h-3.5" /> Trigger Replacement
            </button>
            <button
              onClick={() => triggerDecision("ESCALATE_FIELD_AUDIT", "ESCALATED_AUDIT", "Escalated to Field Audit & Regional Loss Prevention")}
              className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-mono font-bold transition-all shadow-md shadow-amber-900/30 flex items-center gap-1"
            >
              <SearchCode className="w-3.5 h-3.5" /> Escalate Field Audit
            </button>
            <button
              onClick={() => triggerDecision("FRAUD_FLAG_REJECTED", "REJECTED_FRAUD", "Claim Rejected for Fraud & Blacklist Flagged")}
              className="px-3 py-1.5 rounded-xl bg-rose-700 hover:bg-rose-600 text-white text-xs font-mono font-bold transition-all shadow-md shadow-rose-950/40 flex items-center gap-1"
            >
              <Ban className="w-3.5 h-3.5" /> Reject Claim (Fraud)
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Multimodal Forensic Analysis & Doorstep Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Visual Evidence & Computer Vision Artifacts (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card: Computer Vision & Evidence Scan */}
          <div className="rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">
                  Doorstep Visual Evidence & Seal Inspection
                </h3>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Multimodal OCR + Structural Scan
              </span>
            </div>

            {/* Evidence Image with HUD Overlays */}
            <div className="relative rounded-xl overflow-hidden bg-black/60 border border-cyan-500/20 aspect-video group">
              {dispute.imageUrl ? (
                <img
                  src={dispute.imageUrl}
                  alt="Evidence capture"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-500">
                  <Camera className="w-10 h-10 mb-2 opacity-50" />
                  <span>No visual evidence image attached</span>
                </div>
              )}

              {/* HUD Target Reticle */}
              <div className="absolute inset-0 pointer-events-none border border-cyan-500/30 m-3 rounded-lg flex flex-col justify-between p-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] bg-black/80 text-cyan-400 px-2 py-0.5 rounded border border-cyan-500/40">
                    ANOMALY SCAN: {analysis.tamperingProbability > 50 ? "BREACH CONFIRMED" : "CLEAN"}
                  </span>
                  <span className="font-mono text-[10px] bg-black/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40">
                    MATCH: 99.4%
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div className="space-y-1 font-mono text-[9px] text-slate-400 bg-black/80 p-2 rounded border border-white/10 backdrop-blur-sm">
                    <div>LAT/LON: 12.9352° N, 77.6245° E</div>
                    <div>SEAL INTEGRITY: {analysis.packagingSealStatus}</div>
                  </div>
                  <span className="font-mono text-[10px] bg-cyan-950/90 text-cyan-300 px-2 py-1 rounded border border-cyan-400/30">
                    OPTICAL SPECTRAL PASS
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Anomalies Detected */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                Physical Anomaly Vector Checklist:
              </h4>
              <div className="space-y-2">
                {analysis.visualAnomaliesDetected.map((anomaly, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 font-sans"
                  >
                    <span className="font-mono text-cyan-400 font-bold">0{idx + 1}.</span>
                    <span>{anomaly}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Statement */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-white/5 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  Customer First-Party Statement
                </span>
                <span className="text-[10px] text-slate-400">Filed at Doorstep Handoff</span>
              </div>
              <p className="text-xs text-slate-200 italic leading-relaxed">
                "{dispute.customerStatement}"
              </p>
            </div>
          </div>

          {/* Root Cause Analysis (RCA) Box */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0D0F17] to-slate-900/90 border border-cyan-500/30 p-6 space-y-3 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-base font-semibold text-white">
                Forensic Root Cause Analysis (RCA)
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {analysis.rootCauseAnalysis}
            </p>
          </div>
        </div>

        {/* Right Column: Telemetry, Geofence & Dwell-Time Forensic (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Card: Forensic Dwell Time & Delivery Telemetry */}
          <div className="rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <h3 className="text-base font-semibold text-white">
                  Ekart Telemetry Correlation
                </h3>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                GPS + BLE Verified
              </span>
            </div>

            {/* Doorstep Dwell Time Gauge */}
            <div className="p-4 rounded-xl bg-black/50 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Doorstep Dwell Duration:</span>
                <span className={`font-mono font-bold ${
                  analysis.dwellAnomalyFlag ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {analysis.courierDwellTimeSeconds} Seconds
                </span>
              </div>

              {/* Progress Bar vs Benchmark */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-1000 ${
                    analysis.dwellAnomalyFlag ? "bg-rose-500" : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${Math.min(
                      (analysis.courierDwellTimeSeconds / analysis.courierDwellBenchmarkSeconds) * 100,
                      100
                    )}%`
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Rider: {analysis.courierDwellTimeSeconds}s</span>
                <span>OBD Mandatory: {analysis.courierDwellBenchmarkSeconds}s (5 mins)</span>
              </div>

              {analysis.dwellAnomalyFlag ? (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Dwell Deficit: Under-threshold handoff indicates premature OTP capture without inspection.
                  </span>
                </div>
              ) : (
                <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    Compliance Verified: Dwell time exceeds 5-minute unboxing verification threshold.
                  </span>
                </div>
              )}
            </div>

            {/* Radar Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  Tampering Probability
                </div>
                <div className={`text-xl font-mono font-bold mt-1 ${
                  analysis.tamperingProbability > 60 ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {analysis.tamperingProbability}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  Barcode Integrity
                </div>
                <div className={`text-xl font-mono font-bold mt-1 ${
                  analysis.barcodeIntegrityScore < 50 ? "text-rose-400" : "text-emerald-400"
                }`}>
                  {analysis.barcodeIntegrityScore}%
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  Seal Condition
                </div>
                <div className="text-xs font-mono font-bold mt-1 text-cyan-300 truncate">
                  {analysis.packagingSealStatus}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-[11px] font-mono uppercase text-slate-400">
                  Customer Risk Trust
                </div>
                <div className="text-xl font-mono font-bold mt-1 text-slate-200">
                  {analysis.customerRiskScore}/100
                </div>
              </div>
            </div>

            {/* Telemetry Timeline Log */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
                <span>Doorstep GPS & Scanner Log</span>
                <span className="text-[10px] text-slate-400 font-mono">Real-time Ingestion</span>
              </h4>

              <div className="relative border-l border-cyan-500/30 ml-3 space-y-4 text-xs">
                {dispute.telemetryLogs.map((log, idx) => (
                  <div key={idx} className="relative pl-6">
                    <span className={`absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full ${
                      log.status === "anomaly" 
                        ? "bg-rose-500 ring-4 ring-rose-950" 
                        : log.status === "warning"
                        ? "bg-amber-500 ring-4 ring-amber-950"
                        : "bg-emerald-500 ring-4 ring-emerald-950"
                    }`} />
                    
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-cyan-400 font-bold">{log.time}</span>
                      <span className="text-white font-semibold">{log.event}</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {log.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Personnel Profile */}
            <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400 font-mono">Assigned Ekart Runner</div>
                <div className="text-xs font-bold text-white mt-0.5">{dispute.deliveryBoyName}</div>
                <div className="text-[10px] text-slate-400 font-mono">ID: {dispute.deliveryBoyId}</div>
              </div>
              <span className="text-xs font-mono px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                Verified Hub Badge
              </span>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
