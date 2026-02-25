export interface Tactic {
  id: string;
  name: string;
  description: string;
  domain: 'FIN' | 'NFIN' | 'BOTH';
  mitigations?: string;
}

export const tactics: Tactic[] = [
  {
    id: "TA-01",
    name: "Reconnaissance & Sourcing",
    description: "The adversary is trying to gather information they can use to plan future operations. This involves adversaries gathering information about victims, such as their financial standing, family structure, or occupation, often by purchasing leaked databases, scraping public social media profiles, or utilizing open-source intelligence (OSINT).",
    domain: "BOTH",
    mitigations: "Implement strict data privacy controls on social media. Organizations must secure customer databases and alert users when breaches occur."
  },
  {
    id: "TA-02",
    name: "Infrastructure Procurement",
    description: "The adversary is establishing resources they can use to target victims. Operations require infrastructure to obscure attribution and facilitate scams at scale. This includes procuring 'mule' bank accounts, purchasing pre-activated SIM cards via forged KYC documents, renting VoIP lines, or establishing shell companies for merchant payment gateways.",
    domain: "BOTH",
    mitigations: "Banks must implement rigorous KYC/AML checks and utilize behavioral analysis to detect mule accounts. Telecom providers should flag anomalous bulk SIM activations."
  },
  {
    id: "TA-03",
    name: "Lure & Delivery",
    description: "The adversary is trying to reach the victim with a deceptive payload or message. Lures are deployed at scale to cast a wide net or targeted specifically. This relies heavily on bulk SMS (Smishing), malicious advertising on social platforms (Malvertising), or spoofing trusted contacts via instant messaging applications.",
    domain: "BOTH",
    mitigations: "Implement spam filtering at the telecom level (e.g., DLT platforms). Users should be trained to verify sender authenticity and avoid clicking unsolicited links."
  },
  {
    id: "TA-04",
    name: "Psychological Exploitation",
    description: "The adversary is applying social engineering to manipulate the victim's emotional state. Unlike enterprise attacks relying on software vulnerabilities, socio-technical attacks rely on human vulnerabilities. Adversaries artificially induce panic (e.g., threat of arrest, package seizure) or greed (e.g., fake high-yield investments, zero-interest loans).",
    domain: "BOTH",
    mitigations: "Public awareness campaigns focusing on the psychological triggers used by scammers. Emphasize that law enforcement will never demand money over a video call."
  },
  {
    id: "TA-05",
    name: "Execution & Compromise",
    description: "The adversary is trying to run malicious code or achieve the specific compromising action by the user. Success occurs when the victim complies with the adversary's instructions. This may involve sideloading a malicious APK, granting excessive app permissions, sharing an OTP, or initiating a remote desktop session.",
    domain: "BOTH",
    mitigations: "Restrict app installations to official stores (Play Store/App Store). Deploy endpoint protection and user warnings against sharing 2FA codes."
  },
  {
    id: "TA-06",
    name: "Financial Exfiltration",
    description: "The adversary is attempting to steal money and obscure the subsequent money trail. Funds are rapidly moved to prevent bank freezing. Techniques involve multi-hop UPI transfers through mule accounts, immediate withdrawal via ATMs, or conversion to untraceable cryptocurrencies.",
    domain: "FIN",
    mitigations: "Implement rapid incident response channels between banks and law enforcement to freeze funds in the 'golden hour'. Deploy AI-driven transaction monitoring."
  },
  {
    id: "TA-07",
    name: "Impact & Extortion",
    description: "The adversary is manipulating, interrupting, or destroying the target's financial or psychological well-being. This is the final stage where the primary goal is achieved. It results in direct financial loss, psychological distress from morphed images, or sustained extortion cycles where the adversary repeatedly demands payment.",
    domain: "BOTH",
    mitigations: "Provide robust victim support systems, streamline FIR registration processes, and collaborate with tech platforms for rapid takedown of morphed content."
  },
  {
    id: "TA-08",
    name: "Reputation Sabotage",
    description: "The adversary is actively targeting an individual's personal, social, or professional standing. This entails the creation and dissemination of false, defamatory, or highly sensitive material. It is often meant to isolate the victim or coerce them into compliance.",
    domain: "NFIN",
    mitigations: "Establish direct escalation channels with social media platforms (Meta, X) to swiftly remove defamatory content and deepfakes."
  },
  {
    id: "TA-09",
    name: "Harassment & Stalking",
    description: "The adversary is engaging in persistent, unwanted contact that instills fear or distress in the target. This tactic moves beyond financial motives into personal vendettas, cyberbullying, or obsessive tracking of a victim's online and physical movements.",
    domain: "NFIN",
    mitigations: "Enable strict privacy settings and location-sharing restrictions. Law enforcement must have dedicated cyber-stalking response protocols."
  }
];
