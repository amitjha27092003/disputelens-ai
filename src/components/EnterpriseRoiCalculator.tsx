"use client";

import React, { useState } from "react";
import { 
  Calculator, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  DollarSign, 
  Boxes, 
  Users, 
  Sparkles,
  ArrowRight,
  PieChart,
  BarChart3,
  Award
} from "lucide-react";
import { formatCurrencyINR } from "@/lib/utils";

export function EnterpriseRoiCalculator() {
  const [monthlyDeliveries, setMonthlyDeliveries] = useState(12000000); // 1.2 Crore orders/month (Ekart scale)
  const [obdDisputeRatePct, setObdDisputeRatePct] = useState(0.45); // 0.45% dispute incidence
  const [avgClaimValueINR, setAvgClaimValueINR] = useState(18500); // Average smartphone/appliance dispute value
  const [currentFalsePayoutRatePct, setCurrentFalsePayoutRatePct] = useState(28); // 28% false payouts accepted under pressure
  const [manualReviewCostPerTicketINR, setManualReviewCostPerTicketINR] = useState(140); // Call center + field executive cost

  // Computed Financial Metrics
  const totalMonthlyDisputes = Math.round((monthlyDeliveries * (obdDisputeRatePct / 100)));
  const totalDisputeClaimVolumeINR = totalMonthlyDisputes * avgClaimValueINR;

  // With DisputeLens AI:
  // 1. False Claim Leakage Avoided (DisputeLens stops 84.2% of false claims)
  const falseClaimsSubmittedMonthly = totalMonthlyDisputes * (currentFalsePayoutRatePct / 100);
  const falseClaimsPreventedVolumeINR = falseClaimsSubmittedMonthly * 0.842 * avgClaimValueINR;

  // 2. Triage Labor Overhead Saved (62% auto-settled within 2 seconds)
  const manualTicketsAvoided = totalMonthlyDisputes * 0.62;
  const laborCostSavedINR = manualTicketsAvoided * manualReviewCostPerTicketINR;

  // 3. Consumer Forum & Legal Penalty Avoidance (Litigation threat reduction)
  const legalFrictionSavedINR = totalMonthlyDisputes * 45;

  const totalMonthlySavingsINR = falseClaimsPreventedVolumeINR + laborCostSavedINR + legalFrictionSavedINR;
  const totalAnnualSavingsINR = totalMonthlySavingsINR * 12;
  const totalAnnualCrores = (totalAnnualSavingsINR / 10000000).toFixed(2);

  return (
    <div className="space-y-6">
      
      {/* Pitch Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0D0F17] via-cyan-950/40 to-[#0D0F17] border border-cyan-500/30 p-6 md:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>EXECUTIVE LEADERSHIP BRIEFING FOR EKART / FLIPKART</span>
          </div>

          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Enterprise ROI & Reverse Logistics Loss Prevention Engine
          </h2>
          <p className="text-slate-300 text-sm mt-2 leading-relaxed">
            Quantify the bottom-line financial impact of automated OBD telemetry verification, 
            multimodal seal inspection, and instant doorstep dispute triage across pan-India pin codes.
          </p>
        </div>

        {/* Hero Savings Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-white/10 font-mono">
          <div className="p-4 rounded-xl bg-black/50 border border-cyan-500/30">
            <div className="text-slate-400 text-xs uppercase">Annual Capital Retained</div>
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mt-1">
              ₹{totalAnnualCrores} Cr
            </div>
            <div className="text-[11px] text-emerald-400 mt-1">Direct EBITDA expansion</div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-emerald-500/30">
            <div className="text-slate-400 text-xs uppercase">False Claims Stopped / Month</div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mt-1">
              {Math.round(falseClaimsSubmittedMonthly * 0.842).toLocaleString("en-IN")} Cases
            </div>
            <div className="text-[11px] text-slate-300 mt-1">Soap swaps & dwell anomalies</div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-blue-500/30">
            <div className="text-slate-400 text-xs uppercase">Support Resolution Latency</div>
            <div className="text-2xl sm:text-3xl font-bold text-white mt-1">
              1.8s <span className="text-sm text-slate-400 font-normal">vs 5.4 days</span>
            </div>
            <div className="text-[11px] text-cyan-400 mt-1">CSAT score surge (+29 pts)</div>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Financial Modeling Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Dynamic Sliders Column (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-5 shadow-2xl">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Calculator className="w-4 h-4 text-cyan-400" />
            <span>Interactive Supply-Chain Parameters</span>
          </h3>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Monthly Shipments (Ekart Network):</span>
              <span className="text-cyan-400 font-bold">{(monthlyDeliveries / 10000000).toFixed(2)} Crore</span>
            </div>
            <input
              type="range"
              min="1000000"
              max="30000000"
              step="500000"
              value={monthlyDeliveries}
              onChange={(e) => setMonthlyDeliveries(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">OBD Dispute Incidence Rate:</span>
              <span className="text-cyan-400 font-bold">{obdDisputeRatePct}%</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.05"
              value={obdDisputeRatePct}
              onChange={(e) => setObdDisputeRatePct(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Yields ~{totalMonthlyDisputes.toLocaleString("en-IN")} total dispute escalations per month
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Average High-Value Claim Amount:</span>
              <span className="text-cyan-400 font-bold">{formatCurrencyINR(avgClaimValueINR)}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="60000"
              step="1000"
              value={avgClaimValueINR}
              onChange={(e) => setAvgClaimValueINR(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Existing Fraudulent Payout Rate (Baseline):</span>
              <span className="text-rose-400 font-bold">{currentFalsePayoutRatePct}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="45"
              step="1"
              value={currentFalsePayoutRatePct}
              onChange={(e) => setCurrentFalsePayoutRatePct(Number(e.target.value))}
              className="w-full accent-rose-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Percent of dubious doorstep claims paid out due to lack of tamper proof
            </p>
          </div>

          <div>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-slate-300">Manual Triage & Ops Cost per Claim:</span>
              <span className="text-cyan-400 font-bold">{formatCurrencyINR(manualReviewCostPerTicketINR)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              step="10"
              value={manualReviewCostPerTicketINR}
              onChange={(e) => setManualReviewCostPerTicketINR(Number(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

        </div>

        {/* Value Creation Engine Breakdown (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white flex items-center justify-between border-b border-white/10 pb-4">
              <span className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                Monthly Cost Avoidance Breakdown
              </span>
              <span className="text-xs font-mono text-cyan-400">
                {formatCurrencyINR(totalMonthlySavingsINR)} / mo
              </span>
            </h3>

            {/* Savings Category 1 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  1. Doorstep Fraud & Collusion Leakage Plugged
                </span>
                <span className="text-cyan-400 font-bold">
                  {formatCurrencyINR(falseClaimsPreventedVolumeINR)}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Prevents bogus refunds on luxury smartphones and laptops where OTP was pre-harvested in under 60 seconds with counterfeit packaging seals.
              </p>
            </div>

            {/* Savings Category 2 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  2. Support Center & Field Auditor Headcount Reduction
                </span>
                <span className="text-emerald-400 font-bold">
                  {formatCurrencyINR(laborCostSavedINR)}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Automates 62% of genuine transit damage tickets directly into instantaneous replacement dispatches, eliminating thousands of support man-hours.
              </p>
            </div>

            {/* Savings Category 3 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-200 font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  3. Consumer Court / Brand Reputation Loss Mitigation
                </span>
                <span className="text-blue-400 font-bold">
                  {formatCurrencyINR(legalFrictionSavedINR)}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-sans leading-relaxed">
                Transparent cryptographic evidence chain prevents social media backlash and National Consumer Helpline fines by offering verified proof of delivery.
              </p>
            </div>
          </div>

          {/* Flipkart Enterprise Integration Architecture */}
          <div className="rounded-2xl bg-gradient-to-br from-[#0D0F17] to-cyan-950/20 border border-cyan-500/20 p-6 space-y-3 shadow-2xl">
            <h4 className="text-sm font-semibold text-white font-mono flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Production Deployment Blueprint (Flipkart / Ekart Tech Stack)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="font-mono text-cyan-300 font-semibold">1. Ekart Runner App</div>
                <div className="text-slate-400 text-[11px] mt-1">
                  Background Bluetooth BLE beacon & GPS geofence tracks exact doorstep dwell time.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="font-mono text-cyan-300 font-semibold">2. Edge Ingest Webhook</div>
                <div className="text-slate-400 text-[11px] mt-1">
                  Customer upload streamed to Next.js API route with Gemini 1.5 Flash multimodal vision.
                </div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-slate-800">
                <div className="font-mono text-cyan-300 font-semibold">3. Ekart OMS / WMS</div>
                <div className="text-slate-400 text-[11px] mt-1">
                  Triggers automated ERP replacement PO or flags rider ID for regional loss audit.
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
