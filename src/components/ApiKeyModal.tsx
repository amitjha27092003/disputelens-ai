"use client";

import React, { useState, useEffect } from "react";
import { KeyRound, ShieldCheck, Sparkles, X, Check, ExternalLink } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveKey: (key: string) => void;
}

export function ApiKeyModal({ isOpen, onClose, apiKey, onSaveKey }: ApiKeyModalProps) {
  const [inputKey, setInputKey] = useState(apiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setInputKey(apiKey);
  }, [apiKey]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSaveKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  const handleClear = () => {
    setInputKey("");
    onSaveKey("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D101A] border border-cyan-500/30 p-6 shadow-2xl shadow-cyan-950/50">
        {/* Neon accent top border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 rounded-t-2xl" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 shadow-inner">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white tracking-wide flex items-center gap-2">
                Gemini AI Engine Settings
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  Multimodal
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Connect your Google AI Studio API Key for live Gemini 1.5 Flash Vision triage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 py-5 text-sm">
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-medium text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hybrid Vision & Telemetry Engine</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              DisputeLens AI comes with an integrated high-precision offline forensic simulator. 
              Adding your free Gemini API key upgrades all unboxing and label scans to 
              <strong className="text-white"> Google Gemini 1.5 Flash</strong> live image reasoning.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
              Google Gemini API Key
            </label>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-slate-700 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-slate-200 placeholder-slate-600 font-mono text-sm transition-all"
            />
            <div className="flex items-center justify-between mt-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
              >
                <span>Get a free API key at Google AI Studio</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              {apiKey && (
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Key active in session
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
          {apiKey && (
            <button
              onClick={handleClear}
              className="px-4 py-2 text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              Reset to Mock Engine
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={savedSuccess}
            className="flex items-center gap-1.5 px-5 py-2 text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-xl shadow-lg shadow-cyan-500/20 transition-all font-mono"
          >
            {savedSuccess ? (
              <>
                <Check className="w-3.5 h-3.5" /> Saved Successfully!
              </>
            ) : (
              "Save API Key"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
