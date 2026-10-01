import type { AttackReference, Technique } from '../types';

/** ATT&CK release the cross-references were checked against (see src/data/attack-reference.json). */
export const ATTACK_VERSION = '19.2';

export function attackUrl(id: string): string {
  return `https://attack.mitre.org/techniques/${id.replace('.', '/')}/`;
}

export interface AttackSummary {
  techniques: number;
  withEquivalent: number;
  partialOnly: number;
  withGap: number;
  attackTechniques: number;
}

export function attackSummary(techniques: Technique[]): AttackSummary {
  const withEquivalent = techniques.filter((t) => t.attack.some((a) => a.relation === 'equivalent')).length;
  return {
    techniques: techniques.length,
    withEquivalent,
    partialOnly: techniques.length - withEquivalent,
    withGap: techniques.filter((t) => t.attackGap).length,
    attackTechniques: new Set(techniques.flatMap((t) => t.attack.map((a) => a.id))).size,
  };
}

export interface NavigatorLayer {
  name: string;
  versions: { attack: string; navigator: string; layer: string };
  domain: string;
  description: string;
  techniques: { techniqueID: string; score: number; comment: string; enabled: boolean }[];
  gradient: { colors: string[]; minValue: number; maxValue: number };
}

/**
 * An ATT&CK Navigator layer of the ATT&CK techniques ISCM maps to, for one
 * ATT&CK domain. Each technique's score is the number of ISCM techniques that
 * reference it, and its comment names them.
 */
export function navigatorLayer(techniques: Technique[], domain: AttackReference['domain']): NavigatorLayer {
  const referencing = new Map<string, string[]>();
  for (const technique of techniques) {
    for (const ref of technique.attack.filter((a) => a.domain === domain)) {
      const list = referencing.get(ref.id) ?? [];
      list.push(`${technique.id} ${technique.name} (${ref.relation})`);
      referencing.set(ref.id, list);
    }
  }
  const entries = [...referencing.entries()].sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }));
  return {
    name: `ISCM in ATT&CK ${domain === 'enterprise' ? 'Enterprise' : 'Mobile'}`,
    versions: { attack: ATTACK_VERSION.split('.')[0], navigator: '5.1.0', layer: '4.5' },
    domain: `${domain}-attack`,
    description:
      'ATT&CK techniques that techniques of the Indian Socio-technical Cyber Matrix (ISCM) correspond to. ' +
      'Score: number of ISCM techniques referencing the technique. https://jampanikomal.github.io/ISCM/attack',
    techniques: entries.map(([techniqueID, iscm]) => ({
      techniqueID,
      score: iscm.length,
      comment: iscm.join('; '),
      enabled: true,
    })),
    gradient: {
      colors: ['#fff3bf', '#e8590c'],
      minValue: 0,
      maxValue: Math.max(1, ...entries.map(([, iscm]) => iscm.length)),
    },
  };
}
