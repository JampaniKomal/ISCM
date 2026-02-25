export interface Tactic {
  id: string;
  name: string;
  description: string;
  domain: 'FIN' | 'NFIN' | 'BOTH';
  mitigations?: string;
}

export interface Technique {
  id: string;
  name: string;
  description: string;
  tacticIds: string[];
  domain: 'FIN' | 'NFIN';
  dataSources: string[];
  platforms: string[];
}
