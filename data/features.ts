export type FeatureScore = {
  ibm: number;
  kong: number;
  apigee: number;
  mulesoft: number;
  solo: number;
  boomi: number;
};

export type Feature = {
  id: string;
  category: string;
  name: string;
  description: string;
  scores: FeatureScore;
  ibmStatus: "ga" | "beta" | "roadmap" | "gap";
  strategicImportance: "critical" | "high" | "medium" | "low";
};

export const features: Feature[] = [
  {
    id: "f01",
    category: "AI & LLM",
    name: "AI Gateway / LLM Routing",
    description: "Native routing and load balancing across LLM inference endpoints with semantic caching.",
    scores: { ibm: 32, kong: 91, apigee: 78, mulesoft: 55, solo: 62, boomi: 41 },
    ibmStatus: "roadmap",
    strategicImportance: "critical"
  },
  {
    id: "f02",
    category: "AI & LLM",
    name: "AI-generated API Documentation",
    description: "Automatic generation of OpenAPI specs and developer portal docs using LLMs.",
    scores: { ibm: 28, kong: 74, apigee: 88, mulesoft: 71, solo: 45, boomi: 62 },
    ibmStatus: "roadmap",
    strategicImportance: "high"
  },
  {
    id: "f03",
    category: "Developer Experience",
    name: "Developer Portal Quality",
    description: "Self-service developer portal with API cataloguing, try-it console, and SDK generation.",
    scores: { ibm: 61, kong: 82, apigee: 89, mulesoft: 78, solo: 58, boomi: 67 },
    ibmStatus: "ga",
    strategicImportance: "critical"
  },
  {
    id: "f04",
    category: "Developer Experience",
    name: "Time to First API (trial onboarding)",
    description: "Minutes from sign-up to first successful API call in a free trial environment.",
    scores: { ibm: 38, kong: 88, apigee: 79, mulesoft: 68, solo: 72, boomi: 84 },
    ibmStatus: "gap",
    strategicImportance: "high"
  },
  {
    id: "f05",
    category: "Security & Compliance",
    name: "FIPS 140-2 / FedRAMP Compliance",
    description: "Government-grade cryptographic compliance and FedRAMP Authorization.",
    scores: { ibm: 95, kong: 61, apigee: 72, mulesoft: 68, solo: 55, boomi: 48 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f06",
    category: "Security & Compliance",
    name: "Zero-Trust API Security",
    description: "mTLS, SPIFFE/SPIRE identity, and zero-trust policy enforcement for east-west API traffic.",
    scores: { ibm: 58, kong: 74, apigee: 71, mulesoft: 55, solo: 94, boomi: 40 },
    ibmStatus: "beta",
    strategicImportance: "high"
  },
  {
    id: "f07",
    category: "Security & Compliance",
    name: "Real-time Threat Detection",
    description: "ML-driven anomaly detection for API abuse, DDoS, and data exfiltration patterns.",
    scores: { ibm: 64, kong: 72, apigee: 88, mulesoft: 58, solo: 69, boomi: 42 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f08",
    category: "Kubernetes & Cloud-Native",
    name: "Kubernetes-Native Deployment",
    description: "Helm-based deployment, CRD-driven configuration, and operator support on Kubernetes.",
    scores: { ibm: 55, kong: 94, apigee: 82, mulesoft: 61, solo: 97, boomi: 44 },
    ibmStatus: "ga",
    strategicImportance: "critical"
  },
  {
    id: "f09",
    category: "Kubernetes & Cloud-Native",
    name: "Multi-cluster API Management",
    description: "Unified control plane managing APIs across multiple Kubernetes clusters and regions.",
    scores: { ibm: 48, kong: 86, apigee: 74, mulesoft: 52, solo: 91, boomi: 35 },
    ibmStatus: "beta",
    strategicImportance: "high"
  },
  {
    id: "f10",
    category: "Observability",
    name: "OpenTelemetry Native Support",
    description: "Native OTel traces, metrics, and logs export without custom plugins or adapters.",
    scores: { ibm: 52, kong: 81, apigee: 77, mulesoft: 64, solo: 89, boomi: 73 },
    ibmStatus: "beta",
    strategicImportance: "medium"
  },
  {
    id: "f11",
    category: "Observability",
    name: "API Analytics & Reporting",
    description: "Built-in dashboards for API usage, latency percentiles, error rates, and consumer trends.",
    scores: { ibm: 78, kong: 74, apigee: 91, mulesoft: 82, solo: 62, boomi: 69 },
    ibmStatus: "ga",
    strategicImportance: "medium"
  },
  {
    id: "f12",
    category: "Governance",
    name: "API Governance & Policy-as-Code",
    description: "Centralised API standards enforcement via CI/CD policy gates and OPA/Rego rules.",
    scores: { ibm: 66, kong: 71, apigee: 76, mulesoft: 88, solo: 74, boomi: 55 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f13",
    category: "Governance",
    name: "API Lifecycle Management",
    description: "End-to-end design, mock, test, publish, version, deprecate, retire workflow.",
    scores: { ibm: 88, kong: 72, apigee: 84, mulesoft: 86, solo: 58, boomi: 70 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f14",
    category: "Integration",
    name: "Mainframe / SOAP API Exposure",
    description: "Wrapping CICS, IMS, and SOAP services as modern REST/GraphQL APIs.",
    scores: { ibm: 97, kong: 28, apigee: 41, mulesoft: 72, solo: 22, boomi: 65 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f15",
    category: "Integration",
    name: "GraphQL API Management",
    description: "Native GraphQL schema stitching, federation, and policy enforcement.",
    scores: { ibm: 44, kong: 78, apigee: 82, mulesoft: 68, solo: 74, boomi: 52 },
    ibmStatus: "beta",
    strategicImportance: "medium"
  },
  {
    id: "f16",
    category: "Monetisation",
    name: "API Monetisation & Billing",
    description: "Native usage-based billing, quota enforcement, and payment gateway integrations.",
    scores: { ibm: 72, kong: 65, apigee: 88, mulesoft: 61, solo: 42, boomi: 48 },
    ibmStatus: "ga",
    strategicImportance: "medium"
  },
  {
    id: "f17",
    category: "Extensibility",
    name: "Plugin / Extension Ecosystem",
    description: "First and third-party plugin marketplace for custom policies and transformations.",
    scores: { ibm: 55, kong: 96, apigee: 78, mulesoft: 71, solo: 68, boomi: 62 },
    ibmStatus: "gap",
    strategicImportance: "critical"
  },
  {
    id: "f18",
    category: "Pricing",
    name: "Transparent Self-serve Pricing",
    description: "Publicly available pricing tiers with free or low-cost trial options.",
    scores: { ibm: 22, kong: 78, apigee: 55, mulesoft: 41, solo: 68, boomi: 72 },
    ibmStatus: "gap",
    strategicImportance: "high"
  },
  {
    id: "f19",
    category: "Hybrid & Multi-cloud",
    name: "Hybrid Deployment (on-prem + cloud)",
    description: "Unified management plane for on-premises gateways and cloud-hosted APIs.",
    scores: { ibm: 86, kong: 82, apigee: 71, mulesoft: 78, solo: 74, boomi: 62 },
    ibmStatus: "ga",
    strategicImportance: "high"
  },
  {
    id: "f20",
    category: "AI & LLM",
    name: "Semantic Caching for LLM APIs",
    description: "Vector-similarity-based caching of LLM responses to reduce cost and latency.",
    scores: { ibm: 18, kong: 88, apigee: 62, mulesoft: 38, solo: 55, boomi: 28 },
    ibmStatus: "gap",
    strategicImportance: "critical"
  }
];
