export type ContentType =
  | "blog"
  | "white-paper"
  | "webinar"
  | "case-study"
  | "battle-card"
  | "demo-video"
  | "comparison-page"
  | "tutorial";

export type ContentRec = {
  id: string;
  title: string;
  type: ContentType;
  priorityScore: number;
  rationale: string;
  targetAudience: string[];
  competitorsTargeted: string[];
  suggestedAngle: string;
  owner: string;
  estimatedImpact: "high" | "medium" | "low";
  dueDate: string;
  channel: string[];
  keywords: string[];
};

export const recommendations: ContentRec[] = [
  {
    id: "c01",
    title: "IBM API Connect AI Gateway Roadmap — What's Coming in H2 2026",
    type: "blog",
    priorityScore: 96,
    rationale: "Kong's AI Gateway is the #1 competitive threat. IBM needs to publish a credible roadmap response to retain customers evaluating alternatives.",
    targetAudience: ["Enterprise Architects", "CTOs", "API Platform Leads"],
    competitorsTargeted: ["kong", "apigee"],
    suggestedAngle: "Be transparent about the AI gateway roadmap with dates, preview features, and a beta programme invitation to create stakeholder buy-in.",
    owner: "Product Marketing",
    estimatedImpact: "high",
    dueDate: "2026-06-01",
    channel: ["IBM Blog", "LinkedIn", "Developer Newsletter"],
    keywords: ["AI gateway", "LLM routing", "IBM API Connect roadmap", "AI API management"]
  },
  {
    id: "c02",
    title: "Developer Portal in 15 Minutes: IBM API Connect vs Kong vs Apigee",
    type: "demo-video",
    priorityScore: 91,
    rationale: "Kong's '15-minute portal' campaign is gaining traction. A head-to-head video showing IBM's modernised portal UX can neutralise this messaging.",
    targetAudience: ["Developer Experience Leads", "API Product Managers", "Developers"],
    competitorsTargeted: ["kong", "apigee"],
    suggestedAngle: "Live screen recording showing IBM API Connect's fastest possible onboarding path, highlighting recent portal improvements.",
    owner: "Developer Relations",
    estimatedImpact: "high",
    dueDate: "2026-05-28",
    channel: ["YouTube", "IBM Developer", "Twitter/X"],
    keywords: ["developer portal", "API onboarding", "IBM vs Kong", "developer experience"]
  },
  {
    id: "c03",
    title: "The Complete Guide to FHIR API Management with IBM API Connect",
    type: "white-paper",
    priorityScore: 88,
    rationale: "Boomi and MuleSoft are publishing FHIR content targeting healthcare. IBM has a stronger compliance story that needs to be told with concrete FHIR guidance.",
    targetAudience: ["Healthcare IT Architects", "CIOs in Healthcare", "FHIR Implementation Teams"],
    competitorsTargeted: ["boomi", "mulesoft"],
    suggestedAngle: "HIPAA + FHIR R4 compliance guide with IBM API Connect configuration examples, audit trail setup, and consent management patterns.",
    owner: "Industry Solutions",
    estimatedImpact: "high",
    dueDate: "2026-06-15",
    channel: ["Healthcare IT content syndication", "HIMSS", "IBM Blog"],
    keywords: ["FHIR", "healthcare API", "HIPAA", "IBM API Connect healthcare"]
  },
  {
    id: "c04",
    title: "Why Financial Services Choose IBM: FedRAMP, FIPS 140-2 and Beyond",
    type: "white-paper",
    priorityScore: 85,
    rationale: "Solo.io's PCI-DSS certification removes IBM's compliance moat. A detailed compliance comparison white paper reinforces IBM's remaining advantages.",
    targetAudience: ["CISOs", "Compliance Officers", "Federal Agency IT"],
    competitorsTargeted: ["solo", "kong"],
    suggestedAngle: "Compliance comparison framework: IL5, FedRAMP High, FIPS 140-2, SOC 2 Type II — where IBM leads and why it matters for regulated industries.",
    owner: "Industry Solutions",
    estimatedImpact: "high",
    dueDate: "2026-06-10",
    channel: ["Financial Services content hubs", "FedScoop", "IBM Security Blog"],
    keywords: ["FedRAMP", "FIPS 140-2", "API security compliance", "financial services API"]
  },
  {
    id: "c05",
    title: "IBM API Connect vs Kong Konnect: Enterprise Battle Card",
    type: "battle-card",
    priorityScore: 83,
    rationale: "IBM's field sales teams are losing deals to Kong without effective counter-messaging. A detailed battle card with objection handling is needed urgently.",
    targetAudience: ["IBM Sales Teams", "Solution Engineers", "Channel Partners"],
    competitorsTargeted: ["kong"],
    suggestedAngle: "Landmine questions, objection responses, and IBM-wins-when framework covering: compliance, hybrid deployment, mainframe APIs, and enterprise support.",
    owner: "Product Marketing",
    estimatedImpact: "high",
    dueDate: "2026-05-22",
    channel: ["Seismic", "IBM Sales Portal", "Partner Portal"],
    keywords: ["sales battle card", "competitive", "Kong vs IBM"]
  },
  {
    id: "c06",
    title: "Mainframe to Microservices: Exposing z/OS APIs with IBM API Connect",
    type: "tutorial",
    priorityScore: 79,
    rationale: "IBM's mainframe API strength is under-marketed. A technical tutorial showcasing CICS/IMS API exposure can lock in banking customers competing with modernisation projects.",
    targetAudience: ["Mainframe Architects", "Banking IT Teams", "z/OS Developers"],
    competitorsTargeted: ["kong", "apigee", "solo"],
    suggestedAngle: "Step-by-step walkthrough: exposing a COBOL CICS transaction as a REST API through IBM API Connect with security policies and rate limiting.",
    owner: "Developer Relations",
    estimatedImpact: "medium",
    dueDate: "2026-06-20",
    channel: ["IBM Developer", "SHARE Conference", "Mainframe Dev Community"],
    keywords: ["mainframe API", "z/OS REST", "CICS API", "IBM API Connect tutorial"]
  },
  {
    id: "c07",
    title: "Total Cost of Ownership: IBM API Connect vs MuleSoft at Enterprise Scale",
    type: "comparison-page",
    priorityScore: 76,
    rationale: "MuleSoft's Salesforce bundling is creating a false cost narrative. IBM needs a transparent TCO calculator showing true costs at 100M+ API calls per month.",
    targetAudience: ["CFOs", "Procurement Teams", "IT Finance"],
    competitorsTargeted: ["mulesoft"],
    suggestedAngle: "Interactive TCO calculator with customisable parameters (call volume, users, compliance tier) with IBM vs MuleSoft side-by-side at 3 pricing tiers.",
    owner: "Product Marketing",
    estimatedImpact: "medium",
    dueDate: "2026-06-30",
    channel: ["IBM.com product page", "Paid search landing pages"],
    keywords: ["API management TCO", "IBM vs MuleSoft cost", "API platform pricing"]
  },
  {
    id: "c08",
    title: "IBM API Connect Customer Success Story: UK Government Digital Service",
    type: "case-study",
    priorityScore: 72,
    rationale: "Government and public sector is an IBM stronghold. A marquee case study displacing alternatives reinforces IBM's position in regulated public sector deals.",
    targetAudience: ["Government IT Leaders", "Public Sector Procurement", "CIOs"],
    competitorsTargeted: ["apigee", "mulesoft"],
    suggestedAngle: "Focus on data sovereignty, UK IL3 compliance, and onshore support — areas where IBM's government credibility is unmatched.",
    owner: "Customer Marketing",
    estimatedImpact: "medium",
    dueDate: "2026-07-01",
    channel: ["Public Sector content hubs", "GovTech events", "LinkedIn"],
    keywords: ["government API management", "public sector", "IBM case study", "data sovereignty"]
  },
  {
    id: "c09",
    title: "Webinar: Building AI-Ready APIs on IBM API Connect — Live Demo",
    type: "webinar",
    priorityScore: 68,
    rationale: "AI gateway is the hottest topic in the category. IBM needs to demonstrate near-term AI capabilities to prevent further customer attrition to Kong and Apigee.",
    targetAudience: ["API Platform Architects", "CIOs", "Developer Platform Leads"],
    competitorsTargeted: ["kong", "apigee"],
    suggestedAngle: "Live demo of IBM API Connect's beta AI gateway features, semantic caching preview, and the Watsonx integration roadmap.",
    owner: "Developer Relations",
    estimatedImpact: "high",
    dueDate: "2026-06-05",
    channel: ["IBM Events", "LinkedIn Events", "Developer Newsletter"],
    keywords: ["AI APIs", "IBM API Connect AI", "API gateway webinar", "watsonx"]
  },
  {
    id: "c10",
    title: "IBM API Connect Zero-Trust API Security Architecture Guide",
    type: "white-paper",
    priorityScore: 64,
    rationale: "Solo.io's zero-trust narrative is gaining traction. IBM needs to publish its own zero-trust API security architecture to retain security-conscious prospects.",
    targetAudience: ["Security Architects", "CISOs", "Platform Engineers"],
    competitorsTargeted: ["solo"],
    suggestedAngle: "IBM's zero-trust API security layered model: DataPower Gateway + API Connect + IBM Security Verify — compared to SPIFFE/SPIRE approaches.",
    owner: "Security Marketing",
    estimatedImpact: "medium",
    dueDate: "2026-07-15",
    channel: ["IBM Security Blog", "RSA Conference", "Security content syndication"],
    keywords: ["zero-trust API", "IBM API security", "API security architecture", "mTLS"]
  }
];
