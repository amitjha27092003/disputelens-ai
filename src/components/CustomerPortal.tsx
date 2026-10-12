"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Upload, 
  Sparkles, 
  Camera, 
  CheckCircle, 
  AlertTriangle, 
  FileText, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  QrCode, 
  Zap, 
  Info,
  Shield
} from "lucide-react";
import { DisputeCategory, DisputeCase, DisputeForensicAnalysis } from "@/types/dispute";
import confetti from "canvas-confetti";

interface CustomerPortalProps {
  apiKey: string;
  onDisputeCreated: (newDispute: DisputeCase) => void;
  openSettings: () => void;
}

export function CustomerPortal({
  apiKey,
  onDisputeCreated,
  openSettings
}: CustomerPortalProps) {
  const [orderId, setOrderId] = useState("OD" + Math.floor(100000000000000 + Math.random() * 900000000000000));
  const [category, setCategory] = useState<DisputeCategory>("OBD_MISMATCH");
  const [customerName, setCustomerName] = useState("Karthik Ramanathan");
  const [productName, setProductName] = useState("Apple MacBook Air M3 (16GB RAM, 512GB SSD)");
  const [claimAmountINR, setClaimAmountINR] = useState<number>(114900);
  const [customerStatement, setCustomerStatement] = useState(
    "Delivery agent gave me the brown shipping carton and rushed me to give OTP saying he has 40 orders pending. When I opened the box 30 seconds later in my living room, the Apple box inside had a cut seal and heavy ceramic floor tiles instead of the MacBook."
  );
  const [deliveryOtpVerified, setDeliveryOtpVerified] = useState(true);
  const [doorstepDwellSeconds, setDoorstepDwellSeconds] = useState(42);
  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80"
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    analysis: DisputeForensicAnalysis;
    mode: string;
  } | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const loadSamplePreset = (presetType: "SOAP_SWAP" | "GENUINE_CRACK" | "TAMPERED_SNEAKER") => {
    if (presetType === "SOAP_SWAP") {
      setOrderId("OD889102938102934");
      setCategory("OBD_MISMATCH");
      setProductName("Apple iPhone 15 Pro Max (256GB Natural Titanium)");
      setClaimAmountINR(144900);
      setDoorstepDwellSeconds(38);
      setCustomerStatement("Open box inspection was not honored by courier. Rider insisted on sharing OTP first, then sprinted down the staircase. Box contained two Lifebuoy soap bars.");
      setImagePreview("https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80");
    } else if (presetType === "GENUINE_CRACK") {
      setOrderId("OD772192837461928");
      setCategory("DAMAGED_PRODUCT");
      setProductName("Samsung Neo QLED 65-inch Smart TV");
      setClaimAmountINR(179990);
      setDoorstepDwellSeconds(390);
      setCustomerStatement("Carton bottom corner had a deep puncture. Unboxed in front of Ekart technician; LED panel has severe spider-crack lines across entire right hemisphere.");
      setImagePreview("https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80");
    } else {
      setOrderId("OD443190284719283");
      setCategory("TAMPERED_BOX");
      setProductName("Nike Air Jordan 1 Retro High OG");
      setClaimAmountINR(29999);
      setDoorstepDwellSeconds(75);
      setCustomerStatement("Exterior shipper tape was cut and resealed with generic brown packing tape. Inside box was ripped and replacement barcode sticker does not match invoice.");
      setImagePreview("https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80");
    }
    setAnalysisResult(null);
  };

  const handleScanAndTriage = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/analyze-dispute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          category,
          customerStatement,
          deliveryOtpVerified,
          doorstepDwellSeconds,
          imageBase64: imagePreview,
          apiKey: apiKey || undefined,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setAnalysisResult({
          analysis: data.analysis,
          mode: data.mode,
        });

        // Construct Dispute Case and push to global operations queue
        const newCase: DisputeCase = {
          id: `DSP-${Math.floor(10000 + Math.random() * 90000)}`,
          orderId,
          trackingId: `EKART-LIVE-${Math.floor(100000 + Math.random() * 900000)}`,
          hubLocation: "Ekart Central Logistics Hub (Doorstep Escalation Desk)",
          customerName,
          productName,
          category,
          categoryLabel: 
            category === "OBD_MISMATCH" ? "Open Box Delivery (OBD) Mismatch / Item Swap" :
            category === "DAMAGED_PRODUCT" ? "Transit Impact & Structural Damage" :
            category === "TAMPERED_BOX" ? "Tampered Outer Carton & Resealed Tape" :
            category === "MISSING_HIGH_VALUE" ? "Missing High-Value Internal Component" :
            "Wrong Item Delivered",
          claimAmountINR: Number(claimAmountINR) || 45000,
          submittedAt: "Just now",
          status: data.analysis.recommendedAction === "FRAUD_FLAG_REJECTED" ? "REJECTED_FRAUD" :
                  data.analysis.recommendedAction === "ESCALATE_FIELD_AUDIT" ? "ESCALATED_AUDIT" :
                  "AUTO_RESOLVED",
          riskLevel: data.analysis.tamperingProbability > 75 ? "CRITICAL" :
                     data.analysis.tamperingProbability > 45 ? "HIGH" :
                     data.analysis.tamperingProbability > 20 ? "MEDIUM" : "LOW",
          customerStatement,
          deliveryBoyId: "EK-DEL-LIVE",
          deliveryBoyName: "Live Ingest Courier Agent",
          imageUrl: imagePreview || undefined,
          analysis: data.analysis,
          telemetryLogs: [
            { time: "T-05m", event: "DOORSTEP_ARRIVAL", detail: "Courier scanned doorstep geofence", status: "normal" },
            { time: `T-${doorstepDwellSeconds}s`, event: "OTP_TRANSACTION", detail: deliveryOtpVerified ? "OTP verified by customer" : "OTP bypassed / pending", status: doorstepDwellSeconds < 120 ? "warning" : "normal" },
            { time: "T+00s", event: "PORTAL_AI_INGEST", detail: "Customer filed multimodal escalation", status: "anomaly" }
          ]
        };

        onDisputeCreated(newCase);

        if (data.analysis.recommendedAction === "INSTANT_REFUND_APPROVED" || data.analysis.recommendedAction === "REPLACEMENT_TRIGGERED") {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
    } catch (err) {
      console.error("Forensic scan error:", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Hero / Welcome Splash Banner featuring Centered Large Official Logo */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#0D0F17] via-[#090A0F] to-[#0D0F17] border border-cyan-500/30 p-8 text-center shadow-2xl">
        {/* Soft pulsing neon backlight effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse-subtle" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-blue-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Centered Large Official Logo */}
          <div className="relative mb-4 group cursor-pointer">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-black/60 p-1.5 border border-cyan-500/50 shadow-2xl shadow-cyan-950/80">
              <Image
                src="/logo.png"
                alt="DisputeLens AI Official Logo"
                width={96}
                height={96}
                priority
                className="w-full h-full object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.5)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/50 text-[10px] font-mono font-bold text-cyan-300">
              v3.4
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
            <span>DisputeLens</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              AI
            </span>
          </h2>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 mt-1">
            <span>REVIEW</span>
            <span className="text-cyan-400">•</span>
            <span>ANALYZE</span>
            <span className="text-cyan-400">•</span>
            <span>RESOLVE</span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mt-3 leading-relaxed">
            Enterprise Doorstep Verification & Fraud Triage Intake. Upload unboxing evidence or carton serials to trigger instant multimodal inspection against Ekart logistics telemetry.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5" /> 100% Cryptographic Audit Chain
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
              <Clock className="w-3.5 h-3.5" /> 1.8s Triage Turnaround
            </span>
          </div>
        </div>
      </div>

      {/* Engine Status Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-900/40 border border-cyan-500/40 text-cyan-400">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-xs font-mono font-semibold text-white flex items-center gap-2">
              <span>Customer Self-Service Escalation Desk</span>
              {apiKey ? (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  LIVE GEMINI 1.5 FLASH ACTIVE
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  NEURAL SIMULATION ENGINE
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant AI evaluation of doorstep packaging, courier dwell time, and barcode seals
            </p>
          </div>
        </div>

        {!apiKey && (
          <button
            onClick={openSettings}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono transition-all flex items-center gap-1.5 self-start sm:self-center"
          >
            <span>Connect Gemini API Key</span>
          </button>
        )}
      </div>

      {/* Preset Test Case Fast-Fillers */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-slate-400 flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-cyan-400" /> Fast Pre-fills:
        </span>
        <button
          onClick={() => loadSamplePreset("SOAP_SWAP")}
          className="px-3 py-1 rounded-lg bg-black/60 border border-rose-500/30 text-rose-300 hover:bg-rose-950/40 transition-colors"
        >
          📱 iPhone Soap-Brick Swap (38s Dwell)
        </button>
        <button
          onClick={() => loadSamplePreset("GENUINE_CRACK")}
          className="px-3 py-1 rounded-lg bg-black/60 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-950/40 transition-colors"
        >
          📺 Samsung OLED Broken Transit (Genuine)
        </button>
        <button
          onClick={() => loadSamplePreset("TAMPERED_SNEAKER")}
          className="px-3 py-1 rounded-lg bg-black/60 border border-amber-500/30 text-amber-300 hover:bg-amber-950/40 transition-colors"
        >
          👟 Jordan 1 Resealed Barcode
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Intake Form (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-4 shadow-2xl">
          <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span>Escalation Metadata & Doorstep Narrative</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Flipkart Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Dispute Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as DisputeCategory)}
                className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-white font-sans focus:outline-none focus:border-cyan-400"
              >
                <option value="OBD_MISMATCH">Open Box Delivery (OBD) Mismatch / Swap</option>
                <option value="DAMAGED_PRODUCT">Damaged / Shattered Product in Transit</option>
                <option value="TAMPERED_BOX">Tampered Box / Broken Security Tape</option>
                <option value="MISSING_HIGH_VALUE">Missing High-Value Item or Accessory</option>
                <option value="WRONG_ITEM_DELIVERED">Wrong Item Delivered</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Customer Name
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Claim Valuation (INR)
              </label>
              <input
                type="number"
                value={claimAmountINR}
                onChange={(e) => setClaimAmountINR(Number(e.target.value))}
                className="w-full px-3 py-2 bg-black/50 border border-slate-800 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                Doorstep Dwell Duration (Seconds)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="15"
                  max="600"
                  step="5"
                  value={doorstepDwellSeconds}
                  onChange={(e) => setDoorstepDwellSeconds(Number(e.target.value))}
                  className="w-full accent-cyan-400"
                />
                <span className="font-mono text-xs font-bold text-cyan-300 w-16 text-right">
                  {doorstepDwellSeconds}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <input
              type="checkbox"
              id="otpCheck"
              checked={deliveryOtpVerified}
              onChange={(e) => setDeliveryOtpVerified(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 rounded"
            />
            <label htmlFor="otpCheck" className="text-xs text-slate-300 cursor-pointer">
              Delivery OTP was submitted to courier at doorstep prior to inspection
            </label>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
              Customer Statement Narrative
            </label>
            <textarea
              rows={3}
              value={customerStatement}
              onChange={(e) => setCustomerStatement(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-black/50 border border-slate-800 rounded-xl text-xs text-white leading-relaxed focus:outline-none focus:border-cyan-400"
              placeholder="Describe exact sequence of delivery handoff, package condition, and reason for dispute..."
            />
          </div>

          <button
            onClick={handleScanAndTriage}
            disabled={isAnalyzing}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm tracking-wide shadow-xl shadow-cyan-600/25 transition-all flex items-center justify-center gap-2 font-mono disabled:opacity-50"
          >
            {isAnalyzing ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Running Gemini Multimodal Inspection...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-cyan-200" />
                <span>Scan Evidence & Trigger Forensic AI Triage</span>
              </>
            )}
          </button>
        </div>

        {/* Evidence Uploader & Live AI Output (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Uploader Card */}
          <div className="rounded-2xl bg-[#0D0F17] border border-white/10 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-semibold text-white flex items-center gap-2 border-b border-white/10 pb-4">
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Doorstep Evidence Camera</span>
            </h3>

            <div className="relative rounded-xl border-2 border-dashed border-cyan-500/30 bg-black/40 p-4 text-center group hover:border-cyan-400 transition-colors">
              {imagePreview ? (
                <div className="relative aspect-video rounded-lg overflow-hidden group">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <label className="cursor-pointer px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-mono">
                      Change Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center py-8">
                  <Upload className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-white font-medium">
                    Upload Doorstep Carton Photo or Unboxing Frame
                  </span>
                  <span className="text-[11px] text-slate-500 mt-1">
                    Accepts PNG, JPG, or WebP up to 10MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 font-mono">Forensic Scan Targets:</div>
              <div>• Factory heat-seal tape vs. secondary generic tape</div>
              <div>• Barcode DPI texture & SKU checksum integrity</div>
              <div>• Doorstep physical impact crush profiles</div>
            </div>
          </div>

          {/* Real-time Scan Result Card */}
          {analysisResult && (
            <div className="rounded-2xl bg-gradient-to-br from-[#0D0F17] to-cyan-950/30 border border-cyan-400/40 p-6 space-y-4 shadow-2xl animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-cyan-400" />
                  <h4 className="text-sm font-semibold text-white">Instant AI Triage Verdict</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                  {analysisResult.mode}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-mono uppercase text-slate-400">Verdict Action</div>
                  <div className="text-sm font-mono font-bold text-white mt-0.5 text-cyan-300">
                    {analysisResult.analysis.recommendedAction}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-mono uppercase text-slate-400">Confidence</div>
                  <div className="text-sm font-mono font-bold text-emerald-400 mt-0.5">
                    {analysisResult.analysis.confidenceScore}%
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Tamper Probability</span>
                  <span className={`font-bold ${
                    analysisResult.analysis.tamperingProbability > 50 ? "text-rose-400" : "text-emerald-400"
                  }`}>
                    {analysisResult.analysis.tamperingProbability}%
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-black/50 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Barcode Integrity</span>
                  <span className="font-bold text-cyan-300">
                    {analysisResult.analysis.barcodeIntegrityScore}%
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-black/60 border border-white/5 text-xs text-slate-300 leading-relaxed font-sans">
                {analysisResult.analysis.rootCauseAnalysis}
              </div>

              <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Case automatically ingested into Live Operations Command Center queue</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
