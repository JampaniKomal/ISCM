export interface Tactic {
  id: string;
  name: string;
  description: string;
  domain: 'FIN' | 'NFIN' | 'BOTH';
  mitigations?: string;
}

/**
 * A MITRE ATT&CK technique an ISCM technique corresponds to.
 *
 * - `equivalent`: ATT&CK describes the same adversary behaviour.
 * - `partial`: ATT&CK describes one step of it; the rest is in `attackGap`.
 *
 * IDs and names are checked against MITRE's STIX data
 * (`src/data/attack-reference.json`) by the test suite.
 */
export interface AttackReference {
  id: string;
  name: string;
  domain: 'enterprise' | 'mobile';
  relation: 'equivalent' | 'partial';
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  tacticIds: string[];
  domain: 'FIN' | 'NFIN';
  dataSources: string[];
  platforms: string[];
  attack: AttackReference[];
  /** What this technique involves that no ATT&CK technique describes. */
  attackGap?: string;
}
