# Contributing to ISCM

The intelligence mapped within the Indian Socio-technical Cyber Matrix (ISCM) requires constant real-world grounding. We welcome contributions from OSINT researchers, cybersecurity professionals, policy makers, and law enforcement personnel.

## How to Contribute

We utilize a straightforward GitHub Pull Request workflow across two main data files located in `src/data/`:

1. `tactics.ts`: The broader stages of the attack lifecycle.
2. `techniques.ts`: The precise methods used to achieve a tactic.

All submissions must follow the ISCM naming nomenclature precisely.

## Naming Rules and Terminology

### Domains

Every technique must be associated with an overarching domain:

- `FIN` (Financial Fraud): The direct theft or layering of monetary assets.
- `NFIN` (Non-Financial Crime): Extortion lacking direct monetary extraction, defamation, system damage, or psychological abuse.

### IDs

- **Tactics:** `TA-[Number]` (e.g., `TA-01`).
- **Techniques:** `TE-[Domain]-[Number]` (e.g., `TE-NFIN-001`).
- **Sub-Techniques:** `TE-[Domain]-[Number].[SubNumber]` (e.g., `TE-FIN-001.01`).

### TTP Submission Format

When submitting a Pull Request to register a new Technique in `src/data/techniques.ts`, ensure your object meets the following `Technique` TypeScript interface:

```typescript
{
  id: "TE-[DOMAIN]-[ID]",
  name: "Clear, concise name of the fraud/crime (e.g., Instant Predatory Loan App)",
  description: "A highly detailed explanation of the mechanism. Describe what the victim experiences and the subsequent adversary action.",
  tacticIds: ["TA-0X"], // Array of Tactics this technique achieves
  domain: "FIN" | "NFIN",
  dataSources: ["Relevant logs, traces, or platform telemetry (e.g., UPI Transaction Data)"],
  platforms: ["Where the exploit occurs (e.g., WhatsApp, Banking Systems, Android)"]
}
```

## Review Guidelines

To maintain an authoritative, MITRE-grade standard:

1.  **Do Not Include Specific Victim PII.** If referencing an example case, redact names and account numbers.
2.  **Maintain Professional Tone.** Avoid hyperbole, emojis, or colloquial slang. The framework is meant to be read by analysts and incident responders.
3.  **Include Mitigations.** If possible, ensure the associated Tactic (`tactics.ts`) includes mitigation strategies relevant to your new Technique.

## Submitting the Pull Request

1. Fork the ISCM repository.
2. Create your feature branch (`git checkout -b technique/describe-technique`).
3. Commit your changes.
4. Push to the branch (`git push origin technique/describe-technique`).
5. Open a Pull Request referencing the real-world occurrence (e.g., a news article or an anonymized case report) in the PR description so reviewers can validate the existence of the newly documented TTP.
