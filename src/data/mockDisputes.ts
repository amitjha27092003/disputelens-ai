import { DisputeCase } from "@/types/dispute";

export const INITIAL_DISPUTES: DisputeCase[] = [
  {
    id: "DSP-84920",
    orderId: "OD338291048291001",
    trackingId: "EKART-BLR-902188",
    hubLocation: "Ekart South Hub (Koramangala 4th Block, Bengaluru)",
    customerName: "Vikramaditya Sengupta",
    productName: "Apple iPhone 15 Pro Max (256GB - Natural Titanium)",
    category: "OBD_MISMATCH",
    categoryLabel: "Open Box Delivery (OBD) Mismatch / Brick Swap",
    claimAmountINR: 144900,
    submittedAt: "12 mins ago",
    status: "REJECTED_FRAUD",
    riskLevel: "CRITICAL",
    customerStatement: "I opened the box during delivery and found two Vim dishwashing detergent bars wrapped in cardboard instead of the phone. Delivery agent vanished immediately without waiting for OTP cancellation.",
    deliveryBoyId: "EK-DEL-4921",
    deliveryBoyName: "Rajesh K. (Rating: 4.89)",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
    analysis: {
      tamperingProbability: 94,
      barcodeIntegrityScore: 12,
      packagingSealStatus: "SUSPICIOUS_RESEAL",
      courierDwellTimeSeconds: 38,
      courierDwellBenchmarkSeconds: 300,
      dwellAnomalyFlag: true,
      recommendedAction: "FRAUD_FLAG_REJECTED",
      confidenceScore: 97,
      rootCauseAnalysis: "CRITICAL COLLUSION PATTERN: Doorstep GPS geofence recorded dwell time of only 38 seconds for a mandatory 5-minute Open Box Inspection protocol. Customer entered pre-shared OTP at T+12s before inspection. Forensic scan identifies counterfeit heat-reseal tape along factory seam and serial weight discrepancy (-148g compared to calibrated manifest weight at Sort Center B).",
      visualAnomaliesDetected: [
        "Thermal adhesive double-tape residue on right edge",
        "IMEI barcode label reprint DPI blur (non-Apple thermal substrate)",
        "Missing tamper-evident tear strip micro-perforations"
      ],
      geoMismatchDistanceMeters: 4,
      deliveryOtpVerified: true,
      customerRiskScore: 78,
      estimatedClaimValueINR: 144900
    },
    telemetryLogs: [
      { time: "11:42:01", event: "VAN_ARRIVE", detail: "Vehicle geofence trigger at customer gate", status: "normal" },
      { time: "11:42:19", event: "OTP_TRIGGERED", detail: "OTP prompt opened on Ekart Runner App", status: "normal" },
      { time: "11:42:39", event: "OTP_SUCCESS", detail: "Customer OTP entered & validated in 20s", status: "warning" },
      { time: "11:42:47", event: "DELIVERY_COMPLETE", detail: "Dwell time total 38s (Threshold: 300s)", status: "anomaly" },
      { time: "11:48:10", event: "DISPUTE_FILED", detail: "Escalation registered via Flipkart Mobile App", status: "anomaly" }
    ]
  },
  {
    id: "DSP-84921",
    orderId: "OD910283921098224",
    trackingId: "EKART-DEL-448291",
    hubLocation: "Ekart North Hub (Okhla Industrial Area, New Delhi)",
    customerName: "Pooja Malhotra",
    productName: "Sony Bravia 55-inch 4K OLED Smart TV (XR-55A80L)",
    category: "DAMAGED_PRODUCT",
    categoryLabel: "Transit Structural Damage / Shattered Panel",
    claimAmountINR: 129990,
    submittedAt: "28 mins ago",
    status: "AUTO_RESOLVED",
    riskLevel: "LOW",
    customerStatement: "The outer carton was badly dented at bottom left corner. During open box unboxing in presence of technician, vertical spider-web cracks across the OLED matrix were visible. Technician signed inspection slip.",
    deliveryBoyId: "EK-DEL-8902",
    deliveryBoyName: "Manpreet Singh (Rating: 4.95)",
    imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80",
    analysis: {
      tamperingProbability: 6,
      barcodeIntegrityScore: 98,
      packagingSealStatus: "TORN_BREACHED",
      courierDwellTimeSeconds: 412,
      courierDwellBenchmarkSeconds: 300,
      dwellAnomalyFlag: false,
      recommendedAction: "REPLACEMENT_TRIGGERED",
      confidenceScore: 99,
      rootCauseAnalysis: "GENUINE TRANSIT IMPACT: Optical stress analysis confirms blunt-force compression fracture originating from lower bottom quadrant. Box impact sensor indicates 18G drop shock at Line-haul transport segment between Gurgaon and Okhla Hub. Courier dwell time (6m 52s) corroborates full open-box technician verification protocol.",
      visualAnomaliesDetected: [
        "Sub-surface micro-fracture spidering along panel substrate",
        "Corrugated box puncture match with impact radius",
        "Original Ekart tamper-void tape intact with uncompromised hologram"
      ],
      geoMismatchDistanceMeters: 2,
      deliveryOtpVerified: true,
      customerRiskScore: 8,
      estimatedClaimValueINR: 129990
    },
    telemetryLogs: [
      { time: "10:15:00", event: "VAN_ARRIVE", detail: "Delivery van stationed at apartment complex", status: "normal" },
      { time: "10:16:30", event: "OBD_SESSION_START", detail: "Technician & Delivery agent initiated OBD workflow", status: "normal" },
      { time: "10:21:40", event: "DAMAGE_TAGGED", detail: "Agent logged damaged panel picture in Ekart device", status: "warning" },
      { time: "10:23:22", event: "ESCALATION_CONFIRMED", detail: "Both party signatures captured", status: "normal" }
    ]
  },
  {
    id: "DSP-84922",
    orderId: "OD192837465019283",
    trackingId: "EKART-MUM-771239",
    hubLocation: "Ekart West Hub (Bhiwandi Logistics Hub, Mumbai)",
    customerName: "Farhan Merchant",
    productName: "Air Jordan 1 Retro High OG 'Chicago Lost & Found'",
    category: "TAMPERED_BOX",
    categoryLabel: "Tampered Outer Carton & Counterfeit Barcode",
    claimAmountINR: 32999,
    submittedAt: "45 mins ago",
    status: "ESCALATED_AUDIT",
    riskLevel: "HIGH",
    customerStatement: "The Nike collector box was unsealed and bottom tape was clearly cut with a razor then re-taped with generic brown tape. The barcode sticker on side does not match my invoice SKU.",
    deliveryBoyId: "EK-DEL-1029",
    deliveryBoyName: "Suraj Jadhav (Rating: 4.62)",
    imageUrl: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80",
    analysis: {
      tamperingProbability: 81,
      barcodeIntegrityScore: 34,
      packagingSealStatus: "SUSPICIOUS_RESEAL",
      courierDwellTimeSeconds: 88,
      courierDwellBenchmarkSeconds: 180,
      dwellAnomalyFlag: true,
      recommendedAction: "ESCALATE_FIELD_AUDIT",
      confidenceScore: 89,
      rootCauseAnalysis: "SUSPECTED IN-TRANSIT SKU SWAP: Secondary packaging tape layer detected over cut security film. SKU Barcode contains optical artifacts consistent with deskjet printed replacement label. In addition, delivery dwell time was 88s with rider deviation note logged 3.2 km away prior to delivery. Escalated for CCTV audit at Bhiwandi sorting bay.",
      visualAnomaliesDetected: [
        "Generic BOPP tape overprinted on Nike branded water-activated tape",
        "Barcode font mismatch with Nike GS1 spec",
        "Box corner shearing consistent with manual prying"
      ],
      geoMismatchDistanceMeters: 45,
      deliveryOtpVerified: true,
      customerRiskScore: 32,
      estimatedClaimValueINR: 32999
    },
    telemetryLogs: [
      { time: "09:40:12", event: "ROUTE_DEVIATION", detail: "Vehicle halted 12 mins at unauthorized halt", status: "anomaly" },
      { time: "10:02:11", event: "VAN_ARRIVE", detail: "Arrived at customer residential complex", status: "normal" },
      { time: "10:03:39", event: "HANDOFF_FAST", detail: "Delivered in 88s without open-box checklist check", status: "warning" }
    ]
  },
  {
    id: "DSP-84923",
    orderId: "OD773829104018239",
    trackingId: "EKART-HYD-552011",
    hubLocation: "Ekart South Hub (Shamshabad Logistics Park, Hyderabad)",
    customerName: "Ananya Reddy",
    productName: "Dyson Airwrap Multi-Styler Complete Long",
    category: "MISSING_HIGH_VALUE",
    categoryLabel: "High Value Accessory Missing Inside Sealed Box",
    claimAmountINR: 49900,
    submittedAt: "1 hr ago",
    status: "AUTO_RESOLVED",
    riskLevel: "LOW",
    customerStatement: "The main styler wand and round volumizing brush were missing from the leather case slot. Box serial was intact, but inside compartments were empty.",
    deliveryBoyId: "EK-DEL-3381",
    deliveryBoyName: "Venkatesh Rao (Rating: 4.91)",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80",
    analysis: {
      tamperingProbability: 14,
      barcodeIntegrityScore: 95,
      packagingSealStatus: "MANUFACTURE_DEFECT",
      courierDwellTimeSeconds: 240,
      courierDwellBenchmarkSeconds: 180,
      dwellAnomalyFlag: false,
      recommendedAction: "INSTANT_REFUND_APPROVED",
      confidenceScore: 94,
      rootCauseAnalysis: "MANUFACTURER PACKAGING DEFICIT: Outer shipper seals and tamper bands completely intact with zero physical trauma. Manifest gross weight was logged at 1.84 kg at inbound mother-hub (Dyson standard packed unit is 2.45 kg). Discrepancy existed BEFORE delivery dispatch. Carrier exonerated; claim approved under Brand Warranty Escrow.",
      visualAnomaliesDetected: [
        "Factory shrink wrap vacuum seal intact",
        "Zero adhesive distortion on Dyson security strip",
        "Interior tray molding exhibits no extraction scuff marks"
      ],
      geoMismatchDistanceMeters: 6,
      deliveryOtpVerified: true,
      customerRiskScore: 11,
      estimatedClaimValueINR: 49900
    },
    telemetryLogs: [
      { time: "08:12:00", event: "INBOUND_WEIGHT_CHECK", detail: "Weighed 1.84 kg at Shamshabad Inbound Hub", status: "anomaly" },
      { time: "11:20:00", event: "DOORSTEP_DELIVERY", detail: "Normal delivery handoff completed", status: "normal" },
      { time: "11:35:10", event: "CLAIM_INITIATED", detail: "Customer contacted Flipkart Priority Desk", status: "normal" }
    ]
  },
  {
    id: "DSP-84924",
    orderId: "OD665421908723412",
    trackingId: "EKART-KOL-119283",
    hubLocation: "Ekart East Hub (Dankuni Logistics Complex, Kolkata)",
    customerName: "Subhash Chatterjee",
    productName: "ASUS ROG Strix SCAR 16 Gaming Laptop (RTX 4080)",
    category: "OBD_MISMATCH",
    categoryLabel: "Open Box Delivery Mismatch / Consumer Forum Threat",
    claimAmountINR: 239990,
    submittedAt: "2 hrs ago",
    status: "ESCALATED_AUDIT",
    riskLevel: "CRITICAL",
    customerStatement: "Rider forced me to share OTP before giving box into my hand. Inside laptop was an old scratched Lenovo ThinkPad from 2017. Threatened to file police FIR and Consumer National Helpline complaint immediately.",
    deliveryBoyId: "EK-DEL-9912",
    deliveryBoyName: "Amitabh Ghosh (Rating: 4.15)",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    analysis: {
      tamperingProbability: 89,
      barcodeIntegrityScore: 21,
      packagingSealStatus: "SUSPICIOUS_RESEAL",
      courierDwellTimeSeconds: 49,
      courierDwellBenchmarkSeconds: 300,
      dwellAnomalyFlag: true,
      recommendedAction: "ESCALATE_FIELD_AUDIT",
      confidenceScore: 96,
      rootCauseAnalysis: "HIGH-SEVERITY REVERSE LOGISTICS FRAUD SYNDICATE: Serial sticker on underside of laptop is a paper thermal sticker overlaid atop old Lenovo OEM plate. Ekart delivery rider has 3 previous OBD anomaly complaints logged in past 45 days. GPS dwell time was 49s. Risk of legal litigation (Consumer Forum) is flagged CRITICAL. Immediate rider suspension & field auditor dispatched.",
      visualAnomaliesDetected: [
        "Chassis geometry inconsistent with ASUS ROG 2024 spec",
        "Sub-label adhesive bubble showing Lenovo serial peel",
        "Damaged carton seal with non-standard transparent cello tape"
      ],
      geoMismatchDistanceMeters: 12,
      deliveryOtpVerified: true,
      customerRiskScore: 22,
      estimatedClaimValueINR: 239990
    },
    telemetryLogs: [
      { time: "09:12:44", event: "GEOFENCE_ENTER", detail: "Rider arrived at customer residence", status: "normal" },
      { time: "09:13:12", event: "OTP_COLLECTED_PREMATURE", detail: "OTP entered before OBD confirmation screen", status: "anomaly" },
      { time: "09:13:33", event: "GEOFENCE_EXIT", detail: "Rider departed premises within 49 seconds", status: "anomaly" },
      { time: "09:19:00", event: "ESCALATION_LEGAL", detail: "High priority ticket logged with legal tag", status: "warning" }
    ]
  }
];
