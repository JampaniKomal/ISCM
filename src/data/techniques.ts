import type { Technique } from '../types';

export const techniques: Technique[] = [
  // FIN Techniques
  {
    id: "TE-FIN-001",
    name: "Bulk SMS Phishing (Smishing)",
    description: "Adversaries send unsolicited bulk SMS messages to victims. These messages often spoof official entities like banks, electricity boards, or courier services (e.g., 'Dear customer, your electricity will be disconnected tonight. Update KYC here.'). They contain shortened malicious links designed to capture banking credentials or prompt APK downloads. Telecom DLT (Distributed Ledger Technology) bypasses are frequently used.",
    tacticIds: ["TA-03"],
    domain: "FIN",
    dataSources: ["Network Traffic", "Mobile Device Logs", "SMS Gateways"],
    platforms: ["Android", "iOS"]
  },
  {
    id: "TE-FIN-002",
    name: "Malicious APK Sideloading",
    description: "The victim is coerced into downloading and installing an Android Package (APK) file from outside the official Google Play Store. These APKs often disguise themselves as legitimate banking apps, customer support tools, or loan apps. Once installed, they request overly broad permissions (SMS read, Contacts, overlay permissions) to intercept OTPs silently.",
    tacticIds: ["TA-05"],
    domain: "FIN",
    dataSources: ["File Monitoring", "Application Logs", "Endpoint Detection"],
    platforms: ["Android"]
  },
  {
    id: "TE-FIN-003",
    name: "Mule Account Network Layering",
    description: "Adversaries rarely transfer stolen funds directly to their own accounts. Instead, they use a network of 'mule' accounts—often rented from poor individuals or opened using stolen identities. Exfiltrated funds are rapidly split and transferred across 4-5 different banks within minutes, making freezing the assets highly difficult for law enforcement. The final hop often involves ATM cash withdrawals or P2P crypto purchases.",
    tacticIds: ["TA-06"],
    domain: "FIN",
    dataSources: ["Banking Logs", "UPI Transaction Data", "Crypto Exchanges"],
    platforms: ["Banking Systems"]
  },
  {
    id: "TE-FIN-004",
    name: "Instant Predatory Loan Apps",
    description: "Adversaries distribute functional but predatory lending applications. The apps require the victim to grant access to their phone's Contacts list and Photo Gallery before disbursing a small loan. Over exorbitant, hidden processing fees are applied immediately. Within days, the adversaries use the exfiltrated contacts and photos to extort massive repayments from the victim.",
    tacticIds: ["TA-03", "TA-05", "TA-07"],
    domain: "FIN",
    dataSources: ["Application Network Traffic", "OS API Execution"],
    platforms: ["Android", "iOS"]
  },
  {
    id: "TE-FIN-005",
    name: "AePS Biometric Cloning",
    description: "Adversaries exploit the Aadhaar Enabled Payment System (AePS). They procure thumbprint images from digitized property registration documents on public state government portals. Using these images, they craft physical silicone thumbs. They then use networks of complicit Business Correspondents (BCs) with PoS biometric machines to withdraw cash directly from the victim's Aadhaar-linked bank account without requiring an OTP or PIN.",
    tacticIds: ["TA-05", "TA-06"],
    domain: "FIN",
    dataSources: ["AePS Transaction Logs", "Biometric Device Logs"],
    platforms: ["AePS", "Banking Systems"]
  },
  {
    id: "TE-FIN-006",
    name: "Bulk Mule Account Sourcing",
    description: "Adversaries procure massive quantities of 'mule' bank accounts by exploiting vulnerable populations (e.g., laborers, students). They offer a small one-time payment (₹2,000 - ₹5,000) or a monthly commission to individuals willing to open bank accounts or part with their ATM cards and internet banking credentials. These acquired accounts become the foundational infrastructure for laundering proceeds from primary scams.",
    tacticIds: ["TA-02"],
    domain: "FIN",
    dataSources: ["Bank Account Onboarding Logs", "Device Fingerprinting"],
    platforms: ["Banking Systems"]
  },
  {
    id: "TE-FIN-007",
    name: "Bulk Data Brokerage Procurement",
    description: "Adversaries purchase vast datasets of leaked PII (Personally Identifiable Information) from underground forums or corrupt corporate insiders. These datasets, often categorized by victim demography (e.g., 'Senior Citizens', 'Recent Job Seekers'), form the foundational targeting list for subsequent mass smishing or specialized phishing campaigns.",
    tacticIds: ["TA-01"],
    domain: "FIN",
    dataSources: ["Dark Web Monitoring", "Network Traffic Analysis"],
    platforms: ["Web"]
  },
  
  // NFIN Techniques
  {
    id: "TE-NFIN-001",
    name: "Authority Impersonation (Fake Digital Arrest)",
    description: "Adversaries contact the victim via phone or VoIP (often Skype), claiming to be officials from Customs, CBI, or Narcotics bureaus. They fabricate a scenario where a parcel containing illegal items (e.g., MDMA, fake passports) has been intercepted under the victim's name. They demand the victim keep their camera on for a 'digital arrest' and coerce them into transferring their entire life savings to a 'secure RBI account' for verification.",
    tacticIds: ["TA-04", "TA-07"],
    domain: "NFIN",
    dataSources: ["VoIP Call Logs", "Network Metadata"],
    platforms: ["Windows", "macOS", "Mobile"]
  },
  {
    id: "TE-NFIN-002",
    name: "Morphed Image Blackmail (Deep-faking)",
    description: "Adversaries acquire legitimate photos of the victim from open social media profiles or via malicious apps. They use AI tools or manual editing to superimpose the victim's face onto explicit imagery. This morphed content is then used to extort the victim, threatening to distribute the images to their family, friends, and employers unless a ransom is paid.",
    tacticIds: ["TA-07", "TA-08"],
    domain: "NFIN",
    dataSources: ["Social Media Platforms", "Messaging Apps"],
    platforms: ["Web", "Mobile"]
  },
  {
    id: "TE-NFIN-003",
    name: "WhatsApp DP/Identity Hijacking",
    description: "Adversaries create a new WhatsApp account using a virtual or stolen phone number. They download the profile picture (DP) of a high-ranking executive, colleague, or family member from social media and set it as their own. They then message the target's contacts, claiming to be in an urgent meeting or emergency, and request immediate money transfers or Apple/Amazon gift cards.",
    tacticIds: ["TA-03", "TA-04"],
    domain: "NFIN",
    dataSources: ["WhatsApp Logs", "Social Graph Data"],
    platforms: ["WhatsApp", "Mobile"]
  },
  {
    id: "TE-NFIN-004",
    name: "Systematic Doxing",
    description: "The adversary systematically gathers Personally Identifiable Information (PII) of a target, such as residential addresses, family details, phone numbers, and workplace information. This compiled dossier is then maliciously published on public forums or social media to incite harassment, swatting, or physical danger to the target.",
    tacticIds: ["TA-01", "TA-08", "TA-09"],
    domain: "NFIN",
    dataSources: ["OSINT", "Public Forums", "Social Media"],
    platforms: ["Web"]
  },
  {
    id: "TE-NFIN-005",
    name: "Sextortion Hook (Video Call Trap)",
    description: "Adversaries, often adopting a female persona, initiate contact via social media or dating apps and quickly move the conversation to a video call (e.g., WhatsApp Video). Once the victim accepts, the adversary plays a pre-recorded explicit video on their end and concurrently screen-records the call, capturing the victim's face in compromising context. The call is abruptly ended, followed immediately by blackmail demands.",
    tacticIds: ["TA-03", "TA-04", "TA-07"],
    domain: "NFIN",
    dataSources: ["Video Call Metadata", "Application State"],
    platforms: ["Mobile", "WhatsApp", "Instagram"]
  },
  {
    id: "TE-NFIN-006",
    name: "Forged Identity KYC Overriding",
    description: "Adversaries fabricate digital identity documents (Aadhaar, PAN cards) using basic image manipulation tools. These forged documents are then used to bypass 'Know Your Customer' (KYC) checks when procuring SIM cards in bulk or opening digital wallets. Often, complicit Point-of-Sale (PoS) agents for telecom companies facilitate this process, allowing thousands of 'pre-activated' SIM cards to flood the cybercrime ecosystem.",
    tacticIds: ["TA-02", "TA-05"],
    domain: "NFIN",
    dataSources: ["Telecom Activation Logs", "KYC Verification Systems"],
    platforms: ["Telecom Networks"]
  },
  {
    id: "TE-NFIN-007",
    name: "Offshore VoIP/SIP Trunk Leasing",
    description: "To conduct mass-calling schemes (like Fake Digital Arrests) while masking their true location in India or Southeast Asia, syndicates lease Virtual Voice over Internet Protocol (VoIP) numbers or Session Initiation Protocol (SIP) trunks from offshore providers. These numbers are often spoofed to mimic legitimate Indian law enforcement (+91...) or official enterprise lines.",
    tacticIds: ["TA-02"],
    domain: "NFIN",
    dataSources: ["ISP Traffic", "SIP Signaling Data"],
    platforms: ["Windows", "macOS", "Mobile"]
  }
];
