export type DisputeCategory = 
  | "OBD_MISMATCH" 
  | "TAMPERED_BOX" 
  | "MISSING_HIGH_VALUE" 
  | "DAMAGED_PRODUCT"
  | "WRONG_ITEM_DELIVERED";

export type DisputeStatus = 
  | "UNDER_AI_TRIAGE" 
  | "AUTO_RESOLVED" 
  | "ESCALATED_AUDIT" 
  | "REJECTED_FRAUD";

export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type RecommendedAction = 
  | "INSTANT_REFUND_APPROVED" 
  | "REPLACEMENT_TRIGGERED" 
  | "ESCALATE_FIELD_AUDIT" 
  | "FRAUD_FLAG_REJECTED";

export interface TelemetryEvent {
  time: string;
  event: string;
  detail: string;
  status: "normal" | "anomaly" | "warning";
}

export interface DisputeForensicAnalysis {
  tamperingProbability: number; // 0 - 100
  barcodeIntegrityScore: number; // 0 - 100
  packagingSealStatus: "INTACT" | "SUSPICIOUS_RESEAL" | "TORN_BREACHED" | "MANUFACTURE_DEFECT";
  courierDwellTimeSeconds: number;
  courierDwellBenchmarkSeconds: number;
  dwellAnomalyFlag: boolean;
  recommendedAction: RecommendedAction;
  confidenceScore: number; // 0 - 100
  rootCauseAnalysis: string;
  visualAnomaliesDetected: string[];
  geoMismatchDistanceMeters: number;
  deliveryOtpVerified: boolean;
  customerRiskScore: number; // 0 - 100 (historical trust metric)
  estimatedClaimValueINR: number;
}

export interface DisputeCase {
  id: string;
  orderId: string;
  trackingId: string;
  hubLocation: string;
  customerName: string;
  productName: string;
  category: DisputeCategory;
  categoryLabel: string;
  claimAmountINR: number;
  submittedAt: string;
  status: DisputeStatus;
  riskLevel: RiskLevel;
  customerStatement: string;
  deliveryBoyId: string;
  deliveryBoyName: string;
  imageUrl?: string;
  imageThumbnail?: string;
  analysis: DisputeForensicAnalysis;
  telemetryLogs: TelemetryEvent[];
}
