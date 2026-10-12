"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { MetricHUD } from "@/components/MetricHUD";
import { CommandCenterQueue } from "@/components/CommandCenterQueue";
import { ForensicDeepDive } from "@/components/ForensicDeepDive";
import { CustomerPortal } from "@/components/CustomerPortal";
import { EnterpriseRoiCalculator } from "@/components/EnterpriseRoiCalculator";
import { ApiKeyModal } from "@/components/ApiKeyModal";
import { DisputeCase, RecommendedAction, DisputeStatus } from "@/types/dispute";
import { INITIAL_DISPUTES } from "@/data/mockDisputes";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"COMMAND_CENTER" | "DEEP_DIVE" | "PORTAL" | "CALCULATOR">("COMMAND_CENTER");
  const [disputes, setDisputes] = useState<DisputeCase[]>(INITIAL_DISPUTES);
  const [selectedDispute, setSelectedDispute] = useState<DisputeCase | null>(INITIAL_DISPUTES[0]);
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");

  // Load persisted disputes and API key from localStorage on mount
  useEffect(() => {
    try {
      const storedKey = localStorage.getItem("disputelens_gemini_api_key");
      if (storedKey) {
        setApiKey(storedKey);
      }

      const storedDisputes = localStorage.getItem("disputelens_cases");
      if (storedDisputes) {
        const parsed = JSON.parse(storedDisputes);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setDisputes(parsed);
          setSelectedDispute(parsed[0]);
        }
      }
    } catch (e) {
      console.warn("LocalStorage retrieval error:", e);
    }
  }, []);

  const saveApiKey = (newKey: string) => {
    setApiKey(newKey);
    try {
      if (newKey) {
        localStorage.setItem("disputelens_gemini_api_key", newKey);
      } else {
        localStorage.removeItem("disputelens_gemini_api_key");
      }
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }
  };

  const handleSelectDispute = (dispute: DisputeCase) => {
    setSelectedDispute(dispute);
    setActiveTab("DEEP_DIVE");
  };

  const handleUpdateStatus = (id: string, action: RecommendedAction, status: DisputeStatus) => {
    setDisputes((prev) => {
      const updated = prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            analysis: {
              ...item.analysis,
              recommendedAction: action,
            },
          };
        }
        return item;
      });
      try {
        localStorage.setItem("disputelens_cases", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    if (selectedDispute && selectedDispute.id === id) {
      setSelectedDispute((prev) =>
        prev
          ? {
              ...prev,
              status,
              analysis: {
                ...prev.analysis,
                recommendedAction: action,
              },
            }
          : null
      );
    }
  };

  const handleDisputeCreated = (newCase: DisputeCase) => {
    setDisputes((prev) => {
      const updated = [newCase, ...prev];
      try {
        localStorage.setItem("disputelens_cases", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
    setSelectedDispute(newCase);
  };

  const handleResetToDefault = () => {
    setDisputes(INITIAL_DISPUTES);
    setSelectedDispute(INITIAL_DISPUTES[0]);
    try {
      localStorage.removeItem("disputelens_cases");
    } catch (e) {}
  };

  const criticalCount = disputes.filter((d) => d.riskLevel === "CRITICAL").length;

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F1F5F9] hud-grid selection:bg-cyan-500 selection:text-black">
      {/* High-tech ambient background flare */}
      <div className="fixed inset-0 pointer-events-none radial-scanline z-0" />

      {/* Persistent Cinematic Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSettings={() => setIsApiKeyModalOpen(true)}
        hasApiKey={Boolean(apiKey && apiKey.trim().length > 5)}
        activeDisputesCount={disputes.length}
      />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Metric HUD Banner (Always available across views for situational awareness) */}
        <MetricHUD
          totalDisputes={disputes.length}
          criticalDisputes={criticalCount}
        />

        {/* View 1: Operations Command Center */}
        {activeTab === "COMMAND_CENTER" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Live Doorstep Triage Stream</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    FLIPKART / EKART REGIONAL HUBS
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Real-time ingest of Open Box Delivery discrepancies, dwell time anomalies, and tamper alerts.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("PORTAL")}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-mono font-bold shadow-lg shadow-cyan-600/20 transition-all self-start sm:self-center"
              >
                + File New Customer Dispute
              </button>
            </div>

            <CommandCenterQueue
              disputes={disputes}
              selectedDispute={selectedDispute}
              onSelectDispute={handleSelectDispute}
              onUpdateStatus={handleUpdateStatus}
              onResetToDefault={handleResetToDefault}
            />
          </div>
        )}

        {/* View 2: Dispute Deep Dive & Forensic Audit */}
        {activeTab === "DEEP_DIVE" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Dispute Deep Dive & Forensic Audit</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                    CASE DOSSIER
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Multimodal seal inspection, optical barcode verification, and rider GPS dwell timeline.
                </p>
              </div>
              <button
                onClick={() => setActiveTab("COMMAND_CENTER")}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white"
              >
                ← Return to Queue
              </button>
            </div>

            <ForensicDeepDive
              dispute={selectedDispute}
              onUpdateStatus={handleUpdateStatus}
              onGoToPortal={() => setActiveTab("PORTAL")}
            />
          </div>
        )}

        {/* View 3: Customer Self-Service Escalation Portal */}
        {activeTab === "PORTAL" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Customer Self-Service Escalation Portal</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  INTERACTIVE INTAKE
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Upload unboxing evidence, describe delivery experience, and run instantaneous AI triage.
              </p>
            </div>

            <CustomerPortal
              apiKey={apiKey}
              onDisputeCreated={(newCase) => {
                handleDisputeCreated(newCase);
                setActiveTab("DEEP_DIVE");
              }}
              openSettings={() => setIsApiKeyModalOpen(true)}
            />
          </div>
        )}

        {/* View 4: Enterprise ROI & Impact Calculator */}
        {activeTab === "CALCULATOR" && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                <span>Executive ROI & Logistics Impact Modeling</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  ENTERPRISE PITCH
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Financial projection of fraud prevention, support cost deflation, and CSAT impact for Flipkart.
              </p>
            </div>

            <EnterpriseRoiCalculator />
          </div>
        )}

      </main>

      {/* Settings Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveKey={saveApiKey}
      />

      {/* Production Footer */}
      <footer className="mt-16 border-t border-white/5 py-8 text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>DisputeLens AI • Enterprise Post-Delivery Dispute & Fraud Triage Engine</span>
          </div>
          <div>
            Powered by Google Gemini 1.5 Flash Vision & Ekart Logistics Edge Telemetry
          </div>
        </div>
      </footer>
    </div>
  );
}
