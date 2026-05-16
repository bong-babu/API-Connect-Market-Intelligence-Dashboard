export type TopicOwner =
  | "Product Marketing"
  | "Developer Relations"
  | "Industry Solutions"
  | "Content Marketing"
  | "Security Marketing"
  | "Partner Marketing";

export type Topic = {
  id: string;
  topic: string;
  description: string;
  opportunityScore: number;
  competitorCoverage: number;
  ibmCoverage: number;
  gap: number;
  owner: TopicOwner;
  channel: string[];
  keywords: string[];
  whyNow: string;
};

export const topics: Topic[] = [
  {
    id: "t01",
    topic: "AI Gateway & LLM Rate Limiting",
    description: "Managing and securing APIs that connect applications to large language models, with intelligent rate limiting and cost controls.",
    opportunityScore: 97,
    competitorCoverage: 88,
    ibmCoverage: 12,
    gap: 76,
    owner: "Product Marketing",
    channel: ["Blog", "LinkedIn", "Developer Newsletter", "Webinar"],
    keywords: ["AI gateway", "LLM API", "ChatGPT API management", "OpenAI rate limiting"],
    whyNow: "Kong's AI Gateway hit 1M downloads. IBM has no published AI gateway content despite this being the #1 search term in the category."
  },
  {
    id: "t02",
    topic: "Semantic Caching for AI APIs",
    description: "Reducing LLM API costs and latency by caching semantically similar requests using vector embeddings.",
    opportunityScore: 92,
    competitorCoverage: 74,
    ibmCoverage: 5,
    gap: 69,
    owner: "Developer Relations",
    channel: ["IBM Developer", "YouTube", "Twitter/X", "HackerNews"],
    keywords: ["semantic caching", "vector cache", "LLM cost reduction", "API response caching"],
    whyNow: "Kong and Apigee are dominating this topic. TrustRadius reviews cite semantic caching as a key IBM gap."
  },
  {
    id: "t03",
    topic: "Zero-Trust API Security Architecture",
    description: "Implementing mTLS, SPIFFE/SPIRE identity, and least-privilege access patterns for API-to-API communication.",
    opportunityScore: 86,
    competitorCoverage: 71,
    ibmCoverage: 22,
    gap: 49,
    owner: "Security Marketing",
    channel: ["IBM Security Blog", "RSA Conference", "LinkedIn"],
    keywords: ["zero-trust APIs", "mTLS API", "SPIFFE API", "API security architecture"],
    whyNow: "Solo.io's $200M raise and PCI-DSS certification are fuelling zero-trust API conversations where IBM has relevant capabilities but low content."
  },
  {
    id: "t04",
    topic: "API Developer Portal Modernisation",
    description: "Building self-service developer portals with modern UX, try-it consoles, SDK generation, and AI-assisted onboarding.",
    opportunityScore: 84,
    competitorCoverage: 82,
    ibmCoverage: 31,
    gap: 51,
    owner: "Developer Relations",
    channel: ["IBM Developer", "YouTube", "Demo Events"],
    keywords: ["developer portal", "API catalogue", "API developer experience", "self-service API"],
    whyNow: "Developer portal quality is cited as the #1 switching reason in IBM churn surveys. Apigee's Gemini-powered portal is getting significant media coverage."
  },
  {
    id: "t05",
    topic: "Mainframe API Modernisation (z/OS to REST)",
    description: "Exposing CICS, IMS, and batch workloads as modern REST/GraphQL APIs without rewriting core business logic.",
    opportunityScore: 81,
    competitorCoverage: 18,
    ibmCoverage: 44,
    gap: -26,
    owner: "Industry Solutions",
    channel: ["IBM Developer", "SHARE Conference", "Banking IT Publications"],
    keywords: ["mainframe REST API", "z/OS API", "CICS REST", "mainframe modernisation"],
    whyNow: "IBM leads this category but undermarkets it. MuleSoft is publishing mainframe content and winning deals IBM should own."
  },
  {
    id: "t06",
    topic: "API Management TCO & Pricing Transparency",
    description: "Total cost of ownership analysis comparing API management platforms at different call volumes and enterprise scales.",
    opportunityScore: 78,
    competitorCoverage: 65,
    ibmCoverage: 15,
    gap: 50,
    owner: "Product Marketing",
    channel: ["IBM.com", "Paid Search Landing Pages", "Sales Collateral"],
    keywords: ["API management pricing", "API gateway cost", "IBM API Connect pricing", "TCO calculator"],
    whyNow: "MuleSoft's Salesforce bundling is creating a pricing narrative IBM isn't countering. Reddit threads comparing costs are getting thousands of views."
  },
  {
    id: "t07",
    topic: "GitOps for API Configuration Management",
    description: "Managing API gateway configuration as code using Git workflows, CI/CD pipelines, and declarative policy definitions.",
    opportunityScore: 74,
    competitorCoverage: 79,
    ibmCoverage: 28,
    gap: 51,
    owner: "Developer Relations",
    channel: ["IBM Developer", "GitHub", "DevOps Communities"],
    keywords: ["API GitOps", "API as code", "declarative API config", "API CI/CD"],
    whyNow: "Kong's decK 2.0 for GitOps and MuleSoft's policy-as-code are capturing developer mindshare. IBM has this capability but no developer-facing content."
  },
  {
    id: "t08",
    topic: "FHIR API Management for Healthcare",
    description: "Secure, compliant management of HL7 FHIR R4 APIs for electronic health record interoperability and patient data access.",
    opportunityScore: 71,
    competitorCoverage: 52,
    ibmCoverage: 33,
    gap: 19,
    owner: "Industry Solutions",
    channel: ["HIMSS", "Healthcare IT publications", "IBM Blog"],
    keywords: ["FHIR API", "HIPAA API management", "healthcare API security", "HL7 FHIR"],
    whyNow: "Boomi and MuleSoft published FHIR content this month. IBM's HIPAA compliance strength is unmatched but absent from this conversation."
  },
  {
    id: "t09",
    topic: "API Monetisation & Billing Strategies",
    description: "Implementing usage-based pricing, quota tiers, and subscription billing for APIs exposed to external developers and partners.",
    opportunityScore: 67,
    competitorCoverage: 68,
    ibmCoverage: 41,
    gap: 27,
    owner: "Product Marketing",
    channel: ["IBM Blog", "API Economy publications", "LinkedIn"],
    keywords: ["API monetisation", "API billing", "usage-based pricing", "API economy"],
    whyNow: "Apigee's monetisation GA with Stripe integration is generating buzz. IBM has strong monetisation features that need better content coverage."
  },
  {
    id: "t10",
    topic: "Multi-Cloud API Management Best Practices",
    description: "Strategies for managing APIs consistently across AWS, Azure, GCP, and on-premises environments without cloud lock-in.",
    opportunityScore: 63,
    competitorCoverage: 61,
    ibmCoverage: 48,
    gap: 13,
    owner: "Content Marketing",
    channel: ["IBM Blog", "Cloud computing publications", "LinkedIn"],
    keywords: ["multi-cloud API", "hybrid API management", "cloud-agnostic gateway", "API portability"],
    whyNow: "IBM's hybrid/multi-cloud story is genuinely strong. Apigee's GCP lock-in complaints create an opening to position IBM as the neutral multi-cloud choice."
  }
];
