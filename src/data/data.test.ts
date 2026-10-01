import { describe, expect, it } from 'vitest';
import reference from './attack-reference.json';
import { tactics } from './tactics';
import { techniques } from './techniques';
import { ATTACK_VERSION, attackSummary, attackUrl, navigatorLayer } from '../lib/attack';

const attack = reference.techniques as Record<string, { name: string; domain: string; deprecated: boolean }>;
const tacticById = new Map(tactics.map((t) => [t.id, t]));

describe('tactics', () => {
  it('have unique, sequential TA-NN ids', () => {
    expect(tactics.map((t) => t.id)).toEqual(tactics.map((_, i) => `TA-${String(i + 1).padStart(2, '0')}`));
  });

  it('each have at least one technique', () => {
    for (const tactic of tactics) {
      expect(techniques.some((t) => t.tacticIds.includes(tactic.id)), tactic.id).toBe(true);
    }
  });
});

describe('techniques', () => {
  it('have unique ids whose prefix matches their domain', () => {
    expect(new Set(techniques.map((t) => t.id)).size).toBe(techniques.length);
    for (const t of techniques) expect(t.id, t.id).toMatch(new RegExp(`^TE-${t.domain}-\\d{3}$`));
  });

  it('reference only real tactics, and only tactics of their own domain', () => {
    for (const t of techniques) {
      expect(t.tacticIds.length, t.id).toBeGreaterThan(0);
      for (const id of t.tacticIds) {
        const tactic = tacticById.get(id);
        expect(tactic, `${t.id} -> ${id}`).toBeDefined();
        expect(['BOTH', t.domain], `${t.id} is ${t.domain} but ${id} is ${tactic!.domain}`).toContain(tactic!.domain);
      }
    }
  });

  it('list data sources and platforms', () => {
    for (const t of techniques) {
      expect(t.dataSources.length, t.id).toBeGreaterThan(0);
      expect(t.platforms.length, t.id).toBeGreaterThan(0);
    }
  });
});

describe('MITRE ATT&CK cross-references', () => {
  it('were checked against the ATT&CK release the site states', () => {
    expect(reference.attackVersion).toBe(ATTACK_VERSION);
  });

  it('name real, current ATT&CK techniques with their official names and domains', () => {
    for (const t of techniques) {
      expect(t.attack.length, `${t.id} has no ATT&CK reference`).toBeGreaterThan(0);
      for (const ref of t.attack) {
        const official = attack[ref.id];
        expect(official, `${t.id}: ${ref.id} is not an ATT&CK technique`).toBeDefined();
        expect(official.deprecated, `${t.id}: ${ref.id} is deprecated or revoked`).toBe(false);
        expect(ref.name, `${t.id}: ${ref.id}`).toBe(official.name);
        expect(ref.domain, `${t.id}: ${ref.id}`).toBe(official.domain);
      }
      expect(new Set(t.attack.map((a) => a.id)).size, `${t.id} lists an ATT&CK id twice`).toBe(t.attack.length);
    }
  });

  it('explain the gap whenever ATT&CK only partly describes a technique', () => {
    for (const t of techniques) {
      if (!t.attack.some((a) => a.relation === 'equivalent')) {
        expect(t.attackGap, `${t.id} has only partial matches but no attackGap`).toBeTruthy();
      }
    }
  });

  it('link to attack.mitre.org pages, sub-techniques included', () => {
    expect(attackUrl('T1660')).toBe('https://attack.mitre.org/techniques/T1660/');
    expect(attackUrl('T1684.001')).toBe('https://attack.mitre.org/techniques/T1684/001/');
  });

  it('summarise consistently', () => {
    const s = attackSummary(techniques);
    expect(s.techniques).toBe(techniques.length);
    expect(s.withEquivalent + s.partialOnly).toBe(s.techniques);
  });
});

describe('ATT&CK Navigator layers', () => {
  for (const domain of ['enterprise', 'mobile'] as const) {
    it(`cover every ${domain} reference exactly once, scored by how many ISCM techniques use it`, () => {
      const layer = navigatorLayer(techniques, domain);
      expect(layer.domain).toBe(`${domain}-attack`);
      const expected = new Map<string, number>();
      for (const t of techniques) {
        for (const a of t.attack.filter((x) => x.domain === domain)) expected.set(a.id, (expected.get(a.id) ?? 0) + 1);
      }
      expect(new Map(layer.techniques.map((x) => [x.techniqueID, x.score]))).toEqual(expected);
    });
  }
});
