# ISCM Future Development Roadmap (v1.1 -> v2.0)

This document captures all the architectural, intelligence, and UI enhancements deferred during the v1.0 foundational sprint. It serves as a blueprint for evolving ISCM into a globally recognized standard.

## 1. Adversary Group Mapping (The "Who" - Priority v1.1)

Currently, ISCM tracks the _What_ and the _How_ (Tactics and Techniques). A professional framework must also track the _Who_.

- **Intelligence Action:** Create detailed profiles for established Indian cybercrime syndicates (e.g., `G-IND-001: Jamtara/Jharkhand Rings`, `G-IND-003: SEA Scam Compounds`).
- **Architectural Action:** Define a `groups.ts` schema mapped to specific TTP IDs.
- **UI Integration:**
  - Create a dedicated `/groups` explore page.
  - Create dedicated `/groups/:id` detail pages detailing their specific history and operational focus.
  - **Advanced Feature:** On the main Matrix view (`/`), add a dropdown to "Select Threat Group". When selected, the Matrix dynamically highlights _only_ the specific techniques employed by that group, mirroring MITRE's capability.

## 2. Granular Sub-Techniques (Increased Depth)

As the framework grows, some techniques will become too broad.

- **Structural Action:** Implement `.001`, `.002` Sub-Technique identifiers.
  - _Example:_ `TE-FIN-001: Bulk SMS Phishing` -> `TE-FIN-001.001: Telegram DLT Bypass`, `TE-FIN-001.002: Malicious Whatsapp APK Links`.
- **UI Integration:** Update the Matrix component to cleanly nest/un-nest sub-techniques without breaking the horizontal scroll flow.

## 3. The "Mitigations" Matrix (Defensive View)

Right now, mitigations are buried inside the TTP detail pages.

- **Architectural Action:** Create a standalone data schema for `Mitigations` with unique IDs (e.g., `M-IND-001: telecom DLT filtering`). Map these mitigations back to the techniques they neutralize.
- **UI Integration:** Build a toggle switch on the home page: `[Offensive View] | [Defensive View]`. The defensive view swaps the matrix to prioritize showing how to block the attacks rather than how to execute them.

## 4. Advanced Frontend Engineering (UI/UX Power-ups)

- **Global Search Bar:** Add a sticky search/cmd-k palette (e.g., using `algolia` or raw `fuse.js`) in the Navbar. Users should be able to instantly search for a specific term (like "AePS" or "Digital Arrest") and be routed directly to the correct TTP or Group page.
- **Dark Mode Toggle:** Implement a native Tailwind dark mode. Cybersecurity professionals prefer dark interfaces (MITRE often receives complaints for being too bright).
- **TTP Export Functionality:** Add a button on TTP detail pages to "Export to STIX/JSON" or "Export to PDF" for analysts writing incident reports.
- **Interactive Kill-Chain Visualizer:** While the grid is useful, adding an interactive flow chart (like a Mermaid.js diagram or an SVG timeline) showing how a specific attack moves from TA-01 -> TA-07 would be incredible for educational purposes.

## 5. API and Open Data Infrastructure

- **RESTful API Deployment:** Stop rendering purely from static `.ts` files on the client. Expose a public, read-only API (e.g., `api.iscm.org/v1/techniques`) so other researchers can programmatically pull the ISCM taxonomy into their SIEMs or SOAR platforms.
- **Automated Data Validation:** Implement GitHub Actions to run CI checks against incoming `CONTRIBUTING.md` pull requests. Ensure the JSON/TS data strictly adheres to schema typing before allowing a merge.

## 6. Community Integration (The Final Frontier)

- **"Verified" vs "Proposed" TTPs:** Implement a flagging system where community-submitted techniques are marked as _Proposed_ until validated by a core group of researchers, at which point they earn a _Verified in Wild_ badge.
- **Incident Case Studies:** At the bottom of Technique pages, add real-world sanitized FIRs (First Information Reports) or news links demonstrating exactly when and where the technique was used in a major Indian cyber incident.
