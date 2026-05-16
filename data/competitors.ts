export type Competitor = {
  id: string;
  name: string;
  color: string;
  threatScore: number;
  threatDelta: number;
  topTopics: string[];
  sentiment: { positive: number; neutral: number; negative: number };
  signalCount: number;
  confidence: "high" | "medium" | "low";
  action: "escalate" | "monitor" | "watch";
  marketShare: number;
  recentMove: string;
};

export const competitors: Competitor[] = [
  {
    id: "kong",
    name: "Kong Inc.",
    color: "#dc2626",
    threatScore: 87,
    threatDelta: +5,
    topTopics: ["AI gateway", "plugin ecosystem", "open-source momentum"],
    sentiment: { positive: 31, neutral: 28, negative: 41 },
    signalCount: 24,
    confidence: "high",
    action: "escalate",
    marketShare: 22,
    recentMove: "Launched Kong AI Gateway with native LLM rate-limiting; aggressive OSS community push on GitHub."
  },
  {
    id: "apigee",
    name: "Google Apigee",
    color: "#3b82f6",
    threatScore: 79,
    threatDelta: +2,
    topTopics: ["GCP integration", "Apigee X migration", "developer portal"],
    sentiment: { positive: 44, neutral: 33, negative: 23 },
    signalCount: 19,
    confidence: "high",
    action: "monitor",
    marketShare: 26,
    recentMove: "Apigee X GA on all GCP regions; deep Vertex AI integration announced at Google Cloud Next."
  },
  {
    id: "mulesoft",
    name: "MuleSoft Anypoint",
    color: "#8b5cf6",
    threatScore: 74,
    threatDelta: -1,
    topTopics: ["Salesforce bundling", "MuleSoft RPA", "API automation"],
    sentiment: { positive: 38, neutral: 35, negative: 27 },
    signalCount: 17,
    confidence: "high",
    action: "monitor",
    marketShare: 19,
    recentMove: "Bundled into Salesforce Customer 360 enterprise deals; new RPA + API composition studio."
  },
  {
    id: "solo",
    name: "Solo.io",
    color: "#10b981",
    threatScore: 61,
    threatDelta: +8,
    topTopics: ["Istio service mesh", "zero-trust", "eBPF networking"],
    sentiment: { positive: 52, neutral: 31, negative: 17 },
    signalCount: 12,
    confidence: "medium",
    action: "watch",
    marketShare: 8,
    recentMove: "Gloo Platform 2.5 with ambient mesh support; Series C $200M funding announced."
  },
  {
    id: "boomi",
    name: "Boomi",
    color: "#f59e0b",
    threatScore: 55,
    threatDelta: -3,
    topTopics: ["iPaaS convergence", "B2B EDI", "low-code integration"],
    sentiment: { positive: 41, neutral: 36, negative: 23 },
    signalCount: 8,
    confidence: "medium",
    action: "watch",
    marketShare: 11,
    recentMove: "Boomi AI assistant GA; pushing mid-market with low-code API creation wizard."
  }
];
